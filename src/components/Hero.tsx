'use client';

import { project } from '@/config/project';
import { features } from '@/config/features';
import { cn } from '@/lib/cn';

interface HeroProps {
  /** Override the project name */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Additional content below subtitle */
  date?: string;
  /** Custom icon character */
  icon?: string;
}

export function Hero({
  title = project.name,
  subtitle = project.description,
  date,
  icon = '◊',
}: HeroProps) {
  return (
    <section
      className="min-h-[60vh] flex items-center justify-center p-8 md:p-16"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Icon */}
        <div
          className={cn(
            'text-4xl md:text-5xl mb-8',
            features.animations && 'opacity-0 animate-fadeIn'
          )}
          style={{ color: 'var(--color-secondary)' }}
        >
          {icon}
        </div>

        {/* Title */}
        <h1
          className={cn(
            'text-5xl md:text-7xl lg:text-8xl mb-6',
            features.animations && 'opacity-0 animate-slideUp'
          )}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-light)',
            animationDelay: features.animations ? '0.1s' : undefined,
            animationFillMode: 'forwards',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            'text-xl md:text-2xl opacity-60',
            features.animations && 'opacity-0 animate-slideUp'
          )}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-light)',
            animationDelay: features.animations ? '0.2s' : undefined,
            animationFillMode: 'forwards',
          }}
        >
          {subtitle}
        </p>

        {/* Optional Date/Additional Info */}
        {date && (
          <div
            className={cn(
              'mt-12 flex items-center justify-center gap-4',
              features.animations && 'opacity-0 animate-slideUp'
            )}
            style={{
              animationDelay: features.animations ? '0.3s' : undefined,
              animationFillMode: 'forwards',
            }}
          >
            <span
              className="w-16 h-px opacity-40"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            />
            <span
              className="text-sm uppercase tracking-widest"
              style={{ color: 'var(--color-secondary)' }}
            >
              {date}
            </span>
            <span
              className="w-16 h-px opacity-40"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
