import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  target: number;
  duration?: number;
  class?: string;
}

export default function CountUpIsland({
  target,
  duration = 2,
  class: className = "",
}: Props) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const animateCount = () => {
    const startTime = Date.now();

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return (
    <div ref={containerRef} class={className}>
      {count}
    </div>
  );
}
