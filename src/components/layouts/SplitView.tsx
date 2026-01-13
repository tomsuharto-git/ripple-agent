'use client';

import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface SplitViewProps {
  /** Left side content */
  left: ReactNode;
  /** Right side content */
  right: ReactNode;
  /** Split ratio */
  ratio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70';
  /** Vertical alignment */
  align?: 'top' | 'center' | 'bottom';
  /** Gap between sides */
  gap?: 'sm' | 'md' | 'lg';
  /** Stack on mobile */
  stackOnMobile?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function SplitView({
  left,
  right,
  ratio = '50-50',
  align = 'top',
  gap = 'md',
  stackOnMobile = true,
  className,
}: SplitViewProps) {
  const ratioClasses = {
    '50-50': 'md:basis-1/2',
    '60-40': ['md:basis-3/5', 'md:basis-2/5'],
    '40-60': ['md:basis-2/5', 'md:basis-3/5'],
    '70-30': ['md:basis-7/10', 'md:basis-3/10'],
    '30-70': ['md:basis-3/10', 'md:basis-7/10'],
  };

  const leftClass = Array.isArray(ratioClasses[ratio])
    ? ratioClasses[ratio][0]
    : ratioClasses[ratio];
  const rightClass = Array.isArray(ratioClasses[ratio])
    ? ratioClasses[ratio][1]
    : ratioClasses[ratio];

  const alignClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  }[align];

  const gapClasses = {
    sm: 'gap-4 md:gap-6',
    md: 'gap-6 md:gap-12',
    lg: 'gap-8 md:gap-16',
  }[gap];

  return (
    <div
      className={cn(
        'flex',
        stackOnMobile ? 'flex-col md:flex-row' : 'flex-row',
        alignClasses,
        gapClasses,
        className
      )}
    >
      <div className={cn('w-full', leftClass)}>{left}</div>
      <div className={cn('w-full', rightClass)}>{right}</div>
    </div>
  );
}
