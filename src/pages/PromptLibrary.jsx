import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, RotateCcw, Check, X, ExternalLink } from 'lucide-react';
import { useApp } from '../hooks/useApp.jsx';
import { SKILLS } from '../skills/index.js';

export default function PromptLibrary() {
  const { customSkills, promptOverrides, setPromptOverride, resetPromptOverride } = useApp();
  const [editing, setEditing] = useState(null); // skillId
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState(null);
  const allSkills = [...SKILLS, ...customSkills];

  const startEdit = (skill) => {
    setEditing(skill.id);
    setDraft(promptOverrides[skill.id] || skill.prompt);
  };

  const saveEdit = (skillId) => {
    setPromptOverride(skillId, draft);
    setEditing(null);
    setSaved(skillId);
    setTimeout(() => setSaved(null), 2000);
  };

  const reset = (skillId) => {
    resetPromptOverride(skillId);
    setEditing(null);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Prompt Library</h2>
        <p>Version-controlled prompts for all skills. Edit per-org, reset to defaults anytime. Changes apply immediately.</p>
      </div>

      <div style={{ background: 'var(--ink)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: 'var(--teal-pale)' }}>
        <strong style={{ color: 'var(--teal)' }}>Variables:</strong>{' '}
        <code style={{ color: 'var(--amber)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{'{{USER_INPUT}}'}</code> — what the user types &nbsp;·&nbsp;
        <code style={{ color: 'var(--amber)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{'{{ORG_CONTEXT}}'}</code> — org config injected automatically &nbsp;·&nbsp;
        <code style={{ color: 'var(--amber)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{'{{DOCUMENT_CONTEXT}}'}</code> — uploaded files
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {allSkills.map(skill => {
          const isEditing = editing === skill.id;
          const hasOverride = !!promptOverrides[skill.id];
          const isSaved = saved === skill.id;

          return (
            <div key={skill.id} className="card" style={{ borderLeft: `3px solid ${skill.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: skill.color }}>{skill.tag}</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{skill.name}</span>
                    {hasOverride && <span className="badge badge-teal" style={{ fontSize: 10 }}>Modified</span>}
                    {isSaved && <span className="badge" style={{ background: '#D1FAE5', color: '#059669', fontSize: 10 }}>✓ Saved</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{skill.framework}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {!isEditing && (
                    <>
                      <Link to={`/skill/${skill.id}`} className="btn btn-ghost btn-sm">
                        <ExternalLink size={12} /> Run
                      </Link>
                      <button className="btn btn-secondary btn-sm" onClick={() => startEdit(skill)}>
                        <Edit2 size={12} /> Edit Prompt
                      </button>
                    </>
                  )}
                  {isEditing && (
                    <>
                      {hasOverride && (
                        <button className="btn btn-danger btn-sm" onClick={() => reset(skill.id)}>
                          <RotateCcw size={12} /> Reset to Default
                        </button>
                      )}
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>
                        <X size={12} /> Cancel
                      </button>
                      <button className="btn btn-primary btn-sm" onClick={() => saveEdit(skill.id)}>
                        <Check size={12} /> Save
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="prompt-block">
                  <div className="prompt-block-header">
                    EDITING  {skill.tag}
                  </div>
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--teal-pale)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, padding: 14, lineHeight: 1.7, resize: 'vertical', minHeight: 400 }}
                  />
                </div>
              ) : (
                <div className="prompt-block">
                  <div className="prompt-block-header">
                    PROMPT  {skill.tag}
                    {hasOverride && <span style={{ fontSize: 10, opacity: 0.8 }}>custom</span>}
                  </div>
                  <pre style={{ color: 'var(--teal-pale)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, padding: 14, whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 220, overflow: 'hidden', position: 'relative' }}>
                    {(promptOverrides[skill.id] || skill.prompt).slice(0, 600)}{(promptOverrides[skill.id] || skill.prompt).length > 600 ? '…' : ''}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
