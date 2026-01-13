import type { Metadata } from 'next';
import { project } from '@/config/project';
import './globals.css';

export const metadata: Metadata = {
  title: project.title,
  description: project.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Inject project colors as CSS variables */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --color-primary: ${project.colors.primary};
                --color-secondary: ${project.colors.secondary};
                --color-dark: ${project.colors.dark};
                --color-light: ${project.colors.light};
                --color-muted: ${project.colors.muted};
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
