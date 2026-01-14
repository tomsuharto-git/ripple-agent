'use client';

import { useState } from 'react';
import { insights, bonusInsight, getCategoryColor, type CreativeInsight } from '@/data/insights';

// Category badge component
function CategoryBadge({ category }: { category: CreativeInsight['category'] }) {
  const config = {
    culture: { color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', label: 'culture' },
    business: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'business' },
    community: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'community' },
    market: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'market' },
    competitive: { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'competitive' },
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${config[category].color}`}>
      {config[category].label}
    </span>
  );
}

// Insight card component
function InsightCard({
  insight,
  index,
  isExpanded,
  onToggle,
}: {
  insight: CreativeInsight;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const categoryColor = getCategoryColor(insight.category);

  return (
    <div
      className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
        isExpanded ? 'ring-1' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        ['--tw-ring-color' as string]: isExpanded ? categoryColor : 'transparent',
      } as React.CSSProperties}
    >
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 lg:p-8 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start gap-4">
          {/* Number */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            <span
              className="text-lg font-mono font-bold"
              style={{ color: categoryColor }}
            >
              {insight.number}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <CategoryBadge category={insight.category} />
              <span className="text-2xl">{insight.icon}</span>
            </div>
            <h3 className="text-xl lg:text-2xl font-display font-semibold text-white mb-3">
              {insight.title}
            </h3>
            <p
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              {insight.hook}
            </p>
          </div>

          {/* Expand Icon */}
          <svg
            className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            style={{ color: 'var(--color-muted)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 lg:px-8 pb-6 lg:pb-8 animate-fadeIn">
          <div className="pl-16">
            {/* Detail */}
            <div className="mb-6">
              <h4
                className="text-xs uppercase tracking-wider mb-3"
                style={{ color: 'var(--color-muted)' }}
              >
                The Detail
              </h4>
              <div className="prose prose-invert max-w-none">
                {insight.detail.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm lg:text-base leading-relaxed mb-4 last:mb-0"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Creative Angle */}
            <div
              className="glass-light rounded-xl p-5 border-l-4"
              style={{ borderLeftColor: categoryColor }}
            >
              <h4
                className="text-xs uppercase tracking-wider mb-2"
                style={{ color: categoryColor }}
              >
                Creative Angle
              </h4>
              <p className="text-white font-medium italic">
                {insight.creativeAngle}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Insights Page Component
export function InsightsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showBonus, setShowBonus] = useState(false);

  const toggleInsight = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-page">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Header */}
        <header className="mb-12 lg:mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-4xl"
              style={{ color: 'var(--color-primary)' }}
            >
              ★
            </span>
            <span
              className="text-sm font-mono tracking-wider"
              style={{ color: 'var(--color-muted)' }}
            >
              CREATIVE INSIGHTS / JANUARY 2026
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4 gradient-text">
            10 Creative Insights
          </h1>
          <p className="text-xl lg:text-2xl mb-6" style={{ color: 'var(--color-muted)' }}>
            Provocative findings that open creative opportunity
          </p>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Counter-intuitive, surprising, and strategically potent insights extracted from comprehensive Ripple/XRP research. Each one reframes the obvious or reveals something unexpected.
          </p>
        </header>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-wider py-2" style={{ color: 'var(--color-muted)' }}>
            Categories:
          </span>
          {['culture', 'business', 'community', 'market', 'competitive'].map((cat) => {
            const count = insights.filter((i) => i.category === cat).length;
            return (
              <span
                key={cat}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: getCategoryColor(cat as CreativeInsight['category']),
                  color: getCategoryColor(cat as CreativeInsight['category']),
                }}
              >
                {cat} ({count})
              </span>
            );
          })}
        </div>

        {/* Insights List */}
        <div className="space-y-4 mb-12">
          {insights.map((insight, index) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              index={index}
              isExpanded={expandedId === insight.id}
              onToggle={() => toggleInsight(insight.id)}
            />
          ))}
        </div>

        {/* Bonus Insight */}
        <div className="mb-12">
          <button
            onClick={() => setShowBonus(!showBonus)}
            className="w-full glass rounded-2xl p-6 text-left hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl">⚠️</span>
                <div>
                  <span
                    className="text-xs font-mono uppercase tracking-wider block mb-1"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Bonus Insight (Darkly Funny)
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {bonusInsight.title}
                  </span>
                </div>
              </div>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${showBonus ? 'rotate-180' : ''}`}
                style={{ color: 'var(--color-muted)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {showBonus && (
            <div className="glass rounded-2xl p-6 lg:p-8 mt-4 animate-fadeIn border-l-4 border-amber-500/50">
              <p
                className="text-lg mb-4 font-medium"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                {bonusInsight.hook}
              </p>
              <div className="prose prose-invert max-w-none mb-6">
                {bonusInsight.detail.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm lg:text-base leading-relaxed mb-4 last:mb-0"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="glass-light rounded-xl p-5 border-l-4 border-amber-500">
                <h4 className="text-xs uppercase tracking-wider mb-2 text-amber-400">
                  Creative Angle
                </h4>
                <p className="text-white font-medium italic">
                  {bonusInsight.creativeAngle}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Usage Note */}
        <div className="glass-light rounded-xl p-6">
          <h3
            className="text-sm font-mono uppercase tracking-wider mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            How to Use These Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ color: 'var(--color-muted)' }}>
            <div>
              <h4 className="text-white font-medium mb-1">For Strategy</h4>
              <p>Use insights to reframe briefs, challenge assumptions, or find unexpected angles in positioning work.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">For Creative</h4>
              <p>Each &quot;Creative Angle&quot; suggests a territory worth exploring — a headline direction, campaign concept, or story to tell.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Creative Insights | Extracted from 150+ sources | January 2026
          </p>
        </footer>
      </div>
    </div>
  );
}

export default InsightsPage;
