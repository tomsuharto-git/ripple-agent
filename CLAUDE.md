# Project Agent Template

A reusable scaffold for creating Project Agent tools with configurable sections, AI chat, and modular layout components.

## Quick Start (5 minutes)

1. **Copy the template**
   ```bash
   cp -r _template/ your-project-name/
   cd your-project-name/
   ```

2. **Edit config files**
   - `src/config/project.ts` - Set project name, password, colors
   - `src/config/features.ts` - Enable/disable sections
   - `src/data/sections.ts` - Customize section metadata
   - `src/data/chat-context.ts` - Configure AI assistant context

3. **Add fonts** (optional)
   - Place font files in `public/fonts/`
   - Update `@font-face` declarations in `src/app/globals.css`

4. **Install and run**
   ```bash
   npm install
   npm run dev
   ```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + theme injection
│   ├── page.tsx                # Home (Hero + Sections + Chat)
│   ├── globals.css             # Theme variables + styles
│   ├── api/chat/route.ts       # Streaming chat endpoint
│   └── (sections)/
│       ├── layout.tsx          # PasswordGate + NavBar wrapper
│       ├── research/           # Dynamic routes with [slug]
│       ├── analysis/
│       ├── diagnosis/
│       ├── audience/
│       ├── inspiration/
│       ├── brief/
│       ├── timeline/
│       └── settings/
│
├── components/
│   ├── PasswordGate.tsx        # Auth gate
│   ├── NavBar.tsx              # Navigation
│   ├── Hero.tsx                # Landing hero
│   ├── SectionPanel.tsx        # Home section cards
│   ├── SectionHeader.tsx       # Section page headers
│   ├── ChatPanel.tsx           # AI chat (always on home)
│   └── layouts/                # Reusable layout patterns
│       ├── CardGrid.tsx
│       ├── AlternatingPanels.tsx
│       ├── ContentBlock.tsx
│       ├── TabSection.tsx
│       ├── AccordionList.tsx
│       ├── Timeline.tsx
│       └── SplitView.tsx
│
├── config/
│   ├── project.ts              # Project metadata
│   ├── features.ts             # Feature flags
│   └── theme.ts                # Theme config
│
├── data/
│   ├── sections.ts             # Section definitions
│   └── chat-context.ts         # AI system prompt
│
├── hooks/
│   └── useAuth.ts              # Auth state
│
└── lib/
    └── cn.ts                   # Classname helper
```

---

## Configuration

### project.ts - Project Identity

```typescript
export const project = {
  name: 'Your Project Name',
  slug: 'your-project',
  password: 'your-password-2025',
  storageKey: 'your-project-auth',
  
  colors: {
    primary: '#C75B39',      // Main accent
    secondary: '#D4A853',    // Secondary accent
    dark: '#1A1714',         // Dark backgrounds
    light: '#FAF7F2',        // Light backgrounds
    muted: '#6B6B6B',        // Muted text
  },
  
  title: 'Your Project | Strategic Tool',
  description: 'Project description for meta tags',
};
```

### features.ts - Feature Flags

```typescript
export const features = {
  // Auth
  passwordGate: true,
  
  // Navigation
  showSubtitles: true,
  showSectionHeaders: true,
  stickyNav: true,
  
  // Sections (toggle visibility)
  sections: {
    research: true,
    analysis: true,
    diagnosis: true,
    audience: true,
    inspiration: true,
    brief: true,
    timeline: true,
    settings: false,  // Hidden by default
  },
  
  // Chat is ALWAYS included on home page
  
  // Routing
  enableDynamicRoutes: true,
  
  // Chat
  chatStreaming: true,
  chatMarkdown: true,
  
  // Visual
  colorScheme: '3-color',
  animations: true,
};
```

### sections.ts - Section Metadata

Each section needs:
- `id` - Unique identifier (matches route)
- `title` - Display name
- `subtitle` - Optional tagline
- `path` - URL path
- `icon` - Unicode/emoji icon
- `color` - 'primary' | 'secondary' | 'dark'
- `enabled` - Visibility toggle
- `order` - Display order

### chat-context.ts - AI Assistant

Configure the AI assistant's:
- `systemPrompt` - Instructions and project context
- `chatConfig` - Model, temperature, UI text

---

## Layout Components

Mix and match these layouts for section pages:

### CardGrid
Grid of clickable cards. Good for: Research topics, categories, options.

```tsx
<CardGrid 
  items={items} 
  columns={2|3|4} 
  linkPattern="/section/[id]"  // Optional
/>
```

### AlternatingPanels
Left/right alternating content blocks. Good for: Briefs, narratives, explanations.

```tsx
<AlternatingPanels panels={[
  { id: 'intro', title: 'Title', subtitle: 'Subtitle', content: <p>...</p> }
]} />
```

### ContentBlock
Single section with optional image. Good for: Features, highlights.

```tsx
<ContentBlock
  title="Title"
  content={<p>Content</p>}
  image="/path/to/image.jpg"
  imagePosition="left" | "right"
/>
```

### TabSection
Tabbed content switcher. Good for: Comparisons, alternatives.

```tsx
<TabSection tabs={[
  { id: 'tab1', label: 'Tab 1', content: <div>...</div> }
]} />
```

### AccordionList
Expandable items. Good for: FAQs, details on demand.

```tsx
<AccordionList items={[
  { id: 'q1', title: 'Question?', content: <p>Answer</p> }
]} allowMultiple={false} />
```

### Timeline
Vertical timeline. Good for: Project phases, history, roadmaps.

```tsx
<Timeline items={[
  { id: 'phase1', date: 'Week 1', title: 'Title', description: '...', status: 'completed'|'current'|'upcoming' }
]} />
```

### SplitView
50/50 side-by-side layout. Good for: Comparisons, before/after.

```tsx
<SplitView
  left={<div>Left content</div>}
  right={<div>Right content</div>}
  divider={true}
/>
```

---

## Customization Checklist

### Required Changes
- [ ] Edit `config/project.ts` with project info
- [ ] Set password in `config/project.ts`
- [ ] Update brand colors in `config/project.ts`
- [ ] Toggle sections in `config/features.ts`
- [ ] Customize AI prompt in `data/chat-context.ts`

### Optional Changes
- [ ] Add custom fonts to `public/fonts/`
- [ ] Update `@font-face` in `globals.css`
- [ ] Customize section content in each page
- [ ] Add dynamic route content for `[slug]` pages
- [ ] Adjust animations in `globals.css`

---

## Environment Variables

Required for chat functionality:

```env
ANTHROPIC_API_KEY=your-api-key
```

---

## Deployment

Works with Vercel out of the box:

1. Push to GitHub
2. Import in Vercel
3. Add `ANTHROPIC_API_KEY` environment variable
4. Deploy

---

## Chat Integration

The ChatPanel is always present on the home page (not a toggleable section).

To customize:
1. Edit `src/data/chat-context.ts` for system prompt
2. Add project-specific context to the prompt
3. Adjust `chatConfig` for model settings

The chat uses Server-Sent Events (SSE) for streaming responses.

---

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v4
- Anthropic Claude API (streaming)
- CSS Variables for theming
