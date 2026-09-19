"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Car,
  ChevronDown,
  Database,
  Globe,
  HeartPulse,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  ShoppingBag,
  Soup,
  Square,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { SITE } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/** Kept in sync with the desktop mega-menu icon sets in Navbar.tsx. */
const SERVICE_ICONS: Record<string, typeof Mic> = {
  mic: Mic,
  chat: MessageSquare,
  drive: Car,
  agent: Bot,
  square: Square,
  crm: MessageSquare,
  database: Database,
  phone: Phone,
  calendar: CalendarDays,
  globe: Globe,
};
const INDUSTRY_ICONS: Record<string, typeof Car> = {
  "hospitality-wellness": UtensilsCrossed,
  automotive: Car,
  retail: ShoppingBag,
  "food-beverage": Soup,
  healthcare: HeartPulse,
  "information-technology": Monitor,
};
const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/**
 * Mobile slide-in navigation.
 *
 * Rendered through a portal into document.body on purpose: the sticky header
 * uses `backdrop-blur`, and a backdrop-filter creates a containing block for
 * fixed-position descendants — which would trap this drawer inside the 76px
 * header strip. The portal keeps the overlay and drawer anchored to the
 * viewport on every screen size.
 */
export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  // Portals need the DOM, so wait for the first client render.
  useEffect(() => setMounted(true), []);

  // Collapse the accordions and close on navigation.
  useEffect(() => {
    setServicesExpanded(false);
    setIndustriesExpanded(false);
  }, [pathname, open]);

  // Focus trap, Escape, body scroll lock, focus restore.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    drawer?.querySelectorAll<HTMLElement>("a, button")[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const list = Array.from(drawer.querySelectorAll<HTMLElement>("a, button"));
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[110] bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            id="mobile-drawer"
            ref={drawerRef}
            className="fixed bottom-0 right-0 top-0 z-[120] flex w-[min(100%,22rem)] flex-col border-l border-line bg-bg shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 34,
              duration: reducedMotion ? 0 : undefined,
            }}
          >
            <div className="flex flex-none items-center justify-between border-b border-line px-5 py-4">
              <span className="inline-flex items-center">
                <Image
                  src={SITE.logos.color}
                  alt="Talent Trek logo"
                  width={120}
                  height={40}
                  className="logo-light h-9 w-auto"
                />
                <Image
                  src={SITE.logos.white}
                  alt="Talent Trek logo"
                  width={120}
                  height={40}
                  className="logo-dark h-9 w-auto"
                />
              </span>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close menu"
                onClick={onClose}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-5 py-4"
            >
{/* Services accordion */}
              <button
                type="button"
                aria-expanded={servicesExpanded}
                onClick={() => setServicesExpanded((o) => !o)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left font-bold text-ink hover:bg-accent-dim"
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform duration-fast ${
                    servicesExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {servicesExpanded && (
                <div className="ml-4 flex flex-col border-l border-line pl-3">
                  <Link
                    href="/services"
                    className="rounded-lg px-3 py-2.5 font-semibold text-ink-muted hover:bg-accent-dim hover:text-ink"
                  >
                    All Services
                  </Link>
                  {SERVICES.map((s) => {
                    const Icon = SERVICE_ICONS[s.icon] ?? Mic;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-semibold text-ink-muted hover:bg-accent-dim hover:text-ink"
                      >
                        <Icon
                          className="h-4 w-4 flex-none text-[var(--accent-logo)]"
                          aria-hidden
                        />
                        {s.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Industries accordion */}
              <button
                type="button"
                aria-expanded={industriesExpanded}
                onClick={() => setIndustriesExpanded((o) => !o)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left font-bold text-ink hover:bg-accent-dim"
              >
                Industries
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform duration-fast ${
                    industriesExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {industriesExpanded && (
                <div className="ml-4 flex flex-col border-l border-line pl-3">
                  <Link
                    href="/industries"
                    className="rounded-lg px-3 py-2.5 font-semibold text-ink-muted hover:bg-accent-dim hover:text-ink"
                  >
                    All Industries
                  </Link>
                  {INDUSTRIES.map((ind) => {
                    const Icon = INDUSTRY_ICONS[ind.slug] ?? Car;
                    return (
                      <Link
                        key={ind.slug}
                        href={`/industries/${ind.slug}`}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-semibold text-ink-muted hover:bg-accent-dim hover:text-ink"
                      >
                        <Icon
                          className="h-4 w-4 flex-none text-[var(--accent-logo)]"
                          aria-hidden
                        />
                        {ind.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 font-bold hover:bg-accent-dim ${
                    isActive(link.href) ? "bg-accent-dim text-ink" : "text-ink"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-none flex-col gap-3 border-t border-line px-5 py-5">
              <a
                href={SITE.phone.href}
                onClick={() =>
                  trackEvent("cta_click", { location: "drawer-phone", medium: "tel" })
                }
                className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 font-bold text-ink"
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden />
                {SITE.phone.display}
              </a>
              <Link
                href="/contact"
                onClick={() => trackEvent("cta_click", { location: "drawer" })}
                className="btn btn-primary w-full"
              >
                Book a Demo <ArrowRight className="arrow h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}