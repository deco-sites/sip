import { ImageWidget as Image } from "apps/admin/widgets.ts";
import TiltedHighlight from "../components/ui/TiltedHighlight.tsx";
import AnimatedTiltedHighlightIsland from "../islands/AnimatedTiltedHighlightIsland.tsx";

export interface MediaItem {
  /**
   * @title Media (Image or Video)
   */
  media?: Image;
  /**
   * @title Alt Text
   */
  alt?: string;
  /**
   * @title Card Text
   * @description Text displayed at the bottom of the card
   */
  text?: string;
}

export interface Props {
  /**
   * @title Section Theme
   * @description Theme for this section
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Headline (First Part)
   * @description First part of the headline
   */
  headlineStart?: string;

  /**
   * @title Headline (Highlighted Part)
   * @description Part of headline that will be highlighted
   */
  headlineHighlight?: string;

  /**
   * @title Media Items
   * @description Three media items to display
   */
  mediaItems?: MediaItem[];

  /**
   * @title Call to Action Text
   * @description Call to action text with skewed background
   */
  ctaText?: string;
}

export default function Challenge({
  theme = "green",
  headlineStart = "Ganhar uma eleição hoje é estar em",
  headlineHighlight = "todos os lugares ao mesmo tempo",
  mediaItems = [],
  ctaText =
    "Como transformar segundos de atenção em confiança e, depois, em votos?",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full bg-background px-4 sm:px-6 lg:px-20 py-20 lg:py-40"
    >
      {/* Main Content Container */}
      <div class="w-full max-w-[1280px] mx-auto flex flex-col gap-6">
        {/* Headline with Tilted Highlight */}
        <div class="bg-background p-10 flex flex-col gap-10 items-center">
          <h2 class="text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.1] text-foreground text-center tracking-tight max-w-4xl">
            {headlineStart}{" "}
            <TiltedHighlight skewDegree={-20}>
              {headlineHighlight}
            </TiltedHighlight>
          </h2>

          {/* Media Grid - 3 columns */}
          <div class="w-full flex flex-col lg:flex-row gap-3 items-start justify-center">
            {mediaItems.slice(0, 3).map((item, index) => (
              <div
                key={index}
                class="relative w-full lg:w-[356px] h-[450px] bg-background flex flex-col items-end justify-end p-6 overflow-hidden flex-shrink-0"
              >
                {item.media && (
                  <img
                    src={item.media}
                    alt={item.alt || ""}
                    class="absolute inset-0 w-full h-full object-cover"
                    style={{ zIndex: 0 }}
                    loading="lazy"
                  />
                )}
                {/* Gradient overlay - transparent at middle, black at bottom */}
                <div
                  class="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, black 100%)",
                    zIndex: 1,
                  }}
                />
                {item.text && (
                  <p
                    class="relative text-xl font-medium text-white leading-[1.2] tracking-tight"
                    style={{ zIndex: 2 }}
                  >
                    {item.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action with Skewed Background */}
        {ctaText && (
          <div class="bg-background p-10 flex items-center justify-center">
            <h3 class="text-3xl lg:text-4xl font-medium leading-[1.2] text-center tracking-tight text-foreground px-6 py-4 max-w-[796px]">
              <AnimatedTiltedHighlightIsland>
                {ctaText}
              </AnimatedTiltedHighlightIsland>
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
