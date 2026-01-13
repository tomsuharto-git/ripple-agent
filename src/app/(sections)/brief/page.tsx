import { SectionHeader } from '@/components/SectionHeader';
import { AlternatingPanels } from '@/components/layouts/AlternatingPanels';
import { getSectionById } from '@/data/sections';

// Ripple Strategic Brief Summary
const briefPanels = [
  {
    id: 'situation',
    title: 'The Situation',
    subtitle: 'Where Ripple stands today',
    content: (
      <div className="space-y-4">
        <p>
          Ripple/XRP has built genuine technical innovation (fast, cheap, energy-efficient)
          and secured 300+ institutional partnerships. Yet the brand scores 41.2/100 on our
          Growth Diagnosis—below category average on 7 of 9 components.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          The SEC lawsuit created regulatory clarity that competitors don't have,
          but the brand never capitalized on it.
        </p>
      </div>
    ),
  },
  {
    id: 'problem',
    title: 'The Core Problem',
    subtitle: 'The Institutional-Retail Identity Crisis',
    content: (
      <div className="space-y-4">
        <p>
          Ripple can't decide whether it's serving banks seeking stability or crypto investors
          demanding returns. The result: neither audience is satisfied.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Too corporate for crypto natives (authenticity score: 4.2/10)</li>
          <li>Too controversial for traditional finance</li>
          <li>67% of interested users abandon purchase attempts</li>
          <li>No emotional connection beyond regulatory speculation</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'opportunity',
    title: 'The Opportunity',
    subtitle: 'The FDA-Approved Crypto',
    content: (
      <div className="space-y-4">
        <p>
          Transform Ripple from regulatory-uncertain infrastructure into the regulated bridge
          that makes crypto accessible for mainstream finance adoption.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          Be the "FDA-approved crypto"—the one you can trust because it's passed the test
          that others haven't faced yet.
        </p>
      </div>
    ),
  },
  {
    id: 'strategy',
    title: 'Strategic Path',
    subtitle: 'Reinvent → Connect → Create',
    content: (
      <div className="space-y-4">
        <p><strong>Phase 1 - Reinvent:</strong> Separate Ripple enterprise from XRP retail.
        Fix the 67% purchase abandonment rate. Clarify what XRP is for.</p>
        <p><strong>Phase 2 - Connect:</strong> Build the tribe XRP never had. Create emotional
        investment beyond price speculation. Develop ideological foundation.</p>
        <p><strong>Phase 3 - Create:</strong> Consumer-friendly products that leverage regulatory
        clarity. Mainstream payment applications. CBDC partnership positioning.</p>
      </div>
    ),
  },
  {
    id: 'measures',
    title: 'Success Metrics',
    subtitle: "How we'll know it's working",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li>Reduce purchase abandonment from 67% to under 30%</li>
          <li>Increase Emotional Connection score from 3.7 to 5.5+</li>
          <li>Establish clear positioning statement that resonates with target audience</li>
          <li>Achieve 15%+ growth in active retail holders within 12 months</li>
          <li>Build cultural community engagement metrics (NPS, community activity)</li>
        </ul>
      </div>
    ),
  },
];

export default function BriefPage() {
  const section = getSectionById('brief');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Creative Brief'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="dark"
      />
      <AlternatingPanels panels={briefPanels} />
    </>
  );
}
