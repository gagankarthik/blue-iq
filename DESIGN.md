# Blue-IQ — Brand Kit & Design System

The single source of truth for how Blue-IQ looks, reads, and moves.
If the code and this document disagree, **this document wins** — fix the code.

---

## 1. Brand

**Blue-IQ is the parent platform, not a product.** The site is the standpoint for
*everything* we build: ParsingLab and Govern today, custom builds, and whatever
ships next. **Sonar** is the engine underneath all of them.

This has a hard design consequence: **no page-level surface may be built around a
single product.** Product specifics live *inside* that product's own card or page.
Top-level copy and imagery speak for the platform, and the product list must always
feel open-ended, so a fourth product slots in without a redesign.

### The one idea worth designing around

Sonar reads a document **and scores its own confidence.** When it is unsure, it
**flags the field instead of guessing.**

That is the trust argument, and it is the only thing on this site a competitor
cannot copy by rewording a headline.

> **Rule:** every product visual must *show* a confidence score, and ideally show
> one low-confidence field flagged for review. Never assert "accurate AI" in prose.
> Show the machine admitting doubt.

### Personality

| We are | We are not |
| --- | --- |
| Precise, technical, calm | Playful, cute, exclamatory |
| Confident enough to show doubt | Boastful, absolute |
| Enterprise-credible | Startup-scrappy |
| Dense with real detail | Decorative, filler-driven |

### Voice

- Concrete verbs. No *elevate*, *seamless*, *unleash*, *next-gen*, *revolutionize*.
- Numbers are monospace, always. **Never invent one.** Reuse only claims the
  company already makes: 200 docs/call, sub-second median read, SOC 2 / HIPAA / GDPR.
- Sentence case in UI. Headline Case nowhere.

---

## 2. Principles

1. **Contrast before decoration.** A page that holds one value from top to bottom
   is a dead page, however good the type is. Depth comes from value, not from
   drop shadows.
2. **Show the product, don't describe it.** The hero anchor is a working console —
   never an abstract orb, never an empty search field.
3. **One accent.** Brand blue. Amber and green are *functional only*: amber means a
   human is needed, green means a run completed. Green used decoratively is a bug.
4. **Rhythm, not repetition.** No two consecutive sections may share the same header
   alignment *and* the same grid.
5. **Motion is state, not garnish.** Every animation must communicate something
   happening — a read, a score, a ranking. Motion that means nothing gets cut.

---

## 3. Colour

Two scales, both in `src/lib/theme.ts`: **`SA`** (light) and **`DK`** (dark).

> **Legacy:** `C`, `B`, `UI`, and `MZ` in `theme.ts` are **deprecated** — they belong
> to earlier directions and are still referenced by `/about`, `/products`,
> `/solutions`, and the shared nav/footer. Do not use them in new work. Migrate a
> page to `SA`/`DK` when you next touch it.

### Light — `SA`

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#FFFFFF` | Canvas |
| `bg2` | `#FAFAFA` | Alternating section band |
| `bg3` | `#F4F4F5` | Card preview wells, inset surfaces |
| `surface` | `#FFFFFF` | Cards |
| `line` | `#E9E9EC` | Hairline, default card border |
| `line2` | `#DEDEE3` | Emphasis border, hover |
| `ink` | `#0B0B0F` | Primary text (never `#000`) |
| `sub` | `#52525B` | Body text |
| `faint` | `#A1A1AA` | Meta, mono labels |
| `accent` | `#002181` | Brand blue — the one accent |
| `accent2` | `#2C49D6` | Link / hover |
| `accentSoft` | `#EFF1FB` | Accent tint surface |

### Dark — `DK`

Brand blue `#002181` is invisible on near-black. On dark we lift the **same hue** to
a usable luminance. This is not a second brand colour.

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#07080B` | Dark canvas (never `#000`) |
| `bg2` | `#0C0E14` | Raised dark surface |
| `panel` | `rgba(255,255,255,0.045)` | Glass fill |
| `border` | `rgba(255,255,255,0.09)` | Glass hairline |
| `borderLift` | `rgba(255,255,255,0.16)` | Hover / emphasis |
| `ink` | `#FFFFFF` | Primary text |
| `sub` | `rgba(255,255,255,0.60)` | Body |
| `faint` | `rgba(255,255,255,0.36)` | Meta |
| `accent` | `#5B7CFF` | Brand blue, lifted for dark |
| `accentSoft` | `rgba(91,124,255,0.14)` | Accent tint |

