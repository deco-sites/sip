import { ImageWidget as Image } from "apps/admin/widgets.ts";
import CountrySelectorIsland from "../islands/CountrySelectorIsland.tsx";

export interface Country {
  /**
   * @title Country Name
   */
  name?: string;
  /**
   * @title Country Image
   */
  image?: Image;
}

export interface Props {
  /**
   * @title Section Theme
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Countries
   * @description List of countries with images
   */
  countries?: Country[];

  /**
   * @title Auto Rotate Interval (ms)
   * @description Time in milliseconds before switching to next country
   * @default 4000
   */
  autoRotateInterval?: number;
}

export default function CountrySelector({
  theme = "dark",
  countries = [],
  autoRotateInterval = 4000,
}: Props) {
  return (
    <section
      data-scroll-section
      data-section-theme={theme}
      class="relative w-full bg-background px-4 sm:px-6 lg:px-20 py-20"
    >
      {/* Gradient overlay for better arrow visibility */}
      <div class="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />

      <div class="w-full max-w-[1280px] mx-auto">
        <CountrySelectorIsland
          countries={countries}
          autoRotateInterval={autoRotateInterval}
        />
      </div>
    </section>
  );
}
