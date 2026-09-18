import {
  Car,
  HeartPulse,
  Monitor,
  ShoppingBag,
  Soup,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import VoiceWave from "@/components/anim/VoiceWave";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "hospitality-wellness": UtensilsCrossed,
  automotive: Car,
  retail: ShoppingBag,
  "food-beverage": Soup,
  healthcare: HeartPulse,
  "information-technology": Monitor,
};

/** Map of slugs that have real photography in /public/industries. */
const INDUSTRY_HERO_IMAGES: Record<string, string> = {
  "hospitality-wellness": "/industries/hospitality/hero.png",
  automotive: "/industries/automotive/hero.png",
  "food-beverage": "/industries/restaurants/hero.png",
  "information-technology": "/industries/it/hero.png",
};

const INDUSTRY_HERO_ALTS: Record<string, string> = {
  "hospitality-wellness": "A modern hotel lobby with warm lighting, representing voice-powered guest experiences",
  automotive: "A modern car dashboard with voice control, representing in-vehicle voice AI",
  "food-beverage": "A vibrant restaurant scene with voice-enabled ordering technology",
  "information-technology": "A modern IT workspace with AI-powered support agents assisting employees",
};

/**
 * Animated industry visual — the industry's own photography inside a branded
 * rounded frame with a gradient overlay and the industry name. The image comes
 * from `Industry.image` so every page/card shares one source of truth; the
 * `INDUSTRY_HERO_IMAGES` map stays as a fallback for callers that only pass a
 * slug. Industries without imagery (e.g. healthcare) get the animated icon +
 * voice-wave token instead, so nothing ever renders blank.
 */
export default function IndustryVisual({
  slug,
  name,
  image,
  imageAlt,
}: {
  slug: string;
  name: string;
  /** Industry.image from lib/industries.ts. Falls back to the slug map. */
  image?: string | null;
  imageAlt?: string;
}) {
  const src = image ?? INDUSTRY_HERO_IMAGES[slug] ?? null;
  const alt = imageAlt || INDUSTRY_HERO_ALTS[slug] || `${name} industry`;
  const Icon = INDUSTRY_ICONS[slug];

  if (src) {
    return (
      <div className="service-visual group relative aspect-[16/10] w-full overflow-hidden border border-line">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"
          aria-hidden
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-surface/80 px-3 py-1 text-sm font-bold backdrop-blur-sm">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="hero-scene service-visual relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-4 overflow-hidden border border-line p-6">
      <span
        className="hero-spark absolute left-[18%] top-[26%] h-1.5 w-1.5"
        aria-hidden
      />
      <span
        className="hero-spark absolute right-[16%] top-[22%] h-2 w-2"
        style={{ animationDelay: "0.9s" }}
        aria-hidden
      />
      <span
        className="hero-spark absolute bottom-[24%] left-[26%] h-1.5 w-1.5"
        style={{ animationDelay: "1.6s" }}
        aria-hidden
      />
      {Icon && (
        <span className="hero-core inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-line" aria-hidden>
          <span className="hero-chip-inner inline-flex">
            <Icon className="h-8 w-8" strokeWidth={1.7} />
          </span>
        </span>
      )}
      <span className="text-sm font-bold text-ink-muted">{name}</span>
      <VoiceWave bars={9} className="h-7 w-24" />
    </div>
  );
}