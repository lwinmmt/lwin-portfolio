# lwinmmt.com

Personal portfolio for **Lwin MMT** — AI & IIoT Engineer at VNTT, Information Systems student at Singapore Management University. Built with Next.js 16 (App Router), React 19, Tailwind v4, and Sanity (CMS, headless).

## Stack

- **Framework**: Next.js 16 + React 19 (App Router, Turbopack)
- **Styling**: Tailwind v4 + CSS variables, `framer-motion` for sliding pills
- **CMS**: Sanity v5 (`/studio` route, Basic-Auth gated via `proxy.ts`)
- **i18n**: custom EN/VN stack, cookie + `Accept-Language` resolution, message bundles in `lib/i18n/messages.ts`
- **Hosting**: Vercel

## Local dev

```bash
pnpm install
cp .env.local.example .env.local   # fill in Sanity vars if you want /studio
pnpm dev
```

Site at http://localhost:3000.

## Folder layout

```
app/                  Next.js App Router routes
  about/              /about
  highlights/         /highlights (bento)
  projects/           /projects + /projects/[slug] + opengraph-image
  resume/             /resume
  uses/               /uses
  studio/             Sanity Studio (Basic-Auth gated by proxy.ts)
components/
  hero/               Hero variants (globe canvas, terminal mock)
  layout/             DashboardShell + KeyboardNav + LocaleSwap
  sections/           Home page sections (FeaturedProjects, Highlights, …)
  sidebar/            Desktop sidebar
  dock/               Mobile dock
  cmd-palette/        Cmd+K palette
  esmos/              ESMOS architecture diagram (used in one project page)
  about/              About-page-only components (KineticQuote)
  ui/                 Shared primitives (CardCover, Lightbox, EmailButton, …)
lib/
  i18n/               Locale resolution, message bundles, date formatter
  content/            Typed content tables (projects, highlights, …)
  nav-utils.ts        Sidebar nav config
  og-tokens.ts        OG image colour tokens
  use-mod-key.ts      Cmd-vs-Ctrl platform hook
public/
  diagrams/           ESMOS architecture SVG
  files/projects/     PDF case studies
  images/highlights/  Highlight cover images
  logos/              Org logos
  sounds/             Terminal keystroke audio sprite
sanity/               Sanity schemas + client
proxy.ts              Basic-Auth gate for /studio (Next 16 proxy convention)
next.config.ts        CSP + security headers
```

## i18n

Strings:
- Static UI copy lives in `lib/i18n/messages.ts` — keyed by dotted-namespace strings (`hero.cta.resume`, etc.). Access via `getT()` in server components, `useT()` in client components.
- Content tables (projects, highlights, awards) carry parallel `*Vi` siblings (e.g. `title` + `titleVi`); the renderer picks via `pickLocalized(en, vi, locale)`.
- Dates are stored once in English and run through `formatDates(dates, locale)` at render — VN gets numeric months + "đến nay" instead of "to Present".

Locale resolution:
- Explicit cookie wins → else `Accept-Language` → else `en`.
- Switcher writes the cookie + calls `router.refresh()`; `LocaleSwap` re-keys the page body so the swap animates.

## Studio

`/studio` is gated by HTTP Basic Auth in `proxy.ts`. Set `STUDIO_USERNAME` + `STUDIO_PASSWORD` in `.env.local` (or Vercel project env) to unlock; without them the gate stays closed.

## Hero variant

The hero right column renders one of two variants chosen randomly per visit:
- **globe** — canvas Fibonacci dot sphere with arc paths between APAC + global cities
- **terminal** — auto-typing mock shell session (`whoami`, `cat about.md`, `ls projects/`, `echo $EMAIL`)

A small `swap` pill at the top-right of the stage flips to the other variant in place. Refresh re-randomizes.

## Deploy

1. Push to GitHub.
2. Import in Vercel.
3. Set env vars (`NEXT_PUBLIC_SANITY_*`, `STUDIO_USERNAME`, `STUDIO_PASSWORD`) in the Vercel project settings.
4. Add custom domain in Vercel → set DNS to point at Vercel.

## License

All content (text, images, project case studies) © Lwin MMT. Code is yours to learn from; please don't ship a verbatim clone as your own portfolio.
