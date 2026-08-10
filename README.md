# UX Research Methods Playbook

An internal decision-support and operational tool for an experienced UX research and design team.

## What this is

A maintainable internal web application that helps the team:

- **Choose** the right research method for a specific question — starting from "What do I need to learn?" not "What method do I want to use?"
- **Run** a research study with complete, method-specific SOPs and preparation checklists
- **Find** verified templates, consent forms, scripts, and analysis tools quickly

This is not a UX encyclopedia or beginner's primer. It optimizes for speed of access at decision points for experienced practitioners.

## Status

> **Pre-build planning phase.** The information architecture and content model are documented in [`docs/information-architecture.md`](docs/information-architecture.md). No application code exists yet.

## Planning documents

| Document | Description |
|----------|-------------|
| [`docs/information-architecture.md`](docs/information-architecture.md) | Complete IA proposal: product concept, site structure, content models, taxonomy, governance, technical architecture, MVP scope |

## Planned architecture

- **Framework**: Next.js (App Router) or Astro with MDX content files
- **Content**: Structured MDX + YAML frontmatter for each method
- **Method Finder**: Client-side JavaScript scoring/recommendation engine
- **Deployment**: Static site (Vercel or Netlify)

## MVP scope (7 initial methods)

1. User Interviews
2. Moderated Usability Testing
3. Unmoderated Usability Testing
4. Card Sorting
5. Tree Testing
6. Surveys
7. Contextual Inquiry

See [`docs/information-architecture.md#recommended-mvp`](docs/information-architecture.md#recommended-mvp) for rationale.

## Primary sources

- Nielsen Norman Group, ["A Guide to UX Research Methods"](https://www.nngroup.com/articles/guide-ux-research-methods/)
- Nielsen Norman Group, ["When to Use Which UX Research Methods"](https://www.nngroup.com/articles/which-ux-research-methods/)
- ResearchOps Community, [Research Repositories](https://github.com/researchops/research_repositories)
- GOV.UK Service Manual, [User Research](https://www.gov.uk/service-manual/user-research)
