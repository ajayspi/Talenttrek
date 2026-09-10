"use client";

import { useMagneticCursor } from "@/hooks/useMagneticCursor";

/**
 * Mounts the magnetic cursor effect globally (no visible output).
 * The hook self-disables for touch devices and reduced-motion users.
 */
export default function MagneticCursor() {
  useMagneticCursor();
  return null;
}
