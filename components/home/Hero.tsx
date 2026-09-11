"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import HeroSkeleton from "@/components/home/HeroSkeleton";
import WaveBackground from "@/components/anim/WaveBackground";

const HeroCanvas = dynamic(() => import("@/components/home/HeroCanvas"), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

const ROTATING_WORDS = ["Modern Commerce", "Conversations", "Orders"];

/**
 * Home hero: bold gradient backdrop, particle wave animation, rotating
 * gradient headline, wave divider, 2 CTAs and a bouncing scroll cue.
 * Rotation is disabled under reduced motion.
 */
export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-surface via-primary-dim/20 to-surface"
      aria-label="Introduction"
    >
      <HeroCanvas />
      <div className="container-site relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center md:min-h-[680px]">
        <motion.p
          className="eyebrow mb-5"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sparkles className="mr-1.5 inline h-4 w-4" aria-hidden />
          Voice · Chat · Agents
        </motion.p>

        <h1 className="max-w-5xl text-hero font-extrabold leading-tight">
          The Voice of{" "}
          <span className="inline-grid overflow-hidden align-baseline">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={ROTATING_WORDS[wordIndex]}
                className="grad-text block"
                initial={reducedMotion ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reducedMotion ? undefined : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          AI solutions for hospitality, automotive, and beyond — answering,
          booking and selling on every channel, around the clock.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contact"
            onClick={() => trackEvent("cta_click", { location: "hero-primary" })}
            className="btn btn-primary"
          >
            Book a Free Demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
          </Link>
          <Link href="/services" className="btn btn-ghost">
            Explore Services
          </Link>
        </motion.div>
      </div>

      <WaveBackground />

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-ink-muted"
        aria-hidden
      >
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
