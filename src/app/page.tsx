'use client';

import { useState } from 'react';
import { PasswordGate } from '@/components/PasswordGate';
import { NavBar } from '@/components/NavBar';
import { ChatPanel } from '@/components/ChatPanel';
import { HeroSection } from '@/components/HeroSection';
import { PriceChart } from '@/components/PriceChart';
import { features } from '@/config/features';

function Landing() {
  const [showChart, setShowChart] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-page">
      {/* Navigation */}
      <NavBar />

      {/* Spacer for fixed nav */}
      {features.stickyNav && <div className="h-16" />}

      {/* Main Content: Split View */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Hero Section */}
        <div className="lg:w-[40%] xl:w-[35%] lg:border-r border-white/5 animate-fadeIn">
          <HeroSection />
        </div>

        {/* Right: Chat Panel */}
        <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
          <ChatPanel defaultExpanded={true} hideHeader={true} />
        </div>
      </div>

      {/* Price Ticker Bar */}
      <div className="border-t border-white/10">
        <button
          onClick={() => setShowChart(!showChart)}
          className="w-full px-6 py-3 flex items-center justify-between glass-light transition-all hover:bg-white/5"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: 'var(--color-muted)' }}
            >
              XRP Live Chart
            </span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${showChart ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--color-muted)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expandable Chart */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            showChart ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <PriceChart />
        </div>
      </div>
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
