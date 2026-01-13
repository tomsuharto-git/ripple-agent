'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

interface CardItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  href?: string;
}

interface CardGridProps {
  /** Array of card items to display */
  items: CardItem[];
  /** Number of columns (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** URL pattern for links (use [id] as placeholder) */
  linkPattern?: string;
  /** Additional CSS classes */
  className?: string;
}

export function CardGrid({
  items,
  columns = 3,
  linkPattern,
  className,
}: CardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const renderCard = (item: CardItem) => {
    const content = (
      <div
        className={cn(
          'p-6 rounded-lg border transition-all duration-300',
          linkPattern && 'hover:shadow-lg hover:border-transparent cursor-pointer'
        )}
        style={{
          backgroundColor: 'var(--color-light)',
          borderColor: 'var(--color-muted)',
        }}
      >
        {item.icon && (
          <div
            className="text-3xl mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            {item.icon}
          </div>
        )}
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
          <p
            className="text-sm opacity-70"
            style={{ color: 'var(--color-dark)' }}
          >
            {item.description}
          </p>
        )}
      </div>
    );

    if (linkPattern) {
      const href = item.href || linkPattern.replace('[id]', item.id);
      return (
        <Link key={item.id} href={href}>
          {content}
        </Link>
      );
    }

    return <div key={item.id}>{content}</div>;
  };

  return (
    <div className={cn('grid gap-6', gridCols, className)}>
      {items.map(renderCard)}
    </div>
  );
}
