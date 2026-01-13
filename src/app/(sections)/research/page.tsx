import { SectionHeader } from '@/components/SectionHeader';
import { CardGrid } from '@/components/layouts/CardGrid';
import { getSectionById } from '@/data/sections';

// Ripple research topics (6Cs framework)
const researchTopics = [
  {
    id: 'company',
    title: 'Company',
    description: 'Ripple Labs structure, XRP token mechanics, 100B pre-mined supply, quarterly sales.',
    icon: '◇',
  },
  {
    id: 'consumer',
    title: 'Consumer',
    description: 'Retail holders vs institutional users. The "XRP Army" community. Purchase behavior barriers.',
    icon: '●',
  },
  {
    id: 'category',
    title: 'Category',
    description: 'Cryptocurrency market dynamics. Cross-border payments. 87 CBDCs in development.',
    icon: '▲',
  },
  {
    id: 'competition',
    title: 'Competition',
    description: 'Bitcoin (digital gold), Ethereum (smart contracts), Solana (high performance).',
    icon: '◆',
  },
  {
    id: 'culture',
    title: 'Culture',
    description: 'Crypto native values vs institutional trust. Decentralization ideology. Regulatory perception.',
    icon: '★',
  },
  {
    id: 'communications',
    title: 'Communications',
    description: 'Enterprise vs retail messaging disconnect. SEC lawsuit narrative. Partnership announcements.',
    icon: '◎',
  },
];

export default function ResearchPage() {
  const section = getSectionById('research');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Research'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="primary"
      />
      <div className="py-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-lg mb-8 opacity-70"
            style={{ color: 'var(--color-dark)' }}
          >
            Comprehensive research across the 6Cs framework. Click a topic to explore.
          </p>
          <CardGrid
            items={researchTopics}
            columns={3}
            linkPattern="/research/[id]"
          />
        </div>
      </div>
    </>
  );
}
