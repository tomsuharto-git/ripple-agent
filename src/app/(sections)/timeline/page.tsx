import { SectionHeader } from '@/components/SectionHeader';
import { Timeline } from '@/components/layouts/Timeline';
import { getSectionById } from '@/data/sections';

// Example timeline items - customize for your project
const timelineItems = [
  {
    id: 'kickoff',
    date: 'Week 1',
    title: 'Project Kickoff',
    description: 'Initial briefing, team alignment, and project setup.',
    status: 'completed' as const,
  },
  {
    id: 'research',
    date: 'Week 2-3',
    title: 'Research & Discovery',
    description: 'Deep dive into 6Cs framework and competitive analysis.',
    status: 'current' as const,
  },
  {
    id: 'strategy',
    date: 'Week 4',
    title: 'Strategic Development',
    description: 'Growth diagnosis and audience profiling.',
    status: 'upcoming' as const,
  },
  {
    id: 'creative',
    date: 'Week 5-6',
    title: 'Creative Development',
    description: 'Concept ideation and creative brief refinement.',
    status: 'upcoming' as const,
  },
  {
    id: 'presentation',
    date: 'Week 7',
    title: 'Final Presentation',
    description: 'Client presentation and feedback.',
    status: 'upcoming' as const,
  },
];

export default function TimelinePage() {
  const section = getSectionById('timeline');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Timeline'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="primary"
      />
      <div className="py-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-lg mb-12 opacity-70"
            style={{ color: 'var(--color-dark)' }}
          >
            Project milestones and key deliverables.
          </p>
          <Timeline items={timelineItems} />
        </div>
      </div>
    </>
  );
}
