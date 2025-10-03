import {
  ImageWidget as Image,
  VideoWidget as Video,
} from "apps/admin/widgets.ts";
import VideoScaleIsland from "../islands/VideoScaleIsland.tsx";

export interface Props {
  /**
   * @title Section Theme
   * @description Theme for this section
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Title
   * @description Main title above the video
   */
  title?: string;

  /**
   * @title Video Source
   * @description Video file URL or embed URL (YouTube, Vimeo, etc.)
   */
  videoSrc?: Video;

  /**
   * @title Video Poster
   * @description Thumbnail image shown before video plays
   */
  videoPoster?: string;

  /**
   * @title Video Embed
   * @description If using YouTube/Vimeo, paste the embed URL here (overrides videoSrc)
   */
  videoEmbed?: string;

  /**
   * @title Image
   * @description Display a static image when video is not available
   */
  image?: Image;

  /**
   * @title Footer Text
   * @description Copyright or credits text at the bottom
   */
  footerText?: string;

  /**
   * @title Show Scroll Indicator
   * @description Show arrow pointing down above video
   */
  showScrollIndicator?: boolean;

  /**
   * @title Statement Line 1
   * @description First statement line
   */
  statementLine1?: string;

  /**
   * @title Statement Line 2
   * @description Second statement line
   */
  statementLine2?: string;

  /**
   * @title Statement Line 3
   * @description Third statement line
   */
  statementLine3?: string;
}

export default function VideoSection({
  theme = "green",
  title = "Saiba mais. Assista aqui",
  videoSrc,
  videoPoster,
  videoEmbed,
  image,
  footerText =
    "© 2025 SIP™ — Santana Inteligência Política. All Rights Reserved.",
  showScrollIndicator = true,
  statementLine1 = "A máquina ganha sensibilidade humana.",
  statementLine2 = "A inteligência política ganha velocidade de máquina.",
  statementLine3 = "Toda recomendação passa por curadores da nossa equipe.",
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full flex flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8 py-20 gap-10"
    >
      {/* Main Content Container - 1280px max-width */}
      <div class="w-full max-w-[1280px] mx-auto flex flex-col items-center gap-10">
        {/* Title with optional scroll indicator */}
        {title && (
          <div class="flex flex-col items-center gap-3">
            <h2 class="text-2xl font-medium text-foreground text-center tracking-tight">
              {title}
            </h2>
            {showScrollIndicator && (
              <div class="w-4 h-4 flex items-center justify-center rotate-180">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-foreground"
                >
                  <path
                    d="M8.5 0L16.5 13H0.5L8.5 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Video Container with Scale Animation */}
        <VideoScaleIsland>
          <div class="w-full aspect-video overflow-hidden bg-[var(--color-accent)]">
            {videoEmbed
              ? (
                // Embedded video (YouTube, Vimeo, etc.)
                <iframe
                  src={videoEmbed}
                  class="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
              : videoSrc
              ? (
                // Native video element
                <video
                  src={videoSrc}
                  poster={videoPoster}
                  controls
                  class="w-full h-full object-cover"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              )
              : image
              ? (
                // Static image
                <img
                  src={image}
                  alt={title || "Section image"}
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              )
              : (
                // Placeholder when no video is provided
                <div class="w-full h-full flex items-center justify-center text-foreground opacity-50">
                  <p class="text-sm">Video placeholder</p>
                </div>
              )}
          </div>
        </VideoScaleIsland>

        {/* Footer Text */}
        {footerText && (
          <p class="text-sm font-medium text-foreground text-center tracking-tight">
            {footerText}
          </p>
        )}

        {/* Statement Section with Skewed Box */}
        <div class="w-full flex items-center justify-center mt-10">
          <div class="relative w-full max-w-[1280px]">
            {/* Top Left Quote Mark */}
            <div
              class="absolute -top-4 left-4 lg:left-[110px] text-[80px] lg:text-[140px] leading-none text-white z-20"
              style={{
                fontFamily: "Allerta",
              }}
            >
              "
            </div>

            {/* Bottom Right Quote Mark (rotated) */}
            <div
              class="absolute -bottom-3 right-4 lg:right-[124px] text-[80px] lg:text-[140px] leading-none text-white z-20"
              style={{
                fontFamily: "Allerta",
                transform: "rotate(180deg)",
              }}
            >
              "
            </div>

            {/* Content Container */}
            <div class="relative w-full px-6 lg:px-[100px] py-8 lg:py-12 flex flex-col gap-1 items-center justify-center">
              {/* Skewed background */}
              <div
                class="absolute inset-0 bg-accent"
                style={{
                  transform: "skewX(-2deg)",
                }}
              />

              {/* Statement Lines */}
              <div class="relative z-10 flex flex-col gap-1 items-center justify-center w-full">
                {statementLine1 && (
                  <p class="text-xl lg:text-4xl font-medium italic text-accent-foreground leading-[1.2] tracking-tight text-center">
                    {statementLine1}
                  </p>
                )}
                {statementLine2 && (
                  <p class="text-xl lg:text-4xl font-medium italic text-accent-foreground leading-[1.2] tracking-tight text-center">
                    {statementLine2}
                  </p>
                )}
                {statementLine3 && (
                  <p class="text-xl lg:text-4xl font-medium italic text-accent-foreground leading-[1.2] tracking-tight text-center">
                    {statementLine3}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
