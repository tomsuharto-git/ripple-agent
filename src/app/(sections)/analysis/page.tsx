import { SectionHeader } from '@/components/SectionHeader';
import { AlternatingPanels } from '@/components/layouts/AlternatingPanels';
import { getSectionById } from '@/data/sections';

// Example analysis panels - customize for your project
const analysisPanels = [
  {
    id: 'overview',
    title: 'Brief Overview',
    subtitle: 'The Ask',
    content: (
      <p>
        Add your brief or RFP summary here. What is the client asking for?
        What are the key objectives and success metrics?
      </p>
    ),
  },
  {
    id: 'challenges',
    title: 'Key Challenges',
    subtitle: 'The Tensions',
    content: (
      <p>
        Identify the main challenges and tensions in the brief.
        What obstacles need to be overcome?
      </p>
    ),
  },
  {
    id: 'opportunities',
    title: 'Opportunities',
    subtitle: 'The Potential',
    content: (
      <p>
        What opportunities exist? Where can we add the most value?
        What&apos;s the strategic white space?
      </p>
    ),
  },
];

export default function AnalysisPage() {
  const section = getSectionById('analysis');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Analysis'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="dark"
      />
      <AlternatingPanels panels={analysisPanels} />
    </>
  );
}
