import type { MethodStub } from '@/content/methods/index';
import { allMethods } from '@/content/methods/index';

// ─── Finder Question Model ───────────────────────────────────────────────────

export interface FinderQuestion {
  id: string;
  question: string;
  subtext?: string;
  options: FinderOption[];
}

export interface FinderOption {
  id: string;
  label: string;
  description: string;
}

export type FinderAnswers = Record<string, string>;

export const FINDER_QUESTIONS: FinderQuestion[] = [
  {
    id: 'learning_goal',
    question: 'What are you trying to learn?',
    subtext: 'This is the most important question. Conflating attitude and behavior is the most common source of misaligned research — self-reported behavior rarely matches observed behavior.',
    options: [
      { id: 'attitudinal',  label: 'What users think, feel, or believe', description: 'Motivations, mental models, attitudes, opinions, expectations.' },
      { id: 'behavioral',   label: 'What users actually do', description: 'Actions, behaviors, task performance, workflows, errors.' },
      { id: 'both',         label: 'Both — I need to understand the gap between them', description: 'When what people say they do differs from what they actually do.' },
    ],
  },
  {
    id: 'artifact',
    question: 'Do you have something to test?',
    options: [
      { id: 'none',       label: 'No — I\'m still defining the problem', description: 'No prototype, mockup, or product yet.' },
      { id: 'prototype',  label: 'Yes — a prototype or early design', description: 'Wireframes, mockups, or a clickable prototype.' },
      { id: 'product',    label: 'Yes — an existing product or feature', description: 'A live or staging build that users can interact with.' },
    ],
  },
  {
    id: 'scale',
    question: 'What kind of findings do you need?',
    options: [
      { id: 'qualitative',   label: 'Depth — rich insight from a small number of people', description: 'Understand why; explore motivations; generate hypotheses. Typically n < 15.' },
      { id: 'quantitative',  label: 'Breadth — patterns across a large sample', description: 'Measure prevalence; validate at scale; track trends. Typically n > 40.' },
      { id: 'both_scale',    label: 'Both — I need depth and breadth', description: 'Consider phasing the work: qualitative first, then quantitative.' },
      { id: 'unsure',        label: 'Not sure yet', description: 'The method will help determine this.' },
    ],
  },
  {
    id: 'access',
    question: 'How can you access participants?',
    options: [
      { id: 'direct_moderated',   label: 'I can meet with them directly (in-person or video)', description: 'Moderated sessions; you can ask follow-up questions.' },
      { id: 'naturalistic',       label: 'I can visit them in their actual work environment', description: 'Field research; observation in context.' },
      { id: 'self_directed',      label: 'Self-directed — no researcher in the session', description: 'Unmoderated; participants complete tasks independently.' },
      { id: 'indirect',           label: 'No direct access — survey or analytics only', description: 'Remote, asynchronous data collection.' },
    ],
  },
  {
    id: 'timeline',
    question: 'When do you need findings?',
    options: [
      { id: 'urgent',    label: 'Under 2 weeks', description: 'Limited time for recruiting and preparation.' },
      { id: 'moderate',  label: '2–4 weeks', description: 'Standard research cycle.' },
      { id: 'extended',  label: '4+ weeks', description: 'Time to conduct a thorough field study or multi-method study.' },
    ],
  },
  {
    id: 'question_written',
    question: 'Do you have a specific research question written down?',
    subtext: 'This is a quality gate, not a judgment. Proceeding without a written question makes it hard to evaluate whether the findings answered it.',
    options: [
      { id: 'yes', label: 'Yes — I know exactly what I need to learn', description: 'Proceed to recommendations.' },
      { id: 'no',  label: 'Not yet — I\'m still scoping the research', description: 'The Method Finder will still recommend methods, but writing a research question before recruiting is strongly recommended.' },
    ],
  },
];

// ─── Scoring Model ────────────────────────────────────────────────────────────

interface MethodScore {
  method: MethodStub;
  score: number;
  reasons: string[];
  caveats: string[];
}

export interface FinderResult {
  primary: MethodScore[];     // Top 1–2 recommended methods
  alternatives: MethodScore[]; // Other viable options
  constraints: string[];      // Flags for risky answer combinations
}

