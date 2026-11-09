/* ────────────────────────────────────────────────────────────────
   Blue-IQ colour tokens — the single source for every colour in the UI.
   See DESIGN.md for when each one may be used.
   ──────────────────────────────────────────────────────────────── */

/* SA: the inner pages' tokens, moved onto the blueprint palette (2026-11) so
   every page shares the home page's canvas, ink and cobalt. */
export const SA = {
  bg: "#F3F4F6", // page canvas (blueprint, 2026-11)
  bg2: "#ECEEF2", // quiet band
  bg3: "#E7EAF0", // wells, tracks
  surface: "#FFFFFF", // cards
  line: "#D9DCE2", // card edges, hairlines
  line2: "#C6CAD3", // stronger dividers
  ink: "#0E1116", // primary text
  sub: "#565C68", // body (AA on canvas and white)
  faint: "#565C68", // meta (kept AA: same as body)
  accent: "#1F4FE6", // cobalt: links, highlighted words
  accent2: "#3D6BFF", // lighter cobalt
  accentSoft: "#E7EAF0", // accent tint surface
  cyan: "#AFC3FF", // illustration only
  navy: "#0E1116", // the dark panels
  navy2: "#181C24", // raised dark surface
  amber: "#B45309", // functional: needs review
  green: "#047857", // functional: ok
  red: "#B91C1C", // functional: risk
} as const;

/* 2026-11 "blueprint" — the home page, nav and footer (after the
   Oberon / Arche references): a cool off-white canvas with visible
   structure (column guides, hairlines), rounded cards, ink for type and
   buttons, and one electric accent, cobalt, used for about 10% of the
   surface (the Sonar field, the flow, active states).
   Amber is functional only: a value Sonar flagged for a person. */
export const BB = {
  canvas: "#F3F4F6", // 60%: the page
  panel: "#FFFFFF", // 30%: raised cells, cards
  ink: "#0E1116", // type, primary buttons, the dark block
  ink2: "#2E333D", // strong body
  ink3: "#565C68", // body and meta (AA on canvas and panel)
  line: "#D9DCE2", // hairlines, cell borders
  guide: "#C6CAD3", // dashed column guides
  cobalt: "#1F4FE6", // 10%: the accent
  cobaltDeep: "#1638B8", // hover / pressed
  sky: "#AFC3FF", // accent on ink
  skyText: "#DCE6FF", // body on cobalt
  navy: "#0E1116", // alias kept for components that say navy
  navy2: "#181C24", // raised surface on ink
  mist: "#F3F4F6", // alias of canvas
  mist2: "#E7EAF0", // wells
  edge: "#D9DCE2", // alias of line
  amber: "#F5B544", // flagged for review
  amberInk: "#8A5A00", // flagged, as text on light
} as const;
