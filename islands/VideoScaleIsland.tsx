import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export default function VideoScaleIsland({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.95);
  const [borderRadius, setBorderRadius] = useState(24);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Update Locomotive Scroll when video/iframe loads
    const updateLocomotiveScroll = () => {
      const locomotiveScroll =
        (globalThis as typeof globalThis & {
          locomotiveScroll?: { update: () => void };
        }).locomotiveScroll;
      if (locomotiveScroll?.update) {
        locomotiveScroll.update();
      }
    };

    // Listen for iframe/video/image loads
    const iframe = container.querySelector("iframe");
    const video = container.querySelector("video");
    const img = container.querySelector("img");

    if (iframe) {
      iframe.addEventListener("load", updateLocomotiveScroll);
    }
    if (video) {
      video.addEventListener("loadedmetadata", updateLocomotiveScroll);
    }
    if (img) {
      img.addEventListener("load", updateLocomotiveScroll);
    }

    // Force update after mount
    setTimeout(updateLocomotiveScroll, 100);

    let hasReachedCenter = false;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = globalThis.innerHeight;
      const containerCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Distance from container center to viewport center
      const distanceFromCenter = containerCenter - viewportCenter;

      // If we've scrolled past center going down, lock at scale 1
      if (distanceFromCenter < 0 && !hasReachedCenter) {
        hasReachedCenter = true;
      }

      // Reset flag when scrolling back up past a threshold
      if (distanceFromCenter > windowHeight * 0.3) {
        hasReachedCenter = false;
      }

      // If locked at center, keep scale at 1 and border radius at normal
      if (hasReachedCenter && distanceFromCenter < 0) {
        setScale(1);
        setBorderRadius(8);
        return;
      }

      // Define animation range: start when entering viewport, finish before center
      const animationStart = windowHeight * 0.8; // Start when section is 80% from top
      const animationEnd = windowHeight * 0.2; // Finish when section is 20% above center

      if (
        distanceFromCenter <= animationStart &&
        distanceFromCenter >= animationEnd
      ) {
        // Calculate progress (0 to 1)
        const progress = 1 - (distanceFromCenter / animationStart);
        // Map progress to scale (0.95 to 1.0) - less aggressive
        const newScale = 0.95 + (progress * 0.05);
        setScale(Math.min(1, Math.max(0.95, newScale)));
        // Map progress to border radius (24px to 8px) - less aggressive
        const newBorderRadius = 24 - (progress * 16);
        setBorderRadius(Math.min(24, Math.max(8, newBorderRadius)));
      } else if (distanceFromCenter > animationStart) {
        // Before animation starts
        setScale(0.95);
        setBorderRadius(24);
      } else {
        // After animation ends (at or past center)
        setScale(1);
        setBorderRadius(8);
      }
    };

    // Initial check
    handleScroll();

    // Listen to both native scroll and locomotive scroll events
    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    globalThis.addEventListener("locomotive-scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      globalThis.removeEventListener("locomotive-scroll", handleScroll);

      // Clean up event listeners
      const iframe = container.querySelector("iframe");
      const video = container.querySelector("video");
      const img = container.querySelector("img");

      if (iframe) {
        iframe.removeEventListener("load", updateLocomotiveScroll);
      }
      if (video) {
        video.removeEventListener("loadedmetadata", updateLocomotiveScroll);
      }
      if (img) {
        img.removeEventListener("load", updateLocomotiveScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `scale(${scale}) translate3d(0, 0, 0)`,
        borderRadius: `${borderRadius}px`,
        transition: "transform 0.1s linear, border-radius 0.1s linear",
        overflow: "hidden",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      {children}
    </div>
  );
}
