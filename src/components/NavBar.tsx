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
        'top-0 left-0 right-0 z-50 glass-nav',
        features.stickyNav && 'fixed'
      )}
    >
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-all"
          style={{ color: 'var(--color-light)' }}
        >
          {/* Animated logo icon */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(0, 150, 228, 0.3) 0%, transparent 70%)',
                transform: 'scale(1.5)',
              }}
            />
            <svg
              className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span
            className="text-lg font-semibold gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.name}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {enabledSections.slice(0, 6).map((section) => {
            const isActive = pathname.startsWith(section.path);
            return (
              <Link
                key={section.id}
                href={section.path}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg transition-all link-underline',
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="mr-2" style={{ color: 'var(--color-primary)' }}>
                  {section.icon}
                </span>
                {section.title}
              </Link>
            );
          })}
        </div>

        {/* Menu Toggle (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-all hover:bg-white/10"
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

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4 space-y-1">
          {enabledSections.map((section) => {
            const isActive = pathname.startsWith(section.path);
            return (
              <Link
                key={section.id}
                href={section.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                <span style={{ color: 'var(--color-primary)' }}>{section.icon}</span>
                <span>{section.title}</span>
                {isActive && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
