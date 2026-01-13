import { SectionHeader } from '@/components/SectionHeader';
import { ContentBlock } from '@/components/layouts/ContentBlock';
import Link from 'next/link';

interface ResearchDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Map slugs to content - customize for your project
const topicContent: Record<string, { title: string; content: string }> = {
  company: {
    title: 'Company',
    content: 'Add your company analysis content here. This includes brand history, values, current positioning, and internal capabilities.',
  },
  consumer: {
    title: 'Consumer',
    content: 'Add your consumer insights here. Include target audience profiles, behaviors, needs, and pain points.',
  },
  category: {
    title: 'Category',
    content: 'Add your category analysis here. Cover market size, trends, growth opportunities, and industry dynamics.',
  },
  competition: {
    title: 'Competition',
    content: 'Add your competitive analysis here. Include key competitors, their positioning, strengths, and weaknesses.',
  },
  culture: {
    title: 'Culture',
    content: 'Add your cultural context here. Cover relevant cultural trends, movements, and societal factors.',
  },
  communications: {
    title: 'Communications',
    content: 'Add your communications audit here. Review current messaging, channels, and touchpoints.',
  },
};

export default async function ResearchDetailPage({ params }: ResearchDetailPageProps) {
  const { slug } = await params;
  const topic = topicContent[slug] || {
    title: 'Topic Not Found',
    content: 'This research topic does not exist.',
  };

  return (
    <>
      <SectionHeader
        title={topic.title}
        subtitle="Research"
        icon="◇"
        variant="primary"
      />
      <div className="py-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 mb-8 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-dark)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Research
          </Link>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            style={{ color: 'var(--color-dark)' }}
          >
            <p>{topic.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
