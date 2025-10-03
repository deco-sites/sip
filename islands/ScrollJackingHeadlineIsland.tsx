import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  text: string;
  class?: string;
}

export default function ScrollJackingHeadlineIsland(
  { text, class: className }: Props,
) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeWords, setActiveWords] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal all words when section is visible
            setActiveWords(words.length);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [words.length]);

  return (
    <div
      ref={sectionRef}
      class={className}
    >
      <p class="text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight">
        {words.map((word, index) => (
          <span
            key={index}
            class="inline-block mr-2 text-foreground transition-opacity duration-300 ease-out"
            style={{
              opacity: index < activeWords ? 1 : 0.25,
              transitionDelay: `${index * 0.05}s`,
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
