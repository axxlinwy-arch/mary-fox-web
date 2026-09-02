import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        card: "rgba(255, 255, 255, 0.03)",
        "secondary-foreground": "#A0A0A8",
        accent: {
          DEFAULT: "#FF1493",
          secondary: "#E6007E",
          gold: "#FDB813",
        },
        border: "rgba(255, 20, 147, 0.25)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(255, 20, 147, 0.35)",
        "glow-sm": "0 0 24px rgba(255, 20, 147, 0.2)",
        "glow-gold": "0 0 40px rgba(253, 184, 19, 0.25)",
        neon: "0 0 20px rgba(255, 20, 147, 0.6), 0 0 40px rgba(255, 20, 147, 0.3)",
      },
      backgroundImage: {
        "gradient-euphoria":
          "linear-gradient(90deg, #FDB813 0%, #FF1493 50%, #E6007E 100%)",
        "gradient-radial-pink":
          "radial-gradient(ellipse at center, rgba(255, 20, 147, 0.15) 0%, transparent 70%)",
        "gradient-radial-gold":
          "radial-gradient(ellipse at center, rgba(253, 184, 19, 0.12) 0%, transparent 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.6",
            filter: "drop-shadow(0 0 20px rgba(255, 20, 147, 0.5))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 40px rgba(255, 20, 147, 0.8))",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
