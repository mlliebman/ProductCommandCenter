export const SKILLS = [
  {
    id: 'interviews',
    tag: '/interviews',
    name: 'Interview Analyzer',
    category: 'Discovery',
    framework: 'Teresa Torres · Opportunity Solution Tree',
    timeSaved: '3–4 hrs → 15 min',
    color: '#065A82',
    description: 'Extracts opportunities from user interview notes. Tags insights by customer segment so they map directly to PRDs and roadmaps.',
    inputLabel: 'Interview Notes or Transcripts',
    inputPlaceholder: 'Paste your raw interview notes, transcripts, or user research here...',
    inputType: 'textarea',
    prompt: `You are an expert product researcher using Teresa Torres' Opportunity Solution Tree methodology.

Analyze the following user interview notes and produce a structured output.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Interview Notes:
{{USER_INPUT}}

Produce the following sections in markdown:

## Raw Insights
For each key insight, include:
- Pain point (with direct quote if available)
- Desired outcome
- Current workaround
- Emotional signal (frustrated / neutral / delighted)
- Customer segment affinity (A/B/C/D)

## Opportunity Solution Tree

### Desired Outcome
[The top-level customer outcome]

### Opportunities
For each opportunity:
**[Opportunity Name]**
- Frequency: X/N interviews
- Intensity: 🔴 High / 🟡 Medium / 🟢 Low
- Segments: [A/B/C/D]
- Evidence: [quote or paraphrase]

### Solutions
Map each solution to: Effort (S/M/L/XL) | Impact | Segment

## Research Gaps
What you still need to learn before committing to a direction.

## Segment Summary Table
| Segment | Key Opportunities | Priority |
|---------|-------------------|----------|`,
  },
  {
    id: 'swot',
    tag: '/swot',
    name: 'SWOT Analysis',
    category: 'Strategy',
    framework: 'Classic SWOT + Cross-Quadrant Strategy',
    timeSaved: '2–3 hrs → 10 min',
    color: '#9333EA',
    description: 'Evidence-based SWOT with cross-quadrant strategies. Every claim must be backed by data, not opinions.',
    inputLabel: 'Product, Company, or Initiative to Analyze',
    inputPlaceholder: 'Describe what you want to SWOT — product, initiative, or strategic decision...',
    inputType: 'textarea',
    prompt: `You are a strategic advisor running an evidence-based SWOT analysis.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Subject of Analysis:
{{USER_INPUT}}

Produce a rigorous SWOT in markdown. Every point must include specific evidence or data — no vague statements like "good team" or "strong brand."

## Strengths
Each strength: **Claim** → Evidence → Strategic Implication

## Weaknesses
Each weakness: **Claim** → Evidence → Strategic Implication

## Opportunities
Each opportunity: **Claim** → Market signal or data → How to capitalize

## Threats
Each threat: **Claim** → Evidence → Risk level (🔴/🟡/🟢)

## Cross-Quadrant Strategies

### Leverage (Strengths × Opportunities)
How to use strengths to capture opportunities

### Defend (Strengths × Threats)
How to use strengths to counter threats

### Improve (Weaknesses × Opportunities)
How to fix weaknesses to capture opportunities

### Avoid (Weaknesses × Threats)
Danger zones where weakness + threat = maximum risk

## Priority Actions
| Action | Quadrant | Urgency | Owner | Due |
|--------|----------|---------|-------|-----|`,
  },
  {
    id: 'compete',
    tag: '/compete',
    name: 'Competitive Profiler',
    category: 'Strategy',
    framework: 'Gibson Biddle · DHM Model',
    timeSaved: '3–4 hrs → 15 min',
    color: '#DC2626',
    description: 'Analyzes competitors using the DHM model (Delight, Hard-to-copy, Margin-enhancing). Maps threats to customer segments with evidence.',
    inputLabel: 'Your Product + Competitors',
    inputPlaceholder: 'We are [describe your product]. Analyze us against: [competitor 1], [competitor 2]...',
    inputType: 'textarea',
    prompt: `You are a competitive intelligence expert using Gibson Biddle's DHM model (Delight, Hard-to-copy, Margin-enhancing).

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input:
{{USER_INPUT}}

Produce a competitive analysis in markdown. Every claim needs evidence — no opinions without data.

## Per-Competitor Analysis

For each competitor:
### [Competitor Name]
**Delight:** What delights customers and how? 🟢/🟡/🔴
**Hard-to-Copy:** What moats do they have? 🟢/🟡/🔴
**Margin-Enhancing:** What drives their economics? 🟢/🟡/🔴
**Evidence:** [specific data points, reviews, reports]
**Segment Threat:** Which of our A/B/C/D segments are most at risk?

## Competitive Matrix
| Capability | Us | [Comp 1] | [Comp 2] |
|------------|-----|----------|----------|

## Where to Compete
Segments and use cases where we have a durable advantage.

## Where NOT to Compete
Battles we will lose. Be honest.

## Gaps to Close
| Gap | Priority | Effort | Impact on Segments |
|-----|----------|--------|--------------------|`,
  },
  {
    id: 'positioning',
    tag: '/positioning',
    name: 'Positioning Generator',
    category: 'Strategy',
    framework: 'April Dunford · Obviously Awesome',
    timeSaved: '3 hrs → 10 min',
    color: '#E84C6A',
    description: 'Builds positioning bottom-up from competitive alternatives to market category. Creates segment-specific messaging.',
    inputLabel: 'Product / Feature + Context',
    inputPlaceholder: 'Product/feature: [describe]\nBest-fit customers: [describe]\nThey currently use: [alternatives]',
    inputType: 'textarea',
    prompt: `You are a positioning expert using April Dunford's Obviously Awesome methodology.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input:
{{USER_INPUT}}

Work bottom-up: start from competitive alternatives, not aspirational vision statements.

## Competitive Alternatives
What customers actually use today when they don't use us.

## Unique Attributes
What we do that alternatives genuinely don't or can't.

## Value
What those unique attributes enable for customers (outcomes, not features).

## Best-Fit Customers
By segment (A/B/C/D) with specificity. "For everyone" is not an answer.

## Market Category
Where we compete and why that frame helps us win.

## Positioning by Segment
For each segment: headline message, proof point, why this segment specifically.

## The Canonical Statement
[Product] is the only [category] that [unique attribute] so that [customer] can [outcome].

## Elevator Pitch
30 seconds, plain language, no jargon.

## Messaging Hierarchy
**Headline:**
**Subhead:**
**Proof Point 1:**
**Proof Point 2:**
**Proof Point 3:**

## Stress Test
- [ ] Does it differentiate from each named alternative?
- [ ] Is it specific enough that a competitor couldn't claim it?
- [ ] Does it resonate with each target segment?
- [ ] Can sales actually say this?`,
  },
  {
    id: 'prd',
    tag: '/prd',
    name: 'PRD Generator',
    category: 'Planning',
    framework: 'Marty Cagan · Four Risks + Vision Segments',
    timeSaved: '4–6 hrs → 15 min',
    color: '#065A82',
    description: 'Creates a structured PRD using Cagan\'s four-risk framing with Vision Segments A/B/C/D. Outputs acceptance criteria and release phasing.',
    inputLabel: 'Feature or Product to Specify',
    inputPlaceholder: 'Describe the feature or product you need to PRD. Include any known constraints, context, or customer feedback...',
    inputType: 'textarea',
    prompt: `You are an expert product manager creating a structured PRD using Marty Cagan's four-risk framework and Vision Segments.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Feature/Product Request:
{{USER_INPUT}}

## Business Context
Market research summary, business drivers, strategic fit.

## Opportunities & Challenges
| Focus Area | Opportunity | Blocker |
|------------|-------------|---------|

## Risk Assessment (Cagan's Four Risks)
| Risk | Rating | Evidence | Mitigation |
|------|--------|----------|------------|
| Value Risk (do customers want it?) | 🟢/🟡/🔴 | | |
| Usability Risk (can they figure it out?) | 🟢/🟡/🔴 | | |
| Feasibility Risk (can we build it?) | 🟢/🟡/🔴 | | |
| Viability Risk (should we build it?) | 🟢/🟡/🔴 | | |

## Vision Segments

### Segment A — Core (Committed)
**Named customer archetype:** [specific, named persona]
**User scenario:** [specific job-to-be-done]
**Acceptance criteria:**
- [ ] [specific, testable criterion]

### Segment B — Adjacent (Planned)
### Segment C — Adjacent (Planned)
### Segment D — Exploratory

## Segment Estimates
| Segment | T-Shirt Size | Sprint Range | Dependencies |
|---------|-------------|--------------|--------------|

## Release Phasing
**Limited Release:** [who, what, why]
**MVP:** [scope]
**Phase 1:** [full scope]

## Success Metrics
| Metric | Baseline | Target | Timeframe | How Measured |
|--------|----------|--------|-----------|--------------|

## Open Questions
Things that need to be resolved before or during development.`,
  },
  {
    id: 'roadmap',
    tag: '/roadmap',
    name: 'Roadmap Builder',
    category: 'Planning',
    framework: 'Melissa Perri · Outcome-Driven + Segment Phasing',
    timeSaved: '4–6 hrs → 15 min',
    color: '#059669',
    description: 'Creates Now/Next/Later roadmaps mapped to Vision Segments. Outcome-driven, not feature-driven.',
    inputLabel: 'OKRs, Backlog, and Context',
    inputPlaceholder: 'List your OKRs, known backlog items, customer segments, and any constraints (team size, dates, dependencies)...',
    inputType: 'textarea',
    prompt: `You are an expert product leader building an outcome-driven roadmap using Melissa Perri's methodology.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input — OKRs, backlog, constraints:
{{USER_INPUT}}

## Now — Segment A (Committed)
For each item:
**[Item Name]**
- Outcome: [what changes for the customer]
- Named customer: [specific archetype]
- Acceptance criteria: [testable]
- Confidence: High/Med/Low
- Dependencies: [list]

## Next — Segments B + C (Planned, being validated)
Same structure as Now.

## Later — Segment D (Exploratory, not committed)
Ideas with brief rationale. No acceptance criteria yet.

## Segment Estimates
| Item | Segment | Size | Timeline | Dependencies |
|------|---------|------|----------|--------------|

## What We Are NOT Doing
Explicit exclusions with rationale. This section is as important as what's in.

## Assumptions to Validate
What needs to be true for this roadmap to work? How will we validate each?

## OKR Mapping
| OKR | Roadmap Items | Confidence |
|-----|---------------|------------|`,
  },
  {
    id: 'simulate',
    tag: '/simulate',
    name: 'Stakeholder Simulator',
    category: 'Planning',
    framework: 'Role-Based Perspective Analysis',
    timeSaved: '2–3 hrs → 10 min',
    color: '#7B61FF',
    description: 'Simulates CTO, Design, Sales, CEO, and CS reactions to your proposal. Surfaces hard questions before the meeting.',
    inputLabel: 'Proposal, PRD, or Feature to Pressure Test',
    inputPlaceholder: 'Paste your proposal, PRD, or feature description here...',
    inputType: 'textarea',
    prompt: `You are a seasoned product advisor who deeply understands how different executive stakeholders think. Simulate how each role would react to this proposal.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Proposal to pressure test:
{{USER_INPUT}}

For each stakeholder, go deep — surface the real concerns, not surface-level ones. Include hard questions they would actually ask.

## CTO / Engineering Lead
**First reaction:** [honest, in-character]
**Real concerns:** [feasibility, tech debt, dependencies, timeline]
**Hard questions they'll ask:**
1.
2.
3.
**What it takes to win them over:**

## Head of Design / UX
**First reaction:**
**Real concerns:** [UX debt, research gaps, usability risk]
**Hard questions:**
1.
2.
3.
**What it takes to win them over:**

## VP Sales / Revenue
**First reaction:**
**Real concerns:** [deal impact, competitive positioning, sales complexity]
**Hard questions:**
**What it takes to win them over:**

## CEO / Executive
**First reaction:**
**Real concerns:** [strategic fit, ROI, resource allocation, board narrative]
**Hard questions:**
**What it takes to win them over:**

## Customer Success
**First reaction:**
**Real concerns:** [support burden, adoption risk, customer readiness]
**Hard questions:**
**What it takes to win them over:**

## Top 3 Objections Across All Stakeholders
Synthesized — the three things most likely to kill this proposal.

## Segment Readiness
| Segment | Readiness | Primary Risk | Mitigation |
|---------|-----------|--------------|------------|`,
  },
  {
    id: 'gtm',
    tag: '/gtm',
    name: 'GTM Strategy Builder',
    category: 'Launch',
    framework: 'Geoffrey Moore · Crossing the Chasm + Segment Rollout',
    timeSaved: '6–8 hrs → 30 min',
    color: '#F5A623',
    description: 'Creates phased go-to-market plans sequenced by segment. Limited Release → MVP → Full Release.',
    inputLabel: 'Product, Target, Channels, and Launch Date',
    inputPlaceholder: 'Product/feature: [describe]\nTarget customer: [describe]\nAvailable channels: [list]\nLaunch date: [date]\nAny constraints: [list]',
    inputType: 'textarea',
    prompt: `You are a go-to-market strategist using Geoffrey Moore's Crossing the Chasm methodology combined with segment-based rollout.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Launch input:
{{USER_INPUT}}

## GTM Motion
PLG / Sales-Led / Community-Led / Partner-Led / Hybrid — and why.

## Limited Release — Segment A
**Named customers:** [specific types, not "enterprise"]
**Channel:** [direct, specific]
**Success criteria:** [before expanding to next phase]
**Owner:**

## MVP — Segments B + C
**Broader customer types:**
**Channels:**
**Success criteria:**

## Full Release — Segment D
**New markets:**
**Scaled channels:**
**Success criteria:**

## Launch Sequence
| Action | Owner | Date | Phase |
|--------|-------|------|-------|

## Sales Enablement
For each segment: collateral needed, training required, objection handling.

## Success Metrics by Phase
| Metric | Limited Release | MVP | Full Release |
|--------|-----------------|-----|--------------|

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|`,
  },
  {
    id: 'board-deck',
    tag: '/board-deck',
    name: 'Board Deck Generator',
    category: 'Communication',
    framework: 'SCR Narrative · Minto Pyramid',
    timeSaved: '6–8 hrs → 30 min',
    color: '#0891B2',
    description: 'Creates board presentations using SCR (Situation-Complication-Resolution) narrative. Leads with the answer.',
    inputLabel: 'Quarter, Metrics, Wins, Challenges',
    inputPlaceholder: 'Quarter: [Q]\nKey metrics: [list with actuals vs targets]\nBiggest win: [describe]\nBiggest challenge: [describe]\nDecisions needed from board: [list]',
    inputType: 'textarea',
    prompt: `You are a CPO preparing a board presentation using Minto Pyramid (lead with the answer) and SCR narrative (Situation-Complication-Resolution).

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Board update input:
{{USER_INPUT}}

Lead with the point. Boards don't want to discover the answer on slide 47.

## Executive Summary
**Situation:** [what's true today — factual]
**Complication:** [what's changed or at risk]
**Resolution:** [what we're doing about it — your recommendation]

## Key Metrics Dashboard
For each metric:
**[Metric Name]**
- Status: 🟢 On track / 🟡 At risk / 🔴 Off track
- Actual vs Target:
- Trend:
- Narrative: [why it moved, what it means]

## Segment Progress
| Segment | Status | Milestone | Impact | Risk |
|---------|--------|-----------|--------|------|

## Product Update
**Shipped this quarter:**
**Coming next quarter:**

## Strategic Decisions Needed
For each decision:
**[Decision]**
- Option A: [pros/cons]
- Option B: [pros/cons]
- Recommendation: [yours]
- Ask: [specific ask from the board]

## Appendix
Supporting detail for questions that may arise.`,
  },
  {
    id: 'retro',
    tag: '/retro',
    name: 'Sprint Retro Facilitator',
    category: 'Operations',
    framework: 'Start/Stop/Continue + 4Ls',
    timeSaved: '1 hr → 10 min',
    color: '#6366F1',
    description: 'Runs structured retrospectives. Synthesizes themes with root causes and generates action items with owners.',
    inputLabel: 'Sprint Number + What Happened',
    inputPlaceholder: 'Sprint [N]. Describe what went well, what didn\'t, any specific incidents, team mood, and what you want to improve...',
    inputType: 'textarea',
    prompt: `You are a skilled engineering and product retrospective facilitator.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Sprint input:
{{USER_INPUT}}

"Improve communication" is not an action item. Force specificity: who does what by when.

## Themes
For each theme:
**[Theme Name]**
- Root cause: [the actual cause, not the symptom]
- Evidence: [quotes or specific examples]
- Frequency: how often this came up

## Action Items
For each action:
| Action | Owner | Due Date | Priority |
|--------|-------|----------|----------|
[P0 = blocking, P1 = important, P2 = nice-to-have]

Actions must be specific. Not "improve the deploy process" — "Jane to document deploy steps and add to runbook by [date]."

## Team Health Dashboard
| Dimension | Rating | Trend | Notes |
|-----------|--------|-------|-------|
| Velocity | 🟢/🟡/🔴 | ↑↓→ | |
| Morale | 🟢/🟡/🔴 | ↑↓→ | |
| Quality | 🟢/🟡/🔴 | ↑↓→ | |
| Collaboration | 🟢/🟡/🔴 | ↑↓→ | |

## Kudos
Specific recognition for team members — what they did, why it mattered.

## Carry Forward
Items from previous retros that are still open.`,
  },
];

export const CATEGORIES = ['Discovery', 'Strategy', 'Planning', 'Launch', 'Communication', 'Operations'];

export const getCategoryColor = (category) => {
  const map = {
    Discovery: '#065A82',
    Strategy: '#7B61FF',
    Planning: '#059669',
    Launch: '#F5A623',
    Communication: '#0891B2',
    Operations: '#6366F1',
  };
  return map[category] || '#637085';
};
