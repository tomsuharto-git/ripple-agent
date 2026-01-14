'use client';

import { useState, useEffect, useRef } from 'react';
import { deepDiveTopics, type DeepDiveSection } from '@/data/deep-dive';

// Highlight badge component
function HighlightBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-light rounded-lg px-3 py-2 text-center">
      <span
        className="text-xs uppercase tracking-wider block mb-1"
        style={{ color: 'var(--color-muted)' }}
      >
        {label}
      </span>
      <span
        className="text-lg font-mono font-semibold"
        style={{ color: 'var(--color-primary)' }}
      >
        {value}
      </span>
    </div>
  );
}

// Content section component
function ContentSection({
  section,
  index,
}: {
  section: { title: string; content: string; highlights?: { label: string; value: string }[] };
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <div className="glass-light rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <h4 className="font-medium text-white text-left">{section.title}</h4>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          style={{ color: 'var(--color-muted)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 animate-fadeIn">
          <div className="prose prose-invert max-w-none">
            {section.content.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sm leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
          {section.highlights && section.highlights.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/10">
              {section.highlights.map((highlight, idx) => (
                <HighlightBadge key={idx} label={highlight.label} value={highlight.value} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Topic section component
function TopicSection({ topic, isActive }: { topic: DeepDiveSection; isActive: boolean }) {
  return (
    <section
      id={topic.id}
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
              style={{ color: topic.color }}
            >
              {topic.icon}
            </span>
            <div>
              <span
                className="text-sm font-mono tracking-wider"
                style={{ color: 'var(--color-muted)' }}
              >
                {topic.number}
              </span>
              <h2
                className="text-3xl lg:text-4xl font-display font-bold"
                style={{ color: 'var(--color-light)' }}
              >
                {topic.title}
              </h2>
            </div>
          </div>
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            {topic.subtitle}
          </p>
        </div>

        {/* Summary */}
        <div
          className="glass rounded-xl p-6 mb-12 border-l-4"
          style={{ borderLeftColor: topic.color }}
        >
          <h3
            className="text-sm font-mono uppercase tracking-wider mb-3"
            style={{ color: topic.color }}
          >
            Summary
          </h3>
          <p className="text-white leading-relaxed">{topic.summary}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {topic.sections.map((section, index) => (
            <ContentSection key={index} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Deep Dive Page Component
export function DeepDivePage() {
  const [activeSection, setActiveSection] = useState('overview');
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
    { id: 'overview', label: 'Overview', icon: '◈' },
    ...deepDiveTopics.map((t) => ({ id: t.id, label: t.title, icon: t.icon })),
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
        {/* Overview Section */}
        <section id="overview" className="min-h-screen py-16 lg:py-24">
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
                  DEEP DIVE / JANUARY 2026
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4 gradient-text">
                Deep Dive
              </h1>
              <p className="text-xl lg:text-2xl" style={{ color: 'var(--color-muted)' }}>
                Comprehensive Research Library
              </p>
            </div>

            {/* Intro */}
            <div className="glass rounded-2xl p-6 lg:p-8 mb-12 animate-slideUp">
              <p className="text-lg lg:text-xl text-white leading-relaxed">
                Everything you need to know about Ripple, XRP, and the ecosystem — organized into six comprehensive topics. From business fundamentals to community culture, each section provides detailed research with key metrics and strategic implications.
              </p>
            </div>

            {/* Topic Cards Grid */}
            <div className="mb-12">
              <h2
                className="text-sm font-mono uppercase tracking-wider mb-6"
                style={{ color: 'var(--color-muted)' }}
              >
                Explore Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deepDiveTopics.map((topic, idx) => (
                  <button
                    key={topic.id}
                    onClick={() => scrollToSection(topic.id)}
                    className="glass-light rounded-xl p-6 text-left hover:bg-white/10 transition-all duration-300 group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="text-3xl"
                        style={{ color: topic.color }}
                      >
                        {topic.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-mono"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {topic.number}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90">
                          {topic.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed line-clamp-2"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {topic.summary}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: topic.color }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-xl p-6">
              <h2
                className="text-sm font-mono uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                Research Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <span
                    className="text-2xl lg:text-3xl font-mono font-bold block"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    6
                  </span>
                  <span className="text-xs uppercase" style={{ color: 'var(--color-muted)' }}>
                    Topics
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className="text-2xl lg:text-3xl font-mono font-bold block"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    25+
                  </span>
                  <span className="text-xs uppercase" style={{ color: 'var(--color-muted)' }}>
                    Sections
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className="text-2xl lg:text-3xl font-mono font-bold block"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    150+
                  </span>
                  <span className="text-xs uppercase" style={{ color: 'var(--color-muted)' }}>
                    Sources
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className="text-2xl lg:text-3xl font-mono font-bold block"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Jan 26
                  </span>
                  <span className="text-xs uppercase" style={{ color: 'var(--color-muted)' }}>
                    Updated
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 text-center">
              <button
                onClick={() => scrollToSection('business')}
                className="inline-flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
              >
                <span className="text-sm">Start Exploring</span>
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Topic Sections */}
        {deepDiveTopics.map((topic) => (
          <TopicSection key={topic.id} topic={topic} isActive={activeSection === topic.id} />
        ))}

        {/* Footer */}
        <footer className="py-16 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Deep Dive Research | 150+ Sources | January 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

export default DeepDivePage;
