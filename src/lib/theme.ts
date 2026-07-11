/* shared Blue-IQ palette + elevation tokens - warm cream canvas, deep-blue brand */
export const C = {
  bg: "#F6F4EF",      // warm cream canvas (TinyFish-style)
  surface: "#FFFFFF", // crisp white cards on cream
  ink: "#1A1815",     // warm near-black
  sub: "#605B53",     // warm body gray
  faint: "#726D5E",   // warm faint / labels
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
   Added, not substituted - existing C tokens keep every other page intact.
   ──────────────────────────────────────────────────────────────── */
export const B = {
  paper: "#EDE9DF",     // bone-white base
  paper2: "#E5E0D3",    // deeper bone - zebra / inset panels
  ink: "#14130F",       // warm near-black (never pure #000)
  ink2: "#3B382F",      // secondary ink
  sub: "#5B564B",       // body copy
  faint: "#726D5E",     // mono labels / coordinates
  hair: "rgba(20,19,15,0.16)",   // structural hairline rule
  hairSoft: "rgba(20,19,15,0.08)",
  accent: "#002181",    // the single aggressive accent - brand deep blue
  accentLift: "#2C49D6",// lighter blue, on-dark only (still one hue family)
  onInkSub: "rgba(237,233,223,0.60)", // muted text on the near-black block
  onInkFaint: "rgba(237,233,223,0.38)",
} as const;

/* flat, offset "hard" shadow for brutalist elevation - no blur glow */
export const HARD = "6px 6px 0 rgba(20,19,15,0.14)";
export const HARD_ACCENT = "6px 6px 0 rgba(0,33,129,0.22)";

/* ────────────────────────────────────────────────────────────────
   Clean SaaS palette (Affinda/Grafana-style) - white base, deep-blue
   accent, soft elevation, one dark navy anchor. Used by homepage + shell.
   ──────────────────────────────────────────────────────────────── */
/* Modern SaaS system on a warm cream canvas with a single deep-blue brand
   accent. Every existing page inherits this via the shared UI tokens.
   Semantics preserved: blue = brand accent, blue2 = link/lighter accent,
   code/ink2 = warm near-black. */
export const UI = {
  bg: "oklch(96.7% 0.005 95.1)",   // soft warm off-white canvas
  bg2: "oklch(93.6% 0.006 95.1)",  // slightly deeper warm band
  surface: "#FFFFFF",  // crisp white cards
  soft: "#E8EBF7",     // blue-tint panel
  ink: "#1A1712",      // warm near-black text (never pure #000)
  sub: "#5D574B",      // warm muted body
  faint: "#726D5E",    // warm labels / muted
  line: "#E7DFCE",     // warm hairline
  line2: "#D9D0BB",    // warm border
  blue: "#002181",     // deep brand blue accent
  blue2: "#2C49D6",    // links / lighter accent
  blue3: "#7C8FFF",    // light accent on dark
  amber: "#B07A08",    // functional warning only
  green: "#1F7A54",    // functional ok only
  code: "#161410",     // dark code / product panel
} as const;

/* warm near-black anchor for dark feature blocks + footer */
export const DEEP = "linear-gradient(165deg, #221E16 0%, #17140E 60%, #14120D 100%)";

/* ────────────────────────────────────────────────────────────────
   MAZE-STYLE SYSTEM - faithful clone of maze.co's design theory.
   White canvas + light lavender-gray sections, warm near-black ink,
   one electric-blue accent, near-black primary buttons, very rounded
   cards, soft diffuse shadows, and pastel-tinted feature tiles.
   ──────────────────────────────────────────────────────────────── */
export const MZ = {
  bg: "oklch(96.7% 0.005 95.1)",   // soft warm off-white canvas
  bg2: "oklch(93.6% 0.006 95.1)",  // slightly deeper warm section
  bg3: "oklch(91% 0.007 95.1)",    // deeper inset
  surface: "#FFFFFF",   // crisp white cards
  soft: "#E8EBF7",      // blue-tint panel
  ink: "#1A1712",       // warm near-black text
  ink2: "#14120D",      // warm near-black - dark sections
  sub: "#5D574B",       // warm muted body
  faint: "#726D5E",     // labels / faint
  line: "#E7DFCE",      // warm hairline
  line2: "#D9D0BB",     // warm border
  accent: "#002181",    // deep brand blue - the single accent
  accent2: "#2C49D6",   // lighter accent (links/hover)
  accentSoft: "#7C8FFF",// light accent on dark
  code: "#161410",      // dark code / product panel
} as const;

/* ────────────────────────────────────────────────────────────────
   SA - the landing-page system. Cool neutral canvas, near-invisible
   borders, almost no shadow, one deep-blue brand accent. Weight and
   spacing carry the hierarchy, not colour.
   ──────────────────────────────────────────────────────────────── */
export const SA = {
  bg: "#FFFFFF",       // canvas
  bg2: "#FAFAFA",      // alternating section
  bg3: "#F4F4F5",      // card preview wells / inset
  surface: "#FFFFFF",  // cards
  line: "#E9E9EC",     // hairline
  line2: "#DEDEE3",    // border / hover border
  ink: "#0B0B0F",      // near-black (never #000)
  sub: "#52525B",      // body
  faint: "#A1A1AA",    // meta / mono labels
  accent: "#002181",   // brand deep blue - the single accent
  accent2: "#2C49D6",  // hover / links
  accentSoft: "#EFF1FB", // accent tint surface
  amber: "#B07A08",    // functional: needs review
  green: "#1F7A54",    // functional: ok
  red: "#C0492E",      // functional: risk
} as const;

/* barely-there elevation - a border does most of the work */
export const SA_SHADOW = "0 1px 2px rgba(11,11,15,0.04)";
export const SA_SHADOW_HOVER = "0 1px 2px rgba(11,11,15,0.04), 0 12px 28px -12px rgba(11,11,15,0.14)";

/* ────────────────────────────────────────────────────────────────
   DK - the dark surfaces: the hero and the closing CTA.
   The brand blue (#002181) is invisible on near-black, so on dark we
   lift it to the same hue at a usable luminance. Same family, readable.
   ──────────────────────────────────────────────────────────────── */
export const DK = {
  bg: "#07080B",        // near-black canvas (never #000)
  bg2: "#0C0E14",       // raised surface
  panel: "rgba(255,255,255,0.045)",       // glass fill
  panelSolid: "#101319",                  // opaque panel where glass would smear
  border: "rgba(255,255,255,0.09)",       // glass hairline
  borderLift: "rgba(255,255,255,0.16)",   // hover / emphasis
  ink: "#FFFFFF",
  sub: "rgba(255,255,255,0.60)",
  faint: "rgba(255,255,255,0.36)",
  accent: "#5B7CFF",    // brand blue, lifted for dark
  accentDim: "#2C49D6",
  accentSoft: "rgba(91,124,255,0.14)",
  green: "#3DDC97",
  amber: "#F5B544",
  red: "#FF6B5A",
} as const;

/* the inner-edge highlight that makes glass read as a physical surface */
export const GLASS_EDGE = "inset 0 1px 0 rgba(255,255,255,0.08)";

/* Maze's colorful pastel feature tiles - each card a different tint */
export const MZ_TINTS = [
  { bg: "#ECEBFF", ink: "#3D3BF5" }, // lilac / accent
  { bg: "#E3F6EC", ink: "#0E8A57" }, // mint
  { bg: "#FFEBE2", ink: "#DE522C" }, // coral
  { bg: "#FFF3D4", ink: "#B07A08" }, // butter
  { bg: "#E4EEFF", ink: "#2C57DE" }, // sky
  { bg: "#FCE7F4", ink: "#C13A86" }, // blush
] as const;

/* Maze soft, wide-diffusion elevation (no tight drop shadow) */
export const MZ_SHADOW = "0 2px 4px rgba(20,18,32,0.03), 0 24px 56px -28px rgba(20,18,32,0.16)";
export const MZ_SHADOW_LG = "0 2px 6px rgba(20,18,32,0.04), 0 48px 90px -40px rgba(61,59,245,0.22)";

/* soft, cool-tinted elevations (Affinda-style) */
export const CARD = "0 1px 2px rgba(18,20,26,0.04), 0 12px 30px -14px rgba(18,20,26,0.14)";
export const CARD_LG = "0 2px 4px rgba(18,20,26,0.05), 0 34px 60px -28px rgba(0,33,129,0.24), 0 12px 30px -18px rgba(18,20,26,0.14)";
