# Blue-IQ marketing site

The public site for Blue-IQ: Capture, Spend and Govern, all powered by **Sonar**, our document AI.

- **Stack:** Next.js 16 (App Router, static export of every route), React 19, Tailwind CSS 4, Framer Motion.
- **Design system:** [`DESIGN.md`](./DESIGN.md). Read the "2026-09 redesign" block first.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, type-checked
npm start        # serve the production build
```

## Structure

```
src/
  app/                    routes; each page.tsx owns its metadata + breadcrumb JSON-LD
    layout.tsx            fonts, site-wide metadata, Organization/WebSite JSON-LD
    page.tsx              home (+ FAQPage JSON-LD)
    loading.tsx           layout skeleton shown during navigation
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    SiteNav.tsx           centred nav, illustrated mega menus, mobile sheet
    SiteFooter.tsx        sitemap footer (+ CtaBand)
    CtaBand.tsx           closing call to action with email hand-off to /contact
    page/kit.tsx          PageHero + HeroButton shared by every inner page
    saas/                 home page sections (Hero, SonarEngine, Suite, Pipeline, ...)
    art/                  illustrations: iso.tsx kit, product/step drawings, SonarField canvas
    icons/BqIcons.tsx     the custom icon set
    ui/accordion.tsx      restyled shadcn/Radix accordion
  lib/
    theme.ts              colour tokens (SA)
    seo.ts                pageMetadata() and breadcrumbLd() helpers
```

## Conventions

- Colours come from `SA` in `lib/theme.ts`; never hard-code a new hex in a component.
- Icons come from `BqIcons.tsx`; illustrations are built from `art/iso.tsx`. No stock photos, no UI mock-ups.
- Animate `transform` and `opacity` only, and give every loop a `prefers-reduced-motion` fallback.
- Copy states only what the company already claims: no invented customers, logos or metrics.
- New pages: add the route to `app/sitemap.ts` and build metadata with `pageMetadata()` from `lib/seo.ts`.
