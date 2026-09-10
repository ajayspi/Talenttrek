"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { fadeUp, reducedFade, viewportOnce } from "@/lib/motion-variants";

interface AnimatedSectionProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
}

/**
 * Framer Motion reveal wrapper. Respects useReducedMotion(): visitors who
 * prefer reduced motion get an instant opacity change with no transform.
 */
export default function AnimatedSection({
  children,
  variants = fadeUp,
  className,
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={prefersReduced ? reducedFade : variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
