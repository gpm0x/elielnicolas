import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        border: "rgba(255,255,255,0.06)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#090910",
        foreground: "#e8e8f2",
        primary: {
          DEFAULT: "#4f8ef7",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0f0f1a",
          foreground: "#e8e8f2",
        },
        accent: {
          DEFAULT: "#2dd4bf",
          foreground: "#090910",
        },
        surface: {
          base: "#090910",
          card: "#0f0f1a",
          elevated: "#14141f",
        },
        muted: {
          DEFAULT: "#44445a",
          foreground: "#8888aa",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "shimmer-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "terminal-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "blob-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "shimmer": "shimmer-sweep 2.5s infinite",
        "cursor": "terminal-cursor 1s infinite",
        "blob": "blob-float 20s infinite ease-in-out",
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
