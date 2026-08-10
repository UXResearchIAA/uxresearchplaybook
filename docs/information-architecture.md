# Information Architecture & Content Model

**UX Research Methods Playbook**  
Version 0.1 · August 2026 · Pre-build proposal

---

## Contents

1. [Product Concept](#01-product-concept)
2. [Target Users & Jobs-to-be-Done](#02-target-users--jobs-to-be-done)
3. [Information Architecture](#03-information-architecture)
4. [Navigation Model](#04-navigation-model)
5. [Method Content Model](#05-method-content-model)
6. [SOP Content Model](#06-sop-content-model)
7. [Method-Selection Model (Finder)](#07-method-selection-model-finder)
8. [Taxonomy](#08-taxonomy)
9. [Governance Model](#09-governance-model)
10. [Technical & Content Architecture](#10-technical--content-architecture)
11. [Key UX Risks](#11-key-ux-risks)
12. [Recommended MVP](#12-recommended-mvp)
13. [What Not to Build in MVP](#13-what-not-to-build-in-mvp)
14. [Open Questions & Assumptions](#14-open-questions--assumptions)
15. [Sources](#15-sources)

---

## 01 Product Concept

The UX Research Methods Playbook is an **internal decision-support and operational tool** for a team that already knows what UX research is. Its primary job is to help experienced practitioners make faster, better-reasoned decisions — about which method fits a specific question, how to run a study without reinventing preparation from scratch, and where to find the exact template or consent form they need right now.

This is not a learning management system. Not a beginner's primer. Not a wiki. Those products optimize for completeness and coverage. This product optimizes for **speed of access at decision points**.

### Three modes of use

| Mode | Trigger | What they need | Success condition |
|------|---------|----------------|-------------------|
| **Decide** | "What method should I use for this project?" | A structured reasoning path from question to method recommendation | Leaves with 1–3 methods and can articulate why to a stakeholder |
| **Operate** | "I'm running [method] next week. What do I need?" | A complete SOP, preparation checklist, and material list | Can begin preparation immediately without searching elsewhere |
| **Retrieve** | "I need a consent form / screener / script right now" | Direct access to verified templates, organized by method | Template in hand in under two minutes |

### Governing principle

> The product must teach and reinforce: **"What do I need to learn?"** not **"What method do I want to use?"** Every method-selection surface must embody this principle. The method is never the starting point; the research question is.

This principle is drawn directly from the NNGroup framework for method selection, which argues that practitioners who anchor on a method first tend to produce research that answers the wrong question with technical confidence.

### What this product is not

- A research repository (it stores guidance, not study outputs or participant data)
- A UX encyclopedia (coverage is not the goal; usability is)
- A beginner's introduction (assumes familiarity with research vocabulary)
- An authoritative source (it synthesizes external sources and team practice — provenance matters)
- A governance system for the team's research program (out of scope)

---

## 02 Target Users & Jobs-to-be-Done

### Primary users

**Experienced UX researchers and designers** who conduct research as part of their work. Roughly 3–8 years of experience. Comfortable with core vocabulary (qual/quant, moderated/unmoderated, attitudinal/behavioral). Their challenge is not understanding what methods exist; it is choosing between them under real constraints, and running them well without rebuilding preparation from scratch each time.

### Secondary users

**Design leads and product managers** who need to understand research outputs, scope research activities, or advocate for the right method with stakeholders. They consume high-level guidance (At a Glance, Is This Right, Strengths/Limitations) but not the step-by-step SOPs.

> **Design implication:** The primary and secondary audiences have different depth needs. The method page architecture must support progressive depth — a PM can get what they need from the first two sections without reading the full SOP. The full SOP must be present for the primary user without being the first thing a secondary user hits.

### Jobs-to-be-done

| Trigger situation | Goal | Success looks like |
|-------------------|------|--------------------|
| "We have a research question but haven't decided how to study it yet" | Choose the right method(s) for the specific question and constraints | Confident method selection with documented rationale, not a gut call |
| "I'm facilitating [method] in two weeks and haven't run one in a while" | Prepare completely without missing anything critical | Complete checklist, script, materials ready — no pre-study scramble |
| "A stakeholder is pushing for surveys but I think we need interviews" | Articulate the tradeoffs and make a defensible case | Clear comparison of what each method can and cannot tell us |
| "I need to onboard someone to how we run research" | Share team-aligned process and standards quickly | New team member can run a study independently within their first project |
| "My analysis is done. How should I structure the shareout?" | Choose an appropriate output format for this type of research | Shareout format matches what stakeholders actually need from this evidence type |
| "I need a participant consent form for a remote study — right now" | Find and download the correct template immediately | Correct, ready-to-use template in hand in under two minutes |
| "I want to know if there's a better method for my situation" | Evaluate alternatives fairly before committing | Understands the tradeoffs and can make an informed decision either way |

---

## 03 Information Architecture

### Site structure

```
Home  /
├── Find a Method  /find
├── Method Library  /methods
│   └── Method Detail  /methods/[slug]   × n
├── Resources  /resources
│   ├── Templates  /resources/templates
│   ├── Consent & Ethics  /resources/consent
│   └── Analysis Tools  /resources/analysis
└── Learning Paths  /paths
    ├── Choosing a Method  /paths/choosing-a-method
    └── Conducting Research  /paths/conducting-research
```

The Method Library is the center of gravity. Everything else either leads to it (the Finder) or extends it (Resources, Learning Paths).

### Page inventory

| Page | Path | Primary purpose | Primary action |
|------|------|-----------------|----------------|
| **Home** | `/` | Task-entry hub — routes users to the right mode immediately | Choose a mode: Decide / Operate / Retrieve |
| **Find a Method** | `/find` | Guided method selection from research question to recommendations | Answer questions → receive method recommendations with rationale |
| **Method Library** | `/methods` | Browsable, filterable library of all documented methods | Browse or filter methods → navigate to method detail page |
| **Method Detail** | `/methods/[slug]` | Complete reference for a single method | Read SOP / download templates / navigate to related methods |
| **Resources: Templates** | `/resources/templates` | All templates organized by method type | Find and open/download a specific template |
| **Resources: Consent & Ethics** | `/resources/consent` | Consent forms, ethics guidance, privacy considerations | Find and use the correct consent document |
| **Resources: Analysis Tools** | `/resources/analysis` | Analysis frameworks, synthesis tools | Choose and open a tool for post-research analysis |
| **Learning Path** | `/paths/[slug]` | Curated sequence for a specific learning goal | Follow a structured sequence through related content |

### Homepage entry points — evaluated

The brief proposes five potential entry points. Evaluation:

| Entry point | Include? | Rationale |
|-------------|----------|-----------|
| "I need to choose a research method" | **Yes — primary** | The core value proposition. Routes to the Finder. |
| "I want to learn a method" | **Yes — fold into library** | Routes to Method Library. "Learn" and "browse" are the same action; don't create a separate entry point. |
| "I need to run a research study" | **Yes — primary** | Routes to Method Library with an SOP-first prompt. This is the "Operate" mode. |
| "I need a template" | **Yes — primary** | Highest-urgency use case. Must be first-class. Routes to Resources. |
| "I need help analyzing research" | **Phase 2 only** | Implies dedicated analysis content that doesn't exist yet. Include when analysis guides are built. |

**Recommendation:** Three primary entry points on the homepage — Choose a Method, Run a Study, Find a Template — plus a secondary link to the Method Library for browsing.

### Primary user flows

**Flow 1 — Method selection:** Home → "Choose a Method" → Finder (questions 1–6) → Results page (2–4 recommended methods with rationale) → Method Detail page → Before You Start / SOP

**Flow 2 — Operational preparation:** Home → "Run a Study" → Method Library → Method Detail page → Before You Start → SOP steps → Templates section → download template

**Flow 3 — Template retrieval:** Home → "Find a Template" → Resources: Templates (filtered by method) → template in hand in under 2 minutes

---

## 04 Navigation Model

### Primary navigation (persistent, flat — no dropdowns)

`Home` · `Find a Method` · `Methods` · `Resources`

Learning Paths is a secondary navigation item — linked from the homepage and from relevant method pages, but not in the primary nav. The primary nav reflects the three modes of use.

### In-page navigation

**Method Detail pages** use a persistent in-page TOC — a sticky left rail (desktop) or anchored section menu (mobile) that tracks scroll position. This prevents the page from feeling like a wall of text and lets practitioners jump directly to the section they need.

**The Method Finder** uses a step-by-step UI — one question at a time. A progress indicator shows how many steps remain. Users can go back without losing answers.

### Breadcrumbs

All sub-pages carry breadcrumbs. Format: `Home › Methods › User Interviews`. Orient the user and provide a fast way back without using the browser back button.

### Cross-links

Each Method Detail page links to:
- **Related methods** (use before / use after / use instead — with one-line rationale)
- **Templates for this method** (direct links into Resources)
- **Method Finder** — the Finder result links to the method; the method links back to the Finder for similar situations

### Navigation rules

1. Maximum 3 clicks from the homepage to any piece of content
2. Method Detail pages are the primary objects — everything navigates to them
3. No orphan pages — every page is reachable from at least two paths (primary nav + cross-link)
4. External links (Figma, Miro, Google Docs) open in a new tab and are visually distinguished

---

## 05 Method Content Model

Each method is a structured content object with two layers: **metadata** (machine-readable, for filtering and the Finder) and **page content** (human-readable, progressive structure).

### Metadata schema (YAML frontmatter)

```yaml
# ── Identity ──────────────────────────────────────────────────
name:            "User Interviews"
slug:            "user-interviews"
short_desc:      "One-on-one conversations to understand how people
                  think, feel, and behave around a topic or product."
also_known_as:   ["in-depth interviews", "IDIs", "stakeholder interviews"]

# ── Evidence classification (NNGroup framework) ───────────────
evidence_type:   "attitudinal"     # attitudinal | behavioral | mixed
data_type:       "qualitative"     # qualitative | quantitative | mixed
context_of_use:  "not_using_product"
                 # natural_use | scripted | not_using_product | hybrid

# ── Research purpose ──────────────────────────────────────────
product_stage:
  - "discovery"
  - "concept"
  - "prototype"
research_goal:
  - "exploratory"
  - "generative"
  # exploratory | generative | evaluative | descriptive | causal

# ── Logistics ─────────────────────────────────────────────────
typical_n:        "5–8 per distinct user segment"  # [team review]
effort_level:     "medium"   # low | medium | high (relative)
time_to_insight:  "2–4 weeks from kick-off to shareout"  # [team review]
required_expertise: "practitioner"  # novice | practitioner | specialist

# ── Prerequisites and outputs ─────────────────────────────────
prerequisites:
  - "Defined research objectives"
  - "Screened participant pool"
  - "Discussion guide"
  - "Consent and recording setup"
outputs:
  - "Interview recordings or transcripts"
  - "Tagged observation notes"
  - "Themes and insights report"
  - "Opportunity areas or implications"

# ── Strengths and limitations ─────────────────────────────────
strengths:
  - "Rich, contextual understanding of motivations and mental models"
  - "Uncovers unexpected factors not on the research team's radar"
  - "Can adapt to participant responses in the moment"
  - "Surfaces the language and vocabulary users use themselves"
limitations:
  - "Attitudinal, not behavioral — what people say vs. what they do"
  - "Not statistically generalizable"
  - "Susceptible to social desirability bias and interviewer effect"
  - "Time-intensive to conduct and synthesize at scale"
common_mistakes:
  - "Writing questions before defining what you need to learn"
  - "Asking leading or binary questions"
  - "Not probing beyond first answers"

# ── Connections ───────────────────────────────────────────────
related_methods:
  use_before:  ["stakeholder-interviews", "desk-research"]
  use_after:   ["surveys", "diary-studies"]
  use_instead: ["contextual-inquiry", "diary-studies"]
good_rqs:
  - "What challenges do users face when [task]?"
  - "How do users currently think about [concept]?"
poor_use_cases:
  - "Measuring usability of a specific interface"
  - "Collecting statistically reliable preference or frequency data"

# ── Resources ─────────────────────────────────────────────────
templates:           []  # verified links only; null until verified
external_resources:  []  # verified links only
sources:
  - text: "Nielsen Norman Group, 'A Guide to UX Research Methods'"
    url:  "https://www.nngroup.com/articles/guide-ux-research-methods/"

# ── Governance ────────────────────────────────────────────────
status:          "draft"   # draft | published | needs_review | deprecated
last_reviewed:   null
content_owner:   null      # use role, not personal name
review_cadence:  "quarterly"
version:         "0.1"
```

> **Authoring constraint:** Fields marked `# [team review]` should not be populated with invented values. If a value cannot be drawn from a reliable source or verified team practice, leave it null and set `status: draft`. A published page with a gap is preferable to a published page with a fabricated claim.

### Page content structure

Every Method Detail page follows this section order. The sections are designed for progressive depth — a reader can stop after any section and have received useful information appropriate to their need.

| # | Section | Content | Serves |
|---|---------|---------|--------|
| 1 | **At a Glance** | What it is (2–3 sentences), when to use (3–5 bullets), when not to (3–5 bullets), time/effort, what you get out | Decision-makers, people evaluating fit quickly |
| 2 | **Is This the Right Method?** | Decision table: "Use this when…" / "Don't use this when…" / "Consider [alternative] instead if…" | Anyone uncertain about fit; stakeholder conversations |
| 3 | **Before You Start** | Research objective, research questions this method can/cannot answer, participant requirements, recruitment, consent and ethics, materials, prototype requirements, roles, logistics checklist | Practitioners in the planning phase |
| 4 | **How to Conduct It** | Numbered SOP steps. Each step: goal, instructions, example, facilitator tip, common mistake, expected output | Practitioners preparing to run a study |
| 5 | **Analyze** | How to process raw data for this method type; appropriate analysis techniques; common mistakes | Practitioners post-fieldwork |
| 6 | **Synthesize** | Moving from observations → patterns → insights → implications; recommended synthesis approaches | Practitioners building findings |
| 7 | **Share** | Recommended output formats; what to include; how to address common stakeholder questions about this method's evidence | Practitioners preparing shareouts |
| 8 | **Templates & Tools** | Method-specific templates, analysis tools — verified links only | Practitioners in preparation or analysis |
| 9 | **Related Methods** | Use before / use after / use instead — with one-line rationale for each connection | Anyone exploring alternatives or sequencing research |

> **Design principle — progressive depth:** The page architecture mirrors how people actually arrive. Sections 1–2 serve the quick evaluation completely. Sections 3–4 serve pre-study preparation. Sections 5–7 serve post-fieldwork needs. A reader should never have to read past what they need.

---

## 06 SOP Content Model

The SOP covers the full arc of a study, not just facilitation. It has two parts: the framing content (sections describing purpose, scope, approach) and the step sequence (numbered, structured steps walking through execution).

### Individual step schema

```yaml
# Every step in the SOP follows this structure
step:
  number:   1
  title:    "Build the discussion guide structure"
             # Action verb + noun; imperative, specific
  goal:     "Establish the topics and sequence before any questions
              are written — ensures questions serve objectives,
              not curiosity."
  instructions:
    - "Start from your research objectives, not a blank page"
    - "Map each objective to a topic area (5–7 topics maximum)"
    - "Order topics: warm-up → broad context → specific topics → close"
    - "Write topic headings, not questions yet"
  example:  "Objective: understand how designers track client feedback.
              Topics: current process → pain points → tools used →
              moments that matter → workarounds."
  facilitator_tip:  "The guide is a scaffold, not a script. Leave white
                     space. The most valuable moments often happen
                     between the topics you planned."
  common_mistake:   "Writing fully-formed questions before agreeing on
                     what each section is trying to learn."
  expected_output:  "A topic map — 5–7 areas, each anchored to a research
                     objective — shared with team before questions are written."
  template_link:    null   # or verified URL
  time_estimate:    "45–90 minutes"
```

### Full SOP section structure

| Section | What it covers | Notes |
|---------|----------------|-------|
| **1. Purpose** | Why this method exists; what evidence type it produces | 2–3 sentences |
| **2. When to use** | Research questions suited for this method; product stage; evidence requirements | Specific, not generic |
| **3. When not to use** | Situations where this method will not produce appropriate evidence | Just as important as "when to use" |
| **4. Preparation** | Objectives, research questions, materials, setup, logistics | May include checklist format |
| **5. Participants** | Who to recruit; inclusion criteria; sample size rationale | Never fabricate numbers; cite sources or mark as team guidance |
| **6. Recruitment** | How to find, screen, and schedule participants; incentives | Reflects team's actual processes |
| **7. Consent & privacy** | What informed consent requires; recording; data handling | Must reflect current legal/organizational requirements |
| **8. Roles** | Facilitator, note-taker, observer — responsibilities and handoffs | Include guidance for solo-researcher scenarios |
| **9. Facilitation steps** | The numbered step sequence (see step schema above) | The core of the SOP |
| **10. Data capture** | How to record, annotate, and organize raw data during the session | Tool-specific guidance where relevant |
| **11. Analysis** | How to process data after collection; appropriate techniques | Do not oversimplify qualitative analysis |
| **12. Synthesis** | Observations → patterns → insights → recommendations | Emphasize the distinction between observation and interpretation |
| **13. Outputs** | What deliverables this method produces; appropriate formats | Linked to Share section |
| **14. Shareout** | How to present findings to different stakeholder audiences | Different guidance per evidence type |
| **15. Accessibility** | How to make this method accessible to participants with disabilities | Required in all SOPs |
| **16. Common mistakes** | Recurring errors with specific mitigation | Concrete, not generic |
| **17. References** | Sources used; links to further reading | Verified links only |

> **Accessibility is mandatory.** Every SOP must include an accessibility section. Research that systematically excludes participants with disabilities produces findings that cannot represent actual users. Consistent with GOV.UK Service Manual's treatment of inclusive research as a core requirement, not a consideration.

---

## 07 Method-Selection Model (Finder)

### Design philosophy

The Finder is a **reasoning scaffold**, not a method lookup tool. Its job is to help practitioners articulate what they actually need, then surface methods that fit — with honest caveats about what each cannot do. The output must never say "use Method X." It must say "given what you've told us, these methods are worth considering — here is why, and here is what each cannot tell you."

### Question flow

**Question 1 — Research question**  
What are you trying to learn?  
_Suggested categories: Understand user behavior · Understand attitudes or mental models · Identify usability problems · Validate a concept or direction · Measure performance or preference · Discover unknown unknowns_  
Free text input encouraged — chips are prompts, not constraints.

**Question 2 — Attitudinal vs. behavioral** _(NNGroup dimension 1)_  
Are you more interested in what people do, or what they think and feel?  
Options: What people actually do (behavior) · What people say, think, or feel (attitudes) · Both — I need to understand the gap

> This is the most consequential question in the flow. Getting it wrong leads to choosing a method that produces the wrong type of evidence.

**Question 3 — Qualitative vs. quantitative** _(NNGroup dimension 2)_  
Do you need depth of understanding, or frequency and magnitude?  
Options: Why and how (qualitative) · How many and how much (quantitative) · Both, or I'm not sure yet

**Question 4 — Context of use** _(NNGroup dimension 3)_  
Does the research need to happen while participants use a product?  
Options: Yes — using a real product in their environment · Yes — using a prototype or simulation · No — interviews, surveys, or concept discussion

**Question 5 — Product stage**  
Where is your product or design right now?  
Options: No product yet — discovery phase · Concept or early wireframes · Working prototype · Live product

**Question 6 — Constraints** _(multi-select)_  
What constraints apply?  
Options: Very limited time (< 2 weeks) · Hard to recruit participants · No budget for incentives · Need statistical confidence · Running solo · No prototype available

### Recommendation output format

The Finder returns 2–4 methods. For each:
- **Why it fits** — which answers this method addresses, in plain language
- **What it cannot tell you** — explicit gaps in the evidence produced
- **Tradeoff against the next method** — comparative, not hierarchical
- **If your situation changes** — what condition would shift the recommendation
- **Link to full method page**

> **What to avoid:** The Finder must not present its output as an objective algorithmic truth. 6 questions cannot fully describe a research situation. A confidence percentage or single winning recommendation would create false certainty. The output is a starting point for informed judgment, not a replacement for it.

---

## 08 Taxonomy

A minimal classification system that supports browsing, filtering, and the Finder. Every dimension was chosen because it answers a question a practitioner actually needs to answer.

### Five taxonomy dimensions

| Dimension | Values | Answers the question | Why it exists |
|-----------|--------|---------------------|---------------|
| **Evidence Type** | Attitudinal · Behavioral · Mixed | "What kind of proof am I producing?" | The most consequential distinction in method selection. Conflating attitudinal and behavioral evidence is a primary source of misaligned research. Source: NNGroup framework. |
| **Data Type** | Qualitative · Quantitative · Mixed | "Do I need depth or breadth?" | Determines sample size requirements, analysis approach, and what claims can be made. Source: NNGroup framework. |
| **Research Goal** | Exploratory/Generative · Evaluative · Descriptive · Causal | "What am I actually trying to do?" | Maps to NNGroup's Discover/Explore/Test/Listen activity types. Without this dimension, practitioners conflate discovery and evaluation. |
| **Product Stage** | Discovery · Concept · Prototype · Live Product | "What can I actually run right now?" | Many methods require a prototype or live product. This dimension prevents recommending methods that aren't currently feasible. |
| **Effort Level** | Low · Medium · High | "What can I realistically do?" | A constraint filter, not a quality ranking. Relative, not absolute — should be noted as such. |

### What is not in the taxonomy

Excluded dimensions and reasons:
- **Industry/domain** — Too granular, unstable as team scope changes, methods are not domain-specific
- **Team size** — Better handled as a constraint in the Finder than as a browse filter
- **Method category** — This is the Evidence Type dimension expressed differently, not a separate dimension
- **Participant type** — Varies by study, not by method; captured in metadata rather than taxonomy

> **Maintenance note:** Taxonomy dimensions are nearly impossible to change once content is published against them. These five are chosen for long-term stability. Adding a sixth is significantly cheaper than redesigning the existing five.

### Tag governance

All taxonomy values are controlled — content authors select from the defined list and cannot create new values without a governance review. This prevents the tag sprawl that is the primary failure mode for filter systems in internal tools.

---

## 09 Governance Model

A lightweight model for keeping content accurate and maintained, without creating a process that makes updates painful.

> The ResearchOps Community's research found that governance is one of three structural elements that determine whether a knowledge system succeeds or degrades. The others are taxonomy and adoption strategy. Without governance, content goes stale. With governance that is too heavy, contributors avoid updates and the system degrades anyway.

### Content fields per method page

| Field | Type | Description | Visible to reader? |
|-------|------|-------------|-------------------|
| `status` | Enum | `draft` · `published` · `needs_review` · `deprecated` | Yes — shown as a badge |
| `content_owner` | String | Role, not personal name — survives team changes | Yes — shown in footer |
| `last_reviewed` | Date | When last verified by the content owner | Yes — shown in footer |
| `review_cadence` | Enum | `quarterly` (active) · `annually` (stable) | No — internal only |
| `version` | Semver | Major.minor (e.g., `1.2`). Major = structural change; minor = correction | Yes — shown in footer |
| `source_links` | Array | Verified external links | No (links shown; check-date internal) |
| `team_guidance` | Boolean | Sections with team-specific (not source-backed) guidance are labeled as such | Yes — visual indicator |

### Editorial workflow

**New method page:** Content owner drafts → peer review by one other practitioner → status set to `published`. Estimated: 4–8 hours drafting plus review.

**Content update:** Content owner makes edit → status updated to `published`. No approval required for minor corrections. Major restructuring gets a peer check.

**Annual review:** All `published` method pages are reviewed for accuracy and link validity. Pages needing updates are set to `needs_review` until updated. This status is shown to readers — transparency over false confidence.

**Deprecation:** When a method is superseded or the team stops using it, it is marked `deprecated` with a note explaining why and linking to the replacement if one exists. Deprecated pages are never deleted — the context of the deprecation is itself useful information.

### Governance principles

- **"Needs review" is visible.** Readers can see when a page may be out of date. Hiding this erodes trust more than showing it.
- **No multi-step approval for corrections.** If a content owner finds an error, they fix it. The process should not make fixes harder than the error.
- **Team guidance is labeled.** Every section reflecting the team's specific practice rather than external-source guidance is visually distinguished.
- **Link checking should eventually be automated.** Manual verification is acceptable for phase 1. Automate in phase 2.
- **Templates have owners.** Each template in Resources lists a template owner responsible for keeping it current.

---

## 10 Technical & Content Architecture

### Recommended stack

**Next.js (App Router) with MDX content files, deployed as a static site.**

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Content format | MDX + YAML frontmatter | Structured metadata (YAML) for the method schema; rich prose (Markdown) for page content; JSX for interactive elements. Editable in any text editor; version-controlled in Git. |
| Framework | Next.js or Astro | Both support MDX natively, produce static output, and have mature ecosystems. Next.js if the team wants React flexibility; Astro if the team wants simpler builds. |
| Styling | CSS custom properties + Tailwind (optional) | CSS custom properties for the design token system. The token layer is the important part — it enables consistent theming. |
| Method Finder | Client-side JavaScript | A scoring/filtering function that takes the 6 question answers and ranks methods by fit. No server required. The scoring logic should be transparent and testable. |
| Search | Pagefind (phase 2) | Static search, no server, works well for < 500 pages. Not needed for phase 1 with 7 methods. |
| Deployment | Vercel or Netlify | Both offer automatic deploys from Git and preview environments for content review. |

### Content file structure

```
/content
  /methods
    _schema.ts              # TypeScript type for method metadata
    user-interviews.mdx
    usability-testing.mdx
    card-sorting.mdx
    surveys.mdx
    contextual-inquiry.mdx
    unmoderated-testing.mdx
    tree-testing.mdx

  /paths
    choosing-a-method.mdx
    conducting-research.mdx

  /resources
    templates.mdx
    consent.mdx
    analysis-tools.mdx

/src
  /app
    /find                   # Method Finder UI
    /methods
      /[slug]               # Dynamic method detail pages
    /resources
  /components
    MethodCard.tsx
    FinderFlow.tsx
    SopStep.tsx
    RelatedMethods.tsx
  /lib
    methods.ts              # Content loading and validation
    finder.ts               # Finder scoring logic (transparent, testable)
    taxonomy.ts             # Controlled vocabulary
```

### Lower-barrier alternative

If the team does not want to manage a code repository, **Notion + a custom front-end reading the Notion API** is a viable authoring layer. It lowers the barrier to content updates but adds operational complexity and reduces the precision of the structured metadata schema. Recommended only if no team member is comfortable editing Markdown files.

> **Not recommended:** A wiki alone (Confluence, Notion sites) produces a browsing experience but cannot support the Method Finder, structured filtering, or the progressive method-page architecture without significant workarounds. The Finder is the product's core differentiator.

---

## 11 Key UX Risks

### R1 — The Finder over-prescribes; practitioners stop reasoning
If the Finder returns a single confident recommendation without showing its reasoning, practitioners will follow it without engaging with the tradeoffs. The playbook would train method-as-habit rather than question-first thinking.

**Mitigation:** Output always shows 2–4 options with explicit rationale. Never a single winner. Never a confidence score. The UI emphasizes that the user is making the decision, not the tool.

### R2 — Content goes stale and nobody notices
Internal documentation starts accurate and degrades quietly. Broken template links, outdated guidance, deprecated tools — each is a small trust failure. When practitioners encounter enough of them, they stop relying on the playbook.

**Mitigation:** `last_reviewed` date and `needs_review` status are visible to readers. Annual review is on the calendar before launch. Link-checking automation is in the phase 2 plan.

### R3 — SOPs are so complete they're not read
A 17-section page that practitioners need to scroll through entirely before finding what they need will not get read before a study.

**Mitigation:** Progressive disclosure structure — At a Glance (sections 1–2) and Before You Start (section 3) serve pre-study needs without requiring the full SOP. The in-page TOC lets practitioners jump directly to the section they need.

### R4 — Taxonomy sprawl makes filtering useless
Internal tools accumulate tags. If tag values multiply without governance, the taxonomy stops being useful and starts being noise.

**Mitigation:** Five controlled dimensions with defined value lists. New values require a governance review, not just a content author's judgment.

### R5 — Methods presented as rules; cargo-cult research practice
If the playbook writes guidance as "you should always…" or "the correct sample size is N," it overstates methodological certainty. A playbook that presents methods as fixed rules produces practitioners who follow the playbook rather than the research question.

**Mitigation:** Every piece of guidance is framed as conditional. Common mistakes sections explain the reasoning behind rules, not just the rule. Sample sizes and durations are presented as ranges with context, and sourced or flagged for team review.

### R6 — Homepage is a welcome page; fails "I need this now"
If the homepage leads with a description of the playbook rather than entry points into it, it fails the highest-urgency user: the practitioner who has a study in two hours and needs a consent form.

**Mitigation:** The homepage leads with three task-entry buttons — not a hero, not an introduction, not a feature tour. The task entries are the first interactive element on the page.

### R7 — Content authored for coverage; the wiki smell
Method pages authored to be comprehensive (cover everything) rather than usable (serve specific tasks) produce walls of text that look thorough and function poorly.

**Mitigation:** Every section of every method page has a defined audience and purpose. When writing a section, the author should name who reads it and why — not fill space.

---

## 12 Recommended MVP

The MVP must answer one question: does the method-selection experience and the progressive SOP structure actually help practitioners do their jobs better? Everything else is phase 2.

### In scope

- Method Finder — all 6 questions, recommendation output
- Method Library — browsable grid, 5 taxonomy filters
- **7 fully built method pages** (see below)
- Resources: Templates (for the 7 MVP methods only)
- Resources: Consent & Ethics (core documents)
- Homepage with 3 task-entry points
- Governance fields (`status`, `last_reviewed`, `content_owner`) on all pages

### The 7 MVP methods

Selected to cover the attitudinal/behavioral × qualitative/quantitative 2×2, and the full range of product stages. Together, these seven methods can serve the vast majority of research questions a product team encounters.

| Method | Evidence type | Data type | Stage fit | Why included in MVP |
|--------|--------------|-----------|-----------|---------------------|
| **User Interviews** | Attitudinal | Qualitative | Discovery → Prototype | The foundational generative method; most frequently used |
| **Moderated Usability Testing** | Behavioral | Qualitative | Prototype → Live | The foundational evaluative method; every practitioner needs this SOP |
| **Unmoderated Usability Testing** | Behavioral | Qual / Quant | Prototype → Live | Increasingly common; distinct from moderated; important "use instead" comparison |
| **Surveys** | Attitudinal | Quantitative | Any | Most overused method; the SOP needs to explain when NOT to use it as much as how to run one |
| **Card Sorting** | Attitudinal | Mixed | Concept → Prototype | Covers IA/navigation research; pairs with Tree Testing |
| **Tree Testing** | Behavioral | Quantitative | Prototype → Live | Natural complement to Card Sorting; covers the IA evaluation arc |
| **Contextual Inquiry** | Behavioral | Qualitative | Discovery → Live | The only method that captures naturalistic behavior in context |

### Phase 2

- Methods 8–20 (remaining library)
- Learning Paths
- Search (Pagefind)
- Analysis guidance pages
- Automated link checking
- Resources: Analysis Tools
- Accessibility research guides

---

## 13 What Not to Build in MVP

**Learning Paths** — Requires understanding how the library is actually used before curating sequences through it. Build the library first; observe the paths people naturally take; then formalize the useful ones.

**Methods 8–20** — Eighteen method pages built before the content model is validated is a high-investment bet on an unproven structure. Seven methods are sufficient to test the model.

**Search** — Not needed for a library of seven methods. Add when the library exceeds ~15 methods.

**Analysis and synthesis guidance pages** — Each method page includes brief Analysis and Synthesize sections. Standalone analysis guides are substantial investments that belong in a second content layer.

**Automated link checking** — Verify links manually before publishing; schedule the first link audit for three months post-launch.

**Accessibility and inclusive research guides** — Critically important, but guidance must be specific to this team's context. Generic checklists are available from GOV.UK; this playbook should surface those and add team-specific layers when they exist.

**Video content** — High production cost; difficult to keep current; not necessary for the core SOP use case.

**Statistical guidance** — Risk of oversimplifying statistical methodology is too high. Point to specialist resources rather than authoring internally.

**Admin or editing interface** — Markdown files in Git are the editing interface. If the Git workflow proves genuinely prohibitive, revisit in phase 2.

---

## 14 Open Questions & Assumptions

1. **Who owns content creation?** Is there a single content lead, or does each team member own specific methods? _Assumption: A single content lead manages phase 1._

2. **What is the team's current toolset?** Recruitment, note-taking, analysis tools — the Resources section cannot be populated with generic links. _Assumption: Tool-specific guidance is left null and populated by the team during authoring._

3. **Are there existing consent forms or institutional review requirements?** The SOP consent sections must reflect actual organizational requirements, not generic advice. _Assumption: Legal/compliance review before the consent section is published._

4. **What is the hosting environment?** Internal-only (behind auth) vs. publicly accessible changes technical requirements. _Assumption: Internal-only for phase 1, no authentication required within the organization's network._

5. **Does this replace an existing knowledge base?** If a Notion, Confluence, or SharePoint exists with research documentation, the relationship must be defined. _Assumption: No existing system is authoritative; this becomes the primary reference._

6. **Which 7 methods are most frequently used by this team?** The MVP list is based on methodological coverage, not team usage patterns. _No assumption — requires direct team input before authoring begins._

7. **What level of prototype fidelity is typical?** Usability testing guidance varies significantly. _Assumption: Figma prototypes and coded products, covered as two sub-cases._

8. **Are secondary users expected to use the playbook independently?** Affects the vocabulary level of At a Glance and Is This Right sections. _Assumption: Secondary users are an audience; At a Glance is written for both._

9. **Framework preference?** _Assumption: No strong preference; Astro recommended for simpler maintenance unless the team has React experience._

10. **What does success look like at 3 months?** Without a definition of success, it's impossible to decide when the MVP has been validated and phase 2 can begin. _No assumption — define before build begins._

---

## 15 Sources

> **Source policy:** This document synthesizes and cites; it does not reproduce. Framework concepts and structural dimensions are attributed to their sources. Where a claim is common practitioner knowledge without a single authoritative source, it is presented without a citation. Where a claim could not be verified from a reliable source, it is either excluded or flagged for team review.

### Nielsen Norman Group — "A Guide to Using User-Experience Research Methods"
[https://www.nngroup.com/articles/guide-ux-research-methods/](https://www.nngroup.com/articles/guide-ux-research-methods/)

Used for: The three-dimensional framework classifying research methods (attitudinal/behavioral; qualitative/quantitative; context of product use). The 20-method landscape and mapping to product development lifecycle stages. The principle that method selection should be systematic, based on evidence type needed. These frameworks appear in the taxonomy (Section 8) and the Finder question flow (Section 7).

### Nielsen Norman Group — "When to Use Which User-Experience Research Methods"
[https://www.nngroup.com/articles/which-ux-research-methods/](https://www.nngroup.com/articles/which-ux-research-methods/)

Used for: The four research activity types — Discover, Explore, Test, Listen — which map to the Research Goal taxonomy dimension. The argument that most organizations under-invest in generative/discovery research. The generative vs. evaluative distinction used throughout this document.

### ResearchOps Community — "Research Repositories"
[https://github.com/researchops/research_repositories](https://github.com/researchops/research_repositories)

Used for: The four knowledge management system models (Research Register, Research Data Repository, Insights Hub, Research Library). The three structural elements of a successful repository (taxonomy, governance, adoption strategy). The empirical finding that successful repositories require dedicated staff and leadership advocacy. The Minimum Viable Taxonomy concept. (Community outputs published under CC BY-SA.)

### GOV.UK Service Manual — User Research
[https://www.gov.uk/service-manual/user-research](https://www.gov.uk/service-manual/user-research)

Used for: The principle that inclusive research is a mandatory requirement, not optional. The emphasis on consent, ethics, and safeguarding as required SOP elements. The framing of research as continuous and embedded. Note: the "2 hours every 6 weeks" team observation benchmark is specific to UK government service teams and not asserted as a universal standard.

### Miro Blog — "How to Create a UX Research Repository"
[https://miro.com/blog/how-to-create-a-ux-research-repository/](https://miro.com/blog/how-to-create-a-ux-research-repository/)

Used for: Supplementary framing for the governance section — taxonomy, governance model, and adoption strategy as the three elements that determine repository success. Note: practitioner guidance from a tool vendor, not primary research; consistent with and corroborated by the ResearchOps community work.

### Practitioner knowledge

Content model structure for method pages, SOP section organization, homepage entry-point evaluation, MVP scoping decisions, and risk identification draw on general practitioner experience and cannot be attributed to a single source. Where a specific claim requires sourcing (sample sizes, study durations), it is either cited or marked for team review rather than asserted as fact.

---

## 16 IA Review

*Added post-proposal · August 2026 · For product owner review before visual design begins*

A designer's read of the proposal — not a developer audit. Organized around the four primary user entry points: Homepage, Decide (Method Finder), Operate (method/SOP pages), and Retrieve (templates/resources), plus Method Library browsing, MVP method coverage, and open decisions.

---

### R01 Homepage — Text Wireframe

```
┌─────────────────────────────────────────────────────────────────────┐
│ UX Research Playbook              [Search ________________________] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  What do you need to do?                                            │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │                  │  │                  │  │                  │  │
│  │  Choose a        │  │  Run a study     │  │  Find a          │  │
│  │  method          │  │                  │  │  template        │  │
│  │                  │  │  Go to an SOP    │  │                  │  │
│  │  Start the       │  │  or checklist    │  │  Browse          │  │
│  │  Method Finder   │  │  for a method    │  │  resources       │  │
│  │                  │  │  you've chosen   │  │                  │  │
│  └────────[→]───────┘  └────────[→]───────┘  └────────[→]───────┘  │
│                                                                     │
│  ──────────────────────────────────────────────────────────────     │
│  Recently updated methods                    [View all methods →]   │
│  User Interviews · Surveys · Card Sorting                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**What this wireframe tests:** Three entry points map directly to the three primary jobs-to-be-done. No fourth card for "Learn about research" — this is not a primer. The recently-updated row gives returning users a quick re-entry without requiring a search.

**Risk to watch:** The three-card layout assumes users can self-identify their job before entering. If practitioners commonly arrive not knowing *which* job they need (e.g., "I know I need to do something with interviews but haven't decided if it's moderated or unmoderated"), the "Choose a method" card needs clearer framing — perhaps "Not sure which method to use?" as a sub-label.

---

### R02 Decide — Method Finder Flow

The Finder is the highest-stakes interaction on the site. It must feel like a conversation with a senior colleague, not a form.

**Full user journey:**

**Q1 screen — research question framing**

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Back to home                              Method Finder   1 of 6  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  What are you trying to learn?                                      │
│                                                                     │
│  ○  What users think, feel, or believe       (attitudinal)          │
│  ○  What users actually do                   (behavioral)           │
│  ○  Both — I need to understand the gap between them                │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Why this matters: Conflating attitude and behavior is the          │
│  most common source of misaligned research. Self-reported           │
│  behavior rarely matches observed behavior.                         │
│                                                                     │
│                                               [Continue →]          │
└─────────────────────────────────────────────────────────────────────┘
```

**Q2–Q5 — prose description (no separate wireframes needed)**

- **Q2 — Fidelity:** Do you have something to test? Options: No artifact yet / Early concept or prototype / Existing live product
- **Q3 — Scale:** How many people? Options: Individual depth (qualitative, n<10) / Patterns across a group (quantitative, n>40) / Both / Not sure yet
- **Q4 — Context:** How can you access participants? Options: In a session you facilitate / Self-directed, unmoderated / In their natural environment / No direct access (surveys, analytics)
- **Q5 — Timeline:** How long until you need findings? Options: Less than 2 weeks / 2–4 weeks / 4+ weeks

**Q6 screen — final qualifier before results**

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Back                                      Method Finder   6 of 6  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  One last thing: do you have a specific research question           │
│  written down?                                                      │
│                                                                     │
│  ○  Yes — I know exactly what I need to learn                       │
│  ○  Not yet — I'm still scoping the research                        │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Note: If you answered "Both" in Q3 and your timeline is            │
│  &lt; 2 weeks, the Finder will flag that combination as             │
│  high risk. You can proceed — but review the constraint             │
│  warning on the results page before committing.                     │
│                                                                     │
│                                               [See methods →]       │
└─────────────────────────────────────────────────────────────────────┘
```

**Results screen**

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Restart                                          Method Finder    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Based on your answers:                                             │
│                                                                     │
│  ★ Best fit                                                         │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  User Interviews                                            │    │
│  │  Qualitative · Attitudinal · Moderated                     │    │
│  │  Why: You need depth on beliefs, have &lt; 2 weeks, and    │    │
│  │  can access participants directly.                          │    │
│  │                              [View method →]  [Start SOP →]│    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  Also consider                                                      │
│  Card Sorting — if your question is about mental models             │
│  Contextual Inquiry — if access to natural context is possible      │
│                                                                     │
│  ⚠ Constraint note: Qualitative + quantitative in &lt; 2 weeks     │
│  is high risk. Consider phasing or narrowing scope.                 │
│                                                                     │
│  [Restart finder]    [Export these results]    [View all methods]   │
└─────────────────────────────────────────────────────────────────────┘
```

**What the Finder must NOT do:**
- Return a single method with no alternatives (always show 2–3)
- Silently drop conflicting answers without flagging them
- Require users to know research terminology to complete it (all jargon must be explained in context, as in Q1)

---

### R03 Operate — Method/SOP Page Structure (top to bottom)

A practitioner arriving here has already chosen their method. They need orientation in 10 seconds, then operational detail without friction.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [← Method Library]        User Interviews          [Start checklist →]   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  STICKY LEFT RAIL (248px)         │  MAIN CONTENT (scrolls)              │
│  ─────────────────────────────    │  ────────────────────────────────    │
│  Overview                         │                                      │
│  When to use                      │  ── 1. ORIENTATION ──────────────    │
│  NOT when to use                  │  Tagline: One sentence on the         │
│  ─────────────────────────────    │  core purpose of this method.        │
│  Planning                         │                                      │
│  Screener & recruiting            │  When to use / NOT when to use       │
│  Discussion guide                 │  2-column table: green / red.        │
│  ─────────────────────────────    │  Directly visible above the fold.    │
│  Field                            │                                      │
│  Session checklist                │  ── 2. SELECTION CONTEXT ─────────   │
│  Recording & consent              │  NNGroup dimensions: Attitudinal ·   │
│  Notetaking template              │  Qualitative · Moderated/scripted    │
│  ─────────────────────────────    │                                      │
│  Analysis                         │  Typical use: Discovery phase ·      │
│  Synthesis approach               │  Any fidelity                        │
│  Tagging guidance                 │                                      │
│  ─────────────────────────────    │  ── 3. PLANNING ─────────────────    │
│  Templates & resources            │  Sample size guidance                │
│  All downloads for this method    │  Recruiting criteria                 │
│                                   │  Timeline estimates                  │
│                                   │  Screener questions (copy-ready)     │
│                                   │                                      │
│                                   │  ── 4. FIELD ────────────────────    │
│                                   │  Session checklist (checkable)       │
│                                   │  Discussion guide structure          │
│                                   │  Recording & consent requirements    │
│                                   │  Facilitation tips                   │
│                                   │                                      │
│                                   │  ── 5. ANALYSIS ─────────────────    │
│                                   │  Recommended synthesis approach      │
│                                   │  Tagging guidance (atomic nuggets)   │
│                                   │  Output formats                      │
│                                   │                                      │
│                                   │  ── 6. TEMPLATES ────────────────    │
│                                   │  [Download discussion guide]         │
│                                   │  [Download consent form]             │
│                                   │  [Download notetaking template]      │
│                                   │                                      │
│                                   │  ── 7. RELATED ──────────────────    │
│                                   │  Often paired with: Diary Studies    │
│                                   │  Consider instead: Contextual Inquiry│
│                                   │  See also: Survey (for scale)        │
│                                   │                                      │
└──────────────────────────────────────────────────────────────────────────┘
```

**Progressive disclosure principle:** Sections 1–2 serve the evaluative job (still deciding). Sections 3–4 serve preparation. Sections 5–7 serve post-fieldwork. A practitioner who has done this method before goes straight to section 3 or 4 via the sticky rail; one who's uncertain reads sections 1–2 first.

**Critical design decision:** The "[Start checklist →]" CTA in the header should jump to the SOP/checklist view — a separate focused mode that strips away the reference content and shows only actionable steps. This is different from the method page. If the SOP is just a section on the method page, the CTA is a scroll anchor. If it's a separate route, the URL structure matters.

---

### R04 Retrieve — How a User Finds a Template or Resource

Two paths, each with different urgency.

**Path 1 — Urgent (know exactly what you need):**

```
Homepage → Search "consent form" → Results filtered to Templates 
→ Filter by method: User Interviews → Download
```

This path works only if:
- Search is indexed by content type, not just method name
- Template metadata includes: method name, file format, last updated, who maintains it

**Path 2 — Contextual (inside a method page):**

```
Method page (User Interviews) → Section 6 Templates 
→ See all templates for this method 
→ Download discussion guide (Google Doc / .docx)
```

This path is the more common one for practitioners mid-preparation. It must be visible without scrolling past analysis content.

**Risk:** If templates are not maintained, the Retrieve path becomes a liability — practitioners will find outdated consent forms and either use them incorrectly or stop trusting the playbook entirely. Governance cadence (see §09) must cover templates explicitly.

---

### R05 Method Library — Filters, Categories, Search Behavior

```
┌─────────────────────────────────────────────────────────────────────┐
│ Method Library                    [Search methods ________________] │
├──────────────────┬──────────────────────────────────────────────────┤
│  FILTERS         │  RESULTS (12 methods)                            │
│                  │                                                  │
│  Type            │  ┌─────────────┐  ┌─────────────┐               │
│  □ Attitudinal   │  │ User        │  │ Moderated   │               │
│  □ Behavioral    │  │ Interviews  │  │ Usability   │               │
│                  │  │             │  │ Testing     │               │
│  Scale           │  │ Attitudinal │  │             │               │
│  □ Qualitative   │  │ Qualitative │  │ Behavioral  │               │
│  □ Quantitative  │  │ Moderated   │  │ Qualitative │               │
│  □ Mixed         │  │             │  │ Scripted    │               │
│                  │  │ [View →]    │  │             │               │
│  Phase           │  └─────────────┘  │ [View →]    │               │
│  □ Discovery     │                   └─────────────┘               │
│  □ Exploratory   │                                                  │
│  □ Evaluative    │  ┌─────────────┐  ┌─────────────┐               │
│  □ Generative    │  │ Card        │  │ Tree        │               │
│                  │  │ Sorting     │  │ Testing     │               │
│  Context         │  │ ...         │  │ ...         │               │
│  □ Moderated     │  └─────────────┘  └─────────────┘               │
│  □ Unmoderated   │                                                  │
│  □ Naturalistic  │  [Show all 12 →]                                 │
│                  │                                                  │
│  [Clear filters] │                                                  │
└──────────────────┴──────────────────────────────────────────────────┘
```

**Filter logic:** Additive within a dimension (Attitudinal OR Behavioral), intersecting across dimensions (Attitudinal AND Qualitative AND Discovery). This is standard faceted search behavior; confirm before building.

**Cards show:** Method name, 3 taxonomy tags, one-line description. No rating, no difficulty level, no time estimate on the card — that information lives on the method page.

**Search behavior:** Full-text across method name, description, use-case text, and taxonomy tags. Does NOT search template file contents. Returns methods, not templates (templates appear only on the method page).

**Coverage map — 2×2 view (alternative to card grid):**

| | Qualitative | Quantitative | Mixed |
|---|---|---|---|
| **Attitudinal** | User Interviews, Card Sorting | Surveys | — |
| **Behavioral** | Contextual Inquiry, Moderated UT | Tree Testing, Unmoderated UT | — |

This view helps teams see gaps in their method repertoire. Worth including as a toggle on the Library page ("Grid view / Coverage map").

---

### R06 MVP Methods — Coverage Review

| Method | Serves | Does NOT cover | Verdict |
|---|---|---|---|
| **User Interviews** | Attitudinal · Qualitative · Moderated · Discovery/Exploratory | Behavioral observation; scale | ✅ Keep |
| **Moderated Usability Testing** | Behavioral · Qualitative · Scripted · Evaluative | Unmoderated; large samples | ✅ Keep |
| **Unmoderated Usability Testing** | Behavioral · Qualitative–Quantitative · Self-directed · Evaluative | Deep follow-up; no moderation | ⚠ Conditional |
| **Card Sorting** | Attitudinal · Qualitative–Quantitative · Information architecture | Navigation validation (that's tree testing) | ✅ Keep |
| **Tree Testing** | Behavioral · Quantitative · Navigation structure | Card sorting / generative IA | ✅ Keep |
| **Surveys** | Attitudinal · Quantitative · Unmoderated · Listen | Behavioral; causation | ✅ Keep |
| **Contextual Inquiry** | Behavioral · Qualitative · Naturalistic · Discovery | Controlled; large scale | ✅ Keep |

**On Unmoderated Usability Testing (⚠ Conditional):**
The method is straightforward to run but requires access to a tool (Maze, UserTesting, Lookback, etc.). The SOP will be incomplete — or misleading — without specifying which tool the team actually uses. If the team doesn't have a license or has no agreed tool, this method page will create confusion rather than clarity. **Recommendation:** Include only if the team has an agreed unmoderated testing tool. Otherwise, defer to phase 2.

**Coverage gap not in MVP:**
- Diary Studies (longitudinal behavioral, no scripted artifact)
- Participatory Design / Co-design (generative, attitudinal)
- Analytics review (behavioral, quantitative, no participants)

These are legitimate omissions for MVP — just document them as "phase 2" on the method library page so practitioners know they're coming.

---

### R07 Open Decisions

Every decision below must be made by the product owner before visual design begins. None of these are developer questions — they are product and content strategy decisions.

1. **Does "Retrieve" mean download, or link?** Are templates stored in this tool (as file downloads) or linked to an existing source (Google Drive, Confluence, Notion)? This determines the governance model for templates, the URL structure, and whether version history is visible to users.

2. **Is the SOP a section or a separate view?** The "[Start checklist →]" CTA on method pages either jumps to a different route (e.g., `/methods/user-interviews/sop`) or scrolls to a section on the same page. A separate route enables a focused, step-by-step checklist mode. A section is simpler to build and maintain. Decision needed before layout is specified.

3. **What is the unmoderated UT status?** Include or defer based on tool access (see R06). Decision needed before content model work begins for that method.

4. **Does the Finder save or export results?** The Results screen wireframe includes "[Export these results]." If this is in scope for MVP, it requires a decision on format (PDF, copy-to-clipboard, shareable URL) and whether results are saved per user or stateless.

5. **Is there a "team" layer?** The IA assumes a single shared instance used by the whole team. If there are sub-teams or practice areas that need different defaults, method visibility, or governance ownership, the information model needs to accommodate that. If not, confirm it's explicitly out of scope.

6. **Who owns each method page?** The governance model specifies `content_owner` as a required frontmatter field. Before content is written, each of the 7 MVP methods needs an assigned owner. Without this, review cadence is unenforceable and updates will drift.

7. **What is the consent form situation?** Consent forms are jurisdiction-specific and may require legal review. Are the consent forms in this tool the team's actual, approved forms — or illustrative templates? This affects how they're labeled and whether a disclaimer is needed.

8. **Is search in MVP?** Global search is shown in every wireframe. Full-text search on a static site requires a client-side search library (Pagefind, Fuse.js, or similar). If this adds build complexity that delays launch, it could be deferred — but the "Retrieve" path degrades significantly without it.

9. **What does "recently updated" mean on the homepage?** Is it methods with a `last_reviewed` date change, or methods where content was actually edited? These are different signals. The homepage widget needs a definition before it can be implemented.

10. **What is the public/private boundary?** Is this tool accessible only on the internal network or VPN, or is it publicly accessible (just not advertised)? This affects whether consent forms, internal process details, or client-adjacent content can be included without redaction.

---

*End of IA Review · Decisions in R07 are required before visual design begins.*