### Functional only — never decorative

| Meaning | Light | Dark |
| --- | --- | --- |
| **Low confidence — needs a human** | `#B07A08` | `#F5B544` |
| **Run complete / healthy** | `#1F7A54` | `#3DDC97` |
| **High-risk clause** | `#C0492E` | `#FF6B5A` |

### Banned

Purple/violet "AI" gradients · pure `#000000` · neon outer glows on buttons ·
gradient-filled display text · green as a decorative colour.

---

## 4. Typography

Two families. **No serif anywhere.** An italic-serif accent word was tried in every
headline and rejected — it fought the grotesque and made the page read as templated.

| Role | Family | Class |
| --- | --- | --- |
| Display + UI | Space Grotesk (behind the `Phonic` name) | `.font-display`, `.font-sans-g` |
| Numbers, labels, code, metadata | Geist Mono | `.font-mono-g` |

### Scale

| Level | Size | Weight | Tracking |
| --- | --- | --- | --- |
| Hero `h1` | `clamp(2.4rem, 4.2vw, 3.6rem)` | 500 | `-0.04em` |
| Section `h2` | `clamp(1.9rem, 3.4vw, 2.75rem)` | 500 | `-0.035em` |
| Card `h3` | `1.3rem` | 400–500 | `-0.02em` |
| Body | `1.02–1.06rem` / `1.65` | 400 | — |
| Card body | `13–14.5px` | 400 | — |
| Eyebrow / meta | `10–11px` mono, uppercase | 500–600 | `0.18–0.2em` |

### Rules

- Headlines are **medium weight and tight**, never thin-and-huge. Hierarchy comes
  from weight and colour, not from scale alone.
- Constrain a headline's measure **on the heading itself**, in `px` or `ch`.
  `ch` on a *parent* resolves against the parent's 16px — not the 60px headline —
  and will silently crush the column to ~290px. **This bug shipped once.**
- Body measure 46–62 characters. Never centre a paragraph longer than two lines.
- Every numeral: `.font-mono-g` + `tabular-nums`.

---

## 5. Layout & space

- Container `max-w-[1240px]` (hero) or `max-w-[1180px]` (body), `px-5 sm:px-8`.
- Section padding `py-20 sm:py-28`. Card grid `gap-5`. Header columns `gap-x-16`.
- Radii: `10px` inputs/mocks · `12px` cards · `16px` console/glass · `24px` CTA slab ·
  pills `rounded-full`.

### Section header — two arrangements only

`SectionHead` in `src/components/saas/parts.tsx`.

- **`split`** *(default)* — eyebrow + headline left, standfirst in the opposite
  column, bottom-aligned. The workhorse.
- **`center`** — reserved for **one** section per page. Currently *How it works*.

> Six centred headers in a row is precisely what made an earlier build read as a
> template. Alternate deliberately.

### Elevation

The border does the work; the shadow only lifts.

```
rest    1px border(line)     + 0 1px 2px rgba(11,11,15,0.04)
hover   1px border(line2)    + 0 22px 44px -20px rgba(11,11,15,0.18)
glass   1px border(white 9%) + inset 0 1px 0 rgba(255,255,255,0.08)
                             + 0 40px 100px -30px rgba(0,0,0,0.75)
```

---

## 6. Motion

Defined in `src/components/saas/motion.tsx`. **Spring physics only — no linear
easing on anything a user can see.**

| Token | Spec | Use |
| --- | --- | --- |
| `SPRING` | stiffness 120, damping 20, mass 0.8 | Default UI transitions |
| `SPRING_SOFT` | stiffness 80, damping 20, mass 1 | Section reveals, large moves |
| `SPRING_POP` | stiffness 380, damping 16, mass 0.6 | Badges landing — deliberate overshoot |

