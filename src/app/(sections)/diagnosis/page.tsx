'use client';

import { useState } from 'react';

export default function DiagnosisPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0C0C0E' }}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: '#0C0C0E' }}>
          <div className="text-center">
            <div
              className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center animate-pulse"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Loading Growth Diagnosis...
            </p>
          </div>
        </div>
      )}

      {/* Embedded GDT Site */}
      <iframe
        src="https://gdt-hub.vercel.app/ripple?token=hecho-agent-2026"
        className="flex-1 w-full border-0"
        style={{ minHeight: '100vh' }}
        onLoad={() => setIsLoading(false)}
        title="Ripple Growth Diagnosis"
        allow="fullscreen"
      />
    </div>
  );
}
