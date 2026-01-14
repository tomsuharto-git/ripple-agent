/**
 * FEATURE FLAGS
 *
 * Toggle features on/off for this project.
 * Set to `true` to enable, `false` to disable.
 */

export const features = {
  // Authentication
  passwordGate: true,           // Require password to access site

  // Navigation
  showSubtitles: true,          // Show subtitles under section titles
  showSectionHeaders: true,     // Show header bar on section pages
  stickyNav: true,              // Keep nav bar sticky on scroll

  // Toggleable Sections (set false to hide from nav and home)
  sections: {
    research: true,             // Get Smart / 6Cs research
    deepdive: true,             // Deep Dive research library
    insights: true,             // Creative Insights (10 provocations)
    analysis: false,            // RFP/Brief analysis
    diagnosis: true,            // Growth Diagnosis
    audience: false,            // Growth Audience / Target profiles
    inspiration: false,         // Creative inspiration
    brief: true,                // Brief Summary
    roast: false,               // Brief Roast (content moved to RFP page)
    timeline: false,            // Project timeline
    settings: false,            // Settings page (usually disabled)
  },

  // Dynamic Routing
  enableDynamicRoutes: true,    // Enable [slug] pages for research section

  // Chat Features (Chat is ALWAYS on home page)
  chatStreaming: true,          // Stream responses (vs wait for full response)
  chatMarkdown: true,           // Render markdown in chat responses

  // Visual
  colorScheme: '3-color' as '2-color' | '3-color',  // Color scheme type
  animations: true,             // Enable animations and transitions
};

// Helper to check if a section is enabled
export const isSectionEnabled = (sectionId: keyof typeof features.sections): boolean => {
  return features.sections[sectionId] ?? false;
};

// Get list of enabled section IDs
export const getEnabledSectionIds = (): string[] => {
  return Object.entries(features.sections)
    .filter(([, enabled]) => enabled)
    .map(([id]) => id);
};
