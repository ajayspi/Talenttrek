# Talent Trek — Next.js Site

Marketing site for Talent Trek (talenttrek.com.au) — AI Voice, Chat &
Agent solutions. Next.js 15 App Router + Tailwind CSS + Framer Motion,
pulling blog content from the live WordPress REST API.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve production build
```

## Environment (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WP_URL` | WordPress base — blog fetches + CF7 form target |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap) |
| `WP_APP_PASSWORD` | Optional — only for authenticated REST endpoints |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID (loads only after cookie consent) |
| `NEXT_PUBLIC_CF7_FORM_ID` | Numeric CF7 form ID; empty = demo-mode contact form |

## Architecture

```
app/                    # App Router routes (all server components by default)
  page.tsx              # Home — 3D wave hero, stats, grid, strip, HowTo, FAQ
  about/ services/* industries/ contact/ privacy/ terms/
  blog/                 # Listing (ISR 1h) + [slug] (SSG, sanitized WP content)
  sitemap.ts robots.ts  # Generated from static routes + WP posts
components/
  layout/               # Navbar (glass + mega-dropdown + drawer), Footer,
                        # ThemeProvider, DarkModeToggle, CookieConsent (+GA4)
  anim/                 # HeroCanvas (three.js point-grid wave hero), ParticleWave
                        # (Canvas-2D hero background), WaveBackground, VoiceWave,
                        # ServiceGlyph, FeatureIcon, IndustryVisual
  home/                 # Hero (3D wave canvas), StatsCounter, ServicesGrid,
                        # PartnersMarquee, TestimonialsCarousel
  shared/               # ServiceCard, BlogCard, FAQAccordion, ContactForm (CF7),
                        # AnimatedSection, SectionHeading, Badge, trackers
  seo/                  # JsonLd builders + BreadcrumbJsonLd
  services/             # Shared ServiceDetail template
  industries/           # Expandable IndustryCard
lib/
  site.ts               # Brand constants (phone, ABN, address, geo, logos)
  wordpress.ts          # Typed WP REST fetcher — fails soft, ISR 3600
  services.ts           # Content for the 4 services (pages, dropdown, footer)
  industries.ts faqs.ts metadata.ts fonts.ts motion-variants.ts analytics.ts
hooks/                  # useInView, useCountUp
styles/
  tokens.css            # Design tokens — palette, fluid type scale, motion
  animations.css        # Keyframes (marquee, drift, shimmer), reduced-motion
```

## Design system

- **Fonts:** Space Grotesk 500/600/700 (display) + Inter 400/500/700 (body) via
  `next/font` (self-hosted, `display: swap`).
- **Palette:** single blue identity — `#2563EB` on light,
  `#60A5FA` / `#93C5FD` on dark (explicit opt-in only).
  Dark mode is two-state, light-first: explicit `data-theme="dark"` choice
  (no-flash bootstrap script in `app/layout.tsx`).
- **Tailwind** mirrors every token from `styles/tokens.css`
  (`tailwind.config.ts`) so the two systems stay in sync.
- **Fluid type scale** (`--text-xs` … `--text-hero`) via `clamp()`.

## Key behaviours

- **WordPress blog:** ISR `revalidate = 3600`; fetchers fail soft (return
  `[]`/`null`) so WP outages never break the site; content sanitized with
  isomorphic-DOMPurify; TOC auto-generated from H2/H3.
- **Contact form:** validates inline, POSTs to the CF7 REST feedback
  endpoint when `NEXT_PUBLIC_CF7_FORM_ID` is set, otherwise runs in demo
  mode. Errors announced via `aria-live`.
- **Analytics:** `form_submit`, `cta_click`, `service_view`,
  `industry_view`, `blog_read` (50%/100% scroll) — all consent-gated.
- **Accessibility:** WCAG 2.2 AA target — skip link, focus rings, focus
  trap in mobile drawer, `aria-expanded` disclosures, reduced-motion
  fallbacks throughout (Framer + CSS + Canvas static frame).
- **SEO:** per-page JSON-LD (Organization, LocalBusiness, WebSite,
  FAQPage, HowTo, Service, Article, Person, BreadcrumbList), canonical +
  OG metadata, generated `sitemap.xml` / `robots.txt`.
- **Headers:** nosniff, DENY, strict referrer, permissions policy
  (`next.config.ts`).

## Deployment (Vercel)

1. Push to GitHub, import the repo in Vercel.
2. Set the env vars above in the Vercel dashboard.
3. Point `talenttrek.com.au` DNS at Vercel; keep WordPress at the same
   domain or move the frontend to a subdomain — `next.config.ts` already
   allowlists `talenttrek.com.au` for remote images.

### Branch setup

Vercel deploys from the `main` branch by default. If your repo uses
`master`, either reconfigure Vercel to use `master` or rename the
branch:

```bash
git checkout master
git branch -m master main
git push -u origin main
git push origin --delete master  # optional, after verifying main works
```

## Deployment (VPS / Self-hosted)

1. Push to GitHub, pull on the server (`git pull origin main`).
2. Set the env vars in `/home/ubuntu/talenttrek-next/.env.local`.
3. Build and start:
   ```bash
   npm install
   npm run build
   npm start   # serves on port 3000
   ```
4. Use PM2 or systemd to keep the process running.

## Brand assets

Self-hosted in `public/` (downloaded from the WP CDN):
`logo-color.png`, `logo-white.png` (dark nav / footer), `icon.png`
(favicon + `app/icon.png`). Decorative backgrounds are drawn entirely in
Canvas/SVG (ParticleWave, WaveBackground, VoiceWave) — no image assets.


