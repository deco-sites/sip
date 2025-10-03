import { ImageWidget as Image } from "apps/admin/widgets.ts";
import ScrollTextMotionIsland from "../islands/ScrollTextMotionIsland.tsx";

export interface Props {
  /**
   * @title Section Theme
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Background Image
   */
  backgroundImage?: Image;

  /**
   * @title Headline Part 1 (Highlighted)
   * @description First part in accent color
   */
  headlinePart1?: string;

  /**
   * @title Headline Part 2
   * @description Second part in foreground color
   */
  headlinePart2?: string;

  /**
   * @title CTA Button Text
   */
  ctaText?: string;

  /**
   * @title CTA Button Link
   */
  ctaLink?: string;
}

export default function FinalCTA({
  theme = "dark",
  backgroundImage,
  headlinePart1 = "O próximo capítulo",
  headlinePart2 = " da sua carreira política começa aqui.",
  ctaText = "Conhecer mais",
  ctaLink = "#contato",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full min-h-screen flex items-center justify-end px-4 sm:px-6 lg:px-20 py-20"
    >
      {/* Background Image */}
      <div class="absolute inset-0">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            class="absolute w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Content - Right Side */}
      <div class="relative z-10 w-full max-w-[452px] flex flex-col gap-10 p-3">
        {/* Headline */}
        <h2 class="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-[1.2] tracking-tight">
          <ScrollTextMotionIsland
            text={headlinePart1}
            wordClass="text-accent"
            staggerDelay={0.05}
            duration={0.5}
          />
          <ScrollTextMotionIsland
            text={headlinePart2}
            wordClass="text-foreground"
            staggerDelay={0.05}
            duration={0.5}
          />
        </h2>

        {/* CTA Button */}
        {ctaText && (
          <a
            href={ctaLink}
            class="inline-flex items-center justify-center px-4 py-3 bg-accent text-background font-medium text-base uppercase tracking-tight rounded-full hover:opacity-90 transition-opacity w-fit"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
