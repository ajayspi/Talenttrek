/**
 * Animated voice-wave equalizer — pure CSS bars in the brand-orange accent.
 * Used wherever placeholder photography used to sit on service/industry
 * visuals. Frozen under prefers-reduced-motion.
 */
const HEIGHTS = [38, 62, 90, 70, 100, 55, 82, 45, 68, 34, 76, 50];

export default function VoiceWave({
  bars = 12,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-end justify-center gap-1.5 ${className}`}
      aria-hidden
    >
      {HEIGHTS.slice(0, bars).map((h, i) => (
        <span
          key={i}
          className="voice-wave-bar w-1.5 rounded-full sm:w-2"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}