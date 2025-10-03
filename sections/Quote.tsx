import { ImageWidget as Image } from "apps/admin/widgets.ts";
import ScrollTextMotionIsland from "../islands/ScrollTextMotionIsland.tsx";

export interface Props {
  /**
   * @title Section Theme
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Background Image
   * @description Full-width background image (will align to top)
   */
  backgroundImage?: Image;

  /**
   * @title Headline Part 1
   * @description First part of headline (will be in accent color)
   */
  headlinePart1?: string;

  /**
   * @title Headline Part 2
   * @description Second part of headline (will be in foreground color)
   */
  headlinePart2?: string;

  /**
   * @title Photo Credit
   * @description Credit text for the photo
   */
  photoCredit?: string;
}

export default function Quote({
  theme = "dark",
  backgroundImage,
  headlinePart1: _headlinePart1 =
    "Ganhar uma eleição presidencial pode ser sorte.",
  headlinePart2: _headlinePart2 = "Ganhar oito, trata-se de marca insuperável.",
  photoCredit = "Foto: Ricardo Stuckert",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full min-h-[150vh] flex items-end justify-center px-4 sm:px-6 lg:px-20 py-20"
    >
      {/* Background Image - aligned to top */}
      <div class="absolute inset-0 overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            class="absolute w-full h-full object-cover object-top"
            loading="lazy"
          />
        )}
      </div>

      {/* Gradient Overlay - transparent at ~60%, visible at bottom */}
      <div
        class="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(20, 23, 23, 0) 0%, 
            rgba(20, 23, 23, 0) 60.41%, 
            rgba(20, 23, 23, 0.7) 72.012%, 
            var(--color-background) 86.191%)`,
        }}
      />

      {/* Content Container */}
      <div class="relative z-10 w-full max-w-[900px] mx-auto py-12">
        {/* Text Box with top border */}
        <div class="border-t-4 border-foreground pt-6 flex flex-col gap-6">
          {/* Headline */}
          <h2 class="text-4xl sm:text-5xl lg:text-[48px] font-medium leading-[1.02] tracking-[-1.44px]">
            <ScrollTextMotionIsland
              text="Ganhar uma eleição"
              wordClass="text-accent"
              staggerDelay={0.04}
              duration={0.5}
            />
            <br />
            <ScrollTextMotionIsland
              text="presidencial pode ser sorte."
              wordClass="text-accent"
              staggerDelay={0.04}
              duration={0.5}
            />
            <br />
            <ScrollTextMotionIsland
              text="Ganhar oito, trata-se"
              wordClass="text-foreground"
              staggerDelay={0.04}
              duration={0.5}
            />
            <br />
            <ScrollTextMotionIsland
              text="de marca insuperável."
              wordClass="text-foreground"
              staggerDelay={0.04}
              duration={0.5}
            />
          </h2>

          {/* Photo Credit */}
          {photoCredit && (
            <p class="text-sm font-medium text-foreground leading-[1.2] tracking-tight">
              {photoCredit}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
