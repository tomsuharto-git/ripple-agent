import { SectionHeader } from '@/components/SectionHeader';
import { AlternatingPanels } from '@/components/layouts/AlternatingPanels';
import { getSectionById } from '@/data/sections';

// Ripple Brief Roast - Critical analysis of strategic weaknesses
const roastPanels = [
  {
    id: 'identity-crisis',
    title: 'The Identity Crisis',
    subtitle: 'Who are you really for?',
    content: (
      <div className="space-y-4">
        <p>
          Ripple claims to be the "banker's crypto" but banks don't trust it, and crypto natives
          reject it. You've built enterprise-grade infrastructure but delivered retail-grade confusion.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          Pick an audience. The hybrid approach is destroying both experiences.
        </p>
      </div>
    ),
  },
  {
    id: 'pricing-problem',
    title: 'The Pre-Mine Problem',
    subtitle: 'You killed your own scarcity',
    content: (
      <div className="space-y-4">
        <p>
          100 billion pre-mined tokens eliminated any scarcity narrative before you started.
          Quarterly token sales create constant selling pressure. Your banking partners actively
          resist price appreciation because they want predictable costs.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          You built a utility token but marketed it like a speculative asset. Neither works.
        </p>
      </div>
    ),
  },
  {
    id: 'purchase-disaster',
    title: 'The Purchase Catastrophe',
    subtitle: '67% abandon trying to buy you',
    content: (
      <div className="space-y-4">
        <p>
          Your purchase experience scores a devastating 2.1/10. Two-thirds of interested users
          give up trying to buy XRP due to exchange confusion and regulatory warnings.
          You've made it nearly impossible for retail investors to become holders.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          This isn't just poor UX—it's active customer prevention.
        </p>
      </div>
    ),
  },
  {
    id: 'emotional-vacuum',
    title: 'The Emotional Vacuum',
    subtitle: 'No ideology, no tribe, no love',
    content: (
      <div className="space-y-4">
        <p>
          Bitcoin has libertarian mystique. Ethereum has builder culture. XRP has... regulatory hope?
          Your holders maintain instrumental relationships—they hold for what you might become,
          not what you represent.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          You're a technology in search of a tribe.
        </p>
      </div>
    ),
  },
  {
    id: 'cultural-pariah',
    title: 'The Cultural Pariah',
    subtitle: 'Too corporate for crypto, too controversial for banks',
    content: (
      <div className="space-y-4">
        <p>
          Crypto purists dismiss you as too centralized. Traditional finance views you as too risky.
          You've positioned yourself in contested territory where neither audience wants you.
          Authenticity score: 4.2/10—the lowest of any competitor.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          "Necessary but unloved" is not a brand position.
        </p>
      </div>
    ),
  },
  {
    id: 'wasted-resolution',
    title: 'The Wasted Resolution',
    subtitle: 'You won the SEC battle, now what?',
    content: (
      <div className="space-y-4">
        <p>
          The SEC lawsuit created regulatory clarity that competitors don't have—but you never
          capitalized on it. While you were fighting, Ethereum went proof-of-stake and Solana
          captured DeFi momentum. You have a 3-6 month window before these advantages become
          irreversible.
        </p>
        <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
          Stop explaining the past. Start building the future.
        </p>
      </div>
    ),
  },
];

export default function RoastPage() {
  const section = getSectionById('roast');

  return (
    <>
      <SectionHeader
        title={section?.title || 'Brief Roast'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="dark"
      />
      <AlternatingPanels panels={roastPanels} />
    </>
  );
}