### Rules

1. **Transform, opacity, colour only.** Never animate `width`, `height`, `top`, `left`.
   Bars fill with `scaleX` + `origin-left`. A sweep is one `translateY` of the
   element's own height.
2. **Gate every perpetual loop on `useInView`.** Always-on loops that ignore
   visibility are how a landing page drops frames.
3. **Isolate and memoise.** A looping component is its own `memo()` leaf, so it never
   re-renders the layout around it.
4. **Never animate to an empty state.** A card that resets its data to `0.00` every
   cycle looks *broken*, not alive. Fill once, hold, and find the life elsewhere — a
   pulse, a flag, a re-sort. **This shipped as a bug.**
5. **`prefers-reduced-motion` gets the finished frame**, never a blank one.
6. Headlines assemble word-by-word (`Words`, blur → sharp on a spring). `h1`/`h2`
   only — never body copy.

### Vocabulary — each effect means one thing

| Effect | Where | Meaning |
| --- | --- | --- |
| Scanline sweep | Console | A document being read |
| Bar fill + count-up | Confidence | The engine scoring itself |
| Amber flag pop | Confidence, Console | Sonar admitting doubt |
| Layout re-sort | Clause card | Risk being ranked |
| Sequential tick | Pipeline card | A run completing |
| Spotlight + tilt | All cards | Physical response to the pointer |

---

## 7. Components

**Buttons** — `rounded-full`, `px-6 py-3`, `text-[15px] font-semibold`,
`active:scale-[0.97]`. Primary on light = `ink` fill; on dark = white fill.
Secondary = transparent + 1px border. Primary CTAs are magnetic.

**Cards** — `rounded-xl`, 1px `line`, white. A preview well (`bg3`, bottom border)
on top; beneath it a meta row: title + mono tag + one-line blurb + arrow.
Hover lifts `-6px`, border → `line2`, spotlight tracks the cursor.

**Chips / filters** — `rounded-full`, `px-4 py-2`. The active pill is a **single
shared `layoutId` element** that slides between options.

**Badges** — mono, uppercase, `9–10px`, `tracking-[0.12em]`, background tinted to
~12–16% of the semantic colour.

**The Console** (`Console.tsx`) — the hero anchor and the most important object on
the site. Glass window: chrome bar with filename, product rail, the page under a
scanline, and an extraction panel filling field by field with a score on each. The
signatory returns at `0.58` and is flagged. **Never ship a hero without a working
artefact like this.**

---

## 8. Landing page layout

```
┌─────────────────────────────────────────────────────┐
│  DARK    nav transparent → white on scroll          │
│          badge · h1 (left) · sub · CTAs · proof row │
│          ▸ Console, leaning back in perspective     │
│          ▸ two Spotlight rakes + masked grid        │
├─────────────────────────────────────────────────────┤
│  LIGHT   The suite — split header                   │
│          BENTO: 2-wide ParsingLab | Govern          │
│                 Confidence | Throughput | Stack     │
│                 Custom builds (full width)          │
│          previews sit ON the tile. One border.      │
├─────────────────────────────────────────────────────┤
│  BAND    How it works — centred (the one centre)    │
│          vertical steps threaded by a TRACING BEAM  │
├─────────────────────────────────────────────────────┤
│  LIGHT   Where it works — STICKY SCROLL             │
│          copy scrolls, the extraction panel pins    │
│          and swaps per industry                     │
├─────────────────────────────────────────────────────┤
│  BAND    Trust — split header, 6 controls           │
├─────────────────────────────────────────────────────┤
│  BAND    FAQ — shadcn Accordion (restyled)          │
├─────────────────────────────────────────────────────┤
│  DARK    CTA slab — bookends the hero               │
└─────────────────────────────────────────────────────┘
```

Value alternates **dark → light → band → light → band → dark**. That alternation
*is* the layout. Do not flatten it.

**Hero is asymmetric, never centred.** A container-scroll hero (text centred, the
console revealed below the fold) was tried and reverted: it hid the single most
persuasive object on the site until the user scrolled, and a centred hero over an
empty canvas is itself a listed AI tell (§10).

