// Ripple Creative Insights - 10 Provocative Findings
// Extracted from comprehensive research (January 2026)

export interface CreativeInsight {
  id: string;
  number: string;
  title: string;
  hook: string;
  detail: string;
  creativeAngle: string;
  category: 'culture' | 'business' | 'community' | 'market' | 'competitive';
  icon: string;
}

export const insights: CreativeInsight[] = [
  {
    id: 'ceo-589',
    number: '01',
    title: "The CEO's 589 Easter Egg",
    hook: 'Brad Garlinghouse deliberately keeps his Twitter follower count at exactly 589.',
    detail: `589 references a cryptic prophecy from an anonymous Reddit figure called "Bearableguy123" who predicted XRP would hit $589 in 2018. It never happened — but the number became sacred community lore.

The CEO of a $40 billion company manually maintains a meme number as a wink to his community. He has over 1 million followers, but the displayed count stays at 589.

This isn't CEO cosplay. It's a signal: "I'm one of you. I speak your language. I believe in the same dream."`,
    creativeAngle: 'Leadership that speaks in cultural codes. The most powerful signal isn\'t a press release — it\'s a follower count.',
    category: 'culture',
    icon: '🎯',
  },
  {
    id: 'affidavits',
    number: '02',
    title: 'The Reddit Army That Changed Federal Law',
    hook: '75,000 retail investors submitted court affidavits that were cited in the SEC ruling.',
    detail: `Not lawyers. Not lobbyists. Reddit users doing legal research in their spare time influenced a federal judge's decision.

Attorney John Deaton mobilized the XRP community to submit individual statements supporting Ripple. Judge Torres cited these affidavits among only a few dozen exhibits in her ruling.

This is unprecedented. A retail community — often dismissed as "cult-like" — demonstrated organizational power that altered federal legal proceedings.

Deaton: "No credible person can argue that the 'XRP Army' didn't make a difference."`,
    creativeAngle: 'Grassroots legal action as brand proof. The community didn\'t just support — they litigated.',
    category: 'community',
    icon: '⚖️',
  },
  {
    id: 'hated-loved',
    number: '03',
    title: 'The "Most Hated / Most Loved" Paradox',
    hook: 'XRP is "most hated by institutions, most loved by retail."',
    detail: `John Deaton's quote captures XRP's unique market position: the same asset occupies opposite poles of trust simultaneously.

Institutions see: "Centralized garbage," regulatory risk, unprofessional community, speculative volatility.

Retail sees: Vindication after 4-year lawsuit, underdog victory over SEC, life-changing money potential, community brotherhood.

The hate from one group fuels the love from the other. Bitcoin maximalists calling XRP a "shitcoin" just strengthens XRP Army loyalty.`,
    creativeAngle: 'A brand that\'s polarizing by design. The hate IS the proof of differentiation.',
    category: 'competitive',
    icon: '💔',
  },
  {
    id: 'compliance-rebellion',
    number: '04',
    title: 'Compliance Is the New Punk Rock',
    hook: 'The only crypto that won against the SEC is now the rebel.',
    detail: `For years, XRP was mocked as the "banker's coin" — too corporate, too compliant, too boring.

Then the SEC sued. Four years of legal warfare. $150M in legal fees. MoneyGram partnership collapse. Exchange delistings.

And XRP won.

Now it's the only major crypto with definitive legal clarity. Everyone else — Bitcoin, Ethereum, Solana — still operates in regulatory gray zones.

The "corporate sellout" became the one that beat the government. Compliance wasn't weakness — it was strategy.`,
    creativeAngle: 'Flip the criticism. Being compliant = the underdog victory. The rule-follower won the fight.',
    category: 'business',
    icon: '🔥',
  },
  {
    id: '300-banks-lie',
    number: '05',
    title: 'The 300 Banks Lie',
    hook: '"300+ banks use RippleNet" is technically true but functionally misleading.',
    detail: `The headline number: 300+ financial institutions on RippleNet.

The reality: Only 40% actually use XRP for transactions.

The other 60% use RippleNet like SWIFT — messaging infrastructure without the token. They get faster transaction coordination, but they're not touching cryptocurrency.

"300 banks use Ripple" ≠ "300 banks use XRP"

The partnership count is a marketing number. The adoption count is smaller. The gap between headline and reality is where the truth lives.`,
    creativeAngle: 'The gap between headline and reality is the insight. What would "actually using XRP" look like as a campaign?',
    category: 'business',
    icon: '📊',
  },
  {
    id: 'reddit-predicts',
    number: '06',
    title: 'Reddit Predicts Prices 5-11 Days Early',
    hook: 'Academic research confirms Reddit post volume leads crypto prices by 5-11 days.',
    detail: `Multiple peer-reviewed studies (IEEE, arXiv, MDPI) found that Reddit sentiment and post volume precede crypto price movements.

Key findings:
• Correlation up to 0.83 for some coins
• Simple strategy (buy when posts increase) = 3x returns
• Bitcoin posts lead price by 11 days; Ethereum by 5 days
• January 2021: Single Dogecoin Reddit post triggered +800% surge ($7.17B market cap increase in 24 hours)

Institutions actively monitor Reddit. Santiment, LunarCrush, and BittsAnalytics sell social sentiment data to hedge funds.

The shitposters are the signal.`,
    creativeAngle: 'Social sentiment as leading indicator. The memes ARE the alpha.',
    category: 'market',
    icon: '📈',
  },
  {
    id: 'reclaimed-insult',
    number: '07',
    title: 'The Reclaimed Insult',
    hook: '"XRP Army" was originally an insult.',
    detail: `Critics used "XRP Army" to mock the community's aggressive devotion — the cult-like behavior, the brigading, the "to the moon" spam.

The community reclaimed it. Turned it into a badge of honor. Now there's official merchandise, Twitter handles with "Army," and a self-identity built around the term.

Same playbook as "Yankee Doodle" — an insult from outsiders becomes rallying cry for insiders.

The SEC lawsuit supercharged this. Four years of being called idiots for holding XRP, then winning the case. "XRP Army" now means "the believers who were right."`,
    creativeAngle: 'Brand identities forged in opposition. The name your enemies give you is the one that sticks.',
    category: 'culture',
    icon: '⚔️',
  },
  {
    id: 'valuation-gap',
    number: '08',
    title: '$40 Billion / $583 Thousand',
    hook: 'Ripple\'s $40B valuation sits on $583,000 in 2023 fee revenue — a 68,000x gap.',
    detail: `Forbes called Ripple a "crypto zombie" and the numbers support it:

2023 Fee Revenue: $583,000
2025 Valuation: $40,000,000,000
Valuation-to-revenue ratio: ~68,000x

For comparison, Tesla at its most speculative was ~20x revenue.

Where does the value come from? XRP treasury sales, acquisition targets (Hidden Road does generate revenue), and — mostly — belief in what XRP could become.

The valuation isn't based on what Ripple does today. It's priced on optionality.`,
    creativeAngle: 'The most valuable assets are optionality, not operations. What\'s the valuation of potential?',
    category: 'business',
    icon: '💰',
  },
  {
    id: 'stablecoins-visa',
    number: '09',
    title: 'Stablecoins Passed Visa + Mastercard Combined',
    hook: '$27.6 trillion in annual stablecoin volume now exceeds Visa and Mastercard combined.',
    detail: `The legitimacy shift happened when nobody was watching:

Stablecoin annual volume: $27.6T
Visa annual volume: ~$14T
Mastercard annual volume: ~$8T

Stablecoins achieved this by "stopping being crypto products and acting like infrastructure." No moon talk. No lambos. Just boring payment rails.

RLUSD's strategy follows this playbook: NYDFS charter, pursuing OCC federal banking charter, institutional settlement focus. Stop sounding like crypto. Start sounding like infrastructure.`,
    creativeAngle: 'The winning strategy was to stop sounding like crypto. Infrastructure framing > speculation framing.',
    category: 'market',
    icon: '🏦',
  },
  {
    id: '911-comment',
    number: '10',
    title: 'The 9/11 Comment',
    hook: 'When Western Union chose Solana over XRP, a Solana executive tweeted: "This is 9/11 for XRP."',
    detail: `Helius CEO's tweet after Western Union announced building on Solana: "This is 9/11 for XRP."

Earlier, Solana's official account shared a reworked version of XRP's legendary "589 castle" meme — placing Solana in the dominant position. The XRP community viewed this as a direct attack.

This isn't corporate competition. It's tribal warfare. Every loss is someone else's celebration. Every partnership announcement triggers response memes from rivals.

The crypto communities weaponize each other's failures as content. Brand combat is literal.`,
    creativeAngle: 'The competition isn\'t just positioning — it\'s existential trolling. Every loss is someone else\'s celebration.',
    category: 'competitive',
    icon: '💥',
  },
];

