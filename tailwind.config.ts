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
        void:           "#050508",
        surface:        "#0D0D14",
        "surface-2":    "#12121C",
        cyan:           "#00F5FF",
        purple:         "#7C3AED",
        "text-primary": "#F8F8FF",
        "text-muted":   "#8B8BA7",
        "text-faint":   "#3D3D5C",
        /* Legacy */
        black:          "#050508",
        "deep-navy":    "#0D0D14",
        "electric-blue":"#00F5FF",
        "cyan-glow":    "#00F5FF",
        "premium-gold": "#7C3AED",
        muted:          "#8B8BA7",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      animation: {
        "marquee":      "marquee 40s linear infinite",
        "float-slow":   "float-slow 8s ease-in-out infinite",
        "pulse-glow":   "pulse-glow 3s ease-in-out infinite",
        "spin-slow":    "spin 25s linear infinite",
        "shimmer":      "shimmer 3s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%":       { transform: "translateY(-20px) scale(1.01)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%":       { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400% center" },
          "100%": { backgroundPosition: "400% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
