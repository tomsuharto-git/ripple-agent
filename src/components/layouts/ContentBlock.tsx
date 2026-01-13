'use client';

import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface ContentBlockProps {
  /** Main title */
  title?: string;
  /** Subtitle above title */
  subtitle?: string;
  /** Main content */
  children: ReactNode;
  /** Optional image URL */
  image?: string;
  /** Image position */
  imagePosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Background variant */
  variant?: 'light' | 'dark' | 'primary';
  /** Additional CSS classes */
  className?: string;
}

export function ContentBlock({
  title,
  subtitle,
  children,
  image,
  imagePosition = 'right',
  variant = 'light',
  className,
}: ContentBlockProps) {
  const styles = {
    light: {
      bg: 'var(--color-light)',
      text: 'var(--color-dark)',
    },
    dark: {
      bg: 'var(--color-dark)',
      text: 'var(--color-light)',
    },
    primary: {
      bg: 'var(--color-primary)',
      text: 'var(--color-light)',
    },
  }[variant];

  const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
  const isVertical = imagePosition === 'top' || imagePosition === 'bottom';

  return (
    <section
      className={cn('py-16 px-8 md:px-16 lg:px-24', className)}
      style={{ backgroundColor: styles.bg }}
    >
      <div
        className={cn(
          'max-w-6xl mx-auto',
          isHorizontal && 'flex flex-col md:flex-row items-center gap-8 md:gap-16',
          imagePosition === 'left' && 'md:flex-row-reverse',
          isVertical && 'flex flex-col gap-8'
        )}
      >
        {/* Image (top/left position) */}
        {image && (imagePosition === 'top' || imagePosition === 'left') && (
          <div className={cn(isHorizontal ? 'flex-1' : 'w-full')}>
            <img src={image} alt={title || ''} className="w-full rounded-lg" />
          </div>
        )}

        {/* Content */}
        <div className={cn(isHorizontal && image && 'flex-1')}>
          {subtitle && (
            <p
              className="text-sm uppercase tracking-widest opacity-70 mb-2"
              style={{ color: styles.text }}
            >
              {subtitle}
            </p>
          )}
          {title && (
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: styles.text,
              }}
            >
              {title}
            </h2>
          )}
          <div className="prose prose-lg max-w-none" style={{ color: styles.text }}>
            {children}
          </div>
        </div>

        {/* Image (bottom/right position) */}
        {image && (imagePosition === 'bottom' || imagePosition === 'right') && (
          <div className={cn(isHorizontal ? 'flex-1' : 'w-full')}>
            <img src={image} alt={title || ''} className="w-full rounded-lg" />
          </div>
        )}
      </div>
    </section>
  );
}
