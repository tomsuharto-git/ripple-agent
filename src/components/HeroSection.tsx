'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { project } from '@/config/project';
import { getEnabledSections } from '@/data/sections';

interface PriceData {
  price: number;
  change24h: number;
}

export function HeroSection() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const sections = getEnabledSections();

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        setPriceData({
          price: data.ripple.usd,
          change24h: data.ripple.usd_24h_change,
        });
      } catch (error) {
        console.error('Failed to fetch price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between py-8 px-6 lg:px-10">
      {/* Top: Branding */}
      <div className="animate-slideDown">
        {/* Project Name */}
        <h1
          className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 gradient-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {project.name}
        </h1>

        {/* Tagline */}
        <p
          className="text-sm lg:text-base uppercase tracking-widest mb-6"
          style={{ color: 'var(--color-muted)' }}
        >
          Hecho Project Agent
        </p>

        {/* Navigation Pills - Explore Research */}
        <div className="mb-8">
          <p
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: 'var(--color-muted)' }}
          >
            Explore Research
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.slice(0, 6).map((section) => (
              <Link
                key={section.id}
                href={section.path}
                className="btn-ghost text-sm flex items-center gap-2 transition-glow hover-glow"
              >
                <span style={{ color: 'var(--color-primary)' }}>{section.icon}</span>
                {section.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Price Badge */}
        {priceData && (
          <div className="inline-flex items-center gap-4 glass rounded-xl px-5 py-3 glow-sm">
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-muted)' }}>
                XRP Price
              </p>
              <p
                className="text-2xl lg:text-3xl font-semibold font-mono"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-light)' }}
              >
                ${priceData.price.toFixed(4)}
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                priceData.change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {priceData.change24h >= 0 ? '+' : ''}
              {priceData.change24h.toFixed(2)}%
            </div>
          </div>
        )}
      </div>

      {/* Middle: Description */}
      <div className="my-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <p
          className="text-base lg:text-lg leading-relaxed max-w-md"
          style={{ color: 'rgba(240, 248, 255, 0.7)' }}
        >
          Your AI-powered guide to XRP markets, regulatory developments, and strategic
          investment insights. Ask anything about Ripple&apos;s ecosystem.
        </p>
      </div>

    </div>
  );
}