function scoreMethod(method: MethodStub, answers: FinderAnswers): MethodScore {
  let score = 0;
  const reasons: string[] = [];
  const caveats: string[] = [];

  const goal      = answers.learning_goal;
  const artifact  = answers.artifact;
  const scale     = answers.scale;
  const access    = answers.access;
  const timeline  = answers.timeline;

  // ── learning_goal ──────────────────────────────────────────────
  if (goal === 'attitudinal') {
    if (method.axis === 'attitudinal') { score += 30; reasons.push('Designed to surface attitudes and mental models.'); }
    if (method.axis === 'behavioral')  { score -= 20; caveats.push('Behavioral method — may not directly address what users think or feel.'); }
    if (method.axis === 'both')        { score += 10; }
  }
  if (goal === 'behavioral') {
    if (method.axis === 'behavioral')  { score += 30; reasons.push('Captures what users actually do, not just what they report.'); }
    if (method.axis === 'attitudinal') { score -= 20; caveats.push('Attitudinal method — measures beliefs and attitudes, not direct behavior.'); }
    if (method.axis === 'both')        { score += 10; }
  }
  if (goal === 'both') {
    if (method.axis === 'both')        { score += 25; reasons.push('Bridges attitudinal and behavioral data.'); }
    if (method.axis === 'attitudinal') { score += 5; caveats.push('Attitudinal — pair with a behavioral method to capture both dimensions.'); }
    if (method.axis === 'behavioral')  { score += 5; caveats.push('Behavioral — pair with an attitudinal method to capture both dimensions.'); }
  }

  // ── artifact ──────────────────────────────────────────────────
  if (artifact === 'none') {
    if (method.phases.some(p => p === 'discovery' || p === 'exploratory')) {
      score += 25; reasons.push('Well suited to discovery research before a design exists.');
    }
    if (method.phases.every(p => p === 'evaluative')) {
      score -= 25; caveats.push('Evaluative method — requires something to test. Proceed with discovery research first.');
    }
  }
  if (artifact === 'prototype' || artifact === 'product') {
    if (method.phases.some(p => p === 'evaluative')) {
      score += 20; reasons.push(`Can evaluate ${artifact === 'prototype' ? 'a prototype' : 'an existing product'}.`);
    }
    if (method.phases.every(p => p === 'discovery' || p === 'exploratory')) {
      score -= 5; caveats.push('Discovery method — does not directly evaluate a design, though it may still add value.');
    }
  }

  // ── scale ─────────────────────────────────────────────────────
  if (scale === 'qualitative') {
    if (method.scale === 'qualitative') { score += 20; reasons.push('Qualitative method — produces deep, interpretive insight.'); }
    if (method.scale === 'quantitative'){ score -= 15; caveats.push('Quantitative method — designed for breadth, not depth.'); }
    if (method.scale === 'mixed')       { score += 10; }
  }
  if (scale === 'quantitative') {
    if (method.scale === 'quantitative'){ score += 20; reasons.push('Quantitative method — generates measurable, statistically tractable data.'); }
    if (method.scale === 'qualitative') { score -= 15; caveats.push('Qualitative method — designed for depth, not statistical breadth.'); }
    if (method.scale === 'mixed')       { score += 10; }
  }
  if (scale === 'both_scale') {
    if (method.scale === 'mixed')       { score += 15; }
    if (method.scale === 'qualitative' || method.scale === 'quantitative') { score += 5; caveats.push('Consider running a qualitative round followed by a quantitative round.'); }
  }

  // ── access ────────────────────────────────────────────────────
  if (access === 'direct_moderated') {
    if (method.context === 'moderated')     { score += 20; reasons.push('Designed for moderated sessions — makes full use of your direct access.'); }
    if (method.context === 'naturalistic')  { score += 5; }
    if (method.context === 'unmoderated')   { score -= 5; caveats.push('Unmoderated method — direct access is available but not required.'); }
  }
  if (access === 'naturalistic') {
    if (method.context === 'naturalistic')  { score += 30; reasons.push('Designed for observation in the participant\'s real environment.'); }
    if (method.context === 'moderated')     { score += 5; }
  }
  if (access === 'self_directed') {
    if (method.context === 'unmoderated')   { score += 25; reasons.push('Designed to run without a researcher present.'); }
    if (method.context === 'moderated')     { score -= 15; caveats.push('Moderated method — requires a researcher to be present with the participant.'); }
    if (method.context === 'naturalistic')  { score -= 20; caveats.push('Field method — requires researcher presence in the participant\'s environment.'); }
  }
  if (access === 'indirect') {
    if (method.context === 'unmoderated')   { score += 20; reasons.push('Can be run without direct participant access.'); }
    if (method.context === 'moderated')     { score -= 20; caveats.push('Moderated method — requires direct access to participants.'); }
    if (method.context === 'naturalistic')  { score -= 25; caveats.push('Field method — requires direct access to observe participants in their environment.'); }
  }

  // ── timeline ──────────────────────────────────────────────────
  if (timeline === 'urgent') { // < 2 weeks
    if (method.slug === 'contextual-inquiry') {
      score -= 20; caveats.push('Contextual inquiry typically requires 3–6 weeks. Under 2 weeks is high risk.');
    }
    if (method.slug === 'user-interviews' || method.slug === 'moderated-usability-testing') {
      score += 5; // Can be fast if participant recruitment is already underway
    }
  }
  if (timeline === 'extended') { // 4+ weeks
    if (method.context === 'naturalistic') { score += 10; reasons.push('Field research benefits from extended timelines for access negotiation and analysis.'); }
  }

  return { method, score, reasons, caveats };
}

export function getRecommendations(answers: FinderAnswers): FinderResult {
  if (Object.keys(answers).length < 2) {
    return { primary: [], alternatives: [], constraints: [] };
  }

  const contentMethods = allMethods.filter(m => m.status === 'prototype');
  const scored = contentMethods
    .map(m => scoreMethod(m, answers))
    .sort((a, b) => b.score - a.score);

  const constraints: string[] = [];

  // Flag risky answer combinations
  if (answers.scale === 'both_scale' && answers.timeline === 'urgent') {
    constraints.push('Qualitative + quantitative research in under 2 weeks is high risk. Consider phasing the work or narrowing to one dimension.');
  }
  if (answers.artifact === 'none' && answers.learning_goal === 'behavioral') {
    constraints.push('Behavioral research with no artifact to test is well suited to contextual inquiry or diary studies. Consider discovery research first.');
  }
  if (answers.question_written === 'no') {
    constraints.push('Writing a research question before recruiting is strongly recommended — findings without a question are hard to evaluate and share.');
  }

  const threshold = scored[0]?.score ?? 0;
  const primary = scored.filter(s => s.score >= threshold * 0.7).slice(0, 2);
  const alternatives = scored.filter(s => !primary.includes(s) && s.score > 0).slice(0, 2);

  return { primary, alternatives, constraints };
}

// Get all methods for the planned (stub-only) phase display
export function getPlannedMethods(): MethodStub[] {
  return allMethods.filter(m => m.status === 'planned');
}
