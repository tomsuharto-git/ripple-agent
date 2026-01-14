'use client';

import { useState, useEffect, useRef } from 'react';
import { masterBrief, sections, type StrategicSection, type KeyInsight } from '@/data/get-smart';

// Category badge component
function CategoryBadge({ category }: { category?: 'market' | 'traction' | 'community' | 'competitive' | 'regulatory' }) {
  if (!category) return null;
  const config = {
    market: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'market' },
    traction: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'traction' },
    community: { color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', label: 'community' },
    competitive: { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'competitive' },
    regulatory: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'regulatory' },
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${config[category].color}`}>
      {config[category].label}
    </span>
  );
}

// Key insight card component
function InsightCard({ insight, index }: { insight: KeyInsight; index: number }) {
  return (
    <div
      className="glass-light rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-white">{insight.headline}</h4>
        <CategoryBadge category={insight.category} />
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {insight.detail}
      </p>
      {insight.metric && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <span
            className="text-lg font-mono font-semibold"
            style={{ color: 'var(--color-primary)' }}
          >
            {insight.metric}
          </span>
        </div>
      )}
    </div>
  );
}

// Section component
function Section({ section, isActive }: { section: StrategicSection; isActive: boolean }) {
  return (
    <section
      id={section.id}
      className={`min-h-screen py-16 lg:py-24 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-90'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-4xl font-mono"
              style={{ color: section.color }}
            >
              {section.icon}
            </span>
            <div>
              <span
                className="text-sm font-mono tracking-wider"
                style={{ color: 'var(--color-muted)' }}
              >
                {section.number}
              </span>
              <h2
                className="text-3xl lg:text-4xl font-display font-bold"
                style={{ color: 'var(--color-light)' }}
              >
                {section.title}
              </h2>
            </div>
          </div>
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            {section.subtitle}
          </p>
        </div>

        {/* TL;DR */}
        <div
          className="glass rounded-xl p-6 mb-12 border-l-4"
          style={{ borderLeftColor: section.color }}
        >
          <h3
            className="text-sm font-mono uppercase tracking-wider mb-3"
            style={{ color: section.color }}
          >
            TL;DR
          </h3>
          <p className="text-white leading-relaxed">{section.tldr}</p>
        </div>

        {/* Key Insights */}
        <div className="mb-12">
          <h3
            className="text-sm font-mono uppercase tracking-wider mb-6"
            style={{ color: 'var(--color-muted)' }}
          >
            Key Insights
          </h3>
          <div className="grid gap-4">
            {section.keyInsights.map((insight, index) => (
              <InsightCard key={index} insight={insight} index={index} />
            ))}
          </div>
        </div>

        {/* Strategic Imperative */}
        <div className="glass rounded-xl p-6 lg:p-8">
          <h3
            className="text-sm font-mono uppercase tracking-wider mb-6"
            style={{ color: section.color }}
          >
            Strategic Imperative
          </h3>
          <div className="space-y-6">
            <div>
              <h4
                className="text-xs uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-muted)' }}
              >
                Challenge
              </h4>
              <p className="text-white">{section.strategicImperative.challenge}</p>
            </div>
            <div>
              <h4
                className="text-xs uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-muted)' }}
              >
                Insight
              </h4>
              <p className="text-white">{section.strategicImperative.insight}</p>
            </div>
            <div
              className="pt-4 border-t"
              style={{ borderColor: `${section.color}30` }}
            >
              <h4
                className="text-xs uppercase tracking-wider mb-2"
                style={{ color: section.color }}
              >
                Imperative
              </h4>
              <p className="text-white font-medium">{section.strategicImperative.imperative}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Get Smart Page Component
