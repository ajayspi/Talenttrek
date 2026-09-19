"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const INDUSTRY_OPTIONS = [
  "Hospitality & Wellness",
  "Automotive",
  "Retail",
  "F&B",
  "Healthcare",
  "Other",
];
const SERVICE_OPTIONS = [
  "Voice Commerce",
  "Chat AI Automotive",
  "Dynamic DriveThru",
  "AI Agent",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";
interface FieldErrors {
  fullName?: string;
  email?: string;
  industry?: string;
  services?: string;
  message?: string;
  form?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [services, setServices] = useState<string[]>([]);

  function validate(data: FormData): FieldErrors {
    const next: FieldErrors = {};
    if (!String(data.get("fullName") ?? "").trim())
      next.fullName = "Please enter your full name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Please enter your business email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "That email doesn't look right.";
    if (!data.get("industry")) next.industry = "Please choose an industry.";
    if (services.length === 0)
      next.services = "Pick at least one service (or 'Not sure yet').";
    if (!String(data.get("message") ?? "").trim())
      next.message = "Tell us a little about what you need.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fieldErrors = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(data.get("fullName") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          industry: String(data.get("industry") ?? ""),
          services,
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });
      if (res.ok) {
        trackEvent("form_submit", { method: "api" });
        setStatus("success");
        return;
      }
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };
      if (json.errors) setErrors(json.errors);
      setErrors((prev) => ({
        ...prev,
        form:
          json.error ??
          "Something went wrong sending your message. Please call us on 1800 860 624.",
      }));
      setStatus("error");
    } catch {
      setErrors({
        form: "Something went wrong sending your message. Please call us on 1800 860 624.",
      });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center p-10 text-center" role="status">
        <svg viewBox="0 0 52 52" className="h-14 w-14 text-accent" aria-hidden>
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
          <path
            d="M14 27l8 8 16-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="36"
            strokeDashoffset="36"
            style={{ animation: "draw-check 0.5s var(--ease-out-quart) 0.15s forwards" }}
          />
        </svg>
        <h3 className="mt-4 text-2xl">Message sent</h3>
        <p className="mt-2 max-w-sm text-ink-muted">
          Thanks for reaching out — we&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 md:p-8">
        {/* Honeypot — hidden from humans, catches bots. Server ignores + discards. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-website">Website</label>
          <input
            id="cf-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="field-label">
            Full name <span aria-hidden>*</span>
          </label>
          <input
            id="cf-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className={`input ${errors.fullName ? "input-error" : ""}`}
            aria-describedby={errors.fullName ? "cf-name-err" : undefined}
          />
          {errors.fullName && (
            <p id="cf-name-err" className="field-error">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">
            Business email <span aria-hidden>*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`input ${errors.email ? "input-error" : ""}`}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
          />
          {errors.email && (
            <p id="cf-email-err" className="field-error">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">Phone number</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className="input" />
        </div>
        <div>
          <label htmlFor="cf-company" className="field-label">Company name</label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" className="input" />
        </div>
        <div>
          <label htmlFor="cf-industry" className="field-label">
            Industry <span aria-hidden>*</span>
          </label>
          <select
            id="cf-industry"
            name="industry"
            required
            defaultValue=""
            className={`input ${errors.industry ? "input-error" : ""}`}
            aria-describedby={errors.industry ? "cf-industry-err" : undefined}
          >
            <option value="" disabled>Select your industry…</option>
            {INDUSTRY_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.industry && (
            <p id="cf-industry-err" className="field-error">{errors.industry}</p>
          )}
        </div>
        <fieldset>
          <legend className="field-label">
            Service interest <span aria-hidden>*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((o) => {
              const active = services.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setServices((prev) =>
                      prev.includes(o) ? prev.filter((s) => s !== o) : [...prev, o],
                    )
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors duration-fast ${
                    active
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line text-ink-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {errors.services && <p className="field-error">{errors.services}</p>}
        </fieldset>
        <div className="md:col-span-2">
          <label htmlFor="cf-message" className="field-label">
            Message <span aria-hidden>*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            className={`input ${errors.message ? "input-error" : ""}`}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            placeholder="Where should AI talk for you?"
          />
          {errors.message && (
            <p id="cf-message-err" className="field-error">{errors.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary self-start disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
        <div aria-live="polite">
          {status === "error" && Object.keys(errors).length > 0 && (
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              {errors.form ?? "Please fix the highlighted fields and try again."}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
