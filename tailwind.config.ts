import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        skysoft: "#EAF6FF",
        mintsoft: "#E9FFF7",
        peaches: "#FFF2E6"
      }
    }
  },
  plugins: []
};

export default config;
