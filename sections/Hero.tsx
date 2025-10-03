import { ImageWidget as Image } from "apps/admin/widgets.ts";
import TextMotionIsland from "../islands/TextMotionIsland.tsx";
import Button from "../components/ui/Button.tsx";

export interface Logo {
  /**
   * @description Logo image
   */
  image?: Image;
  /**
   * @description Alt text for the logo
   */
  alt?: string;
}

export interface Props {
  /**
   * @title Section Theme
   * @description Theme for this section
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Hero Image
   * @description Main hero image (left side)
   */
  heroImage?: Image;

  /**
   * @title Hero Image Alt
   */
  heroImageAlt?: string;

  /**
   * @title Background Decoration Behind Image
   * @description Large background decoration behind the main hero image
   */
  bgDecorationBehindImage?: Image;

  /**
   * @title Background Decoration SVG (Top Right)
   * @description Large background SVG on the top right behind text
   */
  bgDecorationRight?: Image;

  /**
   * @title Person Name
   * @description Name displayed overlaid on the image
   */
  personName?: string;

  /**
   * @title Person Title Line 1
   */
  personTitleLine1?: string;

  /**
   * @title Person Title Line 2
   */
  personTitleLine2?: string;

  /**
   * @title Person Title Line 3
   */
  personTitleLine3?: string;

  /**
   * @title Main Headline
   * @description Main headline text
   */
  headline?: string;

  /**
   * @title Highlighted Text
   * @description Part of the headline that should be highlighted (in green)
   */
  highlightedText?: string;

  /**
   * @title CTA Button Text
   */
  ctaText?: string;

  /**
   * @title CTA Button Link
   */
  ctaLink?: string;

  /**
   * @title Logos
   * @description Company/partner logos to display at the bottom
   */
  logos?: Logo[];

  /**
   * @title Scroll Indicator SVG
   * @description Small arrow/indicator at the bottom center
   */
  scrollIndicatorSvg?: Image;

  /**
   * @title Dot Grid - Dot Size
   * @description Size of the dots in pixels (default: 1)
   */
  dotSize?: number;

  /**
   * @title Dot Grid - Spacing
   * @description Spacing between dots in pixels (default: 40)
   */
  dotSpacing?: number;

  /**
   * @title Dot Grid - Dot Color
   * @description Color of the dots (default: rgba(255,255,255,0.1))
   */
  dotColor?: string;
}

export default function Hero({
  theme = "dark",
  heroImage,
  heroImageAlt,
  bgDecorationBehindImage,
  bgDecorationRight,
  personName,
  personTitleLine1,
  personTitleLine2,
  personTitleLine3,
  headline,
  highlightedText,
  ctaText,
  ctaLink,
  logos,
  scrollIndicatorSvg,
  dotSize = 1,
  dotSpacing = 40,
  dotColor = "rgba(255,255,255,0.1)",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative h-screen w-full flex items-end bg-background justify-center pt-20 pb-0 overflow-hidden"
    >
      {/* Dot Grid Background - using separate div for better performance */}
      <div
        class="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          willChange: "transform",
          transform: "translateZ(0)",
          zIndex: 0,
        }}
      />

      {/* Main Content Container - 1280px max-width */}
      <div
        class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative"
        style={{ zIndex: 10 }}
      >
        {/* Background Decoration Behind Image - z-index 1, positioned at bottom of container */}
        {bgDecorationBehindImage && (
          <img
            data-scroll
            data-scroll-speed="0.5"
            src={bgDecorationBehindImage}
            alt=""
            class="absolute bottom-0 -left-40 w-auto h-[400px] pointer-events-none"
            style={{ zIndex: 1 }}
            loading="lazy"
          />
        )}

        {/* Background Decoration Behind Text (Right) - z-index 1, positioned at bottom of container */}
        {bgDecorationRight && (
          <img
            data-scroll
            data-scroll-speed="-1"
            src={bgDecorationRight}
            alt=""
            class="absolute bottom-0 right-0 w-auto h-[600px] lg:h-[820px] pointer-events-none translate-x-32 opacity-90"
            style={{ zIndex: 1 }}
            loading="lazy"
          />
        )}

        {/* Main Layout - Flex row with image left, content right */}
        <div class="flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-16 min-h-[820px]">
          {/* LEFT SIDE - Image with overlaid person info */}
          <div class="relative w-full lg:w-[639px] flex-shrink-0">
            {/* Hero Image - z-index 3 */}
            {heroImage && (
              <div
                class="relative w-full h-[600px] lg:h-[820px] rounded-lg"
                style={{ zIndex: 3 }}
              >
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  class="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Person Info - Overlaid on center left of image */}
                {personName && (
                  <div class="absolute top-1/2 -translate-y-1/2 -left-10 flex items-start gap-2 text-lg lg:text-2xl ">
                    <span class="text-foreground font-medium whitespace-nowrap">
                      {personName}
                    </span>
                    <span class="text-accent">/</span>
                    <div class="text-foreground font-normal leading-tight">
                      {personTitleLine1 && (
                        <p class="m-0">{personTitleLine1}</p>
                      )}
                      {personTitleLine2 && (
                        <p class="m-0">{personTitleLine2}</p>
                      )}
                      {personTitleLine3 && (
                        <p class="m-0">{personTitleLine3}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Content */}
          <div class="relative flex flex-col items-start justify-center gap-8 lg:gap-12 flex-grow lg:px-10 lg:py-32">
            {/* Headline - z-index 2 */}
            {headline && (
              <h1
                class="relative text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight"
                style={{ zIndex: 2 }}
              >
                <TextMotionIsland
                  text={headline}
                  class="text-foreground"
                  staggerDelay={0.05}
                  duration={0.8}
                  yOffset={30}
                />
                {highlightedText && (
                  <>
                    {" "}
                    <TextMotionIsland
                      text={highlightedText}
                      class="text-accent"
                      staggerDelay={0.05}
                      duration={0.8}
                      yOffset={30}
                      initialDelay={headline.split(" ").length * 0.05}
                    />
                  </>
                )}
              </h1>
            )}

            {/* CTA Button - z-index 2 */}
            {ctaText && (
              <div class="relative" style={{ zIndex: 2 }}>
                <Button
                  text={ctaText}
                  href={ctaLink || "#"}
                  variant="primary"
                  size="md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bottom center */}
      {scrollIndicatorSvg && (
        <div
          class="absolute bottom-6 left-1/2 -translate-x-1/2"
          style={{ zIndex: 20 }}
        >
          <img
            src={scrollIndicatorSvg}
            alt="Scroll down"
            class="w-4 h-4 opacity-80"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}
