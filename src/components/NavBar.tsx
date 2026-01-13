'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getEnabledSections } from '@/data/sections';
import { project } from '@/config/project';
import { features } from '@/config/features';
import { cn } from '@/lib/cn';

export function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const enabledSections = getEnabledSections();

  return (
    <nav
      className={cn(
        'top-0 left-0 right-0 z-50 backdrop-blur-sm border-b',
        features.stickyNav && 'fixed'
      )}
      style={{
        backgroundColor: 'rgba(var(--color-dark-rgb, 26, 23, 20), 0.95)',
        borderColor: 'var(--color-muted)',
      }}
    >
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          style={{ color: 'var(--color-light)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-lg">
            {project.name}
          </span>
        </Link>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 transition-opacity hover:opacity-80"
          style={{ color: 'var(--color-light)' }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 border-b shadow-lg"
          style={{
            backgroundColor: 'var(--color-dark)',
            borderColor: 'var(--color-muted)',
          }}
        >
          <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 lg:grid-cols-4">
            {enabledSections.map((section) => {
              const isActive = pathname.startsWith(section.path);
              return (
                <Link
                  key={section.id}
                  href={section.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block px-6 py-4 text-sm uppercase tracking-wider border-b md:border-b-0 md:border-r last:border-r-0 transition-colors',
                    isActive && 'bg-white/10'
                  )}
                  style={{
                    borderColor: 'rgba(var(--color-muted-rgb, 107, 107, 107), 0.3)',
                    color: isActive ? 'var(--color-secondary)' : 'rgba(var(--color-light-rgb, 250, 247, 242), 0.7)',
                  }}
                >
                  <span className="mr-3" style={{ color: 'var(--color-primary)' }}>
                    {section.icon}
                  </span>
                  {section.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
