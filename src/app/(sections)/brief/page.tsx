'use client';

import { useState } from 'react';

type TabType = 'rfp' | 'analysis' | 'roast';

interface BriefSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  content: React.ReactNode;
}

const briefSections: BriefSection[] = [
  {
    id: 'situation',
    number: '01',
    title: 'The Situation',
    subtitle: '12 years of silence, 4 years of legal limbo—now ready to roar',
    icon: '◈',
    color: '#0096E4',
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-white/90">
          XRP has been a <span className="font-bold text-white">top-5 crypto for 12+ years</span> but went silent during a 4-year SEC lawsuit.
          Competitors (SOL, ETH, Base) captured mindshare during XRP's legally-mandated quiet period.
          Now, post-lawsuit regulatory clarity gives XRP a rare "compliant crypto" positioning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { metric: '$50M', label: 'Campaign Budget', desc: 'Inclusive of media—real commitment' },
            { metric: '4 Years', label: 'Legal Silence', desc: 'SEC lawsuit forced quiet period' },
            { metric: 'First', label: 'Major Marketing Push', desc: 'Previously organic/grassroots only' },
            { metric: 'HIGH', label: 'Win Probability', desc: 'Real need, no incumbent agency' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(10, 22, 40, 0.6)',
                border: '1px solid rgba(0, 150, 228, 0.2)',
              }}
            >
              <span className="text-2xl font-bold block mb-1" style={{ color: '#0096E4' }}>{item.metric}</span>
              <span className="text-sm font-medium text-white block">{item.label}</span>
              <span className="text-xs text-white/50">{item.desc}</span>
            </div>
          ))}
        </div>
        <div
          className="p-4 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 150, 228, 0.15), rgba(0, 212, 255, 0.08))',
            border: '1px solid rgba(0, 150, 228, 0.3)',
          }}
        >
          <p className="font-medium text-white">
            <span className="text-white/60">The Unspoken Need:</span> They need to prove the SEC lawsuit didn't permanently damage XRP's cultural relevance—and that "institutional credibility" can coexist with crypto culture cool.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'barrier',
    number: '02',
    title: 'The Barrier',
    subtitle: 'The crypto community conflates "institutional" with "boring"',
    icon: '◆',
    color: '#ef4444',
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-white/90">
          XRP's biggest asset—regulatory clarity, institutional backing—reads as its biggest liability in crypto culture.
          The challenge isn't awareness. It's making institutional credibility feel <span className="font-bold text-white">rebellious rather than corporate</span>.
        </p>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wider" style={{ color: '#ef4444' }}>Critical Headwinds</p>
          {[
            { priority: 'Critical', issue: 'Brand perception as "legal trouble crypto"—lawsuit stigma lingers' },
            { priority: 'Critical', issue: 'Solana and Base captured the "cool" crypto narrative while XRP was silent' },
            { priority: 'High', issue: '"Institutional utility" messaging sounds boring to retail speculators' },
            { priority: 'High', issue: 'XRP community is passionate but insular—preaching to choir, not converting' },
            { priority: 'Medium', issue: 'Ripple/XRP conflation—retail doesn\'t understand they\'re different' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{
                background: 'rgba(10, 22, 40, 0.6)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
              }}
            >
              <span
                className="text-xs font-bold px-2 py-1 rounded uppercase"
                style={{
                  background: item.priority === 'Critical' ? 'rgba(239, 68, 68, 0.2)' :
                              item.priority === 'High' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                  color: item.priority === 'Critical' ? '#ef4444' :
                         item.priority === 'High' ? '#f59e0b' : '#9ca3af',
                }}
              >
                {item.priority}
              </span>
              <span className="text-white/80 text-sm">{item.issue}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'reframe',
    number: '03',
    title: 'The Reframe',
    subtitle: 'How do we make compliance the new punk rock?',
    icon: '★',
    color: '#22c55e',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <p className="text-sm uppercase tracking-wider text-white/40 mb-2">Old Frame</p>
            <p className="text-lg text-white/70">"How do we make XRP famous?"</p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#22c55e' }}>New Frame</p>
            <p className="text-lg font-bold text-white">"How do we make compliance the new punk rock?"</p>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-white/90">
          Everyone else is playing outside the rules. XRP played inside them—<span className="font-bold text-white">and won</span>.
          In a world of rug pulls, scams, and SEC crackdowns, being the asset that can't be shut down isn't boring.
          <span className="font-bold" style={{ color: '#22c55e' }}> It's the ultimate power move.</span>
        </p>
        <div
          className="p-6 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.08))',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}
        >
          <p className="text-xl font-bold text-white mb-2">
            "The only crypto that plays by the rules AND wins"
          </p>
          <p className="text-white/70">
            From "that coin with the lawsuit" to the asset that survived what would have killed any other.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'strategy',
    number: '04',
    title: 'Win Strategy',
    subtitle: 'The Survivor • The Bridge • Unavoidable',
    icon: '▲',
    color: '#0096E4',
    content: (
      <div className="space-y-4">
        {[
          {
            theme: 'The Survivor',
            icon: '⚔️',
            desc: 'XRP didn\'t just survive the SEC—it proved something no other major crypto has. Turn the lawsuit from stigma into badge of honor. 12 years, 4-year lawsuit, still standing, ready to run.',
            color: '#ef4444',
          },
          {
            theme: 'The Bridge',
            icon: '🌉',
            desc: 'Position XRP as the connection point—between retail and institutional, between crypto and TradFi, between speculation and utility. The asset that speaks both languages.',
            color: '#0096E4',
          },
          {
            theme: 'Unavoidable',
            icon: '⚡',
            desc: 'Take their language literally. Not "popular." Not "talked about." Unavoidable. Design everything around the impossibility of ignoring XRP—from Reddit threads to institutional boardrooms.',
            color: '#22c55e',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(10, 22, 40, 0.6)',
              border: `1px solid ${item.color}30`,
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl"
              style={{
                background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
              }}
            >
              {item.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-white">{item.theme}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
        <div
          className="p-4 rounded-xl mt-6"
          style={{
            background: 'rgba(0, 150, 228, 0.1)',
            border: '1px solid rgba(0, 150, 228, 0.2)',
          }}
        >
          <p className="text-sm text-white/80">
            <span className="font-bold text-white">Our Differentiation:</span> Everyone else will ignore the lawsuit—we weaponize it.
            Making "regulatory clarity" feel like a flex, not corporate speak.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'change',
    number: '05',
    title: 'The Change',
    subtitle: 'Transformation dimensions we need to drive',
    icon: '●',
    color: '#00D4FF',
    content: (
      <div className="space-y-4">
        {[
          {
            dimension: 'Brand Perception',
            from: '"That coin with the lawsuit"',
            to: '"The only crypto that plays by the rules AND wins"'
          },
          {
            dimension: 'Audience Behavior',
            from: 'Passive community, organic-only conversation',
            to: 'Active amplification, mainstream conversation'
          },
          {
            dimension: 'Cultural Position',
            from: 'Legacy coin that lost momentum',
            to: 'Comeback story—the OG that outlasted the doubters'
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(10, 22, 40, 0.4)',
              border: '1px solid rgba(0, 212, 255, 0.15)',
            }}
          >
            <p className="text-sm font-bold mb-3" style={{ color: '#00D4FF' }}>{item.dimension}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">From</p>
                <p className="text-white/60 text-sm">{item.from}</p>
              </div>
              <svg className="w-6 h-6 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#22c55e' }}>To</p>
                <p className="text-white font-medium text-sm">{item.to}</p>
              </div>
            </div>
          </div>
        ))}
        <div
          className="p-5 rounded-xl mt-6"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(34, 197, 94, 0.05))',
            border: '1px solid rgba(0, 212, 255, 0.2)',
          }}
        >
          <p className="text-sm font-bold text-white mb-2">The Hero Objective</p>
          <p className="text-xl font-bold gradient-text">
            Make XRP unavoidable—from Reddit threads to institutional boardrooms.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'audiences',
    number: '06',
    title: 'Target Audiences',
    subtitle: 'Four distinct groups, one unified campaign',
    icon: '◎',
    color: '#8B5CF6',
    content: (
      <div className="space-y-4">
        {[
          {
            audience: 'Retail Speculators',
            type: 'Primary',
            who: 'Active crypto traders looking for the next moon shot with institutional validation',
            insight: 'They want permission to believe—institutional backing validates their speculation',
            color: '#22c55e',
          },
          {
            audience: 'Crypto Influencers',
            type: 'Primary',
            who: 'YouTube/Twitter/TikTok creators who shape retail sentiment and trading behavior',
            insight: 'They\'re mercenaries for attention—give them a story worth telling',
            color: '#00D4FF',
          },
          {
            audience: 'Crypto-Curious Newcomers',
            type: 'Primary',
            who: 'Mainstream audiences with FOMO, intimidated by crypto complexity',
            insight: 'They want a "safe" entry point—regulatory clarity could BE that entry point',
            color: '#f59e0b',
          },
          {
            audience: 'Institutional Finance',
            type: 'Secondary',
            who: 'CFOs, treasury managers, fintech decision-makers exploring blockchain',
            insight: 'They want to say yes but need air cover—regulatory clarity is their permission slip',
            color: '#8B5CF6',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(10, 22, 40, 0.6)',
              border: `1px solid ${item.color}20`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-white">{item.audience}</span>
              <span
                className="text-xs font-medium px-2 py-1 rounded"
                style={{
                  background: item.type === 'Primary' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                  color: item.type === 'Primary' ? '#22c55e' : '#8B5CF6',
                }}
              >
                {item.type}
              </span>
            </div>
            <p className="text-sm text-white/60 mb-2">{item.who}</p>
            <p className="text-sm" style={{ color: item.color }}>
              <span className="font-medium">Insight:</span> {item.insight}
            </p>
          </div>
        ))}
      </div>
    ),
  },
];

// Client RFP Content Component
function ClientRFPContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      {/* Hero Header - Matching Get Smart Style */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span
            className="text-4xl"
            style={{ color: 'var(--color-primary)' }}
          >
            ◈
          </span>
          <span
            className="text-sm font-mono tracking-wider"
            style={{ color: 'var(--color-muted)' }}
          >
            CLIENT RFP / DECEMBER 2025
          </span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4 gradient-text">
          2026 XRP Awareness
        </h1>
        <p className="text-xl lg:text-2xl" style={{ color: 'var(--color-muted)' }}>
          Official Client Request for Proposal
        </p>
      </header>

      <div className="glass rounded-2xl p-8 lg:p-12 space-y-8">

        {/* Background and Business Challenge */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: 'var(--color-primary)' }}>◈</span>
            Background and Business Challenge
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>
              Since its inception, crypto has held the promise of rewiring the world's financial infrastructure by reducing friction, speeding up financial transactions, and enabling value to move like information - instant, reliable and at low cost - to the benefit of consumers and businesses alike.
            </p>
            <p>
              XRP sits at the center of this shift. Since its creation in 2012, XRP has been a top-5 digital asset, supported by the largest and most active global community in crypto and supercharged by Ripple's institutional credibility. Now, with long-awaited regulatory clarity in the U.S., XRP's shackles have been removed, and the asset is poised to take center stage in realizing crypto's potential.
            </p>
            <p>
              To date, XRP's growth has been organic, with only grass-roots, community-led efforts put behind growing awareness for the token. This was a deliberate choice on Ripple's part particularly during the lawsuit with the SEC, and efforts were instead focused on telling the XRP story through the lens of developers, which emphasized the technology, ecosystem, and developer community.
            </p>
            <p>
              This left the door open for other leading tokens (ex. BTC, ETH) to absorb mindshare and for new coins to scale (ex. SOL).
            </p>
            <p>
              There is an opportunity to grow awareness for XRP by capitalizing on its already strong foundation and amplifying it through targeted marketing efforts, including collaborations with respected and notable influencers, community engagement, strategic partnerships, campaigns, events, activations, and more.
            </p>
          </div>
        </section>

        {/* Primary Audiences */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: 'var(--color-primary)' }}>●</span>
            Primary Audiences
          </h2>
          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
            <li>Retail speculators</li>
            <li>Crypto influencers</li>
            <li>Crypto curious newcomers</li>
          </ul>
        </section>

        {/* Key Objective */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: '#22c55e' }}>▲</span>
            Key Objective
          </h2>
          <p className="text-white/80 leading-relaxed">
            We are seeking an advertising and/or experiential agency partner to develop and execute a brand awareness effort that:
          </p>
          <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
            <li>Positions XRP as a top digital asset with a very compelling future</li>
            <li>Differentiates XRP from competing tokens</li>
            <li>Increases awareness and understanding among both institutional and retail audiences</li>
            <li>Drives cultural relevance through compelling narratives, activations, and content</li>
            <li>Increases conversation about XRP's institutional utility and momentum</li>
          </ul>
          <p className="text-white/80 leading-relaxed mt-4">
            The partnership may include, but is not limited to, brand campaign development, production, experiential activations, social/influencer programs, and thought leadership amplification.
          </p>
        </section>

        {/* Challenge */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: '#ef4444' }}>◆</span>
            Challenge
          </h2>
          <p className="text-white/80 leading-relaxed">
            Growth in the digital asset market has been substantial since XRP's inception, and competitors have been able to absorb significant mindshare, especially while XRP's fate was in question throughout Ripple's lawsuit with the SEC.
          </p>
          <div className="mt-4">
            <p className="text-sm font-bold text-white mb-2">Key competitors:</p>
            <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
              <li>Bitcoin, Ethereum, Solana, Base, Canton</li>
              <li>Private enterprise chains: Stripe, JPMorgan, Circle</li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-white mb-2">What they're doing well:</p>
            <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
              <li><strong>Solana:</strong> simple narrative, community-driven culture, high-velocity developer ecosystem</li>
              <li><strong>Base/Coinbase:</strong> owned distribution, strong executive narrative, practical build kits</li>
              <li><strong>TradFi:</strong> institutional blockchain adoption and narrative leadership</li>
            </ul>
          </div>
          <p className="text-white/90 font-medium mt-4 italic">
            XRP must convey a message that is both simple and widely resonant.
          </p>
        </section>

        {/* Reasons to Believe */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: 'var(--color-secondary)' }}>★</span>
            Reasons to Believe
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-white mb-2">1. XRP is a functional asset — not just a network token</p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                <li>Utility extends beyond chain operations into real-world settlement, liquidity, cross-border payments</li>
                <li>XRP acts as a global bridge asset — connecting institutions, payment networks, and blockchains</li>
                <li>High liquidity makes XRP fast, predictable, and institution-grade</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-2">2. XRP has more than a decade of trust and security</p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                <li>10 years of uptime</li>
                <li>Proven reliability that institutions and developers depend on</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-2">3. Ripple + global community strength</p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                <li>Ripple continues to secure major partnerships and technological advancements</li>
                <li>XRP community is one of the largest and most engaged globally</li>
                <li>Highly respected public voices: Chris Larsen, Brad Garlinghouse, David Schwartz</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: '#8B5CF6' }}>◎</span>
            Differentiators
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-white mb-2">1. Regulatory clarity + institutional credibility</p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                <li>One of two digital assets with clear U.S. regulatory standing</li>
                <li>Ripple's global licensing and compliance give institutions confidence</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-2">2. Built for real financial use, not retail speculation</p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                <li>Purpose-built for payments, liquidity, and institutional tokenization</li>
                <li>Focus on the $130T global credit and capital markets (vs. retail DeFi)</li>
                <li>Attracts financial institutions with compliance, programmability, interoperability</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-2">3. First public institutional XRP treasury (Evernorth)</p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                <li>Over $1B in commitments</li>
                <li>Shifts XRP from a traded asset to a balance-sheet asset</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Budget & Timeline */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: '#22c55e' }}>$</span>
            Budget & Timeline
          </h2>
          <div
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <p className="text-2xl font-bold text-white mb-2">$50M USD</p>
            <p className="text-white/70 text-sm">Inclusive of media spend (media partner available if not done in-house)</p>
          </div>
          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4 mt-4">
            <li><strong>Dec:</strong> Issue RFP</li>
            <li><strong>Jan:</strong> Agency onboarding, campaign kickoff</li>
            <li><strong>ASAP:</strong> Campaign Launch</li>
          </ul>
        </section>

        {/* Pitch Ask */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: 'var(--color-primary)' }}>✦</span>
            Pitch Ask
          </h2>
          <p className="text-white/90 font-medium italic">
            Utilizing the existing XRP brand design system, develop a bold campaign platform and activation plan to showcase how you'd make XRP unavoidable — making it the most talked about digital asset from crypto chat forums on Reddit to institutional finance boardrooms.
          </p>
          <ol className="list-decimal list-inside text-white/80 space-y-2 ml-4 mt-4">
            <li>Provide a clear creative strategy to show why your campaign platform is right for our audience</li>
            <li>Show us how you'd bring the campaign to life across social, OOH, digital, events, influencer engagements, etc.</li>
            <li>Include at least one experiential activation (stunt, pop-up, sport or entertainment partnership, etc.)</li>
            <li>Describe how you would measure success</li>
            <li>Sketch an activation plan, including a budget breakdown and a proposed timeline</li>
            <li>Identify the team leads who will work day-to-day on our business</li>
          </ol>
        </section>

        {/* Evaluation Criteria */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span style={{ color: '#f59e0b' }}>⚡</span>
            What We'll Be Evaluating
          </h2>
          <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
            <li>Your team's ability to be strategic and creative thought partners</li>
            <li>Understanding of crypto culture and how to harness it to scale awareness</li>
            <li>Ability to utilize a blend of traditional and guerrilla marketing tactics to drive paid and organic buzz</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// Roast Content Component
function RoastContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">🔥</span>
          <span className="text-sm font-mono tracking-wider" style={{ color: '#ef4444' }}>
            STRATEGIC DOCUMENT ANALYSIS
          </span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">
          XRP / Awareness Campaign RFP
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
          The_Unspoken_Insecurity
        </p>
        <p className="text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
          XRP, a top-5 cryptocurrency, is seeking an agency to develop a $50M awareness campaign following the resolution of their SEC lawsuit. They want to position XRP as the leading digital asset across both retail and institutional audiences, driving cultural relevance and conversation.
        </p>
      </div>

      {/* 01 — The Core Truth */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#ef4444' }}>01</span>
          <span className="text-sm uppercase tracking-wider text-white/40">The Core Truth</span>
        </div>
        <div
          className="p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <p className="text-2xl lg:text-3xl font-bold text-white">
            XRP is afraid it missed its moment.
          </p>
        </div>
      </section>

      {/* 02 — What They're Not Saying */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#ef4444' }}>02</span>
          <span className="text-sm uppercase tracking-wider text-white/40">What They're Not Saying</span>
        </div>
        <p className="text-white/60 italic">5 truths buried in the document</p>

        <div className="space-y-4">
          {[
            {
              num: '01',
              title: '"Organic growth" is polite language for paralysis',
              content: 'The brief frames the lack of marketing as a "deliberate choice" during the SEC lawsuit. That\'s partially true. But the result is the same: Bitcoin became "digital gold." Ethereum became "programmable money." Solana became the "fast, fun chain." XRP became... the one in court.',
            },
            {
              num: '02',
              title: 'The lawsuit was a brand wound',
              content: 'Winning the case doesn\'t erase the association. For years, XRP was the coin the government was trying to kill. "We\'re legal now" isn\'t exactly a rallying cry. The brief buries this. They want to move on. But culture has a long memory.',
            },
            {
              num: '03',
              title: 'They\'re institutional in a world that rewards chaos',
              content: 'XRP\'s value proposition—cross-border payments, institutional settlement—is genuinely impressive. But it\'s also deeply unsexy. Solana has memecoins. Bitcoin has laser eyes. XRP has... settlement speed for banks?',
            },
            {
              num: '04',
              title: 'Loyalty isn\'t momentum',
              content: 'The "XRP Army" is real and devoted. But a passionate community holding through years of stagnation is not the same as a growing, culturally-relevant movement. They have believers. What they don\'t have is converts.',
            },
            {
              num: '05',
              title: '$50M is a bet, not a budget',
              content: 'This is a lot of money to spend on "awareness." Brands with clear positioning don\'t drop $50M to explain who they are. This is the spend of a brand that knows it has a perception problem and a closing window to fix it.',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="glass rounded-xl p-6"
              style={{ borderColor: 'rgba(239, 68, 68, 0.15)' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-sm font-mono px-2 py-1 rounded"
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                  }}
                >
                  {item.num}
                </span>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-white">{item.title}</p>
                  <p className="text-white/70 leading-relaxed">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — The Insight */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#f59e0b' }}>03</span>
          <span className="text-sm uppercase tracking-wider text-white/40">The Insight</span>
        </div>
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <p className="text-lg text-white leading-relaxed">
            The insecurity is that they built something useful but not exciting. And in crypto, excitement is the currency.
          </p>
        </div>
      </section>

      {/* 04 — The Tension */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#8B5CF6' }}>04</span>
          <span className="text-sm uppercase tracking-wider text-white/40">The Tension</span>
        </div>
        <p className="text-xl font-bold text-white">Caught between two worlds</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#8B5CF6' }}>The Institutional Play</p>
            <p className="text-white/80 leading-relaxed">
              They want to be the serious, compliant, enterprise-grade asset—but that story doesn't travel on social, doesn't meme, doesn't create culture.
            </p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
            }}
          >
            <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#00D4FF' }}>The Retail Energy Play</p>
            <p className="text-white/80 leading-relaxed">
              They want Reddit forums buzzing and influencers hyping—but their actual product isn't built for speculation, it's built for infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* 05 — The Problem */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#ef4444' }}>05</span>
          <span className="text-sm uppercase tracking-wider text-white/40">The Problem</span>
        </div>
        <div
          className="p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.02))',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          <p className="text-xl lg:text-2xl font-bold text-white mb-4">
            XRP doesn't know if it's a movement or a utility.
          </p>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            They're asking us to make them unavoidable across both worlds. But the brief doesn't resolve which world they actually belong to. And until they decide, the messaging will feel like what it is—a 12-year-old asset trying to convince people it's still relevant.
          </p>
        </div>
      </section>

      {/* 06 — The Question They're Avoiding */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#f59e0b' }}>06</span>
          <span className="text-sm uppercase tracking-wider text-white/40">The Question They're Avoiding</span>
        </div>
        <div
          className="p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <p className="text-2xl lg:text-3xl font-bold text-white text-center italic">
            "Are you a movement or a utility?"
          </p>
        </div>
      </section>

      {/* 07 — The Way Through */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: '#22c55e' }}>07</span>
          <span className="text-sm uppercase tracking-wider text-white/40">The Way Through</span>
        </div>
        <p className="text-xl font-bold text-white">Own the tension.</p>

        <p className="text-white/80 leading-relaxed">
          The way through isn't to pretend XRP is something it's not. It's to flip the script on what "exciting" means in crypto.
        </p>

        <div className="space-y-3">
          {[
            'What if the most boring-sounding asset in crypto is actually the most radical?',
            'What if "institutional grade" isn\'t a liability—it\'s the flex?',
            'What if, in a market that burned everyone with hype and fraud, the unsexy thing becomes the smart thing?',
          ].map((question, i) => (
            <div
              key={i}
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
              }}
            >
              <span style={{ color: '#22c55e' }}>→</span>
              <p className="text-white/90 leading-relaxed">{question}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/10 text-center">
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          XRP Analysis / January 2026 • Confidential
        </p>
      </footer>
    </div>
  );
}

// Analysis Content Component
function AnalysisContent() {
  return (
    <>
      {/* Hero Section */}
      <header className="pt-12 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl" style={{ color: 'var(--color-primary)' }}>◈</span>
            <span
              className="text-sm font-mono tracking-wider"
              style={{ color: 'var(--color-muted)' }}
            >
              XRP 2026 AWARENESS CAMPAIGN
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4 gradient-text">
            Make XRP Unavoidable
          </h1>
          <p className="text-xl lg:text-2xl mb-4" style={{ color: 'var(--color-muted)' }}>
            From Reddit threads to institutional boardrooms
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#22c55e',
            }}
          >
            <span>$50M Budget</span>
            <span className="opacity-50">•</span>
            <span>January 2026 Onboarding</span>
            <span className="opacity-50">•</span>
            <span>HIGH Win Probability</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {briefSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="py-16 lg:py-24 px-6 lg:px-8"
          >
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <span
                    className="text-5xl font-mono opacity-30"
                    style={{ color: section.color }}
                  >
                    {section.number}
                  </span>
                  <span className="text-3xl" style={{ color: section.color }}>
                    {section.icon}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
                  {section.subtitle}
                </p>
              </div>

              {/* Section Content */}
              <div
                className="glass rounded-2xl p-6 lg:p-8"
                style={{
                  borderColor: `${section.color}20`,
                }}
              >
                {section.content}
              </div>
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Strategic Analysis | The Survivor • The Bridge • Unavoidable
          </p>
        </footer>
      </main>
    </>
  );
}

export default function BriefPage() {
  const [activeTab, setActiveTab] = useState<TabType>('rfp');

  return (
    <div className="min-h-screen bg-gradient-page">
      {/* Toggle Header */}
      <div className="sticky top-0 z-50 pt-6 pb-4 px-4" style={{ background: 'linear-gradient(180deg, var(--color-dark) 0%, transparent 100%)' }}>
        <div className="flex justify-center">
          <div
            className="inline-flex p-1 rounded-xl"
            style={{
              background: 'rgba(10, 22, 40, 0.8)',
              border: '1px solid rgba(0, 150, 228, 0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <button
              onClick={() => setActiveTab('rfp')}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'rfp'
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={{
                background: activeTab === 'rfp' ? 'rgba(0, 150, 228, 0.3)' : 'transparent',
              }}
            >
              Client RFP
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'analysis'
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={{
                background: activeTab === 'analysis' ? 'rgba(0, 150, 228, 0.3)' : 'transparent',
              }}
            >
              RFP Analysis
            </button>
            <button
              onClick={() => setActiveTab('roast')}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'roast'
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={{
                background: activeTab === 'roast' ? 'rgba(0, 150, 228, 0.3)' : 'transparent',
              }}
            >
              🔥 Brief Roast
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'rfp' && <ClientRFPContent />}
      {activeTab === 'analysis' && <AnalysisContent />}
      {activeTab === 'roast' && <RoastContent />}
    </div>
  );
}
