import { useEffect } from "preact/hooks";

export default function SmoothScroll() {
  useEffect(() => {
    // Dynamically import Locomotive Scroll
    import("npm:locomotive-scroll@4.1.4").then((module) => {
      const LocomotiveScroll = module.default;

      const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 1,
        lerp: 0.1,
        smartphone: {
          smooth: true,
          breakpoint: 767,
        },
        tablet: {
          smooth: true,
          breakpoint: 1024,
        },
      });

      // Expose scroll instance globally for theme observer
      (window as any).locomotiveScroll = scroll;

      // Dispatch custom scroll event for theme observer
      scroll.on("scroll", (args: any) => {
        window.dispatchEvent(
          new CustomEvent("locomotive-scroll", { detail: args }),
        );
      });

      // Update after images/content loads
      const updateScroll = () => {
        scroll.update();
      };

      // Update on window resize
      window.addEventListener("resize", updateScroll);

      // Update after images load
      window.addEventListener("load", updateScroll);

      // Force update after a short delay to ensure all content is rendered
      setTimeout(updateScroll, 100);
      setTimeout(updateScroll, 500);
      setTimeout(updateScroll, 1000);

      // Cleanup
      return () => {
        window.removeEventListener("resize", updateScroll);
        window.removeEventListener("load", updateScroll);
        (window as any).locomotiveScroll = null;
        scroll.destroy();
      };
    });
  }, []);

  return null;
}
