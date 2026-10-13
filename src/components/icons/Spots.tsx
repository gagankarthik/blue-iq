/* ────────────────────────────────────────────────────────────────
   Spot illustrations — the larger, coloured companions to the line icons.

   Flat and front-on (never isometric), drawn on a 64px grid in the brand
   palette: white paper with an indigo outline, solid brand blue for the
   thing that matters, periwinkle and cyan for support, green and amber
   only where they mean "accepted" and "review". Render at 40–96px.
   ──────────────────────────────────────────────────────────────── */

const I = "#1F2A6B"; // outline
const B = "#2F5FE0"; // brand blue
const B2 = "#7D9DFF"; // periwinkle
const L = "#DCE5FF"; // light plane
const S = "#EEF3FF"; // softest plane
const C = "#34C2FF"; // cyan
const G = "#1F9D6B"; // accepted
const A = "#F2A33A"; // review
const W = "#FFFFFF";

type P = { size?: number; className?: string; title?: string };
export type Spot = (p: P) => React.ReactElement;

function Frame({ size = 56, className, title, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {children}
    </svg>
  );
}

const Check = ({ x, y }: { x: number; y: number }) => <path d={`M${x - 4.5} ${y} l3 3 6-6.5`} stroke={W} strokeWidth="2.5" />;

/* ── products ── */

export const SpotCapture: Spot = (p) => (
  <Frame {...p}>
    <rect x="20" y="10" width="24" height="36" rx="3" fill={L} />
    <path d="M14 14h18l8 8v28a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2Z" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M32 14v6a2 2 0 0 0 2 2h6" fill={S} stroke={I} strokeWidth="1.75" />
    <path d="M17 27h14M17 38h18M17 43h9" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <rect x="8" y="31" width="40" height="3.5" rx="1.75" fill={C} />
    <path d="M6 14v-4a2 2 0 0 1 2-2h4M42 8h4a2 2 0 0 1 2 2v4M6 52v4a2 2 0 0 0 2 2h4M48 52v4a2 2 0 0 1-2 2h-4" stroke={B} strokeWidth="2.5" />
  </Frame>
);

const receipt = "M14 8h26a2 2 0 0 1 2 2v42l-5-3.5-5 3.5-5-3.5-5 3.5-5-3.5-5 3.5V10a2 2 0 0 1 2-2Z";
export const SpotSpend: Spot = (p) => (
  <Frame {...p}>
    <path d={receipt} fill={L} transform="translate(5 3)" />
    <path d={receipt} fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M18 16h12M18 22h18M18 28h8" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <path d="M18 36h10M32 36h4" stroke={B} strokeWidth="2.5" />
    <circle cx="46" cy="45" r="11" fill={B} />
    <Check x={46} y={45} />
  </Frame>
);

export const SpotGovern: Spot = (p) => (
  <Frame {...p}>
    <rect x="9" y="8" width="28" height="38" rx="3" fill={L} />
    <rect x="15" y="12" width="28" height="38" rx="3" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M20 20h18M20 26h14M20 32h9" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <path d="M44 30l11 4v8c0 7-5 11.5-11 14-6-2.5-11-7-11-14v-8l11-4Z" fill={B} />
    <Check x={44} y={43} />
  </Frame>
);

export const SpotCustom: Spot = (p) => (
  <Frame {...p}>
    <rect x="8" y="8" width="21" height="21" rx="5" fill={L} />
    <rect x="35" y="8" width="21" height="21" rx="5" fill={B} />
    <rect x="8" y="35" width="21" height="21" rx="5" fill={C} />
    <rect x="35.9" y="35.9" width="19.2" height="19.2" rx="4.5" fill={W} stroke={I} strokeWidth="1.75" strokeDasharray="3 3.2" />
    <path d="M45.5 41v9M41 45.5h9" stroke={B} strokeWidth="2.5" />
  </Frame>
);

