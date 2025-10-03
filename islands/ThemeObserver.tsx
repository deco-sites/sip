import { useThemeObserver } from "../hooks/useThemeObserver.ts";

export default function ThemeObserver() {
  // Observe sections and change entire page theme based on scroll position
  useThemeObserver({
    threshold: 0.5, // Change theme when section is 50% visible
    rootMargin: "-10%", // Start transition slightly after section enters viewport
  });

  return null; // This island doesn't render anything visible
}
