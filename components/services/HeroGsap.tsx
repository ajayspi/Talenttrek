"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/site";

interface HeroGsapProps {
  name: string;
  tagline: string;
  short: string;
}

export default function HeroGsap({ name, tagline, short }: HeroGsapProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".gsap-badge", { y: 20, opacity: 0, duration: 0.5, delay: 0.1 })
        .from(".gsap-title", { y: 40, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".gsap-sub", { y: 24, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".gsap-cta", { y: 20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from(".gsap-visual", { scale: 0.92, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface via-primary-dim/15 to-surface">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dim/30 via-transparent to-accent-dim/30" aria-hidden />
      <div className="container-site relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="gsap-badge inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
            {tagline}
          </span>
          <h1 className="gsap-title mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{name}</h1>
          <p className="gsap-sub mt-5 max-w-lg text-lg text-ink-muted">{short}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="gsap-cta btn btn-primary">
              Book a demo <span className="arrow ml-1 inline-block h-4 w-4" aria-hidden>→</span>
            </a>
            <a href={SITE.phone.href} className="gsap-cta btn btn-ghost">
              {SITE.phone.display}
            </a>
          </div>
        </div>
        <div className="gsap-visual relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-primary-dim/20 to-accent-dim/20 shadow-card">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-primary/40 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-24 w-24 animate-pulse rounded-full bg-accent/40 blur-3xl" style={{ animationDelay: "1s" }} />
          </div>
          <span className="text-sm font-semibold uppercase tracking-widest text-ink-muted">AI-Powered</span>
          <span className="mt-2 text-2xl font-extrabold text-accent">{name}</span>
        </div>
      </div>
    </div>
  );
}