import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#050505",
        coal: "#0A0A0A",
        graphite: "#111111",
        paper: "#F2F0EB",
        smoke: "#8A8782",
        line: "rgba(5,5,5,0.12)",
        "line-light": "rgba(242,240,235,0.1)",
        champagne: "#C9A96E",
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
