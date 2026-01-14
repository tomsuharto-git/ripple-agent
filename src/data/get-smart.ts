// Ripple Get Smart Analysis - Distilled Key Findings
// Based on comprehensive 6C analysis (January 2025)

export type InsightCategory = 'market' | 'traction' | 'community' | 'competitive' | 'regulatory';

export interface KeyInsight {
  headline: string;
  detail: string;
  metric?: string;
  category?: InsightCategory;
}

export interface StrategicSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  tldr: string;
  keyInsights: KeyInsight[];
  strategicImperative: {
    challenge: string;
    insight: string;
    imperative: string;
  };
}

export const masterBrief = {
  title: 'Summary',
  subtitle: 'Strategic Synthesis Across 6C Dimensions',
  executiveSummary: `Ripple stands at a strategic inflection point: $40B valuation, SEC settlement secured, $4B in TradFi acquisitions complete—yet the fundamental tension between infrastructure company and crypto asset remains unresolved.`,
  coreParadox: {
    headline: 'The Adoption-Utility Disconnect',
    detail: '300+ banks use RippleNet, but only 40% touch XRP. Institutions validate infrastructure while avoiding the token.',
    implications: [
      'Retail holders who sustained XRP through 5 years of SEC litigation feel increasingly excluded',
      '$1.3B ETF inflows signal institutional accumulation while retail exits',
      'Whale selling pressures prices—$808M left exchanges in November 2024',
    ],
  },
  categoryContext: {
    market: '$194T cross-border payments market',
    inefficiency: '$400B-$1T trapped in nostro accounts',
    cost: '6.35% average remittance fees',
    settlement: '3-5 day traditional settlement',
    opportunity: 'No winner-take-all outcome emerging',
  },
  strategicImperative: `Complete transformation from "crypto company with bank partnerships" to "financial infrastructure provider powered by blockchain." The $4B acquisition strategy signals this pivot, but execution requires bridging the retail-institutional divide.`,
  priorities: [
    {
      title: 'Bridge Retail-Institutional Value Gap',
      urgency: 'Critical',
      timeline: '6-12 months',
      risk: 'Community fracture undermines differentiated positioning',
    },
    {
      title: 'Accelerate RLUSD Scale',
      urgency: 'High',
      timeline: '12-24 months',
      risk: 'Stablecoin commoditization concentrates value in USDC/USDT',
    },
    {
      title: 'Execute Acquisition Integration',
      urgency: 'High',
      timeline: '24-36 months',
      risk: 'Acquisitions become costly without revenue synergy',
    },
  ],
};

