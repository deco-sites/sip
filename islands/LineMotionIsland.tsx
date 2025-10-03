import { useEffect, useRef, useState } from "preact/hooks";
import gsap from "gsap";
import { ComponentChildren } from "preact";

export interface LineMotionProps {
  /**
   * @description Content to animate line by line
   */
  children: ComponentChildren;

  /**
   * @description Delay between each line appearing (in seconds)
   * @default 0.1
   */
  staggerDelay?: number;

  /**
   * @description Animation duration (in seconds)
   * @default 0.4
   */
  duration?: number;

  /**
   * @description GSAP ease preset
   * @default power2.out
   */
  ease?: string;

  /**
   * @description Initial Y offset for lines (in pixels)
   * @default 20
   */
  yOffset?: number;

  /**
   * @description Initial delay before animation starts (in seconds)
   * @default 0
   */
  initialDelay?: number;

  /**
   * @description CSS class for the container
   */
  class?: string;
}

export default function LineMotionIsland({
  children,
  staggerDelay = 0.1,
  duration = 0.4,
  ease = "power2.out",
  yOffset = 20,
  initialDelay = 0,
  class: className = "",
}: LineMotionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const lineElements = element.querySelectorAll(
              ".line-motion-line",
            );

            gsap.fromTo(
              lineElements,
              {
                opacity: 0,
                y: yOffset,
              },
              {
                opacity: 1,
                y: 0,
                duration,
                ease,
                delay: initialDelay,
                stagger: staggerDelay,
              },
            );
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, staggerDelay, duration, ease, yOffset, initialDelay]);

  return (
    <p ref={containerRef} class={className}>
      {children}
    </p>
  );
}
