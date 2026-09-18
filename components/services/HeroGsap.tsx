"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/site";
import type { ServiceIcon } from "@/lib/services";
import AnimatedIconRow from "@/components/anim/AnimatedIconRow";
import HeroIconScene from "@/components/anim/HeroIconScene";

interface HeroGsapProps {
  name: string;
  /** Service icon token (e.g. "mic") — selects the hero icon constellation. */
  icon: ServiceIcon;
  tagline: string;
  short: string;
}

export default function HeroGsap({ name, icon, tagline, short }: HeroGsapProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".gsap-badge", { y: 20, opacity: 0, duration: 0.5, delay: 0.1 })
        .from(".gsap-title", { y: 40, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".gsap-sub", { y: 24, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".gsap-rail", { y: 18, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".gsap-cta", { y: 20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from(".gsap-visual", { scale: 0.94, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface via-primary-dim/15 to-surface"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-dim/30 via-transparent to-accent-dim/30"
        aria-hidden
      />
      <div className="container-site relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="gsap-badge inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
            {tagline}
          </span>
          <h1 className="gsap-title mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            {name}
          </h1>
          <p className="gsap-sub mt-5 max-w-lg text-lg text-ink-muted">{short}</p>
          <AnimatedIconRow
            kind="service"
            id={icon}
            caption={`${name} at work`}
            className="gsap-rail mt-7"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="gsap-cta btn btn-primary">
              Book a demo <span className="arrow ml-1 inline-block h-4 w-4" aria-hidden>→</span>
            </a>
            <a href={SITE.phone.href} className="gsap-cta btn btn-ghost">
              {SITE.phone.display}
            </a>
          </div>
        </div>
        <HeroIconScene
          kind="service"
          id={icon}
          label={name}
          className="gsap-visual w-full"
        />
      </div>
    </div>
  );
}