// Bonus insight (not in main 10)
export const bonusInsight: CreativeInsight = {
  id: 'wifes-birthday',
  number: 'BONUS',
  title: "The Wife's Birthday Incident",
  hook: 'After Messari published a critical XRP report, someone called the founder\'s wife and recited her birthday.',
  detail: `Messari published analysis critical of XRP. In response, someone from the community called the founder's wife and recited her birthday — an intimidation tactic.

Fortune reported: "Flood of accounts creating torrent of thousands of angry notifications."

Researcher Geoff Golberg called it "coordinated amplification that isn't organic."

Fortune's conclusion: "The XRP Army is probably its own worst enemy."

The community's passion is both its greatest asset (75K affidavits) and its greatest liability (harassment that alienates institutions).`,
  creativeAngle: 'The community is an asset AND a liability. How do you harness energy without inheriting reputation?',
  category: 'community',
  icon: '⚠️',
};

export const getInsight = (id: string): CreativeInsight | undefined => {
  return insights.find((insight) => insight.id === id);
};

export const getCategoryColor = (category: CreativeInsight['category']): string => {
  const colors = {
    culture: '#00D4FF',
    business: '#0096E4',
    community: '#5A7A9A',
    market: '#00D4FF',
    competitive: '#0096E4',
  };
  return colors[category];
};
