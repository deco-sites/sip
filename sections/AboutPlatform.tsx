import { ImageWidget as Image } from "apps/admin/widgets.ts";
import AnimatedLogoIsland from "../islands/AnimatedLogoIsland.tsx";
import LineMotionIsland from "../islands/LineMotionIsland.tsx";

export interface Props {
  /**
   * @title Section Theme
   * @description Theme for this section
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Logo SVG
   * @description Logo SVG image (S/P SANTANA INTELIGÊNCIA POLÍTICA)
   */
  logoImage?: Image;

  /**
   * @title Logo Alt Text
   */
  logoAlt?: string;

  /**
   * @title Top Description
   * @description First paragraph of description
   */
  topDescription?: string;

  /**
   * @title Highlighted Name in Description
   * @description Name to highlight in yellow (e.g., "João Santana")
   */
  highlightedName?: string;

  /**
   * @title Bottom Description
   * @description Second paragraph of description
   */
  bottomDescription?: string;

  /**
   * @title Dashboard Image
   * @description Large dashboard/platform image
   */
  dashboardImage?: Image;

  /**
   * @title Dashboard Image Alt
   */
  dashboardImageAlt?: string;

  /**
   * @title Background Decoration Behind Dashboard
   * @description Full-width background decoration behind the dashboard image
   */
  bgDecorationBehindDashboard?: Image;

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
   * @description Color of the dots (default: rgba(255,255,255,0.05))
   */
  dotColor?: string;
}

export default function AboutPlatform({
  theme = "dark",
  logoImage,
  logoAlt,
  topDescription,
  highlightedName: _highlightedName,
  bottomDescription,
  dashboardImage,
  dashboardImageAlt,
  bgDecorationBehindDashboard,
  dotSize = 1,
  dotSpacing = 40,
  dotColor = "rgba(255,255,255,0.05)",
}: Props) {
  // Helper to render description with highlighted name
  const renderDescription = (text?: string) => {
    if (!text) return null;
    return text;
  };

  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative min-h-screen w-full bg-background py-16 lg:py-24 overflow-hidden"
    >
      {/* Dot Grid Background */}
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

      {/* Main Content Container */}
      <div
        class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative"
        style={{ zIndex: 10 }}
      >
        {/* Top Section - Logo and Description */}
        <div class="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24 mb-16 lg:mb-24">
          {/* Left - Logo */}
          <div class="w-full lg:w-1/2">
            <AnimatedLogoIsland
              src={logoImage}
              alt={logoAlt}
              class="w-full max-w-md h-auto"
            />
          </div>

          {/* Right - Description */}
          <div class="w-full lg:w-1/2 flex flex-col gap-6 text-foreground">
            {topDescription && (
              <LineMotionIsland
                class="text-base lg:text-lg leading-relaxed"
                initialDelay={0.2}
              >
                <span class="line-motion-line block">
                  {renderDescription(topDescription)}
                </span>
              </LineMotionIsland>
            )}
            {bottomDescription && (
              <LineMotionIsland
                class="text-base lg:text-lg leading-relaxed"
                initialDelay={0.4}
              >
                <span class="line-motion-line block">
                  {bottomDescription}
                </span>
              </LineMotionIsland>
            )}
          </div>
        </div>

        {/* Dashboard/Platform Image Section */}
        {/* Background Decoration Behind Dashboard */}
        {bgDecorationBehindDashboard && (
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <img
              src={bgDecorationBehindDashboard}
              alt=""
              class="w-full h-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Dashboard Image */}
        {dashboardImage && (
          <div
            class="relative w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ zIndex: 2 }}
          >
            <img
              src={dashboardImage}
              alt={dashboardImageAlt}
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
