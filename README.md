# Product Command

> AI-powered product management skills — shared, scalable, integrated with your workflow.

10 framework-backed PM skills with a shared prompt library, org context injection, and output history. No copy-pasting prompts. Runs in the browser, deploys to GitHub Pages.

---

## Quick Start (Local)

```bash
git clone https://github.com/YOUR_USERNAME/product-command
cd product-command
npm install
npm run dev
```

Open `http://localhost:5173/product-command/` and go to **Settings** to add your Anthropic API key.

---

## Deploy to GitHub Pages

1. Fork or push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Edit `vite.config.js`: change `base` to match your repo name:
   ```js
   base: '/your-repo-name/',
   ```
4. Push to `main` — GitHub Actions builds and deploys automatically
5. Your app is live at `https://YOUR_USERNAME.github.io/product-command/`

---

## Starting a New CPO Role

This tool is designed to be **plug-and-play** when you join a new organization:

1. **Fork the repo** into your new org's GitHub
2. Go to **Settings** in the app
3. Fill in the org config: company name, product, team size, stack, tools, segments
4. Every prompt automatically inherits this context — no manual editing needed
5. **Customize prompts** in the Prompt Library to match your org's language and standards
6. **Add custom skills** for org-specific workflows (sprint planning format, OKR template, etc.)
7. Share the GitHub Pages URL with your team

---

## The 10 Built-in Skills

| Tag | Skill | Framework | Time Saved |
|-----|-------|-----------|------------|
| `/interviews` | Interview Analyzer | Teresa Torres OST | 3–4 hrs → 15 min |
| `/swot` | SWOT Analysis | Cross-Quadrant Strategy | 2–3 hrs → 10 min |
| `/compete` | Competitive Profiler | Gibson Biddle DHM | 3–4 hrs → 15 min |
| `/positioning` | Positioning Generator | April Dunford | 3 hrs → 10 min |
| `/prd` | PRD Generator | Marty Cagan 4 Risks | 4–6 hrs → 15 min |
| `/roadmap` | Roadmap Builder | Melissa Perri Outcome | 4–6 hrs → 15 min |
| `/simulate` | Stakeholder Simulator | Role-Based Analysis | 2–3 hrs → 10 min |
| `/gtm` | GTM Strategy Builder | Geoffrey Moore | 6–8 hrs → 30 min |
| `/board-deck` | Board Deck Generator | Minto Pyramid SCR | 6–8 hrs → 30 min |
| `/retro` | Sprint Retro Facilitator | Start/Stop/Continue | 1 hr → 10 min |

---

## Features

- **No copy-paste** — fill in the input form, click Run, output streams in real time
- **Prompt Library** — view, edit, and version all prompts; reset to defaults anytime
- **Org context injection** — your company, segments, and tools auto-inject into every prompt
- **File uploads** — attach reference docs (PRDs, interview transcripts, etc.) to any skill run
- **Refine output** — iterate on any output without re-running from scratch
- **Custom skills** — create new skills with your own prompt templates
- **Output history** — all runs saved locally, exportable to `.md`
- **No server** — everything runs in the browser; only call goes to Anthropic's API

---

## Architecture

```
product-command/
├── src/
│   ├── skills/index.js      # All 10 skill definitions (add custom skills here)
│   ├── hooks/useApp.jsx     # Global state (API key, org config, outputs, custom skills)
│   ├── utils/api.js         # Anthropic API call + prompt builder
│   ├── utils/export.js      # Markdown export
│   ├── pages/
│   │   ├── Dashboard.jsx    # Home — skill grid + recent outputs
│   │   ├── RunSkill.jsx     # Skill runner with streaming output + refine
│   │   ├── PromptLibrary.jsx # View/edit all prompts
│   │   ├── History.jsx      # All saved outputs
│   │   ├── OutputView.jsx   # Single output view + export
│   │   ├── NewSkill.jsx     # Create custom skills
│   │   └── SettingsPage.jsx # API key + org config
│   └── App.jsx              # Routing + sidebar
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages auto-deploy
└── vite.config.js           # Set base to match your repo name
```

---

## Roadmap (Future)

- [ ] GitHub-synced prompt library (commit prompt edits back to repo)
- [ ] Notion / Confluence export
- [ ] JIRA ticket creation from PRD outputs
- [ ] Multi-user via GitHub auth
- [ ] Prompt versioning with diff view

---

*Product Command · Built for PMs who ship*
