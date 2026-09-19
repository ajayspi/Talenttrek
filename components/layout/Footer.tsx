import Link from "next/link";
import Image from "next/image";
import { Linkedin, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Voice Commerce", href: "/services/voice-commerce" },
  { label: "Chat AI Automotive", href: "/services/chat-ai-automotive" },
  { label: "Dynamic DriveThru", href: "/services/dynamic-drivethru" },
  { label: "AI Agent", href: "/services/ai-agent" },
];

const INDUSTRY_LINKS = [
  { label: "Hospitality & Wellness", href: "/industries/hospitality-wellness" },
  { label: "Automotive", href: "/industries/automotive" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Food & Beverage", href: "/industries/food-beverage" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "IT & Technology", href: "/industries/information-technology" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  return (
    <footer
      className="bg-deep text-deep-text"
      aria-label="Site footer"
    >
      <div className="container-site grid gap-12 py-16 md:grid-cols-[260px_minmax(0,1fr)] md:gap-16">
        <div>
          <Link href="/" className="mb-6 inline-block" aria-label="Talent Trek home">
            <Image
              src={SITE.logos.white}
              alt="Talent Trek logo"
              width={168}
              height={52}
              priority
              className="h-auto w-[168px]"
            />
          </Link>
          <p className="mb-6 max-w-[240px] text-sm leading-relaxed text-deep-muted">
            AI voice, chat and agent solutions for modern commerce.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="https://au.linkedin.com/company/talent-trek"
              target="_blank"
              rel="noreferrer"
              className="icon-btn border-deep-border text-deep-accent hover:border-deep-accent hover:bg-deep-accent hover:text-deep"
              aria-label="Talent Trek on LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Services" links={SERVICE_LINKS} />
          <FooterColumn title="Industries" links={INDUSTRY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>
      </div>

      <div className="border-t border-deep-border">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-sm text-deep-muted">
          <span>ABN 13 674 722 135</span>
          <span>© 2026 Talent Trek</span>
          <span className="inline-flex items-center gap-2 text-deep-muted">
            <MapPin className="h-4 w-4 text-deep-accent" aria-hidden />
            Made in Melbourne
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-deep-muted">
        {title}
      </h4>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block py-1.5 text-sm text-deep-text transition-colors duration-fast hover:text-deep-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}