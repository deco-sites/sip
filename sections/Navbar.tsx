import { ImageWidget as Image } from "apps/admin/widgets.ts";
import MobileMenuIsland from "../islands/MobileMenuIsland.tsx";

export interface NavLink {
  /**
   * @description Link text
   */
  text: string;

  /**
   * @description Link URL
   */
  href: string;
}

export interface Props {
  /**
   * @title Section Theme
   * @description Theme for this section
   */
  theme?: "dark" | "green" | "light";

  /**
   * @title Logo Image
   * @description Logo image displayed in the center
   */
  logoImage?: Image;

  /**
   * @title Logo Alt
   */
  logoAlt?: string;

  /**
   * @title Left Navigation Links
   * @description Links displayed on the left side of the logo
   */
  leftLinks?: NavLink[];

  /**
   * @title Right Navigation Links
   * @description Links displayed on the right side of the logo
   */
  rightLinks?: NavLink[];
}

export default function Navbar({
  theme = "dark",
  logoImage,
  logoAlt = "S/P Logo",
  leftLinks = [],
  rightLinks = [],
}: Props) {
  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        data-scroll-section
        data-section-theme={theme}
        class="fixed top-0 left-0 right-0 z-50 hidden lg:block"
      >
        <div class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-center gap-10 py-10">
            {/* Left Links */}
            <div class="flex items-center gap-10">
              {leftLinks.map((link) => (
                <a
                  href={link.href}
                  class="text-foreground text-lg font-normal tracking-tight hover:text-accent transition-colors whitespace-nowrap"
                >
                  {link.text}
                </a>
              ))}
            </div>

            {/* Logo */}
            {logoImage && (
              <a href="/" class="flex-shrink-0">
                <img
                  src={logoImage}
                  alt={logoAlt}
                  class="h-12 w-auto"
                  loading="eager"
                />
              </a>
            )}

            {/* Right Links */}
            <div class="flex items-center gap-10">
              {rightLinks.map((link) => (
                <a
                  href={link.href}
                  class="text-foreground text-lg font-normal tracking-tight hover:text-accent transition-colors whitespace-nowrap"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <MobileMenuIsland
        theme={theme}
        logoImage={logoImage}
        logoAlt={logoAlt}
        links={allLinks}
      />
    </>
  );
}
