import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "accent" | "primary" | "outline";
}

export default function Badge({ children, variant = "accent" }: BadgeProps) {
  const styles =
    variant === "accent"
      ? "bg-accent-dim text-accent"
      : variant === "primary"
        ? "bg-primary-dim text-primary"
        : "border border-line text-ink-muted";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}
