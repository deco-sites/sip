import { ImageWidget as Image } from "apps/admin/widgets.ts";
import ScrollJackingHeadlineIsland from "../islands/ScrollJackingHeadlineIsland.tsx";

export interface Props {
  /**
   * @title Section Theme
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Decorative SVG
   * @description SVG or image for the left side decoration
   */
  decorationSvg?: Image;

  /**
   * @title Headline Text
   * @description Main headline - words will animate on scroll
   */
  headlineText?: string;
}

export default function FeaturesHeadline({
  theme = "dark",
  decorationSvg,
  headlineText =
    "Esta poderosa interface de expertise humana com Inteligência Artificial facilitará, bastante, a vida de candidatos, consultores e assessores em qualquer modelo de campanha",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full bg-background px-4 sm:px-6 lg:px-20 py-10 lg:py-80"
    >
      {/* Main Content Container */}
      <div class="w-full max-w-[1280px] mx-auto">
        {/* SVG + Headline */}
        <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          {/* Left - Decorative SVG */}
          <div class="w-full lg:w-[316px] h-[180px] flex-shrink-0">
            {decorationSvg
              ? (
                <img
                  src={decorationSvg}
                  alt=""
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
              )
              : (
                <svg
                  viewBox="0 0 316 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full"
                >
                  <path
                    d="M0 0 L270 0 L316 180 L46 180 Z"
                    fill="var(--color-accent)"
                    style={{ transform: "skew(-20deg)" }}
                  />
                </svg>
              )}
          </div>

          {/* Right - Headline with scroll animation words */}
          <div class="flex-1">
            {headlineText && (
              <ScrollJackingHeadlineIsland
                text={headlineText}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
