import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Play, RefreshCw, Download, Copy, Paperclip, X, ChevronDown, ChevronUp, AlertCircle, Check } from 'lucide-react';
import { useApp } from '../hooks/useApp.jsx';
import { SKILLS } from '../skills/index.js';
import { runSkill, buildPrompt } from '../utils/api.js';
import { exportMarkdown } from '../utils/export.js';

function FileUpload({ files, onAdd, onRemove }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFiles = async (fileList) => {
    for (const file of fileList) {
      const text = await file.text();
      onAdd({ name: file.name, content: text });
    }
  };

  return (
    <div>
      <div
        className={`file-drop ${dragging ? 'dragging' : ''}`}
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <input ref={inputRef} type="file" multiple accept=".txt,.md,.csv,.json" onChange={e => handleFiles(e.target.files)} />
        <Paperclip size={16} style={{ marginBottom: 6 }} />
        <div style={{ fontSize: 12 }}>Drop files here or click to upload</div>
        <div style={{ fontSize: 11, color: 'var(--slate-light)', marginTop: 4 }}>.txt, .md, .csv, .json</div>
      </div>
      {files.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {files.map((f, i) => (
            <div key={i} className="badge badge-teal" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Paperclip size={10} /> {f.name}
              <button onClick={() => onRemove(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: 'inherit' }}>
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RunSkill() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { apiKey, orgConfig, customSkills, promptOverrides, saveOutput } = useApp();

  const allSkills = [...SKILLS, ...customSkills];
  const skill = allSkills.find(s => s.id === skillId);

  const [userInput, setUserInput] = useState('');
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [refineInput, setRefineInput] = useState('');
  const [currentOutputId, setCurrentOutputId] = useState(null);
  const [history, setHistory] = useState([]); // for refinement conversation

  if (!skill) return <div className="card"><p>Skill not found.</p></div>;

  const docContext = files.map(f => `### ${f.name}\n${f.content}`).join('\n\n');
  const promptOverride = promptOverrides[skillId];

  const handleRun = async (isRefinement = false) => {
    if (!apiKey) { setError('API key required. Go to Settings.'); return; }
    if (!userInput.trim() && !isRefinement) { setError('Please enter some input.'); return; }

    setLoading(true);
    setError('');

    try {
      let prompt;
      if (isRefinement && refineInput.trim()) {
        // Build refinement prompt preserving context
        prompt = `You previously produced this output:

${result}

The user wants you to refine it with the following feedback:
${refineInput}

Please produce an improved version of the full output incorporating this feedback. Maintain the same markdown structure.`;
      } else {
        prompt = buildPrompt({
          skill,
          userInput,
          orgConfig,
          documentContext: docContext,
          promptOverride,
        });
        setHistory([]);
      }

      let fullText = '';
      const output = await runSkill({
        apiKey,
        prompt,
        onChunk: (text) => {
          fullText = text;
          setResult(text);
        },
      });

      setResult(output);
      if (!isRefinement) {
        const saved = saveOutput({ skillId, skillName: skill.name, userInput, result: output });
        setCurrentOutputId(saved.id);
      }
      setRefineInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Link to="/" style={{ color: 'var(--slate)', textDecoration: 'none', fontSize: 13 }}>Dashboard</Link>
        <span style={{ color: 'var(--slate-light)' }}>›</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: skill.color, fontFamily: 'JetBrains Mono, monospace' }}>{skill.tag}</span>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Left: Input panel */}
        <div style={{ flex: '0 0 380px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Skill header */}
          <div className="card" style={{ borderTop: `3px solid ${skill.color}` }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: skill.color, fontWeight: 600, marginBottom: 4 }}>{skill.tag}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{skill.name}</div>
            <div style={{ fontSize: 12, color: 'var(--slate)', marginBottom: 8 }}>{skill.framework}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: skill.color, background: skill.color + '18', padding: '3px 8px', borderRadius: 99, display: 'inline-block' }}>
              ⏱ {skill.timeSaved}
            </div>
            <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 10, lineHeight: 1.6 }}>{skill.description}</p>
          </div>

          {/* Input */}
          <div className="card">
            <label className="label">{skill.inputLabel}</label>
            <textarea
              className="textarea"
              style={{ minHeight: 180 }}
              placeholder={skill.inputPlaceholder}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* File upload */}
          <div className="card">
            <label className="label" style={{ marginBottom: 8 }}>Reference Documents (optional)</label>
            <FileUpload
              files={files}
              onAdd={f => setFiles(prev => [...prev, f])}
              onRemove={i => setFiles(prev => prev.filter((_, idx) => idx !== i))}
            />
          </div>

          {/* Prompt preview */}
          <div>
            <button
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', justifyContent: 'space-between' }}
              onClick={() => setShowPrompt(!showPrompt)}
            >
              <span>View prompt template</span>
              {showPrompt ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showPrompt && (
              <div style={{ marginTop: 8 }}>
                <div className="prompt-block">
                  <div className="prompt-block-header">
                    PROMPT  {skill.tag}
                    <Link to="/library" style={{ color: 'var(--ink)', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>Edit in Library →</Link>
                  </div>
                  <pre style={{ color: 'var(--teal-pale)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, padding: 14, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {promptOverride || skill.prompt}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#FEE2E2', borderRadius: 8, fontSize: 13, color: '#DC2626' }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => handleRun(false)}
            disabled={loading || !userInput.trim()}
          >
            {loading ? <><span className="streaming-dot" /> Running…</> : <><Play size={15} /> Run {skill.tag}</>}
          </button>
        </div>

        {/* Right: Output panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          {result ? (
            <>
              <div className="card" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--divider)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Output</div>
                    {loading && <span className="streaming-dot" />}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" onClick={handleCopy} disabled={loading}>
                      {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => exportMarkdown({ skillId, skillName: skill.name, userInput, result, createdAt: new Date().toISOString() })}
                      disabled={loading}
                    >
                      <Download size={12} /> Export .md
                    </button>
                  </div>
                </div>
                <div className="markdown-output">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                </div>
              </div>

              {/* Refine panel */}
              {!loading && (
                <div className="card" style={{ borderTop: '2px solid var(--teal)' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: 'var(--charcoal)' }}>
                    Refine Output
                  </div>
                  <textarea
                    className="textarea"
                    style={{ minHeight: 80, marginBottom: 10 }}
                    placeholder="What would you like to change? e.g. 'Make the risk section more specific', 'Add a table for dependencies', 'Focus Segment A on enterprise customers'..."
                    value={refineInput}
                    onChange={e => setRefineInput(e.target.value)}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleRun(true)}
                      disabled={!refineInput.trim()}
                    >
                      <RefreshCw size={13} /> Refine
                    </button>
                    <button className="btn btn-ghost" onClick={() => { setResult(''); setRefineInput(''); }}>
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
                <h3>{skill.name}</h3>
                <p style={{ maxWidth: 320, margin: '0 auto' }}>
                  Fill in the input on the left and click Run. Output streams here in real time.
                </p>
                <div style={{ marginTop: 16, fontSize: 12, color: 'var(--slate-light)' }}>
                  {skill.timeSaved} per use
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
