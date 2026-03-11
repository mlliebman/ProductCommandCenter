export async function runSkill({ apiKey, prompt, onChunk }) {
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
      max_tokens: 4096,
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    }),
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

  return prompt
    .replace('{{ORG_CONTEXT}}', orgBlock)
    .replace('{{DOCUMENT_CONTEXT}}', docBlock)
    .replace('{{USER_INPUT}}', userInput);
}
