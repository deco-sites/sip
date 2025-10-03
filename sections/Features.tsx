import { ImageWidget as Image } from "apps/admin/widgets.ts";

export interface FeatureCard {
  /**
   * @title Card Title
   */
  title?: string;
  /**
   * @title Card Description
   */
  description?: string;
  /**
   * @title Card Image
   */
  image?: Image;
  /**
   * @title Image Alt Text
   */
  imageAlt?: string;
}

export interface Props {
  /**
   * @title Section Theme
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Left Tall Card
   * @description Large card on the left side
   */
  leftCard?: FeatureCard;

  /**
   * @title Right Top Card
   * @description Top card on the right side
   */
  rightTopCard?: FeatureCard;

  /**
   * @title Right Bottom Card
   * @description Bottom card on the right side
   */
  rightBottomCard?: FeatureCard;

  /**
   * @title Bottom Row Cards
   * @description 3 cards for the bottom row
   */
  bottomCards?: FeatureCard[];

  /**
   * @title CTA Button Text
   */
  ctaText?: string;

  /**
   * @title CTA Button Link
   */
  ctaLink?: string;
}

export default function Features({
  theme = "dark",
  leftCard,
  rightTopCard,
  rightBottomCard,
  bottomCards = [],
  ctaText = "Descobrir como a SIP pode me ajudar",
  ctaLink = "#contato",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full bg-background px-4 sm:px-6 lg:px-20 py-10 lg:py-16"
    >
      {/* Main Content Container */}
      <div class="w-full max-w-[1280px] mx-auto">
        {/* Bento Grid */}
        <div class="flex flex-col gap-2.5">
          {/* Top Row - Left tall card + Right 2 stacked cards */}
          <div class="flex flex-col lg:flex-row gap-3 lg:gap-2.5 lg:items-stretch">
            {/* Left Tall Card */}
            {leftCard && (
              <div class="relative rounded-lg border border-muted overflow-hidden flex flex-col h-[600px] lg:h-auto lg:flex-1">
                {/* Card Content */}
                <div class="bg-background px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-2 sm:gap-3 flex-shrink-0">
                  <h3 class="text-xl sm:text-2xl font-medium text-accent leading-[1.2] tracking-tight">
                    {leftCard.title}
                  </h3>
                  <p class="text-base sm:text-xl text-foreground leading-[1.4] tracking-tight">
                    {leftCard.description}
                  </p>
                </div>

                {/* Card Image Frame */}
                <div class="flex-1 bg-muted w-full min-h-0">
                  {leftCard.image && (
                    <img
                      src={leftCard.image}
                      alt={leftCard.imageAlt || ""}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Right Side - 2 Stacked Cards */}
            <div class="flex flex-col gap-3 lg:gap-2.5 lg:w-[635px] lg:flex-1 lg:min-h-0">
              {/* Right Top Card */}
              {rightTopCard && (
                <div class="relative rounded-lg border border-muted overflow-hidden flex flex-col h-[400px] lg:h-[440px] flex-shrink-0">
                  {/* Card Content */}
                  <div class="bg-background px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-2 sm:gap-3 flex-shrink-0">
                    <h3 class="text-xl sm:text-2xl font-medium text-accent leading-[1.2] tracking-tight">
                      {rightTopCard.title}
                    </h3>
                    <p class="text-base sm:text-xl text-foreground leading-[1.4] tracking-tight">
                      {rightTopCard.description}
                    </p>
                  </div>

                  {/* Card Image Frame */}
                  <div class="flex-1 bg-muted w-full min-h-0">
                    {rightTopCard.image && (
                      <img
                        src={rightTopCard.image}
                        alt={rightTopCard.imageAlt || ""}
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Right Bottom Card */}
              {rightBottomCard && (
                <div class="relative rounded-lg border border-muted overflow-hidden flex flex-col h-[400px] lg:h-auto lg:flex-1 lg:min-h-0">
                  {/* Card Content */}
                  <div class="bg-background px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-2 sm:gap-3 flex-shrink-0">
                    <h3 class="text-xl sm:text-2xl font-medium text-accent leading-[1.2] tracking-tight">
                      {rightBottomCard.title}
                    </h3>
                    <p class="text-base sm:text-xl text-foreground leading-[1.4] tracking-tight">
                      {rightBottomCard.description}
                    </p>
                  </div>

                  {/* Card Image Frame */}
                  <div class="flex-1 bg-muted w-full min-h-0">
                    {rightBottomCard.image && (
                      <img
                        src={rightBottomCard.image}
                        alt={rightBottomCard.imageAlt || ""}
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - 3 Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-2.5">
            {bottomCards.slice(0, 3).map((card, index) => (
              <div
                key={index}
                class="relative rounded-lg border border-muted overflow-hidden flex flex-col h-[350px] sm:h-[400px] lg:h-[420px]"
              >
                {/* Card Content */}
                <div class="bg-background px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-2 sm:gap-3 flex-shrink-0">
                  <h3 class="text-xl sm:text-2xl font-medium text-accent leading-[1.2] tracking-tight">
                    {card.title}
                  </h3>
                  <p class="text-base sm:text-xl text-foreground leading-[1.4] tracking-tight">
                    {card.description}
                  </p>
                </div>

                {/* Card Image Frame */}
                <div class="flex-1 bg-muted w-full min-h-0">
                  {card.image && (
                    <img
                      src={card.image}
                      alt={card.imageAlt || ""}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        {ctaText && (
          <div class="flex justify-center mt-20">
            <a
              href={ctaLink}
              class="inline-flex items-center justify-center px-4 py-3 bg-accent text-background font-medium text-base uppercase tracking-tight rounded-full hover:opacity-90 transition-opacity"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
