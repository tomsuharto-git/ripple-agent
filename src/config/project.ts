/**
 * PROJECT CONFIGURATION
 *
 * Edit this file to customize your Project Agent:
 * - name: Display name shown in header and title
 * - slug: URL-friendly identifier (used for storage keys)
 * - password: Password for site access
 * - colors: Brand color palette
 * - meta: Page title and description
 */

export const project = {
  // Basic Info
  name: 'Ripple (XRP)',
  slug: 'ripple',

  // Authentication
  password: 'ripple2026',
  storageKey: 'ripple-agent-auth', // Used for localStorage

  // Brand Colors (Ripple electric blue palette)
  colors: {
    primary: '#0096E4',      // Ripple electric blue
    secondary: '#00D4FF',    // Lighter cyan accent
    dark: '#0A1628',         // Deep navy dark
    light: '#F0F8FF',        // Light blue-white
    muted: '#5A7A9A',        // Muted blue-gray
  },

  // Page Metadata
  title: 'Ripple (XRP) | Strategic Analysis',
  description: 'Strategic analysis and growth diagnosis for Ripple XRP cryptocurrency.',
};

// Export individual values for convenience
export const { name, slug, password, storageKey, colors, title, description } = project;
