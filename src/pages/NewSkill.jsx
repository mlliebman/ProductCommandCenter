import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { useApp } from '../hooks/useApp.jsx';
import { CATEGORIES } from '../skills/index.js';

const COLORS = ['#065A82','#7B61FF','#059669','#F5A623','#E84C6A','#0891B2','#6366F1','#9333EA','#DC2626','#00C2A8'];

const DEFAULT_PROMPT = `You are an expert assistant helping a product manager.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input:
{{USER_INPUT}}

Produce a structured output in markdown that addresses the input above.`;

export default function NewSkill() {
  const { addCustomSkill } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tag: '',
    name: '',
    category: 'Strategy',
    framework: '',
    timeSaved: '',
    description: '',
    color: COLORS[0],
    inputLabel: 'Input',
    inputPlaceholder: 'Describe what you want to analyze...',
    prompt: DEFAULT_PROMPT,
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.tag || !form.prompt) return;
    const tag = form.tag.startsWith('/') ? form.tag : '/' + form.tag;
    addCustomSkill({ ...form, tag, id: form.tag.replace(/[^a-z0-9]/g, '_') + '_' + Date.now() });
    setSaved(true);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div>
      <div className="page-header">
        <h2>New Skill</h2>
        <p>Define a custom skill with its own prompt template. It will appear in the sidebar and dashboard alongside the 10 built-in skills.</p>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <div className="grid-2" style={{ gap: 14, marginBottom: 14 }}>
              <div>
                <label className="label">Skill Name *</label>
                <input className="input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Sprint Planning Builder" />
              </div>
              <div>
                <label className="label">Tag (slash command) *</label>
                <input className="input input-mono" value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="/sprint-plan" />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="select" value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="label">Framework / Methodology</label>
                <input className="input" value={form.framework} onChange={e => set('framework', e.target.value)} placeholder="e.g. RICE Scoring" />
              </div>
              <div>
                <label className="label">Time Saved</label>
                <input className="input" value={form.timeSaved} onChange={e => set('timeSaved', e.target.value)} placeholder="e.g. 2 hrs → 10 min" />
              </div>
              <div>
                <label className="label">Color</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {COLORS.map(c => (
                    <div
                      key={c} onClick={() => set('color', c)}
                      style={{ width: 24, height: 24, borderRadius: '50%', background: c, cursor: 'pointer', border: form.color === c ? '2px solid var(--charcoal)' : '2px solid transparent', outline: form.color === c ? '2px solid var(--teal)' : 'none', outlineOffset: 2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="label">Description</label>
              <textarea className="textarea" style={{ minHeight: 60 }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="One sentence describing what this skill does." />
            </div>
            <div className="grid-2" style={{ gap: 14 }}>
              <div>
                <label className="label">Input Label</label>
                <input className="input" value={form.inputLabel} onChange={e => set('inputLabel', e.target.value)} />
              </div>
              <div>
                <label className="label">Input Placeholder</label>
                <input className="input" value={form.inputPlaceholder} onChange={e => set('inputPlaceholder', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Prompt editor */}
          <div>
            <div className="prompt-block">
              <div className="prompt-block-header">
                PROMPT TEMPLATE
                <span style={{ fontSize: 10, opacity: 0.8 }}>use {'{{USER_INPUT}}'}, {'{{ORG_CONTEXT}}'}, {'{{DOCUMENT_CONTEXT}}'}</span>
              </div>
              <textarea
                value={form.prompt}
                onChange={e => set('prompt', e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--teal-pale)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, padding: 14, lineHeight: 1.7, resize: 'vertical', minHeight: 360 }}
              />
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleSave}
            disabled={!form.name || !form.tag || !form.prompt || saved}
          >
            {saved ? <><Check size={15} /> Skill Added! Redirecting…</> : <><Plus size={15} /> Add Skill</>}
          </button>
        </div>

        {/* Preview card */}
        <div style={{ flex: '0 0 280px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Preview</div>
          <div className="skill-card" style={{ cursor: 'default', borderLeft: `3px solid ${form.color}` }}>
            <div className="skill-card-tag" style={{ color: form.color }}>{form.tag || '/tag'}</div>
            <div className="skill-card-name">{form.name || 'Skill Name'}</div>
            <div className="skill-card-framework">{form.framework || 'Framework'}</div>
            {form.timeSaved && (
              <div className="skill-card-time" style={{ background: form.color + '18', color: form.color }}>
                ⏱ {form.timeSaved}
              </div>
            )}
            {form.description && <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 8 }}>{form.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
