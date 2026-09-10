"use client";

import { useEffect, useRef } from "react";

interface ParticleWaveProps {
  /** Extra classes merged onto the absolutely-positioned container. */
  className?: string;
  /** Grid cell size in px — smaller = denser field. */
  spacing?: number;
  /** Peak vertical wave displacement in px. */
  amplitude?: number;
  /** Wave travel speed — 0 leaves a near-static field. */
  speed?: number;
  /** Hard cap on particle count (keeps lower-end devices smooth). */
  maxParticles?: number;
  /** Master opacity 0–1, multiplied under per-particle variation. */
  opacity?: number;
}

interface Pt {
  x: number;
  y0: number;
  r: number;
  a: number;
  phase: number;
}

interface Row {
  idxs: number[];
}

/**
 * Enhanced background "particle wave" for hero sections.
 *
 * A dynamic grid of dots that undulates in a travelling sine wave,
 * with connecting wave-lines joining each row. Canvas 2D only — no WebGL.
 * Theme-aware (reads --primary and --accent CSS tokens), pauses when
 * offscreen, renders static frame under prefers-reduced-motion.
 * Decorative: pointer-events none + aria-hidden.
 */
export default function ParticleWave({
  className = "",
  spacing = 42,
  amplitude = 24,
  speed = 1.1,
  maxParticles = 900,
  opacity = 0.75,
}: ParticleWaveProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let color = "#2563eb";
    let accentColor = "#7c3aed";
    let pts: Pt[] = [];
    let rows: Row[] = [];

    const readTheme = () => {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      const a = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      if (c) color = c;
      if (a) accentColor = a;
    };
    readTheme();

    // Deterministic pseudo-random per build — no Math.random flicker.
    const rand = (() => {
      let seed = 20260214;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    })();

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const rawCols = Math.max(1, Math.ceil(w / spacing));
      const rawRows = Math.max(1, Math.ceil(h / spacing));
      const scale = Math.min(1, Math.sqrt(maxParticles / (rawCols * rawRows)));
      const cols = Math.max(1, Math.round(rawCols * scale));
      const rowN = Math.max(1, Math.round(rawRows * scale));
      const stepX = w / (cols + 1);
      const stepY = h / (rowN + 1);

      pts = [];
      rows = [];
      for (let r = 0; r < rowN; r++) {
        const yBase = stepY * (r + 1);
        const idxs: number[] = [];
        const vert = 1 - Math.abs(yBase / h - 0.5) * 2; // 1 centre → 0 edge
        for (let c = 0; c < cols; c++) {
          const xBase = stepX * (c + 1);
          const alpha = (0.18 + rand() * 0.3) * (0.45 + 0.55 * vert) * opacity;
          pts.push({
            x: xBase + (rand() - 0.5) * stepX * 0.55,
            y0: yBase + (rand() - 0.5) * stepY * 0.45,
            r: 0.9 + rand() * 0.9,
            a: Math.max(0.06, Math.min(1, alpha)),
            phase: rand() * Math.PI * 2,
          });
          idxs.push(pts.length - 1);
        }
        rows.push({ idxs });
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const waveY = (p: Pt, t: number) =>
      p.y0 +
      Math.sin(p.x * 0.015 - t * speed * 0.7 + p.phase) * amplitude +
      Math.sin(p.y0 * 0.011 + t * speed * 0.45) * amplitude * 0.5;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (pts.length === 0) return;

      // Wave-lines joining each row with gradient effect.
      ctx.lineWidth = 1.2;
      for (const row of rows) {
        if (row.idxs.length < 2) continue;
        ctx.beginPath();
        for (let i = 0; i < row.idxs.length; i++) {
          const p = pts[row.idxs[i]];
          const y = waveY(p, t);
          if (i === 0) ctx.moveTo(p.x, y);
          else ctx.lineTo(p.x, y);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.1 * opacity;
        ctx.stroke();
      }

      // Dots with accent highlights.
      for (const p of pts) {
        const y = waveY(p, t);
        ctx.globalAlpha = p.a * opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Highlight larger particles with accent color.
        if (p.r > 1.5) {
          ctx.globalAlpha = p.a * opacity * 0.5;
          ctx.fillStyle = accentColor;
          ctx.beginPath();
          ctx.arc(p.x, y, p.r * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (!running) return;
      draw(now / 1000);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when offscreen / tab hidden.
    const visObs = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visObs.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      build();
      if (reduced) draw(0.6);
    };
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onResize);
      ro.observe(wrap);
    }
    window.addEventListener("resize", onResize);

    // Repaint if the theme (and therefore --primary) changes.
    const themeObs = new MutationObserver(() => {
      readTheme();
      if (reduced) draw(0.6);
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    build();
    if (reduced) {
      draw(0.6);
    } else {
      start();
    }

    const cleanup = () => {
      stop();
      visObs.disconnect();
      themeObs.disconnect();
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    return cleanup;
  }, [spacing, amplitude, speed, maxParticles, opacity]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}