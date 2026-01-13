'use client';

import { features } from '@/config/features';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  /** Main section title */
  title: string;
  /** Optional subtitle (shown if features.showSubtitles is true) */
  subtitle?: string;
  /** Optional icon character */
  icon?: string;
  /** Background color style */
  variant?: 'primary' | 'secondary' | 'dark';
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  variant = 'primary',
}: SectionHeaderProps) {
  if (!features.showSectionHeaders) {
    return null;
  }

  const styles = {
    primary: {
      background: 'var(--color-primary)',
      text: 'var(--color-light)',
      icon: 'var(--color-secondary)',
    },
    secondary: {
      background: 'var(--color-secondary)',
      text: 'var(--color-dark)',
      icon: 'var(--color-primary)',
    },
    dark: {
      background: 'var(--color-dark)',
      text: 'var(--color-light)',
      icon: 'var(--color-secondary)',
    },
  }[variant];

  return (
    <header
      className="py-12 md:py-16 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: styles.background }}
    >
      <div className="max-w-6xl mx-auto flex items-center gap-6">
        {/* Icon */}
        {icon && (
          <span
            className="text-4xl md:text-5xl"
            style={{
              color: styles.icon,
              fontFamily: 'var(--font-display)',
            }}
          >
            {icon}
          </span>
        )}

        {/* Title & Subtitle */}
        <div>
          {features.showSubtitles && subtitle && (
            <p
              className="text-sm uppercase tracking-widest opacity-70 mb-1"
              style={{ color: styles.text }}
            >
              {subtitle}
            </p>
          )}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: styles.text,
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}
