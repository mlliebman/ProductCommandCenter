export async function runSkill({ apiKey, systemPrompt, userContent, onChunk }) {
  // Guard: userContent must never be empty
  if (!userContent || !userContent.trim()) {
    throw new Error('No content to send. Please enter some input and try again.');
  }

  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    stream: true,
    messages: [{ role: 'user', content: userContent.trim() }],
  };

  // Only add system prompt if it has actual content
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

export function buildPrompt({ skill, userInput, orgConfig, documentContext, promptOverride }) {
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

  // Cap document size to ~20,000 tokens (80,000 chars) to prevent rate limit errors
  const MAX_CHARS = 80000;
  const truncatedDoc = documentContext && documentContext.length > MAX_CHARS
    ? documentContext.slice(0, MAX_CHARS) + '\n\n[Document truncated to fit token limit]'
    : documentContext;

  const docBlock = truncatedDoc
    ? `Reference Documents:\n${truncatedDoc}`
    : '';

  // System prompt: org context + documents (stable, cached after first use)
  const systemPrompt = [orgBlock, docBlock].filter(Boolean).join('\n\n');

  // User content: skill instructions + user input
  let userContent = prompt
    .replace('{{ORG_CONTEXT}}', '')
    .replace('{{DOCUMENT_CONTEXT}}', '')
    .replace('{{USER_INPUT}}', userInput || '')
    .replace(/\n{3,}/g, '\n\n') // collapse blank lines left by placeholder removal
    .trim();

  // Safety fallback: if userContent is somehow empty, rebuild it with everything
  if (!userContent) {
    userContent = [
      orgBlock,
      docBlock,
      `Input: ${userInput || ''}`
    ].filter(Boolean).join('\n\n');
  }

  return { systemPrompt, userContent };
}