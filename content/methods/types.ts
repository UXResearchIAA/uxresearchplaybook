export type MethodAxis = 'attitudinal' | 'behavioral' | 'both';
export type MethodScale = 'qualitative' | 'quantitative' | 'mixed';
export type MethodContext = 'moderated' | 'unmoderated' | 'naturalistic';
export type ResearchPhase = 'discovery' | 'exploratory' | 'evaluative' | 'generative';

export interface SOPChecklistItem {
  text: string;
  note?: string;
}

export interface SOPStep {
  id: number;
  title: string;
  phase: 'prepare' | 'conduct' | 'analyze' | 'synthesize' | 'share';
  description: string;
  checklist: SOPChecklistItem[];
  example?: string;
  commonMistakes?: string[];
  expectedOutput: string;
  templateRef?: string;
}

export interface Template {
  name: string;
  description: string;
  format: string;
  url: string | null; // null = placeholder
  phase?: 'prepare' | 'conduct' | 'analyze' | 'share';
}

export interface Source {
  id: string;
  author: string;
  title: string;
  publisher?: string;
  year?: string;
  url?: string;
  usedFor: string;
  note?: string; // e.g. "training data — unverified against current article text"
}

export interface RelatedMethod {
  slug: string;
  name: string;
  relationship: 'alternative' | 'complementary' | 'precedes' | 'follows';
  reason: string;
}

export interface LandscapePosition {
  /** 0 = qualitative, 1 = quantitative */
  qualQuant: number;
  /** 0 = attitudinal, 1 = behavioral */
  attiBeha: number;
}

export interface MethodContent {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  status: 'prototype' | 'draft' | 'published';

  // Taxonomy
  axis: MethodAxis;
  scale: MethodScale;
  context: MethodContext;
  phases: ResearchPhase[];

  // At-a-glance
  typicalParticipants: string;
  typicalSessionDuration: string;
  typicalStudyTimeline: string;

  // Landscape
  landscape: LandscapePosition;

  // Overview
  overview: string;
  whatItAnswers: string[];
  whenToUse: string[];
  whenNotToUse: string[];

  // SOP
  sopSteps: SOPStep[];

  // Post-fieldwork
  analysisApproach: string;
  synthesisApproach: string;
  typicalOutputs: string[];

  // Resources
  templates: Template[];

  // Relations
  relatedMethods: RelatedMethod[];

  // Sources
  sources: Source[];
}
