import { useState } from 'react';
import { Eye, EyeOff, Save, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../hooks/useApp.jsx';

function Section({ title, sub, children }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--divider)' }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { apiKey, setApiKey, orgConfig, setOrgConfig } = useApp();
  const [keyDraft, setKeyDraft] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [orgDraft, setOrgDraft] = useState(orgConfig);
  const [saved, setSaved] = useState('');

  const saveKey = () => {
    setApiKey(keyDraft);
    setSaved('key');
    setTimeout(() => setSaved(''), 2000);
  };

  const saveOrg = () => {
    setOrgConfig(orgDraft);
    setSaved('org');
    setTimeout(() => setSaved(''), 2000);
  };

  const updateOrg = (k, v) => setOrgDraft(d => ({ ...d, [k]: v }));

  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Configure your API key and org context. Org context is injected into every skill prompt automatically.</p>
      </div>

      {/* API Key */}
      <Section
        title="Anthropic API Key"
        sub="Stored in localStorage. Never committed to your repo."
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#FFF9EB', border: '1.5px solid var(--amber)', borderRadius: 8, marginBottom: 14, fontSize: 13 }}>
          <AlertCircle size={14} color="var(--amber)" style={{ flexShrink: 0 }} />
          This is a client-side app. Your API key is never sent to any server other than Anthropic's. On a shared machine, use a separate key with usage limits set on{' '}
          <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: 'var(--teal)' }}>console.anthropic.com</a>.
        </div>
        <label className="label">API Key</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type={showKey ? 'text' : 'password'}
              className="input"
              placeholder="sk-ant-…"
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              style={{ paddingRight: 38 }}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--slate)' }}
            >
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <button className="btn btn-primary" onClick={saveKey}>
            {saved === 'key' ? <><Check size={13} /> Saved</> : <><Save size={13} /> Save</>}
          </button>
        </div>
        {apiKey && <div style={{ fontSize: 12, color: '#059669', marginTop: 8, fontWeight: 600 }}>✓ API key is set</div>}
      </Section>

      {/* Org Config */}
      <Section
        title="Organization Context"
        sub="Injected into every prompt. The AI uses this to automatically identify and name relevant customer segments — no manual definition required."
      >
        <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
          <div>
            <label className="label">Company Name</label>
            <input className="input" value={orgDraft.companyName} onChange={e => updateOrg('companyName', e.target.value)} placeholder="Acme Corp" />
          </div>
          <div>
            <label className="label">Product Name</label>
            <input className="input" value={orgDraft.productName} onChange={e => updateOrg('productName', e.target.value)} placeholder="Acme Platform" />
          </div>
          <div>
            <label className="label">Team Size</label>
            <input className="input" value={orgDraft.teamSize} onChange={e => updateOrg('teamSize', e.target.value)} placeholder="e.g. 3 PMs, 12 Eng, 4 Design" />
          </div>
          <div>
            <label className="label">Tech Stack</label>
            <input className="input" value={orgDraft.stack} onChange={e => updateOrg('stack', e.target.value)} placeholder="React, Node.js, PostgreSQL, AWS" />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="label">Tools & Workflow Systems</label>
          <input className="input" value={orgDraft.tools} onChange={e => updateOrg('tools', e.target.value)} placeholder="JIRA, Notion, Figma, Confluence, Gong, Slack" />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="label">Market & Customer Context</label>
          <div style={{ fontSize: 12, color: 'var(--slate)', marginBottom: 8, lineHeight: 1.6 }}>
            Describe your market, who buys your product, how they buy, and any known customer groupings.
            The AI will use this — plus your input at run time — to derive the most meaningful segments for each analysis.
            The richer this context, the more accurate the segmentation.
          </div>
          <textarea
            className="textarea"
            style={{ minHeight: 120 }}
            value={orgDraft.marketContext}
            onChange={e => updateOrg('marketContext', e.target.value)}
            placeholder={`Examples of useful context:
• We sell to mid-market and enterprise B2B companies in financial services and healthcare
• Our buyers are CFOs and VPs of Finance; end users are finance teams
• We compete primarily against Workday and legacy Excel workflows
• Customers in EMEA tend to have stricter compliance requirements
• We have a large base of SMB customers we're trying to move upmarket
• Our fastest-growing cohort is companies switching from [Competitor X]`}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="label">Additional Strategic Context</label>
          <textarea
            className="textarea"
            style={{ minHeight: 90 }}
            value={orgDraft.additionalContext}
            onChange={e => updateOrg('additionalContext', e.target.value)}
            placeholder="Company stage, strategic priorities, key constraints, recent pivots, board-level goals, anything the AI should always know..."
          />
        </div>

        {/* Preview */}
        {orgDraft.companyName && (
          <div style={{ marginBottom: 16 }}>
            <label className="label">Context Preview (injected into every prompt)</label>
            <div className="prompt-block">
              <div className="prompt-block-header">ORG_CONTEXT PREVIEW</div>
              <pre style={{ color: 'var(--teal-pale)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, padding: 14, whiteSpace: 'pre-wrap' }}>
{`Organization Context:
- Company: ${orgDraft.companyName || '—'}
- Product: ${orgDraft.productName || '—'}
- Team size: ${orgDraft.teamSize || '—'}
- Tech stack: ${orgDraft.stack || '—'}
- Tools: ${orgDraft.tools || '—'}
${orgDraft.marketContext ? `- Market & customers: ${orgDraft.marketContext}` : ''}
${orgDraft.additionalContext ? `- Additional context: ${orgDraft.additionalContext}` : ''}`}
              </pre>
            </div>
          </div>
        )}

        <button className="btn btn-primary" onClick={saveOrg}>
          {saved === 'org' ? <><Check size={13} /> Saved to localStorage</> : <><Save size={13} /> Save Org Config</>}
        </button>
      </Section>

      {/* Data */}
      <Section title="Data & Storage" sub="Everything is stored in your browser. Nothing is sent to any server other than Anthropic.">
        <div style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.8 }}>
          <div>• <strong>API Key</strong> — localStorage (persists across sessions)</div>
          <div>• <strong>Org Config</strong> — localStorage (persists across sessions)</div>
          <div>• <strong>Outputs</strong> — localStorage (up to 100 outputs)</div>
          <div>• <strong>Custom Skills</strong> — localStorage</div>
          <div>• <strong>Prompt Edits</strong> — localStorage</div>
        </div>
        <div style={{ marginTop: 14 }}>
          <button className="btn btn-danger btn-sm" onClick={() => {
            if (confirm('Clear all saved outputs? This cannot be undone.')) {
              localStorage.removeItem('pc_outputs');
              window.location.reload();
            }
          }}>Clear All Outputs</button>
        </div>
      </Section>
    </div>
  );
}