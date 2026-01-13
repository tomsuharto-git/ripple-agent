'use client';

import { ReactNode } from 'react';
import { PasswordGate } from '@/components/PasswordGate';
import { NavBar } from '@/components/NavBar';
import { features } from '@/config/features';

interface SectionsLayoutProps {
  children: ReactNode;
}

function SectionsContent({ children }: SectionsLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-light)' }}>
      <NavBar />
      {/* Add padding-top to account for sticky nav */}
      <div className={features.stickyNav ? 'pt-16' : ''}>
        {children}
      </div>
    </div>
  );
}

export default function SectionsLayout({ children }: SectionsLayoutProps) {
  if (features.passwordGate) {
    return (
      <PasswordGate>
        <SectionsContent>{children}</SectionsContent>
      </PasswordGate>
    );
  }

  return <SectionsContent>{children}</SectionsContent>;
}
