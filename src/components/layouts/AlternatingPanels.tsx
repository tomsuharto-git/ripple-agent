'use client';

import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface Panel {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  image?: string;
}

interface AlternatingPanelsProps {
  /** Array of panels to display */
  panels: Panel[];
  /** Additional CSS classes */
  className?: string;
}

export function AlternatingPanels({ panels, className }: AlternatingPanelsProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {panels.map((panel, index) => {
        const isEven = index % 2 === 0;
        const bgColor = isEven ? 'var(--color-light)' : 'var(--color-dark)';
        const textColor = isEven ? 'var(--color-dark)' : 'var(--color-light)';

        return (
          <section
            key={panel.id}
            className="py-16 px-8 md:px-16 lg:px-24"
            style={{ backgroundColor: bgColor }}
          >
            <div
              className={cn(
                'max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16',
                !isEven && 'md:flex-row-reverse'
              )}
            >
              {/* Content */}
              <div className="flex-1">
                {panel.subtitle && (
                  <p
                    className="text-sm uppercase tracking-widest opacity-70 mb-2"
                    style={{ color: textColor }}
                  >
                    {panel.subtitle}
                  </p>
                )}
                <h2
                  className="text-3xl md:text-4xl mb-6"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: textColor,
                  }}
                >
                  {panel.title}
                </h2>
                <div
                  className="prose prose-lg max-w-none"
                  style={{ color: textColor }}
                >
                  {panel.content}
                </div>
              </div>

              {/* Image (optional) */}
              {panel.image && (
                <div className="flex-1">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
