import { SectionHeader } from '@/components/SectionHeader';
import { CardGrid } from '@/components/layouts/CardGrid';
import { getSectionById } from '@/data/sections';

// Example audience profiles - customize for your project
const audienceProfiles = [
  {
    id: 'primary',
    title: 'Primary Audience',
    description: 'Core target with highest growth potential.',
    icon: '●',
  },
  {
    id: 'secondary',
    title: 'Secondary Audience',
    description: 'Adjacent audience for expansion.',
    icon: '○',
  },
  {
    id: 'influencer',
    title: 'Influencers',
    description: 'Key opinion leaders and advocates.',
    icon: '★',
  },
];

export default function AudiencePage() {
  const section = getSectionById('audience');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Growth Audience'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="dark"
      />
      <div className="py-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-lg mb-8 opacity-70"
            style={{ color: 'var(--color-dark)' }}
          >
            Target audience profiles and growth opportunities.
          </p>
          <CardGrid items={audienceProfiles} columns={3} />
        </div>
      </div>
    </>
  );
}