export function GetSmartPage() {
  const [activeSection, setActiveSection] = useState('master');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer for scroll spy
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-20% 0px -20% 0px' }
    );

    // Observe all sections
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsNavOpen(false);
    }
  };

  const navItems = [
    { id: 'master', label: 'Summary', icon: '◈' },
    ...sections.map((s) => ({ id: s.id, label: s.title, icon: s.icon })),
  ];

  return (
    <div className="min-h-screen bg-gradient-page">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
          }}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass flex items-center justify-center glow"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Side Navigation (Desktop) / Bottom Sheet (Mobile) */}
      <nav
        className={`
          fixed z-40 transition-all duration-300
          lg:left-6 lg:top-1/2 lg:-translate-y-1/2 lg:w-48
          ${isNavOpen ? 'bottom-0 left-0 right-0' : '-bottom-full left-0 right-0'}
          lg:bottom-auto lg:right-auto
        `}
      >
        <div className="glass-nav lg:glass rounded-t-2xl lg:rounded-xl p-4 lg:p-3">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200
                  ${activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <span
                    className="w-1.5 h-1.5 rounded-full ml-auto hidden lg:block"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-56">
        {/* Summary Section */}
        <section id="master" className="min-h-screen py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Hero */}
            <div className="mb-16 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-4xl"
                  style={{ color: 'var(--color-primary)' }}
                >
                  ◈
                </span>
                <span
                  className="text-sm font-mono tracking-wider"
                  style={{ color: 'var(--color-muted)' }}
                >
                  GET SMART / JANUARY 2025
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4 gradient-text">
                {masterBrief.title}
              </h1>
              <p className="text-xl lg:text-2xl" style={{ color: 'var(--color-muted)' }}>
                {masterBrief.subtitle}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="glass rounded-2xl p-6 lg:p-8 mb-12 animate-slideUp">
              <p className="text-lg lg:text-xl text-white leading-relaxed">
                {masterBrief.executiveSummary}
              </p>
            </div>

            {/* Core Paradox */}
            <div className="mb-12">
              <h2
                className="text-sm font-mono uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-primary)' }}
              >
                The Core Paradox
              </h2>
              <div
                className="glass rounded-xl p-6 lg:p-8 border-l-4"
                style={{ borderLeftColor: 'var(--color-primary)' }}
              >
                <h3 className="text-xl lg:text-2xl font-display font-semibold text-white mb-3">
                  {masterBrief.coreParadox.headline}
                </h3>
                <p className="text-white/80 text-lg mb-6">{masterBrief.coreParadox.detail}</p>
                <div className="space-y-3">
                  {masterBrief.coreParadox.implications.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span style={{ color: 'var(--color-primary)' }}>→</span>
                      <p style={{ color: 'var(--color-muted)' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Context */}
            <div className="mb-12">
              <h2
                className="text-sm font-mono uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-muted)' }}
              >
                Category Context
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(masterBrief.categoryContext).map(([key, value]) => (
                  <div key={key} className="glass-light rounded-lg p-4">
                    <span
                      className="text-xs uppercase tracking-wider block mb-1"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Imperative */}
            <div className="mb-12">
              <h2
                className="text-sm font-mono uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-primary)' }}
              >
                Strategic Imperative
              </h2>
              <div className="glass rounded-xl p-6 lg:p-8">
                <p className="text-white text-lg leading-relaxed">
                  {masterBrief.strategicImperative}
                </p>
              </div>
            </div>

            {/* Strategic Priorities */}
            <div>
              <h2
                className="text-sm font-mono uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-muted)' }}
              >
                Strategic Priorities
              </h2>
              <div className="space-y-4">
                {masterBrief.priorities.map((priority, idx) => (
                  <div
                    key={idx}
                    className="glass-light rounded-lg p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-white">{priority.title}</h4>
                        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                          {priority.risk}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-6">
                      <div className="text-right">
                        <span
                          className="text-xs uppercase block"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          Urgency
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            priority.urgency === 'Critical' ? 'text-red-400' : 'text-amber-400'
                          }`}
                        >
                          {priority.urgency}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className="text-xs uppercase block"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          Timeline
                        </span>
                        <span className="text-sm text-white">{priority.timeline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 text-center">
              <button
                onClick={() => scrollToSection('company')}
                className="inline-flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
              >
                <span className="text-sm">Explore the 6Cs</span>
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* 6C Sections */}
        {sections.map((section) => (
          <Section key={section.id} section={section} isActive={activeSection === section.id} />
        ))}

        {/* Footer */}
        <footer className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Get Smart Analysis | System Version 2.1 | ~12,000 words across 7 documents
          </p>
        </footer>
      </main>
    </div>
  );
}

export default GetSmartPage;
