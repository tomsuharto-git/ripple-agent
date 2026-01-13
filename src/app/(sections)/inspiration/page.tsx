import { SectionHeader } from '@/components/SectionHeader';
import { CardGrid } from '@/components/layouts/CardGrid';
import { getSectionById } from '@/data/sections';

// Example inspiration categories - customize for your project
const inspirationItems = [
  {
    id: 'campaigns',
    title: 'Campaign Examples',
    description: 'Relevant work from other brands.',
    icon: '★',
  },
  {
    id: 'cultural',
    title: 'Cultural References',
    description: 'Trends and cultural touchpoints.',
    icon: '◎',
  },
  {
    id: 'visual',
    title: 'Visual Direction',
    description: 'Mood boards and aesthetic references.',
    icon: '◆',
  },
  {
    id: 'tone',
    title: 'Tone & Voice',
    description: 'Communication style references.',
    icon: '◇',
  },
];

export default function InspirationPage() {
  const section = getSectionById('inspiration');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Inspiration'}
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
            Creative inspiration and reference materials.
          </p>
          <CardGrid items={inspirationItems} columns={2} />
        </div>
      </div>
    </>
  );
}
