export function exportMarkdown(output) {
  const content = `# ${output.skillName} — ${new Date(output.createdAt).toLocaleDateString()}

**Input:**
${output.userInput}

---

${output.result}
`;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${output.skillId}-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
