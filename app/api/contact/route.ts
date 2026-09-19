import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { SITE } from "@/lib/site";

/**
 * Lead-capture endpoint for the contact form.
 *
 * Delivery ladder (first available wins):
 *   1. RESEND_API_KEY set   → email via the Resend REST API.
 *   2. No email provider    → append the lead to data/leads.jsonl so every
 *      enquiry is captured on disk even before an inbox is wired up.
 *
 * A lead is only acknowledged (200) after it has been persisted somewhere;
 * the form can never again silently drop a submission.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = { name: 120, email: 200, phone: 40, industry: 60, message: 4000 };

/** In-memory rate limit: 5 submissions / 10 min / IP. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (prev.length >= MAX_HITS) {
    hits.set(ip, prev);
    return true;
  }
  prev.push(now);
  hits.set(ip, prev);
  return false;
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

async function emailLead(lead: Record<string, unknown>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Talent Trek Website <onboarding@resend.dev>";
  const lines = Object.entries(lead)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New website lead — ${lead.fullName}`,
      text: lines,
    }),
  });
  return res.ok;
}

async function fileLead(lead: Record<string, unknown>): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    path.join(dir, "leads.jsonl"),
    JSON.stringify(lead) + "\n",
    "utf8",
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot — bots fill it, humans never see it. Pretend success, store nothing.
  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const fullName = str(body.fullName, MAX_LEN.name);
  const email = str(body.email, MAX_LEN.email);
  const phone = str(body.phone, MAX_LEN.phone);
  const industry = str(body.industry, MAX_LEN.industry);
  const message = str(body.message, MAX_LEN.message);
  const services = Array.isArray(body.services)
    ? body.services.map((s) => str(s, 60)).filter(Boolean)
    : [];

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid business email.";
  if (!industry) errors.industry = "Please choose an industry.";
  if (services.length === 0) errors.services = "Pick at least one service.";
  if (!message) errors.message = "Tell us a little about what you need.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 400 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    fullName,
    email,
    ...(phone ? { phone } : {}),
    industry,
    services,
    message,
    ip,
    userAgent: str(request.headers.get("user-agent"), 300),
  };

  let emailed = false;
  try {
    emailed = await emailLead(lead);
  } catch (err) {
    console.error("[contact] email delivery failed:", err);
  }
  if (!emailed) {
    try {
      await fileLead(lead);
    } catch (err) {
      console.error("[contact] lead file capture failed — LEAD LOST:", lead, err);
      return NextResponse.json(
        { error: "Could not capture your message. Please call us on 1800 860 624." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true, emailed });
}