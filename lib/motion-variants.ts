import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion presets. Easing arrays mirror the CSS motion tokens
 * (styles/tokens.css): --ease-out-expo / --ease-spring.
 * Components must respect useReducedMotion() — see AnimatedSection.
 */
export const fadeUp: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Instant opacity-only fallback for visitors who prefer reduced motion. */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
