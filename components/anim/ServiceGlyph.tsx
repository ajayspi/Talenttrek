import type { ReactElement } from "react";
import type { ServiceIcon } from "@/lib/services";

/**
 * Animated inline-SVG glyph per service — the "more visuals" identity for
 * the services grid. Each glyph has its own motion language (CSS keyframes
 * in styles/animations.css) and freezes under prefers-reduced-motion.
 */
function VoiceGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={6 + i * 9}
          y="15"
          width="5"
          height="27"
          rx="2.5"
          fill="currentColor"
          className="glyph-bar"
          style={{
            transformOrigin: `${8.5 + i * 9}px 42px`,
            animationDelay: `${i * 0.13}s`,
          }}
        />
      ))}
    </svg>
  );
}

function ChatGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="20" fill="currentColor" className="glyph-ring" />
      <path
        d="M14 12h20a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H22l-9 6v-6a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={19 + i * 5}
          cy="24"
          r="1.8"
          fill="currentColor"
          className="glyph-dot"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </svg>
  );
}

function DriveGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <path
        d="M10 33h28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 6"
        className="glyph-dash"
      />
      <g className="glyph-drive" stroke="currentColor" strokeWidth="2">
        <rect x="18" y="22" width="14" height="8" rx="2.5" fill="currentColor" stroke="none" />
        <circle cx="21.5" cy="33" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="28.5" cy="33" r="1.8" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function AgentGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <g className="glyph-orbit" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="15" strokeDasharray="12 7" opacity="0.65" />
        <circle cx="39" cy="24" r="2.2" fill="currentColor" stroke="none" />
      </g>
      <circle cx="24" cy="24" r="6.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" />
    </svg>
  );
}

const GLYPHS: Record<ServiceIcon, () => ReactElement> = {
  mic: VoiceGlyph,
  chat: ChatGlyph,
  drive: DriveGlyph,
  agent: AgentGlyph,
};

export default function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  const Glyph = GLYPHS[icon];
  return (
    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-dim text-accent">
      <Glyph />
    </div>
  );
}