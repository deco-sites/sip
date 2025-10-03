import { useEffect, useState } from "preact/hooks";

interface Country {
  name?: string;
  image?: string;
}

interface Props {
  countries: Country[];
  autoRotateInterval: number;
}

export default function CountrySelectorIsland({
  countries,
  autoRotateInterval,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [arrowPosition, setArrowPosition] = useState(0);

  // Auto-rotate through countries
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countries.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [countries.length, autoRotateInterval]);

  // Update arrow position when active index changes
  useEffect(() => {
    // Calculate percentage position
    const percentage = activeIndex / (countries.length - 1);
    setArrowPosition(percentage);
  }, [activeIndex, countries.length]);

  const handleCountryClick = (index: number) => {
    setActiveIndex(index);
  };

  const activeCountry = countries[activeIndex];

  return (
    <div class="relative w-full h-[739px] rounded-[20px] overflow-hidden p-8 flex items-center justify-end">
      {/* Background Image */}
      <div class="absolute inset-0 rounded-[20px] overflow-hidden">
        {activeCountry?.image && (
          <img
            src={activeCountry.image}
            alt={activeCountry.name || ""}
            class="absolute w-full h-full object-cover transition-opacity duration-500"
            key={activeCountry.image}
          />
        )}
      </div>

      {/* Inner Shadow Overlay */}
      <div
        class="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          boxShadow: "inset -30px -30px 80px 0px rgba(0,0,0,0.3)",
        }}
      />

      {/* Country List */}
      <div class="relative z-10 flex items-stretch gap-3 h-full py-8">
        {/* Country Names */}
        <div class="flex flex-col items-end justify-between h-full">
          {countries.map((country, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                type="button"
                key={index}
                onClick={() => handleCountryClick(index)}
                class={`
                  font-medium tracking-tight leading-[1.3] text-right transition-all duration-300 whitespace-nowrap
                  ${
                  isActive
                    ? "text-accent text-[42px]"
                    : "text-foreground text-[28px] opacity-50 hover:opacity-75"
                }
                `}
              >
                {country.name?.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Vertical Line & Arrow */}
        <div class="relative flex items-center justify-center px-3 self-stretch">
          {/* Vertical Line - spans full height */}
          <div class="absolute top-0 bottom-0 w-[1px] bg-accent" />

          {/* Arrow - positioned based on percentage */}
          <div
            class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{
              top: `${arrowPosition * 100}%`,
            }}
          >
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="-rotate-90"
            >
              <path
                d="M8.5 0L17 13H0L8.5 0Z"
                fill="var(--color-accent)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
