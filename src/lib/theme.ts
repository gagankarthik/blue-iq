/* shared Blue-IQ palette + elevation tokens — warm cream canvas, deep-blue brand */
export const C = {
  bg: "#F6F4EF",      // warm cream canvas (TinyFish-style)
  surface: "#FFFFFF", // crisp white cards on cream
  ink: "#1A1815",     // warm near-black
  sub: "#605B53",     // warm body gray
  faint: "#9A948A",   // warm faint / labels
  line: "#ECE7DF",    // warm hairline
  line2: "#DED8CE",   // warm border
  blue: "#002181",    // brand primary
  blue2: "#2C49D6",   // brand secondary / links
  blueSoft: "#ECEEFB",// blue tint surface
  green: "#0E9F6E",
  amber: "#E0A015",
  red: "#E0533D",
} as const;

export const SHADOW = "0 1px 2px rgba(14,17,22,0.04), 0 18px 44px -20px rgba(14,17,22,0.18)";
export const SHADOW_SM = "0 1px 2px rgba(14,17,22,0.05), 0 8px 24px -14px rgba(14,17,22,0.16)";
/* deep, brand-tinted elevation for the hero product panel */
export const SHADOW_LG = "0 2px 4px rgba(14,17,22,0.04), 0 40px 80px -32px rgba(0,33,129,0.28), 0 16px 40px -24px rgba(14,17,22,0.18)";

/* ────────────────────────────────────────────────────────────────
   Brutalist reinvention palette (homepage + shared nav/footer).
   Monochrome bone/near-black base with a single deep-blue accent.
   Added, not substituted — existing C tokens keep every other page intact.
   ──────────────────────────────────────────────────────────────── */
export const B = {
  paper: "#EDE9DF",     // bone-white base
  paper2: "#E5E0D3",    // deeper bone — zebra / inset panels
  ink: "#14130F",       // warm near-black (never pure #000)
  ink2: "#3B382F",      // secondary ink
  sub: "#5B564B",       // body copy
  faint: "#8E887A",     // mono labels / coordinates
  hair: "rgba(20,19,15,0.16)",   // structural hairline rule
  hairSoft: "rgba(20,19,15,0.08)",
  accent: "#002181",    // the single aggressive accent — brand deep blue
  accentLift: "#2C49D6",// lighter blue, on-dark only (still one hue family)
  onInkSub: "rgba(237,233,223,0.60)", // muted text on the near-black block
  onInkFaint: "rgba(237,233,223,0.38)",
} as const;

/* flat, offset "hard" shadow for brutalist elevation — no blur glow */
export const HARD = "6px 6px 0 rgba(20,19,15,0.14)";
export const HARD_ACCENT = "6px 6px 0 rgba(0,33,129,0.22)";

/* ────────────────────────────────────────────────────────────────
   Clean SaaS palette (Affinda/Grafana-style) — white base, deep-blue
   accent, soft elevation, one dark navy anchor. Used by homepage + shell.
   ──────────────────────────────────────────────────────────────── */
export const UI = {
  bg: "#F6F8FC",       // very light cool canvas
  bg2: "#EFF3FA",      // alt section band
  surface: "#FFFFFF",  // cards
  soft: "#EEF1FC",     // blue-tint panel
  ink: "#12141A",      // near-black text (never pure #000)
  sub: "#565D6B",      // cool body gray
  faint: "#8A93A3",    // labels / muted
  line: "#E7EAF1",     // hairline
  line2: "#D9DEE9",    // border
  blue: "#002181",     // brand primary accent
  blue2: "#2C49D6",    // links / secondary
  blue3: "#6E8BFF",    // light accent on dark
  amber: "#D98A15",    // functional warning only
  green: "#16A06B",    // functional ok only
  code: "#0B1020",     // dark code / product panel
} as const;

/* deep navy anchor for hero mockups' chrome + CTA band */
export const DEEP = "linear-gradient(165deg, #001A6B 0%, #002181 55%, #16337F 100%)";

/* soft, cool-tinted elevations (Affinda-style) */
export const CARD = "0 1px 2px rgba(18,20,26,0.04), 0 12px 30px -14px rgba(18,20,26,0.14)";
export const CARD_LG = "0 2px 4px rgba(18,20,26,0.05), 0 34px 60px -28px rgba(0,33,129,0.24), 0 12px 30px -18px rgba(18,20,26,0.14)";
