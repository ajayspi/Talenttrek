import type { Config } from "tailwindcss";

/**
 * Tailwind theme — every entry points at a CSS custom property defined in
 * styles/tokens.css so the two systems can never drift apart.
 * Fluid type scale (--text-*) comes from the spec; dark mode is an explicit
 * opt-in via [data-theme="dark"] — no OS auto-follow (light-first).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        surface: "var(--surface)",
        primary: {
          DEFAULT: "var(--primary)",
          dim: "var(--primary-dim)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          strong: "var(--accent-strong)",
          dim: "var(--accent-dim)",
          glow: "var(--accent-glow)",
        },
        ink: {
          DEFAULT: "var(--text)",
          muted: "var(--text-2)",
        },
        line: "var(--border)",
        "on-accent": "var(--on-accent)",
        "on-primary": "var(--on-primary)",
        grad: { to: "var(--grad-to)" },
        deep: {
          DEFAULT: "var(--deep-bg)",
          bg2: "var(--deep-bg-2)",
          text: "var(--deep-text)",
          muted: "var(--deep-text-2)",
          border: "var(--deep-border)",
          line: "var(--deep-border)",
          accent: "var(--deep-accent)",
          "accent-strong": "var(--deep-accent-strong)",
          glow: "var(--deep-glow)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.2" }],
        sm: ["var(--text-sm)", { lineHeight: "1.45" }],
        base: ["var(--text-base)", { lineHeight: "1.65" }],
        lg: ["var(--text-lg)", { lineHeight: "1.55" }],
        xl: ["var(--text-xl)", { lineHeight: "1.4" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.2" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "1.1" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "1.05" }],
        hero: ["var(--text-hero)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        wide: "var(--tracking-wide)",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "var(--shadow)",
        "accent-glow": "0 10px 26px var(--accent-glow)",
      },
      maxWidth: {
        site: "var(--maxw)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms",
        enter: "700ms",
      },
    },
  },
  plugins: [],
};

export default config;
