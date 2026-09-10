import Image from "next/image";
import Link from "next/link";

/**
 * Brand logo with automatic light/dark variant switching.
 * Uses the real brand assets self-hosted in /public:
 *   - logo-color.png (light theme, full colour lockup)
 *   - logo-white.png (dark/deep surfaces, white lockup)
 *   - icon.png       (compact mark, e.g. navbar on small screens)
 */
interface LogoProps {
  /** Height in px of the lockup. */
  size?: number;
  /** Force the white variant (for deep/navy surfaces like the footer). */
  variant?: "auto" | "light" | "white";
  className?: string;
  /** Show the compact icon instead of the full lockup. */
  iconOnly?: boolean;
}

export default function Logo({
  size = 36,
  variant = "auto",
  className = "",
  iconOnly = false,
}: LogoProps) {
  const white = variant === "white";

  const src = iconOnly
    ? "/icon.png"
    : white
      ? "/logo-white.png"
      : "/logo-color.png";

  return (
    <Link
      href="/"
      aria-label="Talent Trek — home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <Image
        src={src}
        alt={iconOnly ? "Talent Trek icon" : "Talent Trek logo"}
        width={iconOnly ? size : Math.round(size * 5.2)}
        height={size}
        priority
        style={{ height: size, width: "auto" }}
      />
    </Link>
  );
}