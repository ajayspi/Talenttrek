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

function SquareGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <rect x="8" y="8" width="32" height="32" rx="6" fill="currentColor" className="glyph-ring" />
      <path d="M16 20h16M16 28h10" stroke="var(--surface)" strokeWidth="2.5" strokeLinecap="round" className="glyph-dash" />
    </svg>
  );
}

function CrmGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <circle cx="24" cy="18" r="7" fill="currentColor" className="glyph-ring" />
      <path d="M10 38c0-7 6-12 14-12s14 5 14 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="glyph-dash" />
      <circle cx="38" cy="14" r="3" fill="currentColor" className="glyph-dot" />
    </svg>
  );
}

function DatabaseGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <ellipse cx="24" cy="14" rx="14" ry="5" stroke="currentColor" strokeWidth="2" className="glyph-ring" />
      <path d="M10 14v20c0 3 6 5 14 5s14-2 14-5V14M10 24c0 3 6 5 14 5s14-2 14-5" stroke="currentColor" strokeWidth="2" className="glyph-dash" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <path d="M14 12c2 4 2 8 0 12M34 12c-2 4-2 8 0 12M18 8c3 6 3 12 0 18M30 8c-3 6-3 12 0 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="glyph-ring" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="currentColor" className="glyph-dot" />
    </svg>
  );
}

function CalendarGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="2" className="glyph-ring" />
      <path d="M8 20h32M16 6v8M32 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="glyph-dash" />
      <circle cx="18" cy="30" r="2" fill="currentColor" className="glyph-dot" />
      <circle cx="24" cy="30" r="2" fill="currentColor" className="glyph-dot" style={{ animationDelay: "0.18s" }} />
      <circle cx="30" cy="30" r="2" fill="currentColor" className="glyph-dot" style={{ animationDelay: "0.36s" }} />
    </svg>
  );
}

function GlobeGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" className="glyph-ring" />
      <ellipse cx="24" cy="24" rx="8" ry="16" stroke="currentColor" strokeWidth="1.5" className="glyph-dash" />
      <path d="M8 24h32M10 16h28M10 32h28" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

const GLYPHS: Record<ServiceIcon, () => ReactElement> = {
  mic: VoiceGlyph,
  chat: ChatGlyph,
  drive: DriveGlyph,
  agent: AgentGlyph,
  square: SquareGlyph,
  crm: CrmGlyph,
  database: DatabaseGlyph,
  phone: PhoneGlyph,
  calendar: CalendarGlyph,
  globe: GlobeGlyph,
};

export default function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  const Glyph = GLYPHS[icon];
  return (
    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-dim text-accent">
      <Glyph />
    </div>
  );
}