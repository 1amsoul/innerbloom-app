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
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
