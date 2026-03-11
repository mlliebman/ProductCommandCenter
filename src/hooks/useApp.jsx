import { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  API_KEY: 'pc_api_key',
  ORG_CONFIG: 'pc_org_config',
  OUTPUTS: 'pc_outputs',
  CUSTOM_SKILLS: 'pc_custom_skills',
  PROMPT_OVERRIDES: 'pc_prompt_overrides',
};

const DEFAULT_ORG = {
  name: '',
  companyName: '',
  productName: '',
  teamSize: '',
  stack: '',
  segments: 'A = Core retained customers, B = Growth accounts, C = New market, D = Exploratory',
  tools: 'JIRA, Notion, Figma, Slack',
  additionalContext: '',
};

export function AppProvider({ children }) {
  const [apiKey, setApiKeyState] = useState(() => localStorage.getItem(STORAGE_KEYS.API_KEY) || '');
  const [orgConfig, setOrgConfigState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORG_CONFIG)) || DEFAULT_ORG; }
    catch { return DEFAULT_ORG; }
  });
  const [outputs, setOutputsState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.OUTPUTS)) || []; }
    catch { return []; }
  });
  const [customSkills, setCustomSkillsState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_SKILLS)) || []; }
    catch { return []; }
  });
  const [promptOverrides, setPromptOverridesState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROMPT_OVERRIDES)) || {}; }
    catch { return {}; }
  });

  const setApiKey = (key) => {
    localStorage.setItem(STORAGE_KEYS.API_KEY, key);
    setApiKeyState(key);
  };

  const setOrgConfig = (cfg) => {
    localStorage.setItem(STORAGE_KEYS.ORG_CONFIG, JSON.stringify(cfg));
    setOrgConfigState(cfg);
  };

  const saveOutput = (output) => {
    const updated = [{ ...output, id: Date.now(), createdAt: new Date().toISOString() }, ...outputs].slice(0, 100);
    localStorage.setItem(STORAGE_KEYS.OUTPUTS, JSON.stringify(updated));
    setOutputsState(updated);
    return updated[0];
  };

  const updateOutput = (id, patch) => {
    const updated = outputs.map(o => o.id === id ? { ...o, ...patch } : o);
    localStorage.setItem(STORAGE_KEYS.OUTPUTS, JSON.stringify(updated));
    setOutputsState(updated);
  };

  const deleteOutput = (id) => {
    const updated = outputs.filter(o => o.id !== id);
    localStorage.setItem(STORAGE_KEYS.OUTPUTS, JSON.stringify(updated));
    setOutputsState(updated);
  };

  const addCustomSkill = (skill) => {
    const updated = [...customSkills, { ...skill, id: `custom_${Date.now()}`, isCustom: true }];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SKILLS, JSON.stringify(updated));
    setCustomSkillsState(updated);
  };

  const updateCustomSkill = (id, patch) => {
    const updated = customSkills.map(s => s.id === id ? { ...s, ...patch } : s);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SKILLS, JSON.stringify(updated));
    setCustomSkillsState(updated);
  };

  const deleteCustomSkill = (id) => {
    const updated = customSkills.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SKILLS, JSON.stringify(updated));
    setCustomSkillsState(updated);
  };

  const setPromptOverride = (skillId, prompt) => {
    const updated = { ...promptOverrides, [skillId]: prompt };
    localStorage.setItem(STORAGE_KEYS.PROMPT_OVERRIDES, JSON.stringify(updated));
    setPromptOverridesState(updated);
  };

  const resetPromptOverride = (skillId) => {
    const updated = { ...promptOverrides };
    delete updated[skillId];
    localStorage.setItem(STORAGE_KEYS.PROMPT_OVERRIDES, JSON.stringify(updated));
    setPromptOverridesState(updated);
  };

  return (
    <AppContext.Provider value={{
      apiKey, setApiKey,
      orgConfig, setOrgConfig,
      outputs, saveOutput, updateOutput, deleteOutput,
      customSkills, addCustomSkill, updateCustomSkill, deleteCustomSkill,
      promptOverrides, setPromptOverride, resetPromptOverride,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
