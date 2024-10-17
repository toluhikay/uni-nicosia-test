import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2AABBC",
        primaryBlack: "#121212",
        secondaryBlack: "#202020",
        primaryWhite: "#E4E4E4",
      },
    },
  },
  plugins: [],
};
export default config;
