import type { MethodContent } from './types';
import userInterviews from './user-interviews';
import moderatedUsabilityTesting from './moderated-usability-testing';
import contextualInquiry from './contextual-inquiry';

// All prototype methods (content-complete)
export const methods: MethodContent[] = [
  userInterviews,
  moderatedUsabilityTesting,
  contextualInquiry,
];

// Full method roster including planned methods (no content yet)
export interface MethodStub {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  axis: MethodContent['axis'];
  scale: MethodContent['scale'];
  context: MethodContent['context'];
  phases: MethodContent['phases'];
  landscape: MethodContent['landscape'];
  status: 'prototype' | 'planned';
}

export const allMethods: MethodStub[] = [
  // Content-complete prototype methods
  { slug: 'user-interviews', name: 'User Interviews', shortName: 'Interviews',
    tagline: 'Understand the motivations and mental models behind user behavior.',
    axis: 'attitudinal', scale: 'qualitative', context: 'moderated',
    phases: ['discovery', 'exploratory'], landscape: { qualQuant: 0.1, attiBeha: 0.1 },
    status: 'prototype' },
  { slug: 'moderated-usability-testing', name: 'Moderated Usability Testing', shortName: 'Moderated UT',
    tagline: 'Watch real users attempt tasks to identify where a design fails — and why.',
    axis: 'behavioral', scale: 'qualitative', context: 'moderated',
    phases: ['evaluative'], landscape: { qualQuant: 0.28, attiBeha: 0.82 },
    status: 'prototype' },
  { slug: 'contextual-inquiry', name: 'Contextual Inquiry', shortName: 'Contextual Inquiry',
    tagline: 'Observe users in their own environment to understand actual work practices.',
    axis: 'behavioral', scale: 'qualitative', context: 'naturalistic',
    phases: ['discovery', 'exploratory'], landscape: { qualQuant: 0.15, attiBeha: 0.78 },
    status: 'prototype' },
  // Planned methods (no content yet)
  { slug: 'card-sorting', name: 'Card Sorting', shortName: 'Card Sorting',
    tagline: 'Understand how users mentally organize and categorize information.',
    axis: 'attitudinal', scale: 'mixed', context: 'unmoderated',
    phases: ['generative', 'exploratory'], landscape: { qualQuant: 0.52, attiBeha: 0.25 },
    status: 'planned' },
  { slug: 'tree-testing', name: 'Tree Testing', shortName: 'Tree Testing',
    tagline: 'Evaluate the findability of items in a proposed information architecture.',
    axis: 'behavioral', scale: 'quantitative', context: 'unmoderated',
    phases: ['evaluative'], landscape: { qualQuant: 0.82, attiBeha: 0.72 },
    status: 'planned' },
  { slug: 'surveys', name: 'Surveys', shortName: 'Surveys',
    tagline: 'Quantify attitudes, preferences, and self-reported behaviors at scale.',
    axis: 'attitudinal', scale: 'quantitative', context: 'unmoderated',
    phases: ['exploratory', 'evaluative'], landscape: { qualQuant: 0.88, attiBeha: 0.15 },
    status: 'planned' },
  { slug: 'unmoderated-usability-testing', name: 'Unmoderated Usability Testing', shortName: 'Unmoderated UT',
    tagline: 'Run task-based tests at scale without a researcher present.',
    axis: 'behavioral', scale: 'mixed', context: 'unmoderated',
    phases: ['evaluative'], landscape: { qualQuant: 0.7, attiBeha: 0.75 },
    status: 'planned' },
];

export function getMethod(slug: string): MethodContent | undefined {
  return methods.find(m => m.slug === slug);
}

export function getMethodStub(slug: string): MethodStub | undefined {
  return allMethods.find(m => m.slug === slug);
}
