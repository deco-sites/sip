import { useEffect, useRef } from "preact/hooks";
import gsap from "gsap";

export interface TextMotionProps {
  /**
   * @description The text phrase to animate word by word
   */
  text: string;

  /**
   * @description Delay between each word appearing (in seconds)
   * @default 0.05
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
   * @description Initial Y offset for words (in pixels)
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

  /**
   * @description CSS class for each word
   */
  wordClass?: string;
}

export default function TextMotion({
  text,
  staggerDelay = 0.05,
  duration = 0.4,
  ease = "power2.out",
  yOffset = 20,
  initialDelay = 0,
  class: className = "",
  wordClass = "",
}: TextMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    const wordElements = containerRef.current.querySelectorAll(
      ".text-motion-word",
    );

    gsap.fromTo(
      wordElements,
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
  }, [text, staggerDelay, duration, ease, yOffset, initialDelay]);

  return (
    <div ref={containerRef} class={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          class={`text-motion-word inline-block mr-[0.25em] ${wordClass}`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