### Library policy

- **shadcn/ui** = the primitive layer. Accessible, owned, restyled to these tokens.
  Never ship it in its default state (the stock accordion arrives with
  `hover:underline` and generic sizing — both were removed).
- **Aceternity-style effects** = borrowed only where they carry meaning. See the
  earned/rejected table in §10. `src/components/saas/effects.tsx` holds the three
  that survived: `Spotlight`, `TracingBeam`, `GlowBorder`. If an effect stops
  carrying meaning, delete it rather than leave it lying around.

---

## 9. Anti-patterns — every one of these shipped and was rejected

| Don't | Why |
| --- | --- |
| An all-white page, top to bottom | No contrast, nothing to look at. "A white void." |
| Six identical centred headers | Reads as a template, not a design. |
| Italic serif accent in every headline | Fights the grotesque; looks pasted on. |
| A hero built around an empty search bar | The best pixels on the site, wasted. |
| Cards whose data resets to `0.00` | Looks broken — because it is. |
| `max-w-[36ch]` on a headline's *parent* | Resolves to ~290px; crushed the `h1` to five lines. |
| Abstract globes / orbs as the hero visual | Says nothing. Show the console. |
| Product-specific hero copy | Blue-IQ is the platform, not one product. |

---

## 10. The AI-slop blacklist

Research on AI-generated landing pages (Developers Digest's study of 1,590 Show HN
pages; 925 Studios; Impeccable) names the patterns that mark a page as machine-made.
**Every one of these is banned here.** Several of them shipped on this site and were
rejected — they are marked ✗.

| Tell | Status |
| --- | --- |
| **Oversized italic serif hero headline** — "the universal AI-startup hero" | ✗ shipped, rejected. Removed. |
| **Cards inside cards inside cards** — the single most recognisable tell | ✗ shipped (card → well → mock card). Flatten to *one* border. |
| **Purple→blue gradients** — "omnipresent to the point of meaninglessness" | Banned. Blue is our brand hue; use it as *light*, never as paint. |
| Thick coloured border on one side of a rounded card | Banned. |
| **Inter** + system fallback, no other type choice | N/A — Space Grotesk + Geist Mono. |
| Averaged headlines: "Build the future of work", "Your all-in-one platform" | Banned. Say what the engine actually does. |
| Emoji as iconography | Banned. Lucide only. |
| Three equal feature cards in a row | Banned. Use a bento with real size hierarchy. |
| Generic centred hero on an empty canvas | Banned. Anchor it with the Console. |
| Fake logo walls, invented testimonials, invented metrics | Banned. We have no customer logos — do not fabricate any. |

### The antidote

> *An ugly page with a clear point of view beats a generic page with no point of view.*

**Our point of view: Sonar scores its own confidence and flags what it cannot read
instead of guessing.** Every visual decision serves that. If an effect does not serve
it, cut the effect.

### Borrowed effects — earned, not decorative

Aceternity-style effects are used **only** where they carry meaning:

| Effect | Where | The meaning it carries |
| --- | --- | --- |
| Spotlight beams | Dark hero | Light falling on a page — the engine reading |
| Container scroll | Hero console | The product rotating into focus |
| Glowing border | Bento tiles | Cursor proximity, not a rainbow |
| Tracing beam | How it works | A document travelling the pipeline |
| Sticky scroll reveal | Industries | One engine, the material changing |
| Encrypted-text reveal | Security | Data actually being encrypted |

**Explicitly rejected** (decoration with no meaning): globes, world maps, meteors,
sparkles, shooting stars, vortex/wavy backgrounds, infinite testimonial marquees.

---

## 11. Verify before you claim

This design was rejected twice for reasons **plainly visible in a screenshot** and
invisible in the code.

**Render the page and look at it before saying it is done.**

```bash
npm run dev
node scripts/shot.mjs ./shots http://localhost:3000/
```

Check the hero at 1440px, every scroll position, and mobile at 390px. Look for:
empty states caught mid-loop, crushed measures, colour drifting off-system, and any
section that repeats the one above it.
