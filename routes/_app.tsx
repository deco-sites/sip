import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import ThemeObserver from "../islands/ThemeObserver.tsx";
import SmoothScroll from "../islands/SmoothScroll.tsx";
import { Context } from "@deco/deco";
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any" />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Allerta&display=swap"
          rel="stylesheet"
        />

        {/* Locomotive Scroll CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css"
        />

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio">
        </script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      background: 'var(--color-background)',
                      foreground: 'var(--color-foreground)',
                      muted: 'var(--color-muted)',
                      accent: 'var(--color-accent)',
                      'accent-foreground': 'var(--color-accent-foreground)',
                      'braziljs-00': 'oklch(0.9784 0.0011 197.14)',
                      'braziljs-50': 'oklch(0.9491 0.0043 197.0)',
                      'braziljs-100': 'oklch(0.9026 0.0056 183.02)',
                      'braziljs-200': 'oklch(0.8439 0.0102 181.36)',
                      'braziljs-300': 'oklch(0.7592 0.0148 185.83)',
                      'braziljs-400': 'oklch(0.6812 0.0206 188.58)',
                      'braziljs-500': 'oklch(0.5991 0.0247 186.02)',
                      'braziljs-600': 'oklch(0.5153 0.0181 196.6)',
                      'braziljs-700': 'oklch(0.4452 0.0114 196.75)',
                      'braziljs-800': 'oklch(0.3869 0.0105 196.73)',
                      'braziljs-900': 'oklch(0.2873 0.0085 196.69)',
                      'braziljs-950': 'oklch(0.2014 0.0046 196.79)',
                      'braziljs-primary': 'oklch(0.93 0.23 123)',
                    }
                  }
                }
              }
            `,
          }}
        />
        <link
          href={asset(`/tailwind.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Smooth Scroll Island */}
      <SmoothScroll />

      {/* Theme Observer Island */}
      <ThemeObserver />

      {/* Rest of Preact tree */}
      <div data-scroll-container>
        <ctx.Component />
      </div>
    </>
  );
});
