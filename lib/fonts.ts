import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Font stack per the interactive-stack prescription:
 * - Display (headings, hero):      Space Grotesk 500–700 — geometric tech
 *   sans built for product/brand headings.
 * - Body (paragraphs, UI, forms):  Inter 400–700 — the professional UI
 *   standard.
 * - Mono (stats, data, eyebrows):  JetBrains Mono 500–700 — for numerals,
 *   counters and data displays.
 * next/font self-hosts all three (woff2, latin subset, display swap) — no
 * third-party font requests at runtime.
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});
