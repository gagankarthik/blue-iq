/* ────────────────────────────────────────────────────────────────
   Blue-IQ colour tokens — the single source for every colour in the UI.
   See DESIGN.md for when each one may be used.
   ──────────────────────────────────────────────────────────────── */

/* 2026-09 redesign: the neutrals are cool slate tinted toward the brand hue,
   and the accent is lifted from the logo itself (#3B82F6), darkened just
   enough to pass AA as text on white. Ink is a deep navy, not black — it is
   the "serious" colour the dark panels are built from. */
export const SA = {
  bg: "#FAFAFA", // page canvas (soft off-white)
  bg2: "#F3F3F5", // quiet band
  bg3: "#EEEEF1", // wells, tracks
  surface: "#FFFFFF", // cards
  line: "#ECECEF", // card edges, hairlines
  line2: "#DEDEE3", // stronger dividers
  ink: "#1F1F1F", // primary text (neutral near-black)
  sub: "#55565E", // body (7:1 on white)
  faint: "#6B6C75", // meta (5.2:1 on white)
  accent: "#2F5FE0", // brand blue for links and highlighted words (5.3:1)
  accent2: "#5B8CFF", // lighter brand blue: illustration
  accentSoft: "#EEF3FF", // accent tint
  cyan: "#34C2FF", // logo cyan: illustration only
  navy: "#1E2130", // the dark pill and dark cards
  navy2: "#2A2E42", // raised dark surface
  amber: "#B45309", // functional: needs review
  green: "#047857", // functional: ok
  red: "#B91C1C", // functional: risk
} as const;

export type Tokens = typeof SA;
