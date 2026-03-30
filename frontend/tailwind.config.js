/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080807",
        surface: "#0f0f0d",
        "surface-2": "#181816",
        foreground: "#f2ede6",

        muted: "#c8c3ba",
        "muted-dim": "#6e6a63",

        gold: "#c9a96e",
        "gold-dim": "rgba(201,169,110,0.12)",
        "gold-glow": "rgba(201,169,110,0.25)",

        border: "rgba(242,237,230,0.07)",
        "border-hover": "rgba(242,237,230,0.13)",

        success: "#4ade80",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};