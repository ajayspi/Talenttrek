"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CircleCheck, CircleAlert } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { trackEvent } from "@/lib/analytics";
import IndustryVisual from "@/components/anim/IndustryVisual";

/**
 * Expandable industry card: pain points, how Talent Trek solves them and
 * the applicable services. Single-open behaviour is independent per card.
 */
export default function IndustryCard({ industry }: { industry: Industry }) {
  const [open, setOpen] = useState(false);
  const panelId = `industry-panel-${industry.slug}`;

  return (
    <div id={industry.slug} className="card scroll-mt-28 overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((o) => {
              if (!o) trackEvent("industry_view", { industry: industry.name });
              return !o;
            });
          }}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-fast hover:text-accent"
        >
          <span>
            <span className="block text-lg font-bold">{industry.name}</span>
            <span className="block text-sm font-medium text-ink-muted">
              {industry.tagline}
            </span>
          </span>
          <ChevronDown
            className={`h-5 w-5 flex-none text-accent transition-transform duration-base ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>
      </h3>
      <div id={panelId} className="faq-panel" data-open={open}>
        <div>
          <div className="grid gap-6 border-t border-line p-6 md:grid-cols-2">
            <IndustryVisual slug={industry.slug} name={industry.name} />
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">
                The pain
              </h4>
              <ul className="mb-5 space-y-1.5 text-sm text-ink-muted">
                {industry.pains.map((p) => (
                  <li key={p} className="flex gap-2">
                    <CircleAlert
                      className="mt-0.5 h-4 w-4 flex-none text-[var(--accent-logo)]"
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">
                How we solve it
              </h4>
              <ul className="space-y-1.5 text-sm text-ink-muted">
                {industry.solutions.map((s) => (
                  <li key={s} className="flex gap-2">
                    <CircleCheck
                      className="mt-0.5 h-4 w-4 flex-none text-accent"
                      aria-hidden
                    />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {industry.services.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="btn btn-primary px-5 py-2.5 text-sm"
                  onClick={() =>
                    trackEvent("industry_view", { industry: industry.name, detail: true })
                  }
                >
                  Explore the {industry.name} playbook
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-ghost px-5 py-2.5 text-sm"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
