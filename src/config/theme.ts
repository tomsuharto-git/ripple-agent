/**
 * THEME CONFIGURATION
 *
 * Central theme settings that work with CSS variables.
 * Colors are set in project.ts and applied via globals.css.
 */

export const theme = {
  // Color references (use CSS variables)
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    dark: 'var(--color-dark)',
    light: 'var(--color-light)',
    muted: 'var(--color-muted)',
  },

  // Font references
  fonts: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
  },

  // Section color rotation for home page cards
  // Alternates between primary and dark backgrounds
  sectionColors: ['primary', 'dark', 'primary', 'dark', 'primary', 'dark', 'primary', 'dark'] as const,

  // Spacing scale
  spacing: {
    section: 'py-16 md:py-24',
    container: 'px-6 md:px-12 lg:px-24',
  },

  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
};

// Get section background color by index
export const getSectionColor = (index: number): 'primary' | 'dark' => {
  return theme.sectionColors[index % theme.sectionColors.length];
};
