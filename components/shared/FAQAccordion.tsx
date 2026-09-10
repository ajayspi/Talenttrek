"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible FAQ accordion. Button-in-heading pattern, aria-expanded,
 * animated with the CSS grid-rows trick (see .faq-panel in globals.css) —
 * no JS measuring, and animation is disabled under reduced motion via the
 * global transition override.
 */
export default function FAQAccordion({
  items,
  className = "",
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="faq-item card"
            data-open={isOpen}
          >
            <h3>
              <button
                type="button"
                id={`faq-button-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-bold text-ink transition-colors duration-fast hover:text-accent"
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 flex-none text-accent transition-transform duration-base ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className="faq-panel"
            >
              <div>
                <p className="px-6 pb-5 text-ink-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
