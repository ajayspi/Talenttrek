"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const QUOTES = [
  {
    quote:
      "The voice commerce build paid for itself inside a quarter — our night-shift call flow finally sells instead of just taking messages.",
    who: "Operations lead",
    at: "Hospitality & Wellness, Melbourne",
  },
  {
    quote:
      "Drive-thru throughput is up and average basket is up too — the AI gently upsells without slowing the lane down.",
    who: "Multi-site QSR operator",
    at: "Food & Beverage, Victoria",
  },
  {
    quote:
      "After-hours enquiries now wake up as booked jobs. The morning briefing writes itself.",
    who: "Service manager",
    at: "Automotive, Geelong",
  },
  {
    quote:
      "We cut phone order errors to nearly nothing — the assistant checks every item against the live menu, every time.",
    who: "Owner-operator",
    at: "Retail, Regional NSW",
  },
  {
    quote:
      "Patient calls that used to sit in a queue now get a polite answer and an appointment booked before the receptionist even looks up.",
    who: "Practice manager",
    at: "Healthcare, Brisbane",
  },
];

/** 3-card rotating testimonial carousel with star ratings. */
export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % QUOTES.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + QUOTES.length) % QUOTES.length);
  const quote = QUOTES[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="card relative min-h-[260px] p-8 md:p-10" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.35 }}
          >
            <div
              className="mb-4 flex gap-1 text-accent"
              aria-label="Rated 5 out of 5"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
              ))}
            </div>
            <blockquote className="text-lg leading-relaxed md:text-xl">
              “{quote.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm font-bold text-ink">
              {quote.who}
              <span className="ml-2 font-medium text-ink-muted">
                · {quote.at}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="icon-btn"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-fast ${
                i === index ? "w-6 bg-accent" : "w-2.5 bg-line hover:bg-accent"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="icon-btn"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
