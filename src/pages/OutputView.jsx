import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, Copy, Trash2, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../hooks/useApp.jsx';
import { SKILLS } from '../skills/index.js';
import { exportMarkdown } from '../utils/export.js';

export default function OutputView() {
  const { outputId } = useParams();
  const navigate = useNavigate();
  const { outputs, deleteOutput, customSkills } = useApp();
  const allSkills = [...SKILLS, ...customSkills];
  const [copied, setCopied] = useState(false);

  const output = outputs.find(o => o.id === parseInt(outputId));
  if (!output) return <div className="card"><p>Output not found. <Link to="/history">Back to history</Link></p></div>;

  const skill = allSkills.find(s => s.id === output.skillId);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    deleteOutput(output.id);
    navigate('/history');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Link to="/history" className="btn btn-ghost btn-sm"><ArrowLeft size={13} /> History</Link>
        <span style={{ color: 'var(--slate-light)' }}>›</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{output.skillName}</span>
        <span style={{ fontSize: 12, color: 'var(--slate-light)' }}>{new Date(output.createdAt).toLocaleDateString()}</span>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: '0 0 280px' }}>
          <div className="card" style={{ marginBottom: 14, borderLeft: `3px solid ${skill?.color || 'var(--teal)'}` }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: skill?.color, fontWeight: 600, marginBottom: 4 }}>{skill?.tag}</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{output.skillName}</div>
            <div style={{ fontSize: 12, color: 'var(--slate)' }}>{new Date(output.createdAt).toLocaleString()}</div>
          </div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate)', marginBottom: 8 }}>INPUT</div>
            <div style={{ fontSize: 12, color: 'var(--charcoal)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{output.userInput}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCopy}>
              {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy Output</>}
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => exportMarkdown(output)}>
              <Download size={13} /> Export .md
            </button>
            {skill && (
              <Link to={`/skill/${skill.id}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Run again
              </Link>
            )}
            <button className="btn btn-danger" style={{ width: '100%', justifyContent: 'center' }} onClick={handleDelete}>
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 0 }}>
          <div className="markdown-output">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{output.result}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
