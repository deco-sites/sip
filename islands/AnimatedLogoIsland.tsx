import { useEffect, useRef, useState } from "preact/hooks";
import { ImageWidget as Image } from "apps/admin/widgets.ts";

interface Props {
  src?: Image;
  alt?: string;
  class?: string;
}

export default function AnimatedLogoIsland(
  { src, alt, class: className }: Props,
) {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = logoRef.current;
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
        threshold: 0.3,
        rootMargin: "0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!src) return null;

  return (
    <img
      ref={logoRef}
      src={src}
      alt={alt}
      class={className}
      loading="eager"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    />
  );
}