export const sections: StrategicSection[] = [
  {
    id: 'company',
    number: '01',
    title: 'Company',
    subtitle: 'Corporate Structure & Business Model',
    icon: '◇',
    color: '#0096E4',
    tldr: 'Ripple deployed $4B in TradFi acquisitions, pivoting from crypto-native to financial infrastructure provider. RLUSD hit $1.26B market cap. SEC settlement reduced to $50M.',
    keyInsights: [
      {
        headline: '$4B Acquisition Strategy',
        detail: 'Hidden Road ($1.25B), GTreasury ($1B processing $12.5T annually), Rail ($200M), Palisade—positioning as comprehensive digital asset infrastructure provider.',
        category: 'traction',
      },
      {
        headline: 'RLUSD Stablecoin Success',
        detail: 'Hit $1.26B market cap in under one year, establishing 3rd-largest U.S.-regulated stablecoin position. 1,278% YoD growth.',
        metric: '$1.26B',
        category: 'traction',
      },
      {
        headline: 'SEC Settlement Victory',
        detail: 'Reduced from $2B demand to $50M final settlement, removing four-year regulatory overhang. Judge Torres ruling: programmatic XRP sales aren\'t securities.',
        metric: '$50M vs $2B',
        category: 'regulatory',
      },
      {
        headline: '$40B Valuation',
        detail: 'No IPO plans after $500M funding round from Fortress, Citadel. Choosing strategic M&A over public markets for flexibility.',
        metric: '$40B',
        category: 'traction',
      },
      {
        headline: 'Infrastructure Gap',
        detail: 'Only 40% of RippleNet partners actively use XRP; 60% use messaging infrastructure only. Banks adopt infrastructure while avoiding token.',
        metric: '40% XRP usage',
        category: 'competitive',
      },
    ],
    strategicImperative: {
      challenge: 'Despite 300+ bank partnerships, only 40% actively use XRP for liquidity—institutional hesitation around crypto-native solutions.',
      insight: 'Acquisitions buy legitimacy faster than education. GTreasury\'s $12.5T payment volume provides immediate validation.',
      imperative: 'Become infrastructure layer, not crypto alternative. Prove banks adopt blockchain for economics, not innovation theater.',
    },
  },
  {
    id: 'consumer',
    number: '02',
    title: 'Consumer',
    subtitle: 'Audience Segments & Behavior',
    icon: '●',
    color: '#00D4FF',
    tldr: 'Retail-institutional divide accelerating. Institutions control 43.4% of supply while retail exits. XRP Army remains loyal but sentiment hit "extreme negativity."',
    keyInsights: [
      {
        headline: 'Wealth Transfer in Progress',
        detail: '$808M withdrawn from exchanges by retail in Nov 2024 while institutions added $800M through ETFs. Direct wealth transfer from retail to institutional.',
        metric: '$808M exit',
        category: 'community',
      },
      {
        headline: 'Extreme Negative Sentiment',
        detail: 'XRP Army (300K+ Reddit) hit "extreme negativity" in late 2024. Bearish comments running 20-30% above bullish posts.',
        category: 'community',
      },
      {
        headline: 'Ownership Concentration',
        detail: '4.3M+ funded wallets but only 2.5-3M unique holders. Top 100 addresses control 70% of supply. Shallow ownership base.',
        metric: '70% top 100',
        category: 'community',
      },
      {
        headline: 'Community as Asset',
        detail: 'Galaxy Digital CEO called XRP holders "crypto\'s most organized community." 75,000+ submitted affidavits during SEC case that directly influenced ruling.',
        metric: '75K affidavits',
        category: 'community',
      },
      {
        headline: 'Banking Adoption ≠ Token Demand',
        detail: '300+ banks use RippleNet but most don\'t hold XRP tokens. ODL processed $95B vs $1.2T annual global remittances—XRP remains marginal.',
        metric: '$95B vs $1.2T',
        category: 'competitive',
      },
    ],
    strategicImperative: {
      challenge: 'XRP built loyal community around institutional payments thesis, but holders feel excluded from value creation as institutions accumulate.',
      insight: 'Community loyalty masks structural fracture. Extreme negative sentiment and 77% increase in long-term selling pressure reveal crisis.',
      imperative: 'Demonstrate how banking adoption creates tangible value for token holders—or risk losing the community that sustained XRP through its darkest period.',
    },
  },
  {
    id: 'communications',
    number: '03',
    title: 'Communications',
    subtitle: 'Messaging & Brand Strategy',
    icon: '◎',
    color: '#5A7A9A',
    tldr: 'Ripple transformed SEC penalty into brand victory through community mobilization. CEO Garlinghouse weaponized lawsuit as earned media. February 2025 rebrand signals strategic pivot.',
    keyInsights: [
      {
        headline: 'SEC Lawsuit as Brand Victory',
        detail: '75,000+ XRP holders submitted affidavits that directly influenced court ruling. Community activism turned legal defense into marketing asset.',
        metric: '75K+ affidavits',
        category: 'community',
      },
      {
        headline: 'CEO as Brand Personification',
        detail: 'Brad Garlinghouse (1.2M Twitter followers) appeared on 60 Minutes, claimed $150M legal costs. Positioned Ripple as crypto\'s regulatory martyr.',
        metric: '1.2M followers',
        category: 'traction',
      },
      {
        headline: 'Strategic Rebrand',
        detail: 'February 2025 website erased CBDC messaging, pivoted to stablecoins/custody. Signaling retreat from government partnerships to faster-monetizing B2B fintech.',
        category: 'competitive',
      },
      {
        headline: 'Partnership vs. Reality Gap',
        detail: '"300+ banking partnerships" misleads when most banks use RippleNet messaging without XRP token. Fortune: "the purpose of XRP remains unclear."',
        category: 'competitive',
      },
      {
        headline: 'Dual Audience Challenge',
        detail: 'Enterprise B2B fintech credibility vs. retail crypto community populism. The Torres ruling legally bifurcates communication strategy by audience type.',
        category: 'community',
      },
    ],
    strategicImperative: {
      challenge: 'Ripple claims 300+ bank partnerships while XRP trades on retail speculation. Most use RippleNet infrastructure—not the token.',
      insight: 'The SEC lawsuit forced messaging discipline. $50M settlement (down from $125M) became PR victory lap.',
      imperative: 'Institutionalize or tokenize—pick one. The rebrand signals infrastructure focus, but XRP Army demands token value.',
    },
  },
  {
    id: 'category',
    number: '04',
    title: 'Category',
    subtitle: 'Market Dynamics & Trends',
    icon: '▲',
    color: '#00D4FF',
    tldr: 'Cross-border payments ($194T) faces efficiency crisis. Stablecoin infrastructure wins with $32T volume. Regulation = adoption accelerator, not barrier.',
    keyInsights: [
      {
        headline: 'Massive Inefficiency',
        detail: '$400B-$1T trapped in nostro/vostro accounts. 6.35% avg remittance costs. 3-5 day settlement. Banks pay this "tax" to move money globally.',
        metric: '$400B-$1T trapped',
        category: 'market',
      },
      {
        headline: 'Stablecoin Dominance',
        detail: '$200B+ market cap, $32T transaction volume in 2024. RLUSD at $1.26B (10th largest) positions Ripple at blockchain + compliance intersection.',
        metric: '$32T volume',
        category: 'market',
      },
      {
        headline: 'Regulation Accelerates Adoption',
        detail: 'GENIUS Act compliance makes RLUSD 3rd-largest US-regulated stablecoin. APAC crypto grew 69% YoY as regulatory frameworks clarified.',
        metric: '69% YoY APAC',
        category: 'regulatory',
      },
      {
        headline: 'CBDC Threat & Opportunity',
        detail: '137 countries (98% of GDP) exploring CBDCs. Ripple can be the interoperability layer between national CBDCs—Switzerland between monetary systems.',
        metric: '137 countries',
        category: 'market',
      },
      {
        headline: 'Category Fragmentation',
        detail: 'Circle/USDC, Stellar, SWIFT ISO 20022, fintech unbundlers all attack different vectors. No single standard dominates market.',
        category: 'competitive',
      },
    ],
    strategicImperative: {
      challenge: 'Banks need blockchain efficiency but won\'t abandon correspondent banking overnight. Chicken-and-egg: liquidity requires network effects, networks require liquidity.',
      insight: 'GENIUS Act compliance and MiCA readiness create barriers to entry favoring established players. Regulation = moat, not barrier.',
      imperative: 'Own the settlement layer between legacy and crypto—not SWIFT replacement but the liquidity layer beneath stablecoins and CBDCs.',
    },
  },
  {
    id: 'competition',
    number: '05',
    title: 'Competition',
    subtitle: 'Competitive Landscape Analysis',
    icon: '◆',
    color: '#0096E4',
    tldr: 'SWIFT\'s $120T dwarfs Ripple\'s $1.3T but modernization validates thesis. Stablecoins pose existential threat—USDC at $75B vs RLUSD at $1.26B (60x gap).',
    keyInsights: [
      {
        headline: 'SWIFT\'s Unbreachable Moat',
        detail: '$120T annual volume vs Ripple\'s $1.3T (92x). 11,500 institutions. Network effects trump 720x speed advantage and 13,000x cost advantage.',
        metric: '$120T vs $1.3T',
        category: 'competitive',
      },
      {
        headline: 'Stablecoin Scale Gap',
        detail: 'Circle\'s USDC ($75B) and Tether\'s USDT ($163B) control 90%. RLUSD at $1.26B is 60x smaller. JPMorgan projects Circle at $220B by 2027.',
        metric: '60x gap',
        category: 'competitive',
      },
      {
        headline: 'Institutional Momentum',
        detail: 'XRP institutional inflows ($3.69B in 2025) surged 500% YoY, outpacing Solana and Ethereum. Strong positioning despite competitive pressures.',
        metric: '500% YoY',
        category: 'traction',
      },
      {
        headline: 'SWIFT Validates & Competes',
        detail: 'ISO 20022 migration + blockchain via Chainlink/ConsenSys. Validates Ripple\'s thesis while positioning as hybrid hub, not obsolete legacy.',
        category: 'competitive',
      },
      {
        headline: 'Multi-Winner Fragmentation',
        detail: 'Polygon-Flutterwave ($40B), Stellar-Visa, Hedera-CBDCs, Ripple-banks each dominate different verticals. No winner-take-all outcome.',
        category: 'market',
      },
    ],
    strategicImperative: {
      challenge: 'XRP\'s speed advantage fails to dislodge entrenched players. Network effects trump performance—SWIFT\'s 11,500 institutions create insurmountable switching costs.',
      insight: 'SWIFT\'s blockchain integration validates thesis but fragments market. No single winner emerges—convergence creates fragmentation.',
      imperative: 'Orchestrate the hybrid stack—win by enabling interoperability (XRP + RLUSD + partnerships), not displacing competitors.',
    },
  },
  {
    id: 'culture',
    number: '06',
    title: 'Culture',
    subtitle: 'Cultural Context & Zeitgeist',
    icon: '★',
    color: '#5A7A9A',
    tldr: '86% of institutions plan crypto adoption. Gen Z 4x more likely to own crypto than retirement accounts. Political polarization threatens category legitimacy.',
    keyInsights: [
      {
        headline: 'Institutional Legitimacy Surge',
        detail: 'BlackRock Bitcoin ETF hit $50B+ AUM in under one year. 86% of institutions holding or planning crypto by end of 2025. Cultural mainstreaming achieved.',
        metric: '86% institutions',
        category: 'market',
      },
      {
        headline: 'Generational Banking Disruption',
        detail: 'Gen Z 4x more likely to own crypto (42%) than retirement accounts (11%). 70% choose banks based on values alignment. Crypto = cultural identity.',
        metric: '4x more likely',
        category: 'market',
      },
      {
        headline: 'Stablecoins Reframe Legitimacy',
        detail: '$27.6T annual volume surpasses Visa/Mastercard combined. Achieved legitimacy by "stopping being crypto products and acting like infrastructure."',
        metric: '$27.6T volume',
        category: 'market',
      },
      {
        headline: 'Political Polarization Risk',
        detail: 'Trump crypto stance transformed policy into "cultural and political symbolism." Stalling bipartisan legislation and creating perception risk.',
        category: 'regulatory',
      },
      {
        headline: 'Emerging Market Resonance',
        detail: 'APAC up 69% YoY, Latin America 63%, Sub-Saharan Africa 52%. Driven by practical use cases—6.5% traditional remittance fees vs crypto\'s 1%.',
        metric: '69% APAC growth',
        category: 'market',
      },
    ],
    strategicImperative: {
      challenge: 'Institutional adoption signals mainstream acceptance, yet crypto remains culturally polarized—politicized, fragmented by tribalism.',
      insight: 'Stablecoins achieved legitimacy by abandoning "crypto" positioning for "infrastructure" framing. Payment utility transcends speculation.',
      imperative: 'Position as "payment infrastructure trusted by 300+ banks"—not crypto asset. Bridge generational trust gap by demonstrating utility over speculation.',
    },
  },
];

export const getSection = (id: string): StrategicSection | undefined => {
  return sections.find((s) => s.id === id);
};

export const getSectionIds = (): string[] => {
  return sections.map((s) => s.id);
};
