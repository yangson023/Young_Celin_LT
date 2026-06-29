import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        muted: "#637083",
        paper: "#f7f7f2",
        line: "#d7dde5",
        accent: "#2f6f73",
        warning: "#9b5b1a"
      }
    }
  },
  plugins: []
};

export default config;
