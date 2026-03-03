import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.css"],
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
      colors: {
        gold: "#D4AF37",
        goldSoft: "#E6C766",
        darkBg: "#0f172a",
        darkCard: "rgba(255,255,255,0.06)",
        background: "#f8faf9",
        foreground: "#1a1a1a",
        card: "#ffffff",
        "card-foreground": "#1a1a1a",
        popover: "#ffffff",
        "popover-foreground": "#1a1a1a",
        primary: "#22c55e",
        "primary-foreground": "#ffffff",
        secondary: "#f1f5f4",
        "secondary-foreground": "#1a1a1a",
        muted: "#f1f5f4",
        "muted-foreground": "#6b7280",
        accent: "#dcfce7",
        "accent-foreground": "#166534",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        border: "#e5e7eb",
        input: "transparent",
        "input-background": "#ffffff",
        "switch-background": "#e5e7eb",
        ring: "#22c55e",
        "chart-1": "#22c55e",
        "chart-2": "#3b82f6",
        "chart-3": "#f59e0b",
        "chart-4": "#ef4444",
        "chart-5": "#8b5cf6",
        sidebar: "#2c5f4e",
        "sidebar-foreground": "#ffffff",
        "sidebar-primary": "#7bdc93",
        "sidebar-primary-foreground": "#2c5f4e",
        "sidebar-accent": "#3a6b5a",
        "sidebar-accent-foreground": "#ffffff",
        "sidebar-border": "#3a6b5a",
        "sidebar-ring": "#7bdc93",
      },
      /*borderColor: theme => ({
        border: theme("colors.border"),
        "sidebar-border": theme("colors.sidebar-border"),
      }),
      backgroundColor: theme => ({
        card: theme("colors.card"),
        popover: theme("colors.popover"),
      }),
      textColor: theme => ({
        "card-foreground": theme("colors['card-foreground']"),
        foreground: theme("colors.foreground"),
      }),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },*/
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backdropBlur: {
        glass: "12px",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
