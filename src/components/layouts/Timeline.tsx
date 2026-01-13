'use client';

import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Additional CSS classes */
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5"
        style={{ backgroundColor: 'var(--color-muted)' }}
      />

      <div className="space-y-8">
        {items.map((item, index) => {
          const statusColors = {
            completed: 'var(--color-secondary)',
            current: 'var(--color-primary)',
            upcoming: 'var(--color-muted)',
          };
          const dotColor = statusColors[item.status || 'upcoming'];

          return (
            <div key={item.id} className="relative flex gap-6 pl-12">
              {/* Dot */}
              <div
                className="absolute left-2 top-1 w-4 h-4 rounded-full border-4"
                style={{
                  backgroundColor: 'var(--color-light)',
                  borderColor: dotColor,
                }}
              />

              {/* Content */}
              <div className="flex-1 pb-8">
                <p
                  className="text-sm uppercase tracking-wider mb-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.date}
                </p>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-dark)',
                  }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <div className="text-sm" style={{ color: 'var(--color-dark)' }}>
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
