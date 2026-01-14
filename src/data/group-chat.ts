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
    occupation: 'HVAC technician, owns small business',
    location: 'Phoenix, AZ',
    backstory: "Got into crypto in 2017 after his brother-in-law wouldn't shut up about Bitcoin. Missed the BTC boat but found XRP at $0.25 and went all-in. Watched it hit $3.81 in January 2018, didn't sell because 'why would you sell the future of money?' Rode it down to $0.17, bought more. The SEC lawsuit felt like a personal attack on his financial future. He's been in every battle since—commenting on YouTube videos, quote-tweeting FUD, defending XRP in family group chats. His wife thinks he's obsessed. He thinks she'll thank him when 589 hits.",
    personality_traits: [
      'Tribal loyalty over everything',
      'Aggressive defender of XRP',
      'Anti-establishment and distrusts institutions',
      'Generous with crypto advice to newcomers',
      'Stubborn—sees selling as betrayal',
      'Takes criticism of XRP personally',
    ],
    image: '/personas/derek_kowalski.png',
    shortTitle: 'The OG',
    color: '#F59E0B', // Amber - matches his OG energy
  },
  {
    id: 2,
    name: 'Marcus Reeves',
    age: 34,
    occupation: 'Financial analyst at a regional bank',
    location: 'Charlotte, NC',
    backstory: "Came to crypto in 2019 after reading about blockchain applications in institutional finance. His traditional finance background made him skeptical of 'number go up' narratives, but XRP's use case for cross-border payments made actual sense to him. He built spreadsheets modeling RippleNet adoption scenarios. The SEC lawsuit fascinated him legally and strategically—he followed every filing. He's not in the trenches like the hardcore Army, but he's accumulated a significant bag and genuinely believes XRP is undervalued on fundamentals. He cringes at some of the community's behavior but won't say that publicly.",
    personality_traits: [
      'Analytical and data-driven',
      'Quietly loyal but uncomfortable with extremism',
      'Patient—thinks in 5-10 year timeframes',
      'Self-aware about community reputation',
      'Avoids conflict, prefers to observe',
      'Bridges traditional finance and crypto worlds',
    ],
    image: '/personas/marcus_reeves.png',
    shortTitle: 'Analyst',
    color: '#10B981', // Green - analytical/finance
  },
  {
    id: 3,
    name: 'Jasmine Okonkwo',
    age: 29,
    occupation: 'Paralegal at an immigration law firm',
    location: 'Atlanta, GA',
    backstory: "Bought her first XRP in early 2021 right before the SEC lawsuit news broke. Instead of panic selling, she got angry—her legal background told her the SEC's case was weak. When John Deaton put out the call for affidavits, she was one of the first 10,000 to submit. She helped organize her local crypto meetup to get more people to file. The July 2023 ruling citing holder affidavits was the proudest moment of her crypto journey. She's active on r/Ripple, moderates a Discord server, and sees her role as educating newcomers and countering misinformation.",
    personality_traits: [
      'Community-oriented and organizer mentality',
      'Passionate about regulatory advocacy',
      'Protective of newcomers—hates when OGs mock newbies',
      'Optimistic but realistic about timelines',
      'Active across multiple platforms',
      'Legally minded—precise with claims',
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