/* Sonar, drawn as a plain AI mark: one four-point sparkle and two small ones */
function spark(cx: number, cy: number, r: number) {
  const k = r * 0.14;
  const j = r * 0.32;
  return [
    `M${cx} ${cy - r}`,
    `C${cx + k} ${cy - j} ${cx + j} ${cy - k} ${cx + r} ${cy}`,
    `C${cx + j} ${cy + k} ${cx + k} ${cy + j} ${cx} ${cy + r}`,
    `C${cx - k} ${cy + j} ${cx - j} ${cy + k} ${cx - r} ${cy}`,
    `C${cx - j} ${cy - k} ${cx - k} ${cy - j} ${cx} ${cy - r}Z`,
  ].join("");
}
export const SpotSonar: Spot = (p) => (
  <Frame {...p}>
    <path d={spark(27, 35, 21)} fill={B} />
    <path d={spark(48, 15, 9)} fill={C} />
    <path d={spark(51, 46, 5.5)} fill={B2} />
  </Frame>
);

/* ── company ── */

export const SpotScale: Spot = (p) => (
  <Frame {...p}>
    <rect x="22" y="6" width="28" height="36" rx="3" fill={L} />
    <rect x="16" y="11" width="28" height="36" rx="3" fill={W} stroke={I} strokeOpacity=".45" strokeWidth="1.75" />
    <rect x="10" y="16" width="28" height="36" rx="3" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M15 25h16M15 31h12M15 37h16" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <rect x="32" y="40" width="26" height="18" rx="9" fill={B} />
    <path d="M45 53v-8M41 48.5l4-4 4 4" stroke={W} strokeWidth="2.5" />
  </Frame>
);

export const SpotSecure: Spot = (p) => (
  <Frame {...p}>
    <circle cx="32" cy="34" r="25" fill={S} />
    <path d="M22 29v-6a10 10 0 0 1 20 0v6" stroke={I} strokeWidth="3" />
    <rect x="15" y="28" width="34" height="25" rx="6" fill={B} />
    <circle cx="32" cy="38.5" r="3.5" fill={W} />
    <rect x="30.5" y="40" width="3" height="6.5" rx="1.5" fill={W} />
  </Frame>
);

export const SpotIntegrate: Spot = (p) => (
  <Frame {...p}>
    <rect x="5" y="18" width="22" height="28" rx="5" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M10 26h12M10 32h8M10 38h11" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <rect x="37" y="18" width="22" height="28" rx="5" fill={B} />
    <path d="M42 26h12M42 32h8M42 38h11" stroke={W} strokeOpacity=".75" strokeWidth="2" />
    <path d="M28 27h7M32.5 24l3 3-3 3" stroke={B} strokeWidth="2.25" />
    <path d="M36 37h-7M31.5 34l-3 3 3 3" stroke={C} strokeWidth="2.25" />
  </Frame>
);

export const SpotTeam: Spot = (p) => (
  <Frame {...p}>
    <circle cx="32" cy="34" r="26" fill={S} />
    <circle cx="23" cy="24" r="7.5" fill={B2} />
    <path d="M9 48a14 12 0 0 1 28 0v2H9v-2Z" fill={B2} />
    <circle cx="40" cy="28" r="8" fill={B} />
    <path d="M25 52a15 12.5 0 0 1 30 0v2H25v-2Z" fill={B} />
  </Frame>
);

/* ── how Sonar works ── */

export const SpotRead: Spot = (p) => (
  <Frame {...p}>
    <rect x="9" y="7" width="30" height="40" rx="3" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M14 15h20M14 21h16M14 27h12" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <circle cx="39" cy="38" r="11" fill={S} stroke={B} strokeWidth="3" />
    <path d="M34 38h10M36 34h6" stroke={B2} strokeWidth="2" />
    <path d="M47 46l8 8" stroke={B} strokeWidth="4.5" />
  </Frame>
);

export const SpotExtract: Spot = (p) => (
  <Frame {...p}>
    <rect x="5" y="9" width="24" height="44" rx="3" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M10 17h14M10 31h10M10 45h12" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <path d="M25 17h9M21 31h13M23 45h11" stroke={I} strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="1.5 3" />
    <rect x="35" y="12.5" width="24" height="9" rx="4.5" fill={B} />
    <rect x="35" y="26.5" width="24" height="9" rx="4.5" fill={B2} />
    <rect x="35" y="40.5" width="24" height="9" rx="4.5" fill={C} />
  </Frame>
);

