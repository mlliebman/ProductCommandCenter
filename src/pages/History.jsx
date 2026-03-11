// History.jsx
import { Link } from 'react-router-dom';
import { Zap, Trash2, Download } from 'lucide-react';
import { useApp } from '../hooks/useApp.jsx';
import { SKILLS } from '../skills/index.js';
import { exportMarkdown } from '../utils/export.js';

export default function History() {
  const { outputs, deleteOutput, customSkills } = useApp();
  const allSkills = [...SKILLS, ...customSkills];

  if (!outputs.length) return (
    <div>
      <div className="page-header"><h2>Output History</h2><p>Your saved skill runs appear here.</p></div>
      <div className="card"><div className="empty-state"><div style={{ fontSize: 32, marginBottom: 12 }}>📂</div><h3>No outputs yet</h3><p>Run a skill to see your history here.</p></div></div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h2>Output History</h2>
        <p>{outputs.length} saved outputs</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {outputs.map(o => {
          const skill = allSkills.find(s => s.id === o.skillId);
          return (
            <div key={o.id} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={14} style={{ color: skill?.color || 'var(--teal)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{o.skillName}</div>
                <div style={{ fontSize: 11, color: 'var(--slate)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {o.userInput}
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--slate-light)', flexShrink: 0 }}>
                {new Date(o.createdAt).toLocaleDateString()}
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => exportMarkdown(o)}><Download size={12} /></button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteOutput(o.id)}><Trash2 size={12} /></button>
                <Link to={`/output/${o.id}`} className="btn btn-secondary btn-sm">View</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
