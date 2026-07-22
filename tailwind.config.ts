import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./front-end/src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Syne"', 'sans-serif'],
        body: ['"Instrument Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      colors: {
        /* ── Structure ─────────────────────────────────────────── */
        border: "rgba(255,255,255,0.07)",
        input: "rgba(255,255,255,0.07)",
        ring: "#4f8ef7",
        background: "#050508",
        foreground: "#e9e9f1",

        /* ── Signal — original palette preserved ───────────────── */
        primary: {
          DEFAULT: "#4f8ef7",
          soft: "#8ab4fa",
          deep: "#1c5ed4",
          foreground: "#050508",
        },
        accent: {
          DEFAULT: "#2dd4bf",
          soft: "#7aead9",
          deep: "#0d9488",
          foreground: "#050508",
        },
        secondary: {
          DEFAULT: "#0b0b12",
          foreground: "#e9e9f1",
        },

        /* ── Surfaces ──────────────────────────────────────────── */
        surface: {
          void: "#050508",
          base: "#08080e",
          raised: "#0b0b12",
          high: "#101018",
          top: "#16161f",
        },

        /* ── Ink scale ─────────────────────────────────────────── */
        ink: {
          DEFAULT: "#e9e9f1",
          muted: "#9a9ab4",
          faint: "#61617a",
          ghost: "#2f2f44",
        },

        muted: {
          DEFAULT: "#0b0b12",
          foreground: "#9a9ab4",
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
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      letterSpacing: {
        tightest: "-0.055em",
        headline: "-0.04em",
        label: "0.24em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        snap: "cubic-bezier(0.7, 0, 0.2, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        900: "900ms",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-4%,-2%)" },
          "30%": { transform: "translate(2%,-4%)" },
          "50%": { transform: "translate(-3%,3%)" },
          "70%": { transform: "translate(4%,1%)" },
          "90%": { transform: "translate(-1%,-3%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "scan-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(600%)" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
      },
      animation: {
        marquee: "marquee-x 38s linear infinite",
        "marquee-fast": "marquee-x 22s linear infinite",
        grain: "grain-shift 6s steps(5) infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        scan: "scan-down 7s linear infinite",
        caret: "caret 1.1s steps(1) infinite",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
