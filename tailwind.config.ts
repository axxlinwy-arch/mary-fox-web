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
        background: "#090709",
        foreground: "#F1ECE5",
        card: "#110C11",
        surface: "#110C11",
        champagne: "#DDD0BA",
        "secondary-foreground": "#A89B8F",
        accent: {
          DEFAULT: "#F21B83",
          secondary: "#C41462",
          gold: "#F5B51B",
          "gold-soft": "#F3D98A",
          yellow: "#D6A82F",
          wine: "#3A0B1D",
          burgundy: "#7A123E",
          orange: "#FF7A45",
        },
        border: "rgba(180, 35, 100, 0.28)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(220, 20, 100, 0.22)",
        "glow-sm": "0 0 24px rgba(220, 20, 100, 0.14)",
        "glow-gold": "0 0 40px rgba(245, 181, 27, 0.24)",
        neon: "0 0 20px rgba(242, 27, 131, 0.32), 0 0 40px rgba(245, 181, 27, 0.14)",
        volume:
          "inset 0 1px 0 rgba(221, 208, 186, 0.12), 0 14px 36px rgba(0, 0, 0, 0.55), 0 0 28px rgba(220, 20, 100, 0.12)",
      },
      backgroundImage: {
        "gradient-euphoria":
          "linear-gradient(90deg, #F5B51B 0%, #FF7A45 50%, #F21B83 100%)",
        "gradient-radial-pink":
          "radial-gradient(ellipse at center, rgba(122, 18, 62, 0.16) 0%, transparent 70%)",
        "gradient-radial-gold":
          "radial-gradient(ellipse at center, rgba(214, 168, 47, 0.1) 0%, transparent 70%)",
        "gradient-cta":
          "linear-gradient(180deg, #F3D98A 0%, #F5B51B 48%, #D4A010 100%)",
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
            filter: "drop-shadow(0 0 20px rgba(242, 27, 131, 0.4))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 40px rgba(242, 27, 131, 0.65))",
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
