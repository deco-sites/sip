import {
  ImageWidget as Image,
  VideoWidget as Video,
} from "apps/admin/widgets.ts";
import ScrollTriggeredTextMotionIsland from "../islands/ScrollTriggeredTextMotionIsland.tsx";
import CountUpIsland from "../islands/CountUpIsland.tsx";
import HoverVideoIsland from "../islands/HoverVideoIsland.tsx";
import CarouselNavigationIsland from "../islands/CarouselNavigationIsland.tsx";

export interface CampaignCard {
  /**
   * @title Campaign Image
   */
  image?: Image;
  /**
   * @title Campaign Video
   * @description Video to play on hover
   */
  video?: Video;
  /**
   * @title Flag Icon
   */
  flagIcon?: Image;
  /**
   * @title Candidate Name
   */
  name?: string;
  /**
   * @title Year(s)
   */
  year?: string;
}

export interface Props {
  /**
   * @title Section Theme
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Headline Start
   * @description Text before the highlighted name
   */
  headlineStart?: string;

  /**
   * @title Highlighted Name
   * @description Name that will be highlighted
   */
  highlightedName?: string;

  /**
   * @title Headline End
   * @description Text after the highlighted name
   */
  headlineEnd?: string;

  /**
   * @title Stats Number
   * @description Large number to display (e.g., "150")
   */
  statsNumber?: string;

  /**
   * @title Stats Label
   * @description Label below the stats number
   */
  statsLabel?: string;

  /**
   * @title Large Carousel Cards
   * @description Cards for the first (large) carousel
   */
  largeCards?: CampaignCard[];

  /**
   * @title Small Carousel Cards
   * @description Cards for the second (small) carousel
   */
  _smallCards?: CampaignCard[];
}

export default function Campaigns({
  theme = "dark",
  headlineStart = "/ ",
  highlightedName = "João Santana",
  headlineEnd =
    " ajudou a escrever a história de 6 países inteiros. Agora, ele pode escrever a sua. /",
  statsNumber = "150",
  statsLabel = "Campanhas vitoriosas",
  largeCards = [],
  _smallCards = [],
}: Props) {
  return (
    <section
      id="campanhas"
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full bg-background px-4 sm:px-6 lg:px-20 py-20"
    >
      {/* Main Content Container */}
      <div class="w-full max-w-[1280px] mx-auto flex flex-col gap-6">
        {/* Top Section - Headline + Stats */}
        <div class="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left - Headline with Highlight */}
          <div class="flex-1 flex items-center justify-center p-10">
            <ScrollTriggeredTextMotionIsland
              textBefore={headlineStart}
              highlightedText={highlightedName}
              textAfter={headlineEnd}
              class="text-3xl lg:text-4xl font-medium leading-[1.2] tracking-tight text-foreground"
              staggerDelay={0.03}
              duration={0.5}
              ease="power2.out"
              highlightDelay={0.2}
            />
          </div>

          {/* Right - Stats Card */}
          <div class="flex-shrink-0 w-full lg:w-auto rounded-lg p-6 flex flex-col items-end justify-center overflow-hidden">
            <div class="flex items-baseline">
              <span class="text-[180px] font-normal leading-none text-accent tracking-tighter">
                +
              </span>
              <CountUpIsland
                target={parseInt(statsNumber)}
                duration={1.5}
                class="text-[180px] font-semibold leading-none text-foreground tracking-[-7.2px]"
              />
            </div>
            <p class="text-4xl font-medium leading-[1.4] text-foreground tracking-tight whitespace-nowrap">
              {statsLabel}
            </p>
          </div>
        </div>

        {/* Carousel */}
        {largeCards.length > 0 && (
          <CarouselNavigationIsland>
            <div class="flex gap-3 pb-4">
              {largeCards.map((card, index) => (
                <div
                  key={index}
                  class="flex-shrink-0 flex flex-col gap-3"
                >
                  {/* Card Image/Video */}
                  <div class="w-[336px] h-[560px] rounded-lg overflow-hidden bg-braziljs-900">
                    {card.image && (
                      <HoverVideoIsland
                        image={card.image}
                        video={card.video}
                        alt={card.name || ""}
                        class="w-full h-full"
                      />
                    )}
                  </div>

                  {/* Card Info */}
                  <div class="flex flex-col gap-2">
                    <div class="flex gap-3 items-center">
                      {card.flagIcon && (
                        <img
                          src={card.flagIcon}
                          alt=""
                          class="w-[30px] h-[20px] object-cover"
                          loading="lazy"
                        />
                      )}
                      <h3 class="text-2xl font-medium text-accent leading-[1.3] tracking-tight">
                        {card.name}
                      </h3>
                    </div>
                    <p class="text-xl font-medium text-foreground leading-[1.3] tracking-tight">
                      {card.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CarouselNavigationIsland>
        )}
      </div>
    </section>
  );
}
