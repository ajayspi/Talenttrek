"use client";

import { useCallback, useRef } from "react";
import { useAudioReactive } from "@/hooks/useAudioReactive";

interface LogoMarkProps {
  /** Rendered width of the full logo (px). Height is proportional. */
  width?: number;
  className?: string;
  /** Show a mic button that activates audio-reactive mode. */
  interactive?: boolean;
}

/**
 * Inline SVG logo with an animated orange triangle accent.
 *
 * Idle state: CSS breathing animation via `.animate-triangle-breathe`.
 * When `interactive` is true and the user clicks the mic, the triangle
 * responds to microphone amplitude in real time.
 */
export default function LogoMark({
  width = 132,
  className = "",
  interactive = false,
}: LogoMarkProps) {
  const { amplitude, listening, start, stop } = useAudioReactive();
  const triangleRef = useRef<SVGPolygonElement>(null);

  /* Derive live scale/opacity from amplitude when listening. */
  const liveScale = listening ? 1 + amplitude * 0.55 : 1;
  const liveOpacity = listening ? 0.75 + amplitude * 0.25 : 1;

  const toggleMic = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  /*
   * SVG viewBox: 132 × 44 — matches the original image dimensions.
   * The wordmark text uses the display font stack from the CSS tokens.
   * The equilateral triangle is the "play/forward" accent at the left.
   *
   * Triangle geometry (equilateral, 28px tall):
   *   Apex  : (4, 8)
   *   Base-L: (4, 36)
   *   Base-R: (28.2, 22)   — 28 * sin(60°) ≈ 24.2, offset from x=4
   */
  const trianglePoints = "4,8 4,36 28.2,22";

  return (
    <span
      className={`inline-flex items-center gap-0 leading-none ${className}`}
      aria-label="Talent Trek"
    >
      <svg
        width={width}
        height={Math.round(width * (44 / 132))}
        viewBox="0 0 132 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        focusable="false"
      >
        {/* Orange triangle */}
        <polygon
          ref={triangleRef}
          points={trianglePoints}
          fill="var(--accent-logo)"
          className={listening ? undefined : "animate-triangle-breathe"}
          style={
            listening
              ? {
                  transform: `scale(${liveScale})`,
                  opacity: liveOpacity,
                  transformOrigin: "center",
                  transition: "transform 50ms linear, opacity 50ms linear",
                }
              : undefined
          }
        />

        {/* Wordmark — "Talent Trek" in the display font */}
        <text
          x="36"
          y="30"
          fontFamily="var(--font-display), Manrope, sans-serif"
          fontSize="18"
          fontWeight="800"
          fill="var(--text)"
          letterSpacing="-0.02em"
        >
          Talent Trek
        </text>
      </svg>

      {interactive && (
        <button
          type="button"
          onClick={toggleMic}
          aria-label={listening ? "Stop audio reactive mode" : "Activate audio reactive logo"}
          title={listening ? "Stop mic" : "Tap to react to your voice"}
          className="ml-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-[border-color,color,box-shadow] duration-fast hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          style={
            listening
              ? {
                  borderColor: "var(--accent-logo)",
                  color: "var(--accent-logo)",
                  boxShadow: `0 0 0 2px color-mix(in srgb, var(--accent-logo) 22%, transparent)`,
                }
              : undefined
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            {listening ? (
              /* Stop icon */
              <rect x="2" y="2" width="8" height="8" rx="1.5" fill="currentColor" />
            ) : (
              /* Mic icon */
              <>
                <rect x="4" y="1" width="4" height="6" rx="2" fill="currentColor" />
                <path
                  d="M2 6a4 4 0 0 0 8 0"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="10"
                  x2="6"
                  y2="11.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      )}
    </span>
  );
}
