import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Zap, BookOpen, History as HistoryIcon, Settings, Plus } from 'lucide-react';
import { useApp } from './hooks/useApp.jsx';
import { SKILLS } from './skills/index.js';
import Dashboard from './pages/Dashboard.jsx';
import RunSkill from './pages/RunSkill.jsx';
import OutputView from './pages/OutputView.jsx';
import PromptLibrary from './pages/PromptLibrary.jsx';
import HistoryPage from './pages/History.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NewSkill from './pages/NewSkill.jsx';

function Sidebar() {
  const { orgConfig, customSkills } = useApp();
  const allSkills = [...SKILLS, ...customSkills];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Product <span>Command</span></h1>
        <p>{orgConfig.companyName || 'Configure your org →'}</p>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Navigation</div>
        <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={15} /> Dashboard
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={15} /> Prompt Library
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <HistoryIcon size={15} /> Output History
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Settings size={15} /> Settings
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Skills</div>
        {allSkills.map(skill => (
          <NavLink
            key={skill.id}
            to={`/skill/${skill.id}`}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Zap size={13} style={{ color: skill.color }} />
            <span style={{ flex: 1 }}>{skill.name}</span>
            <span className="sidebar-skill-tag">{skill.tag}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-section">
        <NavLink to="/new-skill" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Plus size={15} /> New Skill
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div style={{ fontSize: 11, color: 'var(--slate)', padding: '0 4px' }}>
          {allSkills.length} skills · v1.0
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/skill/:skillId" element={<RunSkill />} />
          <Route path="/output/:outputId" element={<OutputView />} />
          <Route path="/library" element={<PromptLibrary />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/new-skill" element={<NewSkill />} />
        </Routes>
      </main>
    </div>
  );
}
