/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ketoBlack: "#0D0D0D",
        ketoRed: "#9B2226",
        ketoGold: "#FFD166",
        ketoDarkRed: "#7F1D1D",
        ketoWhite: "#F3F1EA",
      },
    },
  },
  plugins: [],
};
