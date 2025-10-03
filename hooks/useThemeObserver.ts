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
  const { rootMargin = "0px 0px -80% 0px" } = options;

  useEffect(() => {
    let currentTheme: Theme | null = null;

    const updateTheme = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-theme]",
      );

      if (sections.length === 0) return;

      // Find which section we're currently in
      // The active section is the last one whose top has passed the trigger point (20% down viewport)
      const triggerPoint = window.innerHeight * 0.7;
      let activeSection: HTMLElement | null = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // If section's top is above or at the trigger point, it's potentially active
        if (rect.top <= triggerPoint) {
          activeSection = section;
        }
      });

      if (activeSection) {
        const theme = activeSection.dataset.sectionTheme as Theme;
        if (theme && theme !== currentTheme) {
          currentTheme = theme;
          document.documentElement.setAttribute("data-theme", theme);
        }
      }
    };

    // Set initial theme
    updateTheme();

    // Update on scroll (throttled with RAF)
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateTheme();
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("locomotive-scroll", handleScroll);

    // Watch for lazy-loaded sections
    const mutationObserver = new MutationObserver(() => {
      updateTheme();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("locomotive-scroll", handleScroll);
      mutationObserver.disconnect();
    };
  }, [rootMargin]);
}
