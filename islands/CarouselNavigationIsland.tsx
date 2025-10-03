import { useEffect, useRef, useState } from "preact/hooks";

interface CarouselNavigationProps {
  children: preact.ComponentChildren;
}

export default function CarouselNavigationIsland({
  children,
}: CarouselNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollPosition();
    globalThis.addEventListener("resize", checkScrollPosition);
    return () => globalThis.removeEventListener("resize", checkScrollPosition);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 356; // card width (336) + gap (20)
    const targetScroll = direction === "left"
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div class="relative">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Scroll left"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        class="w-full overflow-x-auto overscroll-x-contain scrollbar-none"
      >
        {children}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Scroll right"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
