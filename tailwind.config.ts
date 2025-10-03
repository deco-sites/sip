import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Graphik", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "scroll-left": "scroll-left 20s linear infinite",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