export const SpotScore: Spot = (p) => (
  <Frame {...p}>
    <path d="M10 42a22 22 0 0 1 44 0" stroke={L} strokeWidth="7" strokeLinecap="butt" />
    <path d="M10 42a22 22 0 0 1 6.44-15.56" stroke={A} strokeWidth="7" strokeLinecap="butt" />
    <path d="M17.15 25.74A22 22 0 0 1 54 42" stroke={B} strokeWidth="7" strokeLinecap="butt" />
    <path d="M32 42l12-13" stroke={I} strokeWidth="3" />
    <circle cx="32" cy="42" r="4.5" fill={I} />
    <path d="M14 53h36" stroke={L} strokeWidth="2.5" />
  </Frame>
);

export const SpotRoute: Spot = (p) => (
  <Frame {...p}>
    <path d="M18 32h6c6 0 8-14 14-14h4M24 32c6 0 8 14 14 14h4" stroke={I} strokeWidth="2.25" />
    <circle cx="12" cy="32" r="7" fill={B} />
    <circle cx="50" cy="18" r="9" fill={G} />
    <Check x={50} y={18} />
    <circle cx="50" cy="46" r="9" fill={A} />
    <path d="M50 41.5v5" stroke={W} strokeWidth="2.5" />
    <circle cx="50" cy="50.2" r="1.4" fill={W} />
  </Frame>
);

/* ── sectors ── */

export const SpotIT: Spot = (p) => (
  <Frame {...p}>
    <rect x="7" y="10" width="50" height="33" rx="4" fill={W} stroke={I} strokeWidth="1.75" />
    <rect x="12" y="15" width="40" height="23" rx="2" fill={S} />
    <path d="M17 21h14" stroke={B} strokeWidth="2.5" />
    <path d="M17 26.5h24" stroke={B2} strokeWidth="2.5" />
    <path d="M17 32h10" stroke={C} strokeWidth="2.5" />
    <path d="M32 43v8M23 53h18" stroke={I} strokeWidth="2.5" />
  </Frame>
);

export const SpotEducation: Spot = (p) => (
  <Frame {...p}>
    <path d="M16 30v10c0 4.5 7.2 8.5 16 8.5S48 44.5 48 40V30l-16 7.5L16 30Z" fill={B2} />
    <path d="M32 12l26 12-26 12L6 24l26-12Z" fill={B} />
    <path d="M54 26v14" stroke={I} strokeWidth="2" />
    <circle cx="54" cy="43" r="3" fill={C} />
  </Frame>
);

export const SpotWorkforce: Spot = (p) => (
  <Frame {...p}>
    <rect x="12" y="10" width="40" height="46" rx="5" fill={W} stroke={I} strokeWidth="1.75" />
    <rect x="25" y="5" width="14" height="9" rx="2.5" fill={B} />
    <circle cx="32" cy="27" r="7" fill={B2} />
    <path d="M20 46a12 9 0 0 1 24 0Z" fill={B2} />
    <path d="M22 51h20" stroke={I} strokeOpacity=".3" strokeWidth="2" />
  </Frame>
);

export const SpotHealth: Spot = (p) => (
  <Frame {...p}>
    <rect x="7" y="11" width="44" height="38" rx="6" fill={W} stroke={I} strokeWidth="1.75" />
    <rect x="24" y="18" width="10" height="24" rx="2.5" fill={B} />
    <rect x="17" y="25" width="24" height="10" rx="2.5" fill={B} />
    <circle cx="50" cy="48" r="10" fill={G} />
    <Check x={50} y={48} />
  </Frame>
);

export const SpotLegal: Spot = (p) => (
  <Frame {...p}>
    <path d="M32 12v40M20 54h24M12 19h40" stroke={I} strokeWidth="2.75" />
    <path d="M14 19L7 35M14 19l7 16M50 19l-7 16M50 19l7 16" stroke={I} strokeWidth="1.5" />
    <path d="M6 35h16a8 7 0 0 1-16 0Z" fill={B2} />
    <path d="M42 35h16a8 7 0 0 1-16 0Z" fill={B} />
    <circle cx="32" cy="11" r="3.5" fill={B} />
  </Frame>
);

