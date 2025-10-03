import { useSignal } from "@preact/signals";
import { ImageWidget as Image } from "apps/admin/widgets.ts";
import { useEffect } from "preact/hooks";

interface NavLink {
  text: string;
  href: string;
}

interface Props {
  theme?: "dark" | "green" | "light";
  logoImage?: Image;
  logoAlt?: string;
  links: NavLink[];
}

export default function MobileMenuIsland({
  theme = "dark",
  logoImage,
  logoAlt = "S/P Logo",
  links,
}: Props) {
  const isOpen = useSignal(false);

  // Close menu on route change
  useEffect(() => {
    if (isOpen.value) {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "A") {
          isOpen.value = false;
        }
      };

      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [isOpen.value]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen.value]);

  return (
    <nav
      data-scroll-section
      data-section-theme={theme}
      class="fixed top-0 left-0 right-0 z-50 lg:hidden"
    >
      <div class="w-full px-4 sm:px-6">
        <div class="flex items-center justify-between py-6">
          {/* Logo */}
          {logoImage && (
            <a href="/" class="flex-shrink-0">
              <img
                src={logoImage}
                alt={logoAlt}
                class="h-10 w-auto"
                loading="eager"
              />
            </a>
          )}

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => (isOpen.value = !isOpen.value)}
            class="flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-50"
            aria-label={isOpen.value ? "Close menu" : "Open menu"}
            aria-expanded={isOpen.value}
          >
            <span
              class={`block h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
                isOpen.value ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              class={`block h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
                isOpen.value ? "opacity-0" : ""
              }`}
            />
            <span
              class={`block h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
                isOpen.value ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        class={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
          isOpen.value
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "82px" }}
      >
        <div class="flex flex-col items-center justify-center h-full gap-8 px-4">
          {links.map((link) => (
            <a
              href={link.href}
              class="text-foreground text-2xl font-normal tracking-tight hover:text-accent transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
