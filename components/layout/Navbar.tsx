"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Car,
  ChevronDown,
  HeartPulse,
  Menu,
  MessageSquare,
  Mic,
  Phone,
  ShoppingBag,
  Soup,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { SITE } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import DarkModeToggle from "./DarkModeToggle";

const SERVICE_ICONS = { mic: Mic, chat: MessageSquare, drive: Car, agent: Bot };
const INDUSTRY_ICONS: Record<string, typeof Car> = {
  "hospitality-wellness": UtensilsCrossed,
  automotive: Car,
  retail: ShoppingBag,
  fb: Soup,
  healthcare: HeartPulse,
};
const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeout = useRef<number | undefined>(undefined);
  const industriesCloseTimeout = useRef<number | undefined>(undefined);

  // Route change closes everything.
  useEffect(() => {
    setDropdownOpen(false);
    setIndustriesOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Mobile drawer: focus trap, Escape, body scroll lock, focus restore.
  useEffect(() => {
    if (!drawerOpen) return;
    const drawer = drawerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    drawer?.querySelectorAll<HTMLElement>("a, button")[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const list = Array.from(
        drawer.querySelectorAll<HTMLElement>("a, button"),
      );
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
  }, [drawerOpen]);

  // Mega-dropdowns: Escape + click-outside (Services and Industries).
  useEffect(() => {
    if (!dropdownOpen && !industriesOpen) return;
    const closeAll = () => {
      setDropdownOpen(false);
      setIndustriesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onClick = (e: MouseEvent) => {
      const inServices = dropdownRef.current?.contains(e.target as Node);
      const inIndustries = industriesRef.current?.contains(e.target as Node);
      if (!inServices && !inIndustries) closeAll();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [dropdownOpen, industriesOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className="sticky top-0 z-[100] border-b border-line backdrop-blur-xl backdrop-saturate-150"
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-4 md:h-[84px]">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Talent Trek — home"
        >
          <Image
            src={SITE.logos.color}
            alt="Talent Trek logo"
            width={132}
            height={44}
            priority
            className="logo-light h-11 w-auto"
          />
          <Image
            src={SITE.logos.white}
            alt="Talent Trek logo"
            width={132}
            height={44}
            priority
            className="logo-dark h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => {
              window.clearTimeout(closeTimeout.current);
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              closeTimeout.current = window.setTimeout(
                () => setDropdownOpen(false),
                150,
              );
            }}
          >
            <button
              type="button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((o) => !o)}
              className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-[0.96rem] font-semibold transition-colors duration-fast ${
                servicesActive
                  ? "bg-accent-dim text-ink"
                  : "text-ink-muted hover:bg-accent-dim hover:text-ink"
              }`}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-fast ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {dropdownOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                <div className="card grid grid-cols-2 gap-2 p-4">
                  {SERVICES.map((s) => {
                    const Icon = SERVICE_ICONS[s.icon];
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex gap-3 rounded-xl p-3 transition-colors duration-fast hover:bg-accent-dim"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-accent-dim text-accent">
                          <Icon className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-bold text-ink">
                            {s.name}
                          </span>
                          <span className="block text-xs text-ink-muted">
                            {s.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Industries mega-dropdown */}
          <div
            ref={industriesRef}
            className="relative"
            onMouseEnter={() => {
              window.clearTimeout(industriesCloseTimeout.current);
              setIndustriesOpen(true);
            }}
            onMouseLeave={() => {
              industriesCloseTimeout.current = window.setTimeout(
                () => setIndustriesOpen(false),
                150,
              );
            }}
          >
            <button
              type="button"
              aria-expanded={industriesOpen}
              aria-haspopup="true"
              onClick={() => setIndustriesOpen((o) => !o)}
              className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-[0.96rem] font-semibold transition-colors duration-fast ${
                isActive("/industries")
                  ? "bg-accent-dim text-ink"
                  : "text-ink-muted hover:bg-accent-dim hover:text-ink"
              }`}
            >
              Industries
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-fast ${
                  industriesOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {industriesOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                <div className="card grid grid-cols-2 gap-2 p-4">
                  {INDUSTRIES.map((ind) => {
                    const Icon = INDUSTRY_ICONS[ind.slug] ?? Car;
                    return (
                      <Link
                        key={ind.slug}
                        href={`/industries/${ind.slug}`}
                        className="flex gap-3 rounded-xl p-3 transition-colors duration-fast hover:bg-accent-dim"
                      >
                        <span className="feat-icon mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg">
                          <Icon className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-bold text-ink">
                            {ind.name}
                          </span>
                          <span className="block text-xs text-ink-muted">
                            {ind.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2.5 text-[0.96rem] font-semibold transition-colors duration-fast ${
                isActive(link.href)
                  ? "bg-accent-dim text-ink"
                  : "text-ink-muted hover:bg-accent-dim hover:text-ink"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <DarkModeToggle />
          <Link
            href="/contact"
            onClick={() => trackEvent("cta_click", { location: "navbar" })}
            className="btn btn-primary hidden px-5 py-2.5 md:inline-flex"
          >
            Book a Demo
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {drawerOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[110] bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              className="fixed bottom-0 right-0 top-0 z-[120] flex w-full max-w-sm flex-col overflow-y-auto border-l border-line bg-bg p-6 lg:hidden"
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
              <div className="mb-6 flex items-center justify-between">
                <Image
                  src={SITE.logos.color}
                  alt="Talent Trek logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex flex-col gap-1">
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
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="rounded-lg px-3 py-2.5 font-semibold text-ink-muted hover:bg-accent-dim hover:text-ink"
                      >
                        {s.name}
                      </Link>
                    ))}
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

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a
                  href={SITE.phone.href}
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
      </AnimatePresence>
    </header>
  );
}
