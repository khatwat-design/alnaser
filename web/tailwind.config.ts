import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0B0C",
        charcoal: "#1A1A1C",
        bone: "#F5F3EE",
        bronze: "#B08D57",
        steel: "#3A3F44",
        "steel-light": "#8C9094",
      },
      fontFamily: {
        display: ["var(--font-tajawal)", "sans-serif"],
        body: ["var(--font-ibm-arabic)", "sans-serif"],
        number: ["var(--font-space-grotesk)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
