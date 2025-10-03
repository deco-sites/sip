import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  children: string;
  animationDuration?: number;
}

export default function AnimatedTiltedHighlightIsland({
  children,
  animationDuration = 0.2,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const skewSize = "24px";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={ref} class="relative inline-block mx-[-12px]">
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
          backgroundSize: `${skewSize} 100%, calc(100% - ${
            parseInt(skewSize) * 2
          }px) 100%, ${skewSize} 100%`,
          backgroundPosition: "left center, center, right center",
          clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path ${animationDuration}s ease-out`,
        }}
      />

      {/* Text */}
      <span
        class="relative px-3 py-2 font-medium"
        style={{
          color: isVisible ? "var(--color-background)" : "inherit",
          transition: `color ${animationDuration}s ease-out`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
