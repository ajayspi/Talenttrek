"use client";

/**
 * Infinite marquee of capability wordmarks. The spec calls for partner
 * logos from the WP CDN — none exist yet, so we marquee the product/
 * capability names in the display font. Pauses on hover/focus (CSS),
 * decorative duplicates are aria-hidden.
 */
const ITEMS = [
  "Voice Commerce",
  "Chat AI",
  "DriveThru",
  "AI Agents",
  "Square",
  "Custom CRM",
  "CRM Management",
  "Proudly Melbourne",
];

export default function PartnersMarquee() {
  return (
    <section
      aria-label="Capabilities"
      className="marquee-paused overflow-hidden border-b border-line bg-bg py-7"
    >
      <div
        className="animate-marquee flex w-max items-center"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= ITEMS.length}
            className="mx-3 flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 font-display text-base font-bold text-ink-muted shadow-card"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
