import { useEffect, useRef, useState } from "preact/hooks";
import gsap from "gsap";

export interface Props {
  textBefore: string;
  highlightedText: string;
  textAfter: string;
  staggerDelay?: number;
  duration?: number;
  ease?: string;
  yOffset?: number;
  class?: string;
  highlightDelay?: number;
}

export default function ScrollTriggeredTextMotionIsland({
  textBefore,
  highlightedText,
  textAfter,
  staggerDelay = 0.03,
  duration = 0.5,
  ease = "power2.out",
  yOffset = 20,
  class: className = "",
  highlightDelay = 0.3,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  // Split text into words, preserving which word is highlighted
  const words = `${textBefore}${highlightedText}${textAfter}`.split(" ");
  const beforeWords = textBefore.trim().split(" ").filter((w) => w);
  const highlightWords = highlightedText.trim().split(" ").filter((w) => w);
  const highlightStartIndex = beforeWords.length;
  const highlightEndIndex = highlightStartIndex + highlightWords.length;

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
    const totalDuration = staggerDelay * wordElements.length + duration;

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

    // Show highlight after text motion completes
    setTimeout(() => {
      setShowHighlight(true);
    }, (totalDuration + highlightDelay) * 1000);
  };

  return (
    <div ref={containerRef} class={className}>
      {words.map((word, index) => {
        const isHighlighted = index >= highlightStartIndex &&
          index < highlightEndIndex;
        const isFirstHighlighted = index === highlightStartIndex;

        // If this is the first highlighted word, render the entire highlighted block
        if (isFirstHighlighted) {
          return (
            <span
              key={`highlight-${index}`}
              class="text-motion-word inline-block mr-[0.25em]"
            >
              <span class="relative inline-block mx-[-12px]">
                {/* Background animated rectangle */}
                <span
                  class="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to bottom right, transparent 50%, var(--color-accent) 50%),
                      linear-gradient(var(--color-accent), var(--color-accent)),
                      linear-gradient(to top left, transparent 50%, var(--color-accent) 50%)
                    `,
                    backgroundRepeat: "no-repeat",
                    backgroundSize:
                      "24px 100%, calc(100% - 48px) 100%, 24px 100%",
                    backgroundPosition: "left center, center, right center",
                    clipPath: showHighlight
                      ? "inset(0 0 0 0)"
                      : "inset(0 100% 0 0)",
                    transition: "clip-path 0.4s ease-out",
                  }}
                />
                {/* Text */}
                <span
                  class="relative px-3 py-2 font-medium whitespace-nowrap"
                  style={{
                    color: showHighlight
                      ? "var(--color-background)"
                      : "inherit",
                    transition: "color 0.4s ease-out",
                  }}
                >
                  {highlightedText}
                </span>
              </span>
            </span>
          );
        }

        // Skip rendering other highlighted words since we rendered them all together
        if (isHighlighted && !isFirstHighlighted) {
          return null;
        }

        // Regular non-highlighted word
        return (
          <span
            key={`${word}-${index}`}
            class="text-motion-word inline-block mr-[0.25em]"
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
