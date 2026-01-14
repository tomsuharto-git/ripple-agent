// Ripple Deep Dive - Comprehensive Research Topics
// Based on extensive research compilation (January 2026)

export interface DeepDiveSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  summary: string;
  sections: {
    title: string;
    content: string;
    highlights?: { label: string; value: string }[];
  }[];
}

export const deepDiveTopics: DeepDiveSection[] = [
  {
    id: 'business',
    number: '01',
    title: 'The Business',
    subtitle: 'Company, Valuation & Revenue Reality',
    icon: '◇',
    color: '#0096E4',
    summary: '$40B valuation on $583K revenue. $4B acquisition spree. The gap between hype and fundamentals.',
    sections: [
      {
        title: 'What Ripple Actually Is',
        content: `Ripple Labs is a San Francisco-based fintech company that operates four main businesses: RippleNet (300+ financial institutions for cross-border payments), On-Demand Liquidity/ODL (using XRP as bridge currency), RLUSD (a $1.3B market cap stablecoin), and Enterprise Services (custody, prime brokerage, treasury management via acquisitions).

Founded in 2012 as OpenCoin, renamed Ripple Labs in 2015. Currently private with $40B valuation (November 2025). 925 employees, 310 in engineering. Critical distinction: Ripple Labs (company) ≠ XRP (cryptocurrency). Ripple created XRP but doesn't "own" the XRP Ledger (open source).`,
        highlights: [
          { label: 'Valuation', value: '$40B' },
          { label: 'Employees', value: '925' },
          { label: 'XRP Control', value: '~42% supply' },
        ],
      },
      {
        title: 'The Valuation-Revenue Gap',
        content: `Forbes called Ripple a "crypto zombie" — and the numbers explain why:

2023 Fee Revenue: $583,000
2025 Valuation: $40,000,000,000
Valuation-to-revenue ratio: ~68,000x

Where the money actually comes from: XRP sales from treasury holdings, RippleNet licensing/transaction fees, and acquisitions (Hidden Road generates revenue from prime brokerage). The valuation isn't based on revenue — it's based on belief in what XRP could become.`,
        highlights: [
          { label: '2023 Revenue', value: '$583K' },
          { label: 'V/R Ratio', value: '68,000x' },
        ],
      },
      {
        title: '2025 M&A Spree',
        content: `Ripple went on a $4B acquisition spree in 18 months:

• Hidden Road ($1.25B) - Prime broker, $3T annual clearing
• GTreasury (~$1B) - Treasury management platform
• Rail ($200M) - Stablecoin payments infrastructure
• Palisade (Undisclosed) - Digital asset custody

The strategy: buy legitimacy faster than you can build it. GTreasury alone processes $12.5T in payment volume annually — immediate validation for Ripple's enterprise pivot.`,
        highlights: [
          { label: 'Total M&A', value: '~$4B' },
          { label: 'Hidden Road Clearing', value: '$3T/year' },
        ],
      },
      {
        title: 'Leadership',
        content: `Brad Garlinghouse (CEO): Yahoo/AOL background, famous for "Peanut Butter Manifesto." Net worth ~$10B from XRP holdings. Combative with regulators, media-savvy. Spent $150M on SEC defense over 4 years. Keeps Twitter followers at exactly 589.

Monica Long (President): Employee #12 since 2013. Runs all business, product, engineering. Key architect of enterprise pivot.

Stuart Alderoty (CLO): 35-year legal veteran. Led SEC litigation strategy. Senate testimony, 60 Minutes appearances.

Chris Larsen (Co-founder/Executive Chairman): Net worth $3.1B. Major political donor (Harris campaign). Less visible day-to-day but still influential.`,
      },
      {
        title: 'Company Culture Reality',
        content: `Glassdoor tells a different story than press releases:

Rating: 2.9/5
Recommend to friend: 40%
CEO approval: Mixed

Common complaints: "Toxic management," "No clear product direction," "Silent layoffs," Remote work confusion.

Positives: Good benefits/compensation, mission-driven employees, strong technical talent.

The tension: External narrative of crypto pioneer vs. internal reports of unclear strategy and management issues.`,
        highlights: [
          { label: 'Glassdoor', value: '2.9/5' },
          { label: 'Recommend', value: '40%' },
        ],
      },
    ],
  },
  {
    id: 'technology',
    number: '02',
    title: 'The Technology',
    subtitle: 'XRPL, RippleNet, RLUSD & Roadmap',
    icon: '⬡',
    color: '#00D4FF',
    summary: '3-5 second settlement, 1,500 TPS, $0.0002 per transaction. The tech specs behind the hype.',
    sections: [
      {
        title: 'XRP Ledger Specs',
        content: `The XRP Ledger is technically impressive:

• Consensus: Byzantine Fault Tolerance (not PoW/PoS)
• Speed: 3-5 second settlement
• Capacity: 1,500 TPS
• Uptime: 10+ years, zero downtime
• Cost: $0.0002 per transaction

The decentralization debate: 35 validators on default Unique Node List. Ripple controls ~42% of XRP supply. More centralized than Bitcoin/Ethereum, less than private blockchains. Critics call it "centralized garbage." Supporters call it "fast enough to work."`,
        highlights: [
          { label: 'Settlement', value: '3-5 sec' },
          { label: 'TPS', value: '1,500' },
          { label: 'Cost/tx', value: '$0.0002' },
        ],
      },
      {
        title: 'RippleNet Products',
        content: `On-Demand Liquidity (ODL): Uses XRP as bridge currency. Eliminates pre-funded nostro/vostro accounts. Claims 60%+ capital requirement reduction. $15B processed in 2024.

RippleNet Cloud: Enterprise payment orchestration. 300+ institutions, 90+ payout markets. Can be used WITHOUT XRP — and most do.

The dirty secret: Only 40% of RippleNet partners actually use XRP for transactions. 60% use it like SWIFT — messaging infrastructure without the token. "300 banks use Ripple" ≠ "300 banks use XRP."`,
        highlights: [
          { label: 'ODL Volume', value: '$15B (2024)' },
          { label: 'Payout Markets', value: '90+' },
          { label: 'XRP Usage', value: '40%' },
        ],
      },
      {
        title: 'RLUSD Stablecoin',
        content: `Ripple's answer to USDC/USDT:

• Market Cap: $1.3B (reached $1B in 7 months)
• Regulation: NYDFS charter, pursuing OCC federal charter
• Blockchains: XRPL, Ethereum, expanding to L2s (Optimism, Base, Ink)
• Strategy: Institutional settlement stability (addresses XRP volatility concern)

The irony: 88% of RLUSD supply is on Ethereum, not XRPL. Ripple's own stablecoin prefers a competitor's blockchain.`,
        highlights: [
          { label: 'Market Cap', value: '$1.3B' },
          { label: 'Time to $1B', value: '7 months' },
          { label: 'On Ethereum', value: '88%' },
        ],
      },
      {
        title: '2026 Roadmap',
        content: `What's coming:

• XRPL EVM Sidechain: Launched June 2025, smart contract capability
• Zero-Knowledge Proofs: Privacy-preserving transactions
• Interoperability: Axelar + Wormhole bridges
• Institutional DeFi: Native lending protocol planned

The vision: Transform from "crypto payment rail" to "full-stack digital asset infrastructure." Whether the tech can deliver faster than competitors is the open question.`,
      },
    ],
  },
  {
    id: 'lawsuit',
    number: '03',
    title: 'The Lawsuit',
    subtitle: 'SEC Battle, Settlement & Clarity',
    icon: '⚖',
    color: '#5A7A9A',
    summary: 'Four years, $150M in legal fees, 75,000 affidavits. The lawsuit that defined XRP.',
    sections: [
      {
        title: 'The SEC Case Timeline',
        content: `December 2020: SEC files lawsuit claiming XRP is an unregistered security. Charges Ripple Labs, CEO Brad Garlinghouse, and co-founder Chris Larsen.

2021-2023: Four years of legal battle. $150M spent on defense. MoneyGram partnership collapses. XRP delisted from major exchanges.

July 13, 2023: Judge Analisa Torres ruling — programmatic XRP sales to retail are NOT securities. Institutional sales are. A partial victory that sent XRP up 96% in 24 hours.

May 2025: Final settlement reached. $2B demand reduced to $50M. Full regulatory clarity achieved.`,
        highlights: [
          { label: 'Legal Costs', value: '$150M' },
          { label: 'Initial Demand', value: '$2B' },
          { label: 'Final Settlement', value: '$50M' },
        ],
      },
      {
        title: 'The 75,000 Affidavits',
        content: `The community's most significant act:

Attorney John Deaton mobilized 75,000+ XRP holders to submit affidavits supporting Ripple. Not lawyers. Not lobbyists. Reddit users doing legal research in their spare time.

Judge Torres cited XRP Holder Affidavits among only a few dozen exhibits referenced in her ruling.

Deaton: "No credible person can argue that the 'XRP Army' didn't make a difference."

This is unprecedented — a retail community influencing federal court ruling through collective legal action.`,
        highlights: [
          { label: 'Affidavits', value: '75,000+' },
          { label: 'Cited in Ruling', value: 'Yes' },
        ],
      },
      {
        title: 'The Torres Ruling',
        content: `The key legal distinction:

Programmatic Sales (to retail on exchanges): NOT securities. XRP token itself is not inherently a security.

Institutional Sales (direct to institutions): ARE securities under Howey test. These buyers had investment expectations tied to Ripple's efforts.

What this means: XRP can be freely traded on retail exchanges. The token is legally separated from Ripple Labs' fundraising activities. Other cryptos don't have this clarity.

The "Hinman docs" — internal SEC emails showing favoritism toward Ethereum — became part of the discovery and fueled claims of selective enforcement.`,
      },
      {
        title: 'Clarity as Differentiator',
        content: `Post-settlement, XRP has something no other major crypto has: definitive legal clarity.

• Bitcoin: Commodity (per CFTC, not SEC-litigated)
• Ethereum: "Sufficiently decentralized" (Hinman speech, not law)
• Solana: No ruling, regulatory uncertainty
• XRP: Federal court ruling on token status

This matters for institutions. Banks and asset managers can now hold/transact XRP without securities law concerns. The lawsuit that nearly killed XRP became its competitive moat.

"Compliance as rebellion" — the only crypto that fought the SEC and won.`,
        highlights: [
          { label: 'Status', value: 'Court Clarity' },
          { label: 'ETF Eligible', value: 'Yes' },
        ],
      },
    ],
  },
  {
    id: 'competition',
    number: '04',
    title: 'The Competition',
    subtitle: 'SWIFT, Circle & Crypto Tribal Wars',
    icon: '◆',
    color: '#0096E4',
    summary: 'SWIFT processes $6T daily vs Ripple\'s $500M. The "SWIFT killer" narrative is dead.',
    sections: [
      {
        title: 'SWIFT Reality Check',
        content: `The "SWIFT killer" narrative vs. reality:

| Metric | SWIFT | Ripple |
|--------|-------|--------|
| Daily Volume | $6 trillion | ~$500M |
| Institutions | 11,000+ | 300+ |
| Countries | 200+ | 55+ |
| Market Share | ~95% | ~0.01% |

September 2025: SWIFT chose Linea blockchain (not XRP) for its blockchain pilot. The "SWIFT killer" narrative is officially dead.

The future is coexistence via ISO 20022 messaging standard, not replacement. Ripple wins specific corridors; SWIFT keeps the network.`,
        highlights: [
          { label: 'SWIFT Daily', value: '$6T' },
          { label: 'Ripple Daily', value: '~$500M' },
          { label: 'Gap', value: '12,000x' },
        ],
      },
      {
        title: 'Stablecoin Competition',
        content: `RLUSD vs. the giants:

• Tether (USDT): $163B market cap
• Circle (USDC): $68B market cap
• Ripple (RLUSD): $1.3B market cap

The gap: USDC is 52x larger than RLUSD.

Ripple attempted to acquire Circle for $11B in 2025. Offer rejected. Circle launched competing payments network.

RLUSD strategy: Don't compete on DeFi volume. Win on regulatory compliance and institutional trust. NYDFS charter + pursuing OCC federal charter.`,
        highlights: [
          { label: 'USDC', value: '$68B' },
          { label: 'RLUSD', value: '$1.3B' },
          { label: 'Gap', value: '52x' },
        ],
      },
      {
        title: 'Crypto Tribal Hierarchy',
        content: `The unspoken pecking order:

Tier 1: Bitcoin Maximalists — "Only pure cryptocurrency," digital gold
Tier 2: Ethereum — Smart contracts, builder culture
Tier 3: Solana — "ETH killer," meme culture, momentum
Mid: Payment/Utility (Cardano, BCH) — Mocked for slow development
Bottom: Meme Coins — Dismissed as speculation
Pariah: XRP — "Centralized shitcoin," "banker's coin"

XRP faces unique disdain: centralization concerns, institutional focus ("banker's coin"), aggressive community behavior ("cult"), historical underperformance during bull markets.

Max Keiser: "Centralized garbage going to $0.01."
Robert Breedlove: "XRP is a psychological operation designed to trick retail investors."`,
      },
      {
        title: 'Solana Rivalry',
        content: `The hottest crypto beef:

When Western Union announced building on Solana, Helius CEO tweeted: "This is 9/11 for XRP."

Solana's official account shared a reworked version of the legendary "589" castle meme placing Solana in the dominant position — viewed as a direct attack by XRP community.

The rivalry is asymmetric: Solana community sees XRP as irrelevant; XRP community sees Solana as existential threat.

Reality: Solana attracted 7,625 new developers in 2024, surpassing Ethereum. SOL revenue: $2.5B YTD 2025 vs ETH: $1.4B. Momentum matters.`,
        highlights: [
          { label: 'SOL New Devs', value: '7,625' },
          { label: 'SOL Revenue', value: '$2.5B' },
        ],
      },
    ],
  },
  {
    id: 'community',
    number: '05',
    title: 'The Community',
    subtitle: 'XRP Army, Cultural Codes & 589 Lore',
    icon: '★',
    color: '#00D4FF',
    summary: '"Most organized community in crypto" — also called cult-like. The asset and the liability.',
    sections: [
      {
        title: 'XRP Army Origin Story',
        content: `The term "XRP Army" was initially used as an insult — outsiders mocking the community's aggressive devotion. They reclaimed it as identity.

The SEC lawsuit (December 2020) acted as the call to arms. Rather than destroying the movement, it created a shared enemy and "underdog vs. establishment" narrative.

Key stats:
• r/XRP: 408K members
• r/Ripple: Hundreds of thousands
• 5M+ social media followers across platforms

Bitwise: "One of the most organized, vocal, and resilient communities in crypto."
Mike Novogratz: "Their loyalty matches Bitcoin's fanbase."`,
        highlights: [
          { label: 'r/XRP', value: '408K' },
          { label: 'Social Reach', value: '5M+' },
        ],
      },
      {
        title: 'The 589 Legend',
        content: `Around 2017-2018, a pseudonymous figure called "Bearableguy123" (BG123) appeared on Reddit posting cryptic visual riddles featuring chess pieces, crowns, and recurring numbers.

The Prophecy: BG123's wildest prediction was that XRP would reach $589 by end of 2018. It never happened.

But 589 became sacred:
• Brad Garlinghouse keeps his Twitter followers at exactly 589
• Meme coin "$589" exists on XRPL
• Community members use "589" in handles (@ARMY_XRP589)
• ARMY token has 589 million supply

589 is no longer a price target — it's cultural identity. A symbol of long-term belief, community unity, and the dream scenario.`,
        highlights: [
          { label: 'Origin', value: '2017-2018' },
          { label: 'Status', value: 'Sacred Lore' },
        ],
      },
      {
        title: 'Cultural Codes',
        content: `Key phrases that identify XRP Army members:

• "Clarity" — THE victory word from SEC win
• "Right side of history" — Mantra since 2020, now validated
• "We shall prevail" — Primary rallying cry
• "#XRPTheStandard" — Adoption vision
• "#0doubt" — Unwavering conviction
• "Zerps" — Slang for XRP tokens

Key figures:
• David Schwartz (JoelKatz) — CTO Emeritus, called "True OG"
• John Deaton — "Community hero" who mobilized 75K affidavits
• Brad Garlinghouse — CEO, 1M+ Twitter followers
• Bearableguy123 — Mysterious prophet, "Where Is Our Favorite Bear?"`,
      },
      {
        title: 'Asset vs. Liability',
        content: `THE XRP ARMY AS ASSET:
• Regulatory influence: 75,000 affidavits cited in ruling
• Market relevance: Kept XRP in conversation during 4-year silence
• Organization: Multi-channel amplification, crisis mobilization
• ETF catalyst: Community advocacy may have triggered institutional action

THE XRP ARMY AS LIABILITY:
• Cult perception: "Last true cult left in crypto — ships nothing"
• Harassment history: Called Messari founder's wife, recited her birthday
• Brigading: "Coordinated amplification that isn't organic"
• Toxicity: "Called 'sheep, weak, or rape victim blamer' for disagreeing"

Fortune: "The XRP Army is probably its own worst enemy."

Strategic verdict: Controllable asset requiring active management. Amplifiers who need direction, not gatekeepers who control messaging.`,
      },
    ],
  },
  {
    id: 'future',
    number: '06',
    title: 'The Future',
    subtitle: 'IPO, Predictions & Catalysts',
    icon: '▲',
    color: '#5A7A9A',
    summary: '"No plan, no timeline" for IPO. Price targets range $2.71-$15. The bull and bear cases.',
    sections: [
      {
        title: 'IPO Status',
        content: `Current stance: "No plan, no timeline" — Monica Long, November 2025

Why no IPO:
• $500M raise provides capital without disclosure burden
• Strong balance sheet doesn't require public markets
• Avoids quarterly earnings pressure
• 25%+ share buyback in recent years

When IPO becomes likely:
• Enterprise services hit $500M-$1B ARR
• RLUSD achieves top-3 stablecoin status
• Political/strategic considerations shift

The message: Ripple doesn't need public markets. They're choosing strategic flexibility over public accountability.`,
        highlights: [
          { label: 'IPO Status', value: 'No Plans' },
          { label: 'Recent Raise', value: '$500M' },
        ],
      },
      {
        title: 'Price Predictions',
        content: `What analysts are saying:

| Source | 2026 Target | 2027 Target |
|--------|-------------|-------------|
| Standard Chartered | $8 | $12.50 |
| Consensus Range | $2.71-8.60 | $4-15 |
| Bear Case | $2-3 | $2-4 |
| Bull Case | $10-15 | $20+ |

The AI models give 18% probability to $10 by end of 2026.

589? Still aspirational. The community treats it as symbolic, not literal.

The honest answer: Nobody knows. Price depends on macro crypto sentiment, regulatory developments, and actual adoption metrics — not fundamentals.`,
        highlights: [
          { label: '2026 Consensus', value: '$2.71-$8.60' },
          { label: '$10 Probability', value: '18%' },
        ],
      },
      {
        title: '2026 Catalysts',
        content: `BULLISH:
• RLUSD Japan launch (Q1 2026 via SBI)
• OCC banking charter operational
• XRP ETF inflows continue ($1.3B and growing)
• Market Structure Bill passes Congress
• More ODL corridor launches

BEARISH:
• SWIFT blockchain pilot succeeds without XRP
• Circle/USDC maintains stablecoin dominance
• Regulatory reversal with administration change
• XRP volatility continues deterring banks
• On-chain activity keeps declining despite partnerships`,
      },
      {
        title: 'Most Likely Scenario',
        content: `Based on current trajectory:

• Continued dominance in Asia-Pacific remittance corridors
• RLUSD grows but doesn't overtake USDC
• Coexistence with SWIFT via ISO 20022 (not replacement)
• Slow conversion of messaging partners to ODL users (40% → 50%?)
• Enterprise services generate meaningful revenue by 2027

What doesn't happen:
• "SWIFT killer" moment
• $589 (sorry)
• IPO in 2026

The realistic bull case: XRP becomes the de facto bridge asset for specific emerging market corridors while RLUSD gains institutional traction. Not revolutionary. Incrementally valuable.`,
      },
    ],
  },
];

export const getDeepDiveTopic = (id: string): DeepDiveSection | undefined => {
  return deepDiveTopics.find((topic) => topic.id === id);
};

export const getDeepDiveIds = (): string[] => {
  return deepDiveTopics.map((topic) => topic.id);
};
