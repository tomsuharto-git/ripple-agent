'use client';

import { useState, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { project } from '@/config/project';

interface PasswordGateProps {
  children: ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-light)' }}
      >
        <div className="animate-pulse" style={{ color: 'var(--color-muted)' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-6xl mb-6"
            style={{ color: 'var(--color-secondary)' }}
          >
            ◊
          </div>
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-light)',
            }}
          >
            {project.name}
          </h1>
          <p
            className="text-sm uppercase tracking-widest opacity-60"
            style={{ color: 'var(--color-light)' }}
          >
            Internal Team Access
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--color-muted)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full py-4 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: 'var(--color-light)',
                color: 'var(--color-dark)',
                // @ts-expect-error CSS custom property
                '--tw-ring-color': 'var(--color-secondary)',
              }}
              autoFocus
            />
          </div>

          {error && (
            <p
              className="text-sm text-center"
              style={{ color: 'var(--color-primary)' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-light)',
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
