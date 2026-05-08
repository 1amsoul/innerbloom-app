import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf7ef",
        porcelain: "#fffdf8",
        linen: "#eee4d5",
        oat: "#d8c7b4",
        sage: "#9faf97",
        mint: "#d9eadf",
        blush: "#e9c9bd",
        charcoal: "#2f302b"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 60px rgba(47, 48, 43, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
