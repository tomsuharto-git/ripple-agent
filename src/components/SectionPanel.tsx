'use client';

import Link from 'next/link';
import { Section } from '@/data/sections';
import { features } from '@/config/features';
import { getSectionColor } from '@/config/theme';
import { cn } from '@/lib/cn';

interface SectionPanelProps {
  section: Section;
  index: number;
}

// Color mapping for section backgrounds
const getColorStyles = (color: Section['color']) => {
  switch (color) {
    case 'primary':
      return {
        background: 'var(--color-primary)',
        text: 'var(--color-light)',
        icon: 'var(--color-secondary)',
      };
    case 'secondary':
      return {
        background: 'var(--color-secondary)',
        text: 'var(--color-dark)',
        icon: 'var(--color-primary)',
      };
    case 'dark':
    default:
      return {
        background: 'var(--color-dark)',
        text: 'var(--color-light)',
        icon: 'var(--color-secondary)',
      };
  }
};

export function SectionPanel({ section, index }: SectionPanelProps) {
  const isEven = index % 2 === 0;
  const styles = getColorStyles(section.color);

  return (
    <Link
      href={section.path}
      className={cn(
        'group block w-full py-16 px-8 md:px-16 lg:px-24 transition-all duration-300 ease-out',
        features.animations && 'opacity-0 animate-slideUp'
      )}
      style={{
        backgroundColor: styles.background,
        color: styles.text,
        animationDelay: features.animations ? `${index * 0.1}s` : undefined,
        animationFillMode: 'forwards',
      }}
    >
      <div
        className={cn(
          'max-w-6xl mx-auto flex items-center justify-between',
          isEven ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        {/* Icon */}
        <div
          className="text-6xl md:text-8xl lg:text-9xl transition-transform duration-300 group-hover:scale-110"
          style={{
            color: styles.icon,
            fontFamily: 'var(--font-display)',
          }}
        >
          {section.icon}
        </div>

        {/* Content */}
        <div
          className={cn(
            'flex-1 px-8 md:px-16',
            isEven ? 'text-left' : 'text-right'
          )}
        >
          {features.showSubtitles && section.subtitle && (
            <p className="text-sm uppercase tracking-widest opacity-70 mb-2">
              {section.subtitle}
            </p>
          )}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {section.title}
          </h2>
        </div>

        {/* Arrow */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
