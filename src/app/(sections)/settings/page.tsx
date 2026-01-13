'use client';

import { SectionHeader } from '@/components/SectionHeader';
import { getSectionById } from '@/data/sections';
import { project } from '@/config/project';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const section = getSectionById('settings');
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <SectionHeader
        title={section?.title || 'Settings'}
        subtitle={section?.subtitle}
        icon={section?.icon}
        variant="dark"
      />
      <div className="py-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto">
          {/* Project Info */}
          <div
            className="p-6 rounded-lg border mb-8"
            style={{
              backgroundColor: 'var(--color-light)',
              borderColor: 'var(--color-muted)',
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-dark)',
              }}
            >
              Project Information
            </h2>
            <dl className="space-y-2 text-sm" style={{ color: 'var(--color-dark)' }}>
              <div className="flex justify-between">
                <dt className="opacity-70">Project Name</dt>
                <dd className="font-medium">{project.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-70">Project Slug</dt>
                <dd className="font-medium">{project.slug}</dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--color-light)',
              borderColor: 'var(--color-muted)',
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-dark)',
              }}
            >
              Actions
            </h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium rounded transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-light)',
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
