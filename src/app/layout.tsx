import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { project } from '@/config/project';
import './globals.css';

// Font configurations
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
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
                --font-display: ${spaceGrotesk.style.fontFamily};
                --font-body: ${inter.style.fontFamily};
                --font-mono: ${jetbrainsMono.style.fontFamily};
              }
            `,
          }}
        />
      </head>
      <body className="bg-gradient-page min-h-screen">{children}</body>
    </html>
  );
}
