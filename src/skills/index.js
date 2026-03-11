export const SKILLS = [
  {
    id: 'interviews',
    tag: '/interviews',
    name: 'Interview Analyzer',
    category: 'Discovery',
    framework: 'Teresa Torres · Opportunity Solution Tree',
    timeSaved: '3–4 hrs → 15 min',
    color: '#065A82',
    description: 'Extracts opportunities from user interview notes. Derives segments from the interview data itself.',
    inputLabel: 'Interview Notes or Transcripts',
    inputPlaceholder: 'Paste your raw interview notes, transcripts, or user research here...',
    inputType: 'textarea',
    prompt: `You are an expert product researcher using Teresa Torres' Opportunity Solution Tree methodology.

Analyze the following user interview notes and produce a structured output.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Interview Notes:
{{USER_INPUT}}

Before producing output, scan the interview notes for natural groupings among interviewees — by company type, buying role, use case, competitive context, or lifecycle stage. Name and define 2–4 segments based on what the data actually shows. Do not inherit company-level segments — derive them from this interview set only.

## Segments Identified in This Research
For each segment you identified: name, defining characteristics, number of interviewees.

## Raw Insights
For each key insight:
- Pain point (with direct quote if available)
- Desired outcome
- Current workaround
- Emotional signal (frustrated / neutral / delighted)
- Segment affinity (use segments identified above)

## Opportunity Solution Tree

### Desired Outcome
[The top-level customer outcome]

### Opportunities
For each opportunity:
**[Opportunity Name]**
- Frequency: X/N interviews
- Intensity: 🔴 High / 🟡 Medium / 🟢 Low
- Segments: [from above]
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
    description: 'Evidence-based SWOT with cross-quadrant strategies. Derives segments from the subject being analyzed.',
    inputLabel: 'Product, Company, or Initiative to Analyze',
    inputPlaceholder: 'Describe what you want to SWOT — product, initiative, or strategic decision...',
    inputType: 'textarea',
    prompt: `You are a strategic advisor running an evidence-based SWOT analysis.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Subject of Analysis:
{{USER_INPUT}}

Before producing output, identify the customer segments most relevant to THIS subject — not the company overall. A SWOT of a specific product line should reflect that product's segments. A SWOT of a market entry should reflect that market's segments. Derive 2–4 segments from the subject matter itself.

## Segments Relevant to This Analysis
For each segment: name, why it's relevant to this specific subject.

Produce a rigorous SWOT in markdown. Every point must include specific evidence or data — no vague statements.

## Strengths
Each strength: **Claim** → Evidence → Segments that benefit most

## Weaknesses
Each weakness: **Claim** → Evidence → Segments most exposed

## Opportunities
Each opportunity: **Claim** → Market signal → Segments to target first

## Threats
Each threat: **Claim** → Risk level (🔴/🟡/🟢) → Segments most at risk

## Cross-Quadrant Strategies

### Leverage (Strengths × Opportunities)
### Defend (Strengths × Threats)
### Improve (Weaknesses × Opportunities)
### Avoid (Weaknesses × Threats)

## Priority Actions
| Action | Quadrant | Urgency | Segments Impacted | Owner |
|--------|----------|---------|-------------------|-------|`,
  },
  {
    id: 'compete',
    tag: '/compete',
    name: 'Competitive Profiler',
    category: 'Strategy',
    framework: 'Gibson Biddle · DHM Model',
    timeSaved: '3–4 hrs → 15 min',
    color: '#DC2626',
    description: 'Analyzes competitors using the DHM model. Derives segments from the competitive landscape being analyzed.',
    inputLabel: 'Your Product + Competitors',
    inputPlaceholder: 'We are [describe your product]. Analyze us against: [competitor 1], [competitor 2]...',
    inputType: 'textarea',
    prompt: `You are a competitive intelligence expert using Gibson Biddle's DHM model (Delight, Hard-to-copy, Margin-enhancing).

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input:
{{USER_INPUT}}

Before producing output, identify the customer segments most relevant to this competitive landscape — based on how these specific competitors position, who they target, and where the real competitive battles are being fought. Derive 2–4 segments from the competitive context, not from the company overall.

## Segments in This Competitive Landscape
For each segment: name, which competitors are targeting it most aggressively, and why it matters.

Every claim needs evidence — no opinions without data.

## Per-Competitor Analysis

For each competitor:
### [Competitor Name]
**Delight:** What delights customers and how? 🟢/🟡/🔴
**Hard-to-Copy:** What moats do they have? 🟢/🟡/🔴
**Margin-Enhancing:** What drives their economics? 🟢/🟡/🔴
**Evidence:** [specific data points, reviews, reports]
**Segment Threat:** Which segments above are most at risk from this competitor?

## Competitive Matrix
| Capability | Us | [Comp 1] | [Comp 2] |
|------------|-----|----------|----------|

## Segment Vulnerability Map
| Segment | Greatest Threat | Why | Urgency |
|---------|----------------|-----|---------|

## Where to Compete
Segments where we have a durable advantage.

## Where NOT to Compete
Battles we will lose. Be honest.

## Gaps to Close
| Gap | Priority | Effort | Segments Impacted |
|-----|----------|--------|-------------------|`,
  },
  {
    id: 'positioning',
    tag: '/positioning',
    name: 'Positioning Generator',
    category: 'Strategy',
    framework: 'April Dunford · Obviously Awesome',
    timeSaved: '3 hrs → 10 min',
    color: '#E84C6A',
    description: 'Builds positioning bottom-up from competitive alternatives. Derives target segments from the product and competitive context.',
    inputLabel: 'Product / Feature + Context',
    inputPlaceholder: 'Product/feature: [describe]\nBest-fit customers: [describe]\nThey currently use: [alternatives]',
    inputType: 'textarea',
    prompt: `You are a positioning expert using April Dunford's Obviously Awesome methodology.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input:
{{USER_INPUT}}

Before producing output, identify the target segments for this specific product or feature — based on who would most benefit from its unique attributes and who is currently underserved by the alternatives listed. Derive 2–4 segments from the product and competitive context provided.

## Target Segments for This Product
For each segment: name, why they're the best fit, what alternative they're currently using.

Work bottom-up: start from competitive alternatives, not aspirational vision statements.

## Competitive Alternatives
What each target segment actually uses today.

## Unique Attributes
What this product does that alternatives genuinely don't or can't.

## Value by Segment
What the unique attributes enable for each segment specifically.

## Market Category
Where we compete and why that frame helps us win.

## Positioning by Segment
For each segment: headline message, proof point, why this segment specifically.

## The Canonical Statement
[Product] is the only [category] that [unique attribute] so that [customer] can [outcome].

## Elevator Pitch
30 seconds, plain language, no jargon.

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
    description: 'Creates a structured PRD using Cagan\'s four-risk framing. Derives segments from the specific feature being specified.',
    inputLabel: 'Feature or Product to Specify',
    inputPlaceholder: 'Describe the feature or product you need to PRD. Include any known constraints, context, or customer feedback...',
    inputType: 'textarea',
    prompt: `You are an expert product manager creating a structured PRD using Marty Cagan's four-risk framework and Vision Segments.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Feature/Product Request:
{{USER_INPUT}}

Before producing output, identify the customer segments relevant to THIS specific feature — based on who would use it, who has asked for it, and who benefits most. Do not inherit company-wide segments. A narrow feature may have 1–2 segments. A platform capability may have 4+. Derive only what's justified by the feature itself.

## Segments for This Feature
For each segment: name, why they're relevant to this specific feature, and their current workaround.

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
For each identified segment:
- **Scenario:** specific job-to-be-done for this segment
- **Acceptance criteria:** testable criteria specific to this segment
- **Commitment level:** Committed / Planned / Exploratory

## Segment Estimates
| Segment | T-Shirt Size | Sprint Range | Dependencies |
|---------|-------------|--------------|--------------|

## Release Phasing
**Limited Release:** [which segment first and why]
**MVP:** [scope expansion]
**Full Release:** [all segments]

## Success Metrics
| Metric | Segment | Baseline | Target | Timeframe |
|--------|---------|----------|--------|-----------|

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
    description: 'Creates Now/Next/Later roadmaps. Derives segments from the OKRs and backlog provided.',
    inputLabel: 'OKRs, Backlog, and Context',
    inputPlaceholder: 'List your OKRs, known backlog items, customer context, and any constraints (team size, dates, dependencies)...',
    inputType: 'textarea',
    prompt: `You are an expert product leader building an outcome-driven roadmap using Melissa Perri's methodology.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input — OKRs, backlog, constraints:
{{USER_INPUT}}

Before producing output, identify the customer segments that emerge from the OKRs and backlog items provided. Each roadmap item should serve a specific segment — derive those segments from the work itself, not from a company-wide definition. Different items on the same roadmap may serve different, unrelated segments.

## Segments Driving This Roadmap
For each segment: name, which OKRs or backlog items are primarily driven by this segment.

## Now (Committed)
For each item:
**[Item Name]**
- Segment: [name the specific segment this serves]
- Outcome: [what changes for that segment]
- Acceptance criteria: [testable]
- Confidence: High/Med/Low
- Dependencies: [list]

## Next (Planned, being validated)
Same structure as Now.

## Later (Exploratory, not committed)
Ideas with brief rationale and target segment.

## Segment Coverage
| Segment | Now | Next | Later | Rationale |
|---------|-----|------|-------|-----------|

## What We Are NOT Doing
Explicit exclusions — which segments are not being served and why.

## Assumptions to Validate
What needs to be true for this roadmap to work?

## OKR Mapping
| OKR | Roadmap Items | Segments | Confidence |
|-----|---------------|----------|------------|`,
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

For each stakeholder, go deep — surface the real concerns, not surface-level ones.

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
**What it takes to win them over:**

## VP Sales / Revenue
**First reaction:**
**Real concerns:** [deal impact, competitive positioning, sales complexity]
**Hard questions:**
**What it takes to win them over:**

## CEO / Executive
**First reaction:**
**Real concerns:** [strategic fit, ROI, resource allocation]
**Hard questions:**
**What it takes to win them over:**

## Customer Success
**First reaction:**
**Real concerns:** [support burden, adoption risk, customer readiness]
**Hard questions:**
**What it takes to win them over:**

## Top 3 Objections Across All Stakeholders

## Customer Impact by Segment
Based only on the proposal itself, identify which customer groups are most affected — positively or negatively — and how each stakeholder would frame that impact.

| Customer Group | Impact | Stakeholder Most Concerned | Risk |
|---------------|--------|---------------------------|------|`,
  },
  {
    id: 'gtm',
    tag: '/gtm',
    name: 'GTM Strategy Builder',
    category: 'Launch',
    framework: 'Geoffrey Moore · Crossing the Chasm + Segment Rollout',
    timeSaved: '6–8 hrs → 30 min',
    color: '#F5A623',
    description: 'Creates phased go-to-market plans. Derives launch segments from the product, channels, and market context provided.',
    inputLabel: 'Product, Target, Channels, and Launch Date',
    inputPlaceholder: 'Product/feature: [describe]\nTarget customer: [describe]\nAvailable channels: [list]\nLaunch date: [date]\nAny constraints: [list]',
    inputType: 'textarea',
    prompt: `You are a go-to-market strategist using Geoffrey Moore's Crossing the Chasm methodology combined with segment-based rollout.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Launch input:
{{USER_INPUT}}

Before producing output, identify the customer segments relevant to THIS launch — based on who the product serves, what channels are available, and where the strongest demand signal exists. Derive 2–4 segments from the launch context provided. Sequence them by confidence and strategic fit, not by company size or generic tier.

## Segments for This Launch
For each segment: name, why they're the right beachhead or expansion target, demand signal.

## GTM Motion
PLG / Sales-Led / Community-Led / Partner-Led / Hybrid — and why for this specific product.

## Segment Sequencing Rationale
Which segment launches first and why? What's the strategic logic for the order?

## Phase 1 — [Segment Name] (Limited Release)
**Why this segment first:**
**Named customer types:**
**Channel:**
**Message for this segment:**
**Success criteria before expanding:**
**Owner:**

## Phase 2 — [Segment Name(s)]
Same structure.

## Phase 3 — [Remaining Segments]
Same structure.

## Sales Enablement by Segment
For each segment: collateral, objection handling, competitive talk track.

## Success Metrics by Phase
| Metric | Phase 1 | Phase 2 | Phase 3 |
|--------|---------|---------|---------|

## Risks & Mitigations
| Risk | Segment Affected | Likelihood | Impact | Mitigation |
|------|-----------------|------------|--------|------------|`,
  },
  {
    id: 'board-deck',
    tag: '/board-deck',
    name: 'Board Deck Generator',
    category: 'Communication',
    framework: 'SCR Narrative · Minto Pyramid',
    timeSaved: '6–8 hrs → 30 min',
    color: '#0891B2',
    description: 'Creates board presentations using SCR narrative. No segmentation — board reporting focuses on metrics, decisions, and strategic narrative.',
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
**Resolution:** [what we're doing about it]

## Key Metrics Dashboard
For each metric:
**[Metric Name]**
- Status: 🟢 On track / 🟡 At risk / 🔴 Off track
- Actual vs Target:
- Trend:
- Narrative: [why it moved, what it means]

## Product Update
**Shipped this quarter:**
**Coming next quarter:**

## Strategic Decisions Needed
For each decision: options, recommendation, specific ask from the board.

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
    description: 'Runs structured retrospectives with root causes and specific action items with owners. No segmentation — retros are team-internal.',
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
| Action | Owner | Due Date | Priority |
|--------|-------|----------|----------|

Actions must be specific. Not "improve the deploy process" — "Jane to document deploy steps and add to runbook by [date]."

## Team Health Dashboard
| Dimension | Rating | Trend | Notes |
|-----------|--------|-------|-------|
| Velocity | 🟢/🟡/🔴 | ↑↓→ | |
| Morale | 🟢/🟡/🔴 | ↑↓→ | |
| Quality | 🟢/🟡/🔴 | ↑↓→ | |
| Collaboration | 🟢/🟡/🔴 | ↑↓→ | |

## Kudos
Specific recognition — what they did, why it mattered.

## Carry Forward
Items from previous retros still open.`,
  },
  {
    id: 'strategy-deck',
    tag: '/strategy-deck',
    name: 'Strategy Deck Builder',
    category: 'Strategy',
    framework: 'Minto Pyramid · SCR · Declarative Narrative',
    timeSaved: '2–3 days → 1 hr',
    color: '#0F4C75',
    description: 'Builds a full product strategy deck with declarative slide titles, honest tension, named competitors, and a vision crescendo. Works at early stage — designed to be specific without guessing.',
    inputLabel: 'Company, Product, Strategic Challenge',
    inputPlaceholder: `Company/product: [describe what it is and what it does today]
Current customers: [who uses it now, rough scale]
The opportunity: [what market or segment you want to capture]
The challenge: [what's standing in the way — be honest]
Key competitors: [named, specific]
Strategic options you're considering: [list them, even rough]
What you DON'T know yet: [TAM, pricing, build cost — list gaps explicitly]
Any data points you have: [even rough numbers, named customers, deals, signals]`,
    inputType: 'textarea',
    prompt: `You are a product strategist building a board-quality strategy presentation. Your primary references are the narrative structure and slide-title style of the best product strategy decks — where every title is a declarative argument, not a topic label.

{{ORG_CONTEXT}}

{{DOCUMENT_CONTEXT}}

Input:
{{USER_INPUT}}

## CRITICAL STYLE RULES — READ BEFORE PRODUCING ANY OUTPUT

**Slide titles must be declarative statements, not topic labels.**

Bad: "Market Opportunity"
Good: "There is an untapped mid-market opportunity concentrated in 200,000 hotels not yet on the platform"

Bad: "Competitive Landscape"
Good: "Cloud PMS vendors are commoditizing the integration layer — and that changes the strategic equation"

Bad: "Strategic Options"
Good: "To combat these threats and win in mid-market, it requires a multi-pronged strategy"

Bad: "Vision"
Good: "The data moat is already built. The question is whether we claim the intelligence opportunity before someone else does."

**Tension must be explicit in titles.** Use "but," "however," "yet," "while," and "to combat" to show the logical hinge between sections.

**Specificity beats completeness.** Named companies, actual numbers (even rough), and real examples are more persuasive than comprehensive vagueness. If you don't know a number, say so honestly and note what would need to be true.

**Be honest about headwinds.** The deck must include a slide that names the real barriers to the opportunity — not softened, not buried. Credibility comes from acknowledging what's hard.

**The story arc must build to a crescendo.** The final vision slide should feel earned — not announced at the start.

---

## PRODUCE THE FOLLOWING OUTPUT

### PART 1: STORY SPINE
Before any slides, write a 5–7 sentence narrative arc for the deck. This is the logic thread every slide must serve. Format:

**Situation:** [what is undeniably true today]
**Complication:** [what's changed or what's at risk]
**Question:** [the strategic question this deck answers]
**Answer:** [the thesis, stated plainly]
**Implication:** [what must be true / built / decided]

---

### PART 2: SLIDE-BY-SLIDE OUTLINE

For each slide produce:
- **SLIDE [N]: [DECLARATIVE TITLE IN FULL]**
- *Narrative purpose:* [one sentence — what job this slide does in the story arc]
- *Content:* [the actual content — tables, lists, specific language, named examples, frameworks]
- *Data needed:* [flag explicitly if a number or claim needs validation — never invent, never omit gaps]

Produce slides in this sequence. Adapt headings to fit the specific context — don't use generic labels:

**ACT 1 — CURRENT STATE & CREDIBILITY**
- Slide 1: Cover. Company name, strategic subtitle, author, date. Subtitle should be a declarative strategic statement, not a description.
- Slide 2: Context caveat. Be honest about what this analysis is based on and what it is not. This builds credibility by naming its own limits.
- Slide 3: What the company is today. Use the "What [Company] Does / What [Company] Does Not Do (Yet)" structure. Include key scale metrics even if rough.

**ACT 2 — THE OPPORTUNITY & THE TENSION**
- Slide 4: The untapped opportunity. Name it precisely — specific segment, scale estimate if available. State what's currently missing.
- Slide 5: The headwinds. Name the real barriers honestly. This is the "but" slide. Do not soften.
- Slide 6: The competitive threat. Name specific competitors. State what they're doing and what it means. Include: where [company] still wins.

**ACT 3 — THE STRATEGIC RESPONSE**
- Slide 7: The multi-pronged strategy. Numbered pillars (01–06). Each pillar = 2-line description. Title should be "To [do X], it requires a multi-pronged strategy."
- Slides 8–12 (or fewer): One slide per strategic pillar. Each includes: the insight that makes it work, the value propositions (specific, outcome-framed, not feature-framed), what it requires.

**ACT 4 — WHO WE SERVE**
- Segment slide: Use this exact table structure for each segment:
  | Field | Content |
  |-------|---------|
  | WHO | Named company types or specific examples |
  | NEED | The specific pain — not generic |
  | VALUE | What changes for them — outcome, not feature |
  | SCALE | Rough deal/revenue/property count — even estimated |

**ACT 5 — THE GAP / THE INTELLIGENCE OPPORTUNITY**
- Gap analysis slide: For each segment, show WHAT WE DELIVER TODAY vs. WHAT'S MISSING. Title should name the gap type ("The gaps are not X gaps, they are Y gaps").
- Platform/vision concept slide: Name 2–4 distinct capability platforms. Each gets: what it activates, KPIs it moves, who it serves.

**ACT 6 — BUILD & GO-TO-MARKET**
- Feasibility/readiness slide: What's ready now vs. what requires investment. Use Tier 1 / Tier 2 / Tier 3 or equivalent framework.
- Roadmap: Near-term / Medium-term / Long-term. Each item tagged to strategic pillar.
- GTM & monetization: Table with PRODUCT TIER / TARGET BUYER / PRICING MODEL / ENTRY PRICE / STRATEGIC VALUE.

**ACT 7 — THE VISION CRESCENDO**
- Final slide: This is not a summary. It's a statement of what becomes possible. End with a single crisp question or imperative that creates urgency. The moat, the window, the decision.

---

### PART 3: DATA GAPS REGISTER

Produce a table of everything that would strengthen the deck but is currently estimated or unknown:

| Claim | Current Status | What's Needed | Where to Get It |
|-------|---------------|---------------|-----------------|
| TAM estimate | Not available | Total addressable hotels × ARPU | Industry reports, comparable SaaS multiples |
| ... | ... | ... | ... |

Note: Missing data does not weaken the deck if the gaps are named honestly. A gap register is a sign of rigor, not incompleteness.

---

### PART 4: FIVE TITLE REWRITES

Take any 5 of the slide titles you produced and show the weak version vs. the strong version to illustrate the declarative principle:

| Weak (topic label) | Strong (declarative argument) |
|--------------------|-------------------------------|
| ... | ... |`,
  },
]

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