import { useEffect, useRef, useState } from "preact/hooks";
import gsap from "gsap";

export interface Props {
  text: string;
  staggerDelay?: number;
  duration?: number;
  ease?: string;
  yOffset?: number;
  class?: string;
  wordClass?: string;
}

export default function ScrollTextMotionIsland({
  text,
  staggerDelay = 0.05,
  duration = 0.4,
  ease = "power2.out",
  yOffset = 20,
  class: className = "",
  wordClass = "",
}: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateText();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateText = () => {
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
        stagger: staggerDelay,
      },
    );
  };

  return (
    <span ref={containerRef} class={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          class={`text-motion-word inline-block mr-[0.25em] ${wordClass}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
