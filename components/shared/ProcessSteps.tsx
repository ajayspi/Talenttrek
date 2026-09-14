import AnimatedSection from "./AnimatedSection";

interface ProcessStep {
  title: string;
  body: string;
}

/**
 * Numbered "work process" cards (01 → 04), mirroring the WP site's
 * step-by-step sections. Each card reveals independently on scroll.
 */
export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title}>
          <AnimatedSection className="card group relative h-full overflow-hidden p-7">
            <span
              className="pointer-events-none absolute -right-3 -top-6 font-display text-8xl font-extrabold text-primary-dim transition-transform duration-500 group-hover:scale-110"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="eyebrow relative mb-3">Step {String(i + 1).padStart(2, "0")}</p>
            <h3 className="relative text-lg">{step.title}</h3>
            <p className="relative mt-2 text-sm text-ink-muted">{step.body}</p>
            <span
              className="mt-5 block h-1 w-10 rounded-full bg-gradient-to-r from-[var(--accent-strong)] to-[var(--grad-to)] transition-all duration-500 group-hover:w-20"
              aria-hidden
            />
          </AnimatedSection>
        </li>
      ))}
    </ol>
  );
}
