import { SectionHeader } from '@/components/SectionHeader';
import { CardGrid } from '@/components/layouts/CardGrid';
import { getSectionById } from '@/data/sections';

// Ripple GDT Component Scores
const gdtComponents = [
  {
    id: 'a1',
    title: 'Brand Positioning',
    description: '4.1/10 — The "banker\'s crypto" positioning alienates both audiences.',
    icon: '◇',
  },
  {
    id: 'a2',
    title: 'Pricing Power',
    description: '2.3/10 — Pre-mined supply kills scarcity. 78% won\'t pay premiums.',
    icon: '◆',
  },
  {
    id: 'a3',
    title: 'Business Growth',
    description: '4.3/10 — Dropped from top 3 to 4th-7th. Stagnant market share.',
    icon: '▲',
  },
  {
    id: 'b1',
    title: 'Emotional Connection',
    description: '3.7/10 — Technology without a tribe. No ideological foundation.',
    icon: '●',
  },
  {
    id: 'b2',
    title: 'Cultural Relevance',
    description: '5.4/10 — Cultural pariah: too corporate for crypto, too risky for banks.',
    icon: '○',
  },
  {
    id: 'b3',
    title: 'Experience Excellence',
    description: '3.0/10 — 67% abandon purchase attempts. 2.1/10 purchase stage.',
    icon: '◎',
  },
  {
    id: 'c1',
    title: 'Distinctive Assets',
    description: '4.3/10 — Strong XRP ticker, weak brand story. Ripple/XRP confusion.',
    icon: '★',
  },
  {
    id: 'c2',
    title: 'Brand Innovation',
    description: '6.1/10 — Technical pioneer trapped by legal constraints.',
    icon: '✦',
  },
  {
    id: 'c3',
    title: 'Market Disruption',
    description: '8.0/10 — 87 CBDCs threaten utility. 3-6 month transformation window.',
    icon: '⚡',
  },
];

export default function DiagnosisPage() {
  const section = getSectionById('diagnosis');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Growth Diagnosis'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="dark"
      />
      <div className="py-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Overall Score */}
          <div
            className="mb-12 p-8 rounded-lg text-center"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-light)' }}
          >
            <p className="text-sm uppercase tracking-wider opacity-80 mb-2">Overall GDT Score</p>
            <p className="text-6xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              41.2
            </p>
            <p className="text-lg opacity-90">Below Average — The Institutional-Retail Identity Crisis</p>
          </div>

          {/* Core Insight */}
          <p
            className="text-xl mb-12 leading-relaxed"
            style={{ color: 'var(--color-dark)' }}
          >
            Ripple built enterprise-grade infrastructure but delivered retail-grade confusion.
            XRP positions as the "banker's crypto" but banks don't trust it and crypto natives
            reject it. The brand is trapped between two worlds.
          </p>

          {/* Component Grid */}
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}
          >
            9-Component Analysis
          </h2>
          <CardGrid items={gdtComponents} columns={3} />

          {/* Strategic Path */}
          <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: 'var(--color-light)' }}>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}
            >
              Strategic Path: Reinvent → Connect → Create
            </h3>
            <p style={{ color: 'var(--color-dark)' }}>
              Transform from regulatory-uncertain infrastructure into the "FDA-approved crypto"—
              the regulated bridge that makes blockchain accessible for mainstream finance adoption.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
