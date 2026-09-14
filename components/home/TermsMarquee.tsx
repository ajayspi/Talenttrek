const TERMS = [
  "Voice Commerce",
  "Chat AI Automotive",
  "Dynamic DriveThru",
  "AI Agents",
  "Square Integration",
  "Custom CRM",
  "CRM Management",
  "AI Receptionist",
  "AI Booking",
  "Multilingual AI",
];

/**
 * Scrolling term strip — mirrors the WordPress site's running-text marquee
 * ("IT solution • BUSINESS SOLUTION • …"), using Talent Trek's own service
 * names. Pure CSS (animate-marquee); pauses on hover/focus.
 */
export default function TermsMarquee() {
  const row = (hidden: boolean) => (
    <ul
      className="flex w-max items-center"
      aria-hidden={hidden || undefined}
    >
      {TERMS.map((term) => (
        <li key={term} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl font-extrabold uppercase tracking-wide text-ink-muted md:text-2xl">
            {term}
          </span>
          <span
            className="inline-block h-2 w-2 rotate-45 rounded-[2px] bg-accent"
            aria-hidden
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What we build" className="marquee-paused overflow-hidden border-y border-line bg-bg-alt py-6">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
