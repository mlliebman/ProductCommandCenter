export async function generateQuestions({ apiKey, skill, userInput, orgConfig }) {
  const orgBlock = orgConfig?.companyName
    ? `Organization: ${orgConfig.companyName}, Product: ${orgConfig.productName || 'unspecified'}`
    : '';

  const prompt = `You are a product management expert running the "${skill.name}" skill (${skill.framework}).

The user has provided this initial input:
"${userInput}"

${orgBlock}

Generate 3–5 targeted clarifying questions that would meaningfully improve the quality of the output. 

Rules:
- Only ask questions whose answers would actually change the output
- Make questions specific to THIS input, not generic
- Each question should be answerable in 1–3 sentences
- Do not ask for information already provided
- Order by importance (most impactful first)

Respond ONLY with a valid JSON array of question strings. No preamble, no explanation, no markdown. Example format:
["Question one?", "Question two?", "Question three?"]`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const raw = data?.content?.[0]?.text?.trim() || '[]';

  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return [];
  }
}

export async function runSkill({ apiKey, systemPrompt, userContent, onChunk }) {
  if (!userContent || !userContent.trim()) {
    throw new Error('No content to send. Please enter some input and try again.');
  }

  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    stream: true,
    messages: [{ role: 'user', content: userContent.trim() }],
  };

  if (systemPrompt && systemPrompt.trim()) {
    body.system = [
      {
        type: 'text',
        text: systemPrompt.trim(),
        cache_control: { type: 'ephemeral' },
      },
    ];
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
    for (const line of lines) {
      const data = line.slice(6);
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        const delta = parsed?.delta?.text || '';
        if (delta) {
          fullText += delta;
          onChunk?.(fullText);
        }
      } catch {}
    }
  }

  return fullText;
}

export function buildPrompt({ skill, userInput, orgConfig, documentContext, promptOverride, answers }) {
  let prompt = promptOverride || skill.prompt;

  const orgBlock = orgConfig?.companyName
    ? `Organization Context:
- Company: ${orgConfig.companyName}
- Product: ${orgConfig.productName || 'Not specified'}
- Team size: ${orgConfig.teamSize || 'Not specified'}
- Tech stack: ${orgConfig.stack || 'Not specified'}
- Tools: ${orgConfig.tools || 'Not specified'}
- Segments: ${orgConfig.segments || 'A/B/C/D'}
${orgConfig.additionalContext ? `- Additional context: ${orgConfig.additionalContext}` : ''}`
    : '';

  const MAX_CHARS = 40000;
  const truncatedDoc = documentContext && documentContext.length > MAX_CHARS
    ? documentContext.slice(0, MAX_CHARS) + '\n\n[Document truncated to fit token limit]'
    : documentContext;

  const docBlock = truncatedDoc
    ? `Reference Documents:\n${truncatedDoc}`
    : '';

  // Include Q&A context if answers were provided
  const answersBlock = answers && answers.length > 0
    ? `Additional Context from User:\n${answers.map(({ question, answer }) =>
        answer?.trim() ? `Q: ${question}\nA: ${answer}` : null
      ).filter(Boolean).join('\n\n')}`
    : '';

  const systemPrompt = [orgBlock, docBlock].filter(Boolean).join('\n\n');

  let userContent = prompt
    .replace('{{ORG_CONTEXT}}', '')
    .replace('{{DOCUMENT_CONTEXT}}', '')
    .replace('{{USER_INPUT}}', userInput || '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Append Q&A answers to user content so they directly inform the output
  if (answersBlock) {
    userContent = `${userContent}\n\n${answersBlock}`;
  }

  if (!userContent) {
    userContent = [orgBlock, docBlock, `Input: ${userInput || ''}`].filter(Boolean).join('\n\n');
  }

  return { systemPrompt, userContent };
}