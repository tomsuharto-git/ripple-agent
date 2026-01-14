/**
 * SECTION DEFINITIONS
 *
 * Define all available sections for your Project Agent.
 * Toggle visibility in config/features.ts, customize details here.
 */

import { features } from '@/config/features';

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  path: string;
  icon: string;
  color: 'primary' | 'secondary' | 'dark';
  order: number;
}

// All available sections (visibility controlled by features.ts)
export const allSections: Section[] = [
  {
    id: 'research',
    title: 'Get Smart',
    subtitle: 'The Intelligence',
    description: 'Category research, competitive analysis, and market insights for XRP.',
    path: '/research',
    icon: '◇',
    color: 'primary',
    order: 1,
  },
  {
    id: 'diagnosis',
    title: 'Growth Diagnosis',
    subtitle: 'The Strategy',
    description: 'Comprehensive 9-component analysis of Ripple\'s brand health and growth barriers.',
    path: '/diagnosis',
    icon: '▲',
    color: 'dark',
    order: 2,
  },
  {
    id: 'deepdive',
    title: 'Deep Dive',
    subtitle: 'The Research',
    description: 'Comprehensive research library covering business, technology, competition, and community.',
    path: '/deep-dive',
    icon: '⬡',
    color: 'secondary',
    order: 3,
  },
  {
    id: 'insights',
    title: 'Insights',
    subtitle: 'The Provocations',
    description: '10 creative insights that reframe the obvious and open strategic opportunity.',
    path: '/insights',
    icon: '★',
    color: 'primary',
    order: 4,
  },
  {
    id: 'groupChat',
    title: 'Group Chat',
    subtitle: 'The Voices',
    description: 'Meet three members of the XRP Army in a simulated focus group conversation.',
    path: '/group-chat',
    icon: '⬢',
    color: 'secondary',
    order: 5,
  },
  {
    id: 'brief',
    title: 'RFP',
    subtitle: 'The Direction',
    description: 'Client RFP and strategic analysis.',
    path: '/brief',
    icon: '◎',
    color: 'primary',
    order: 6,
  },
  {
    id: 'roast',
    title: 'Brief Roast',
    subtitle: 'The Challenge',
    description: 'Critical analysis exposing strategic weaknesses and blind spots.',
    path: '/roast',
    icon: '🔥',
    color: 'dark',
    order: 7,
  },
  {
    id: 'analysis',
    title: 'Analysis',
    subtitle: 'The Assessment',
    description: 'Strategic analysis of the brief, RFP, or project requirements.',
    path: '/analysis',
    icon: '◆',
    color: 'dark',
    order: 8,
  },
  {
    id: 'audience',
    title: 'Growth Audience',
    subtitle: 'The People',
    description: 'Target audience profiles and growth opportunities.',
    path: '/audience',
    icon: '●',
    color: 'primary',
    order: 9,
  },
  {
    id: 'inspiration',
    title: 'Inspiration',
    subtitle: 'The Spark',
    description: 'Creative inspiration and reference materials.',
    path: '/inspiration',
    icon: '✦',
    color: 'dark',
    order: 10,
  },
  {
    id: 'timeline',
    title: 'Timeline',
    subtitle: 'The Plan',
    description: 'Project milestones and key deliverables.',
    path: '/timeline',
    icon: '═',
    color: 'primary',
    order: 11,
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Configuration',
    description: 'Project settings and preferences.',
    path: '/settings',
    icon: '⚙',
    color: 'dark',
    order: 12,
  },
];

// Get only enabled sections (filtered by features.ts)
export const getEnabledSections = (): Section[] => {
  return allSections
    .filter((section) => features.sections[section.id as keyof typeof features.sections])
    .sort((a, b) => a.order - b.order);
};

// Get a specific section by ID
export const getSectionById = (id: string): Section | undefined => {
  return allSections.find((section) => section.id === id);
};

// NOTE: Chat is NOT a section - it's always on the home page
// Configure chat context in data/chat-context.ts
