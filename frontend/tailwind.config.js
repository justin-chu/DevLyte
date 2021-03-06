module.exports = {
  purge: [
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
      spacing: {
        128: "30rem",
        156: "36rem",
        172: "42rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};
