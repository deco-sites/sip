# Scroll-Based Theme Transitions

## Overview

The entire website background and text colors fade smoothly as you scroll
between sections. Each section declares its theme (dark, green, or light), and
when it becomes visible, the whole page transitions to that theme.

## How It Works

### 1. CSS Theme System

The `tailwind.css` file defines three themes using CSS custom properties:

```css
body[data-theme="dark"] {
  --theme-bg: var(--color-braziljs-950);
  --theme-text: var(--color-braziljs-100);
  --theme-text-secondary: var(--color-braziljs-800);
  --theme-accent: var(--color-braziljs-primary);
}

body[data-theme="green"] {
  --theme-bg: var(--color-braziljs-primary);
  --theme-text: var(--color-braziljs-950);
  --theme-text-secondary: var(--color-braziljs-800);
  --theme-accent: var(--color-braziljs-950);
}
```

The body applies these variables with a smooth transition:

```css
body {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  transition: background-color 0.6s ease, color 0.6s ease;
}
```

### 2. Implementation Approach

Use **Intersection Observer API** to detect when sections enter the viewport and
update the `data-theme` attribute on the body element.

## Implementation Steps

### Step 1: Create the Theme Hook

Create `hooks/useThemeObserver.ts`:

```typescript
import { useEffect } from "preact/hooks";

export type Theme = "dark" | "green" | "light";

interface UseThemeObserverOptions {
  /**
   * When to trigger the theme change.
   * - 0.0 = as soon as section enters viewport
   * - 0.5 = when section is 50% visible
   * - 1.0 = when section is fully visible
   */
  threshold?: number;

  /**
   * Margin around viewport to trigger early/late.
   * Example: "-20%" triggers when section is 20% into viewport
   */
  rootMargin?: string;
}

export function useThemeObserver(
  options: UseThemeObserverOptions = {},
) {
  const { threshold = 0.5, rootMargin = "0px" } = options;

  useEffect(() => {
    // Find all sections with data-section-theme attribute
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-section-theme]",
    );

    if (sections.length === 0) return;

    // Track which section is most visible
    let activeTheme: Theme | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let mostVisible: { element: HTMLElement; ratio: number } | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              !mostVisible ||
              entry.intersectionRatio > mostVisible.ratio
            ) {
              mostVisible = {
                element: entry.target as HTMLElement,
                ratio: entry.intersectionRatio,
              };
            }
          }
        });

        // Update theme if we have a visible section
        if (mostVisible) {
          const theme = mostVisible.element.dataset
            .sectionTheme as Theme;
          if (theme && theme !== activeTheme) {
            activeTheme = theme;
            document.body.dataset.theme = theme;
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin,
      },
    );

    // Observe all sections
    sections.forEach((section) => observer.observe(section));

    // Set initial theme based on first visible section
    const firstSection = sections[0];
    if (firstSection) {
      const theme = firstSection.dataset.sectionTheme as Theme;
      document.body.dataset.theme = theme || "dark";
    }

    // Cleanup
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [threshold, rootMargin]);
}
```

### Step 2: Create Section Wrapper Component

Create `components/ThemeSection.tsx`:

```typescript
import { ComponentChildren } from "preact";
import { Theme } from "../hooks/useThemeObserver.ts";

interface ThemeSectionProps {
  theme: Theme;
  children: ComponentChildren;
  class?: string;
  id?: string;
}

export default function ThemeSection({
  theme,
  children,
  class: className = "",
  id,
}: ThemeSectionProps) {
  return (
    <section
      id={id}
      data-section-theme={theme}
      class={className}
    >
      {children}
    </section>
  );
}
```

### Step 3: Use in Your Layout/Page

In `routes/_app.tsx` or your main layout:

```typescript
import { useThemeObserver } from "../hooks/useThemeObserver.ts";

export default function App({ Component }: PageProps) {
  // Initialize theme observer
  useThemeObserver({
    threshold: 0.5, // Trigger when section is 50% visible
    rootMargin: "-10%", // Start transition slightly after entering viewport
  });

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SIP</title>
        <link rel="stylesheet" href="/static/tailwind.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
```

### Step 4: Use ThemeSection in Your Sections

```typescript
import ThemeSection from "../components/ThemeSection.tsx";

export default function HomePage() {
  return (
    <>
      <ThemeSection theme="dark" class="min-h-screen p-20">
        <h1 class="text-[var(--theme-text)] text-6xl">
          Dark Section
        </h1>
        <p class="text-[var(--theme-text-secondary)]">
          Content here
        </p>
      </ThemeSection>

      <ThemeSection theme="green" class="min-h-screen p-20">
        <h1 class="text-[var(--theme-text)] text-6xl">
          Green Section
        </h1>
        <p class="text-[var(--theme-text-secondary)]">
          Content here
        </p>
      </ThemeSection>

      <ThemeSection theme="dark" class="min-h-screen p-20">
        <h1 class="text-[var(--theme-text)] text-6xl">
          Back to Dark
        </h1>
      </ThemeSection>
    </>
  );
}
```

## Using Theme Variables in Components

Instead of using Tailwind color classes directly, use CSS variables:

```typescript
// ✅ Good - uses theme variables
<div class="bg-[var(--theme-bg)] text-[var(--theme-text)]">

// ✅ Good - for specific colors that don't change
<div class="bg-braziljs-primary text-braziljs-950">

// ❌ Avoid - won't transition with theme
<div class="bg-black text-white">
```

## Using Motion for Enhanced Animations (Optional)

You can use Motion for individual element animations within sections:

```typescript
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <ThemeSection theme="dark">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        class="text-[var(--theme-text)]"
      >
        Welcome
      </motion.h1>
    </ThemeSection>
  );
}
```

## Customization Options

### Change Transition Speed

In `tailwind.css`:

```css
body {
  transition: background-color 0.8s ease, color 0.8s ease; /* Slower */
}
```

### Change Trigger Point

```typescript
useThemeObserver({
  threshold: 0.3, // Trigger when 30% visible
  rootMargin: "-20%", // Start 20% into viewport
});
```

### Multiple Thresholds for Precise Control

```typescript
const observer = new IntersectionObserver(callback, {
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
});
```

## Troubleshooting

### Theme not changing

- Check that sections have `data-section-theme` attribute
- Verify `useThemeObserver()` is called in layout/app
- Check browser console for errors

### Transitions too fast/slow

- Adjust `transition` duration in `tailwind.css`
- Modify `threshold` and `rootMargin` in observer options

### Colors not transitioning

- Make sure you're using `var(--theme-*)` variables, not hardcoded colors
- Check that body has proper CSS transition property

## Browser Support

- Intersection Observer: All modern browsers
- CSS Custom Properties: All modern browsers
- OKLCH colors: Chrome 111+, Safari 16.4+, Firefox 113+

For older browser support, add a fallback:

```css
body[data-theme="dark"] {
  --theme-bg: #141717; /* Fallback */
  --theme-bg: var(--color-braziljs-950);
}
```
