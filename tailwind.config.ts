import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        70: "17.5rem", // keep w-70 / h-70 working
      },
      fontFamily: {
        quote: ["'Amatic SC'", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
