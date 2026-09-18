"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  CalendarDays,
  Car,
  ChevronDown,
  Database,
  Globe,
  HeartPulse,
  Menu,
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
import DarkModeToggle from "./DarkModeToggle";
import MobileDrawer from "./MobileDrawer";

const SERVICE_ICONS = {
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

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeout = useRef<number | undefined>(undefined);
  const industriesCloseTimeout = useRef<number | undefined>(undefined);

  // Route change closes everything.
  useEffect(() => {
    setDropdownOpen(false);
    setIndustriesOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

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


      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </header>
  );
}
