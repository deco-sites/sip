import TextMotionIsland from "../islands/TextMotionIsland.tsx";

export interface Props {
  /**
   * @description The text to animate
   * @default Welcome to SIP
   */
  text?: string;

  /**
   * @description Theme for this section
   * @default dark
   */
  theme?: "dark" | "green" | "light";

  /**
   * @description Delay between each word (in seconds)
   * @default 0.08
   */
  staggerDelay?: number;

  /**
   * @description Animation duration (in seconds)
   * @default 0.8
   */
  duration?: number;

  /**
   * @description GSAP ease (e.g., "back.out(1.4)", "elastic.out(1, 0.3)", "power2.out")
   * @default back.out(1.4)
   */
  ease?: string;

  /**
   * @description Initial Y offset in pixels
   * @default 20
   */
  yOffset?: number;
}

export default function TextMotionDemo({
  text = "Welcome to SIP",
  theme = "dark",
  staggerDelay = 0.08,
  duration = 0.8,
  ease = "back.out(1.4)",
  yOffset = 20,
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="min-h-screen flex items-center justify-center p-8 lg:p-20"
    >
      <TextMotionIsland
        text={text}
        staggerDelay={staggerDelay}
        duration={duration}
        ease={ease}
        yOffset={yOffset}
        class="text-4xl lg:text-6xl font-bold text-[var(--theme-text)]"
      />
    </section>
  );
}