export const SpotProcurement: Spot = (p) => (
  <Frame {...p}>
    <rect x="7" y="7" width="30" height="42" rx="3" fill={W} stroke={I} strokeWidth="1.75" />
    <path d="M12 15h16M12 21h20M12 27h10" stroke={I} strokeOpacity=".3" strokeWidth="2" />
    <path d="M12 37h12" stroke={B} strokeWidth="2.5" />
    <ellipse cx="46" cy="52" rx="12" ry="4.5" fill={B} />
    <ellipse cx="46" cy="46" rx="12" ry="4.5" fill={B2} stroke={W} strokeWidth="1.5" />
    <ellipse cx="46" cy="40" rx="12" ry="4.5" fill={B} stroke={W} strokeWidth="1.5" />
    <ellipse cx="46" cy="34" rx="12" ry="4.5" fill={C} stroke={W} strokeWidth="1.5" />
  </Frame>
);

export const SECTOR_SPOT: Record<string, Spot> = {
  it: SpotIT,
  education: SpotEducation,
  workforce: SpotWorkforce,
  healthcare: SpotHealth,
  legal: SpotLegal,
  procurement: SpotProcurement,
};

/* ── deployment ── */

const cloud = "M17 46h30a10 10 0 0 0 1.6-19.9A14 14 0 0 0 21.7 24 11 11 0 0 0 17 46Z";

export const SpotCloud: Spot = (p) => (
  <Frame {...p}>
    <path d={cloud} fill={L} transform="translate(4 -4)" />
    <path d={cloud} fill={B} />
    <path d="M32 41v-11M27.5 34.5l4.5-4.5 4.5 4.5" stroke={W} strokeWidth="2.5" />
  </Frame>
);

export const SpotVpc: Spot = (p) => (
  <Frame {...p}>
    <rect x="5" y="9" width="54" height="46" rx="10" fill={S} stroke={B} strokeWidth="2" strokeDasharray="4 4" />
    <path d={cloud} fill={B2} transform="translate(4.5 5) scale(.78)" />
    <rect x="38" y="36" width="16" height="13" rx="3.5" fill={B} />
    <path d="M41.5 36.5v-2.5a4.5 4.5 0 0 1 9 0v2.5" stroke={B} strokeWidth="2.25" />
    <circle cx="46" cy="42.5" r="1.8" fill={W} />
  </Frame>
);

export const SpotOnPrem: Spot = (p) => (
  <Frame {...p}>
    <rect x="13" y="6" width="38" height="52" rx="5" fill={W} stroke={I} strokeWidth="1.75" />
    {[12, 26, 40].map((y, k) => (
      <g key={y}>
        <rect x="18" y={y} width="28" height="10" rx="2.5" fill={k === 1 ? L : S} />
        <circle cx="23" cy={y + 5} r="1.8" fill={k === 2 ? A : G} />
        <path d={`M30 ${y + 5}h11`} stroke={I} strokeOpacity=".35" strokeWidth="2" />
      </g>
    ))}
    <path d="M7 58h50" stroke={B} strokeWidth="2.5" />
  </Frame>
);

export const SpotChat: Spot = (p) => (
  <Frame {...p}>
    <path d="M10 14a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H22l-8 6v-6.3A5 5 0 0 1 10 28V14Z" fill={L} />
    <path d="M22 26a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5h-1v7l-8-7H27a5 5 0 0 1-5-5V26Z" fill={B} />
    <circle cx="31" cy="33" r="2.2" fill={W} />
    <circle cx="38" cy="33" r="2.2" fill={W} />
    <circle cx="45" cy="33" r="2.2" fill={W} />
  </Frame>
);

export const SpotFaq: Spot = (p) => (
  <Frame {...p}>
    <circle cx="32" cy="32" r="26" fill={S} />
    <path d="M14 30a16 15 0 1 1 9 13.5L14 47l2.5-7.5A14.8 14.8 0 0 1 14 30Z" fill={B} />
    <path d="M25.5 25.5a5 5 0 1 1 7.3 4.4c-1.6.8-2.3 1.8-2.3 3.4" stroke={W} strokeWidth="2.75" />
    <circle cx="30.5" cy="38.6" r="1.8" fill={W} />
    <circle cx="48" cy="18" r="4" fill={C} />
  </Frame>
);
