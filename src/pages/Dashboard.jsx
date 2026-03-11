import { Link } from 'react-router-dom';
import { Zap, Clock, AlertCircle, Plus } from 'lucide-react';
import { useApp } from '../hooks/useApp.jsx';
import { SKILLS, getCategoryColor } from '../skills/index.js';

function StatCard({ label, value, sub }) {
  return (
    <div className="card card-sm" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--slate)' }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { apiKey, orgConfig, outputs, customSkills } = useApp();
  const allSkills = [...SKILLS, ...customSkills];
  const categories = [...new Set(allSkills.map(s => s.category))];

  const totalHoursSaved = outputs.reduce((acc, o) => {
    const skill = allSkills.find(s => s.id === o.skillId);
    if (!skill) return acc;
    const match = skill.timeSaved.match(/(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div>
      {!apiKey && (
        <div className="api-key-banner">
          <AlertCircle size={16} color="var(--amber)" />
          <span>API key not set. <Link to="/settings" style={{ color: 'var(--teal)', fontWeight: 600 }}>Add your Anthropic API key →</Link></span>
        </div>
      )}

      <div className="page-header">
        <h2>
          {orgConfig.companyName ? `${orgConfig.companyName} · Product Command` : 'Product Command'}
        </h2>
        <p>
          {orgConfig.productName
            ? `${orgConfig.productName} · ${allSkills.length} skills ready`
            : `${allSkills.length} skills across the product lifecycle`}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        <StatCard label="Total Skills" value={allSkills.length} sub={`${customSkills.length} custom`} />
        <StatCard label="Outputs Generated" value={outputs.length} sub="this session + saved" />
        <StatCard label="Hours Saved" value={`~${totalHoursSaved}h`} sub="estimated from skills run" />
      </div>

      {/* Skills by category */}
      {categories.map(cat => {
        const catSkills = allSkills.filter(s => s.category === cat);
        const color = getCategoryColor(cat);
        return (
          <div key={cat} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 3, height: 18, background: color, borderRadius: 2 }} />
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--slate)', textTransform: 'uppercase' }}>
                {cat}
              </h3>
              <div style={{ fontSize: 11, color: 'var(--slate-light)' }}>{catSkills.length} skills</div>
            </div>
            <div className="grid-auto">
              {catSkills.map(skill => (
                <Link key={skill.id} to={`/skill/${skill.id}`} className="skill-card" style={{ '--skill-color': skill.color }}>
                  <style>{`.skill-card[style*="${skill.color}"]::before { background: ${skill.color}; }`}</style>
                  <div className="skill-card-tag" style={{ color: skill.color }}>{skill.tag}</div>
                  <div className="skill-card-name">{skill.name}</div>
                  <div className="skill-card-framework">{skill.framework}</div>
                  <div className="skill-card-time" style={{ background: skill.color + '18', color: skill.color }}>
                    ⏱ {skill.timeSaved}
                  </div>
                </Link>
              ))}
              {cat === (categories[categories.length - 1]) && (
                <Link to="/new-skill" className="skill-card" style={{ borderStyle: 'dashed', borderColor: 'var(--divider)', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, minHeight: 100, color: 'var(--slate)' }}>
                  <Plus size={20} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>New Skill</span>
                </Link>
              )}
            </div>
          </div>
        );
      })}

      {/* Recent outputs */}
      {outputs.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--slate)', textTransform: 'uppercase' }}>Recent Outputs</h3>
            <Link to="/history" style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {outputs.slice(0, 5).map(o => {
              const skill = allSkills.find(s => s.id === o.skillId);
              return (
                <Link key={o.id} to={`/output/${o.id}`} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
                  <Zap size={14} style={{ color: skill?.color || 'var(--teal)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{o.skillName}</div>
                    <div style={{ fontSize: 11, color: 'var(--slate)', marginTop: 2 }}>
                      {o.userInput?.slice(0, 80)}...
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--slate-light)', flexShrink: 0 }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
