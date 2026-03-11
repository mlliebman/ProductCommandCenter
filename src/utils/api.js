export async function runSkill({ apiKey, systemPrompt, userContent, onChunk }) {
  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    stream: true,
    messages: [{ role: 'user', content: userContent }],
  };

  if (systemPrompt) {
    body.system = [
      {
        type: 'text',
        text: systemPrompt,
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

  const docBlock = documentContext
    ? `Reference Documents:\n${documentContext}`
    : '';

  // Cacheable system content: org context + documents
  // These are stable and repeated across calls — caching makes them 90% cheaper
  // and they won't count toward your rate limit after the first call
  const systemPrompt = [orgBlock, docBlock].filter(Boolean).join('\n\n');

  // User content: skill prompt + user input (changes every call, not cached)
  const userContent = prompt
    .replace('{{ORG_CONTEXT}}', '')
    .replace('{{DOCUMENT_CONTEXT}}', '')
    .replace('{{USER_INPUT}}', userInput)
    .trim();

  return { systemPrompt, userContent };
}