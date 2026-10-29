# lwinmmt.com

Personal portfolio for **Lwin MMT**. Information Systems student at Singapore Management University, based in Singapore. Experience across IoT integration, cloud deployment, workflow automation and operations. Built with Next.js 16 (App Router), React 19, Tailwind v4, and Sanity (CMS, headless).

## Stack

- **Framework**: Next.js 16 + React 19 (App Router, Turbopack)
- **Styling**: Tailwind v4 + CSS variables, `framer-motion` for sliding pills
- **CMS**: Sanity v5 (`/studio` route, Basic-Auth gated via `proxy.ts`)
- **Language**: English only, with permanent redirects for retired `/vi` URLs
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
  [lang]/             English /en routes and their bare-path aliases
    about/            /en/about
    highlights/       /en/highlights (bento)
    projects/         /en/projects + /en/projects/[slug] + opengraph-image
    resume/           /en/resume
    uses/             /en/uses
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
  page-metadata.ts    Shared English canonical and social metadata
  nav-utils.ts        Navigation URL helpers
  og-tokens.ts        OG image colour tokens
  use-mod-key.ts      Cmd-vs-Ctrl platform hook
public/
  diagrams/           ESMOS architecture SVG
  resume/             Public resume PDF
  images/highlights/  Highlight cover images
  logos/              Org logos
  sounds/             Terminal keystroke audio sprite
sanity/               Sanity schemas + client
proxy.ts              Studio auth, English rewrites and retired /vi redirects
next.config.ts        CSP + security headers
```

## Language and shared profile

Strings:
- Static UI copy lives in `lib/i18n/messages.ts`. Keyed by dotted-namespace strings (`hero.cta.resume`, etc.). Access via `getT()` in server components, `useT()` in client components.
- The public site serves English only. `LOCALES` contains `en`; existing `/en/...` links stay valid.
- Bare URLs such as `/about` rewrite to their English route. Old `/vi/...` links redirect permanently to the matching English path, retaining query parameters.
- Old locale cookies and browser language preferences do not change the public language. Desktop and mobile language controls are removed.
- Legacy Vietnamese message/content fields remain in the source for compatibility with the retired locale. They are not generated as public Vietnamese pages.
- Dates remain stored in English and pass through the existing `formatDates` helper.

Shared facts:
- `lib/content/profile.ts` holds the public identity, current studies, Singapore location and site URL. The hero, terminal, structured profile and social preview use those values.
- `lib/content/experience.ts`, `education.ts`, `skills.ts`, `certifications.ts` and `highlights.ts` supply shared summaries. Full role bullets and case-study links are shared by the web resume.
- `lib/page-metadata.ts` supplies page-specific canonical/social URLs under `https://www.lwinmmt.com/en`. The sitemap lists 23 English pages (six main pages and 17 project case studies).

## Content and public download

- `lib/content/projects.ts` holds card summaries, route slugs, media and external links.
- `lib/content/case-studies.ts` holds detailed English project narratives. Preserve existing slugs when revising copy.
- `lib/content/about.ts` holds volunteering, leadership, awards and interests.
- The public download is `public/resume/lwin-resume.pdf`, synced from the approved one-page resume. The page and command palette share `profile.resumePdfUrl`; the old PDF URL redirects permanently to the current file. Keep comprehensive internal career records separate from public assets.
- `npm run build`, `npm run lint` and `npx tsc --noEmit` are the local checks. Review desktop, tablet, mobile and short-height layouts before publishing.

## Studio

`/studio` is gated by HTTP Basic Auth in `proxy.ts`. Set `STUDIO_USERNAME` + `STUDIO_PASSWORD` in `.env.local` (or Vercel project env) to unlock; without them the gate stays closed.

## Hero variant

The hero right column renders one of two variants chosen randomly per visit:
- **globe**. Canvas Fibonacci dot sphere with arc paths between APAC + global cities
- **terminal**. Auto-typing mock shell session (`whoami`, `cat about.md`, `ls projects/`, `echo $EMAIL`)

A small `swap` pill at the top-right of the stage flips to the other variant in place. Refresh re-randomizes.

## Deploy

1. Push to GitHub.
2. Import in Vercel.
3. Set env vars (`NEXT_PUBLIC_SANITY_*`, `STUDIO_USERNAME`, `STUDIO_PASSWORD`) in the Vercel project settings.
4. Add custom domain in Vercel → set DNS to point at Vercel.

## License

All content (text, images, project case studies) © Lwin MMT. Code is yours to learn from; please don't ship a verbatim clone as your own portfolio.
