module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
    applyComplexClasses: true,
  },
  purge: {
    // needs to be set if we want to purge all unused
    // @tailwind/typography styles
    mode: "all",
    content: ["./src/**/*.svelte", "./src/**/*.html"],
  },
  theme: {
    extend: {},
    typography: {
      default: {
        css: {
          color: "#333",
          pre: false,
          code: false,
          "pre code": false,
          "code::before": false,
          "code::after": false,
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
