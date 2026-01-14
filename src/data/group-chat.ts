/**
 * GROUP CHAT DATA
 *
 * Persona definitions, suggested questions, and configuration
 * for the XRP Army Focus Group Chat feature.
 */

// Persona type definition
export interface Persona {
  id: number;
  name: string;
  age: number;
  occupation: string;
  location: string;
  backstory: string;
  personality_traits: string[];
  image: string;
  shortTitle: string;
  color: string;
}

// API message format
export interface APIMessage {
  role: 'moderator' | 'persona';
  text: string;
  persona_id?: number;
  persona_name?: string;
}

// Internal message format for UI
export interface GroupMessage {
  id: string;
  type: 'user' | 'persona';
  content: string;
  timestamp: Date;
  persona?: Persona;
}

// API response format
export interface AskResponse {
  responses: Array<{
    persona_id: number;
    persona_name: string;
    text: string;
  }>;
  history: APIMessage[];
}

// Hardcoded personas (from API, cached for faster load)
export const personas: Persona[] = [
  {
    id: 1,
    name: 'Derek Kowalski',
    age: 41,
    occupation: 'HVAC business owner',
    location: 'Phoenix, AZ',
    backstory: 'OG holder since 2017. Discovered XRP through a YouTube video about "the next Bitcoin" and has been accumulating ever since. Converted his brother-in-law, two coworkers, and his accountant. Checks the price first thing every morning.',
    personality_traits: [
      'Tribal loyalty to XRP',
      'Uses hashtags like #XRPTheStandard',
      'Distrusts mainstream financial media',
      'Believes in "589" price target',
      'Working class, practical mindset',
    ],
    image: '/personas/derek_kowalski.png',
    shortTitle: 'The OG',
    color: '#F59E0B', // Amber - matches his OG energy
  },
  {
    id: 2,
    name: 'Marcus Reeves',
    age: 34,
    occupation: 'Financial analyst',
    location: 'Charlotte, NC',
    backstory: 'Works at a regional bank, got interested in XRP through its institutional use cases. Sees Ripple as the bridge between TradFi and crypto. Has both a 401k and a crypto portfolio. Follows regulatory developments closely.',
    personality_traits: [
      'Analytical and data-driven',
      'Understands both TradFi and crypto',
      'Cautiously optimistic',
      'Focused on fundamentals over hype',
      'Professional communication style',
    ],
    image: '/personas/marcus_reeves.png',
    shortTitle: 'Analyst',
    color: '#10B981', // Green - analytical/finance
  },
  {
    id: 3,
    name: 'Jasmine Okonkwo',
    age: 29,
    occupation: 'Paralegal',
    location: 'Atlanta, GA',
    backstory: 'Got into XRP during the SEC lawsuit, fascinated by the legal battle. Follows every court filing and can explain the Howey test to anyone who asks. Active in organizing community responses to regulatory threats.',
    personality_traits: [
      'Legal-minded and detail-oriented',
      'Community organizer',
      'Follows John Deaton closely',
      'Passionate about regulatory clarity',
      'Articulate and well-informed',
    ],
    image: '/personas/jasmine_okonkwo.png',
    shortTitle: 'Legal',
    color: '#8B5CF6', // Purple - legal/organized
  },
];

// Get persona by ID
export const getPersonaById = (id: number): Persona | undefined => {
  return personas.find((p) => p.id === id);
};

// Suggested conversation starters
export const suggestedQuestions = [
  {
    id: 1,
    text: 'What do you think about the SEC settlement?',
    category: 'legal',
  },
  {
    id: 2,
    text: 'How did you first get into XRP?',
    category: 'personal',
  },
  {
    id: 3,
    text: "What's your price prediction for 2026?",
    category: 'speculation',
  },
  {
    id: 4,
    text: 'Do you think banks will actually use ODL?',
    category: 'adoption',
  },
  {
    id: 5,
    text: 'What do you think of Brad Garlinghouse?',
    category: 'leadership',
  },
  {
    id: 6,
    text: 'Is the XRP Army cult-like, or just passionate?',
    category: 'community',
  },
];

// API Configuration
export const API_CONFIG = {
  baseUrl: 'https://focusgroup-plum.vercel.app',
  audience: 'xrp_army',
  timeout: 30000, // 30 seconds (API can take 5-15s)
};

// Generate unique ID for messages
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
