'use client';

import { PasswordGate } from '@/components/PasswordGate';
import { Hero } from '@/components/Hero';
import { SectionPanel } from '@/components/SectionPanel';
import { ChatPanel } from '@/components/ChatPanel';
import { getEnabledSections } from '@/data/sections';
import { features } from '@/config/features';

function Landing() {
  const sections = getEnabledSections();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Section Panels */}
      <div>
        {sections.map((section, index) => (
          <SectionPanel key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* Chat Panel (always visible on home page) */}
      <ChatPanel />
    </main>
  );
}

export default function Home() {
  // Wrap with PasswordGate if enabled
  if (features.passwordGate) {
    return (
      <PasswordGate>
        <Landing />
      </PasswordGate>
    );
  }

  return <Landing />;
}
