'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabSectionProps {
  /** Array of tabs */
  tabs: Tab[];
  /** Default active tab ID */
  defaultTab?: string;
  /** Additional CSS classes */
  className?: string;
}

export function TabSection({ tabs, defaultTab, className }: TabSectionProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={cn('', className)}>
      {/* Tab Headers */}
      <div
        className="flex border-b"
        style={{ borderColor: 'var(--color-muted)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-4 text-sm font-medium uppercase tracking-wider transition-colors',
              activeTab === tab.id
                ? 'border-b-2'
                : 'opacity-60 hover:opacity-100'
            )}
            style={{
              color: 'var(--color-dark)',
              borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">{activeContent}</div>
    </div>
  );
}
