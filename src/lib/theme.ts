/* ────────────────────────────────────────────────────────────────
   Blue-IQ colour tokens — the single source for every colour in the UI.
   See DESIGN.md for when each one may be used.
   ──────────────────────────────────────────────────────────────── */

/* 2026-09 redesign: the neutrals are cool slate tinted toward the brand hue,
   and the accent is lifted from the logo itself (#297AFF), darkened just
   enough to pass AA as text on white. Ink is a deep navy, not black — it is
   the "serious" colour the dark panels are built from. */
export const SA = {
  bg: "#FFFFFF",       // canvas
  bg2: "#F6F8FC",      // alternating section (cool)
  bg3: "#EEF2F9",      // card preview wells / inset
  surface: "#FFFFFF",  // cards
  line: "#E6EAF2",     // hairline
  line2: "#D6DDEA",    // border / hover border
  ink: "#0A1230",      // deep navy ink (never #000)
  sub: "#4B5570",      // body
  faint: "#667089",    // meta / mono labels (AA on white)
  accent: "#1D5BF0",   // brand blue - the single accent (logo #297AFF, AA-safe)
  accent2: "#297AFF",  // logo blue: hover, illustration
  accentSoft: "#EDF3FF", // accent tint surface
  cyan: "#34C2FF",     // logo cyan: illustration only, never text
  navy: "#08102B",     // dark panels
  navy2: "#0E1A40",    // raised dark surface
  amber: "#B07A08",    // functional: needs review
  green: "#1F7A54",    // functional: ok
  red: "#C0492E",      // functional: risk
} as const;

export type Tokens = typeof SA;
