import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={`mb-12 max-w-2xl md:mb-16 ${
        align === "center" ? "mx-auto text-center" : ""
      }${className ? ` ${className}` : ""}`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-lg text-ink-muted">{lede}</p>}
    </AnimatedSection>
  );
}
