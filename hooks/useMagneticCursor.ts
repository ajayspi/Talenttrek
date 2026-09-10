import { useEffect } from "react";

/**
 * Magnetic cursor — a small accent dot + trailing ring that follow the
 * pointer and swell over interactive elements. Purely augmentative: the
 * native cursor is never hidden, and the effect is skipped entirely for
 * touch devices and prefers-reduced-motion users.
 */
export function useMagneticCursor(enabled = true): void {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    for (const [el, size, cls] of [
      [dot, 8, "tt-cursor-dot"],
      [ring, 36, "tt-cursor-ring"],
    ] as const) {
      el.setAttribute("aria-hidden", "true");
      el.className = cls;
      el.style.cssText = `position:fixed;top:0;left:0;width:${size}px;height:${size}px;border-radius:9999px;pointer-events:none;z-index:9999;transform:translate(-100px,-100px);will-change:transform;`;
      document.body.append(el);
    }
    dot.style.background = "var(--accent)";
    ring.style.border = "1.5px solid var(--accent)";
    ring.style.opacity = "0.55";

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, select, textarea, label, summary",
      );
      active = Boolean(interactive);
      ring.style.width = ring.style.height = active ? "52px" : "36px";
      ring.style.opacity = active ? "0.9" : "0.55";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      const half = active ? 26 : 18;
      ring.style.transform = `translate(${ringX - half}px, ${ringY - half}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      dot.remove();
      ring.remove();
    };
  }, [enabled]);
}
