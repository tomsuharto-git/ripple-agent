'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionListProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function AccordionList({
  items,
  allowMultiple = false,
  className,
}: AccordionListProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden"
            style={{ borderColor: 'var(--color-muted)' }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-black/5"
              style={{ color: 'var(--color-dark)' }}
            >
              <span
                className="font-medium"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.title}
              </span>
              <svg
                className={cn(
                  'w-5 h-5 transition-transform',
                  isOpen && 'rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div
                className="px-6 pb-4"
                style={{ color: 'var(--color-dark)' }}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
