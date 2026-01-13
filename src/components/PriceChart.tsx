'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}

export function PriceChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TradingView script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'BINANCE:XRPUSDT',
          interval: 'D',
          timezone: 'America/New_York',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#0C0C0E',
          enable_publishing: false,
          allow_symbol_change: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: 'tradingview-widget',
          studies: ['RSI@tv-basicstudies'],
          show_popup_button: false,
          popup_width: '1000',
          popup_height: '650',
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section
      className="py-12 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: '#0C0C0E' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-2xl md:text-3xl mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-light)',
              }}
            >
              XRP Live Price
            </h2>
            <p
              className="text-sm opacity-60"
              style={{ color: 'var(--color-light)' }}
            >
              Real-time market data • Click chart for more timeframes
            </p>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-light)',
            }}
          >
            LIVE
          </div>
        </div>

        {/* Chart Container */}
        <div
          ref={containerRef}
          className="rounded-lg overflow-hidden border"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            height: '500px',
          }}
        >
          <div id="tradingview-widget" style={{ height: '100%', width: '100%' }} />
        </div>

        {/* Footer note */}
        <p
          className="text-xs mt-4 opacity-40 text-center"
          style={{ color: 'var(--color-light)' }}
        >
          Chart powered by TradingView • XRP/USDT on Binance
        </p>
      </div>
    </section>
  );
}
