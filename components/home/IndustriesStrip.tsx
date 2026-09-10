"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import IndustryVisual from "@/components/anim/IndustryVisual";

/**
 * Home industries strip — animated token-based visuals per industry.
 * No stock photography: IndustryVisual (brand-orange glyph + voice wave on a
 * themed gradient tile) keeps the strip immersive and theme-aware.
 */
export default function IndustriesStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    trackRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <section
      className="section section-alt overflow-hidden border-y border-line"
      aria-label="Industries we serve"
    >
      <div className="container-site flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Industries</p>
          <h2 className="text-3xl md:text-4xl">
            The same engine, tuned for your sector
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll industries left"
            className="icon-btn"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll industries right"
            className="icon-btn"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: "max(1.25rem, calc((100vw - 1200px) / 2 + 1.25rem))",
          paddingRight: "max(1.25rem, calc((100vw - 1200px) / 2 + 1.25rem))",
        }}
      >
        {INDUSTRIES.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="card card-hover group w-[300px] flex-none snap-start overflow-hidden md:w-[340px]"
          >
            <IndustryVisual slug={ind.slug} name={ind.name} />
            <div className="p-5">
              <h3 className="text-lg">{ind.name}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{ind.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent">
                Explore <ArrowRight className="arrow h-4 w-4" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
