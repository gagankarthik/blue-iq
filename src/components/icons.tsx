import * as React from "react";

type IconProps = { className?: string };

/* ── functional line marks (tint via currentColor) ── */
export const Arrow = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Check = ({ className = "w-3 h-3" }: IconProps) => (
  <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
    <path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── editorial framed product marks (tint via currentColor, no fixed blue) ── */
function Frame({ children, className = "w-7 h-7" }: { children?: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.3" />
      {children}
    </svg>
  );
}
const fw = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

/* HIRE — ascending double chevron (the right candidate surfacing to the top) */
export const IconHire = ({ className }: IconProps) => (
  <Frame className={className}>
    <path d="M7.8 12.3 12 8.1l4.2 4.2" {...fw} />
    <path d="M7.8 16 12 11.8 16.2 16" {...fw} stroke="currentColor" strokeOpacity="0.4" />
  </Frame>
);
/* GOVERN — shield with a verified clause check */
export const IconGovern = ({ className }: IconProps) => (
  <Frame className={className}>
    <path d="M12 4.6l5.4 2.1v3.5c0 3.2-2.3 5.6-5.4 6.5-3.1-.9-5.4-3.3-5.4-6.5V6.7L12 4.6z" {...fw} />
    <path d="M9.7 11.3l1.7 1.7 3.2-3.5" {...fw} />
  </Frame>
);
/* SPEND — reconciled bars (spend held to plan) */
export const IconSpend = ({ className }: IconProps) => (
  <Frame className={className}>
    <path d="M8 16.2v-2.6" {...fw} />
    <path d="M12 16.2V8.4" {...fw} />
    <path d="M16 16.2v-4.6" {...fw} />
    <path d="M6.6 16.4h10.8" {...fw} stroke="currentColor" strokeOpacity="0.4" />
  </Frame>
);

/* ── duotone feature icons (soft fill + line glyph, tint via currentColor) ── */
const D = ({ className = "w-5 h-5", children }: { className?: string; children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>{children}</svg>
);
const sw = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
const soft = { fill: "currentColor", opacity: 0.13 };

export const IconChart = ({ className }: IconProps) => (
  <D className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4.5" {...soft} />
    <path d="M7.5 16v-3M12 16V9M16.5 16v-5" {...sw} />
  </D>
);
export const IconShield = ({ className }: IconProps) => (
  <D className={className}>
    <path d="M12 3l7 3v5c0 4.2-2.9 7.4-7 8.6C7.9 18.4 5 15.2 5 11V6l7-3z" {...soft} />
    <path d="M12 3l7 3v5c0 4.2-2.9 7.4-7 8.6C7.9 18.4 5 15.2 5 11V6l7-3z" {...sw} />
    <path d="M9 12l2.1 2.1L15 10.2" {...sw} />
  </D>
);
export const IconLayers = ({ className }: IconProps) => (
  <D className={className}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" {...soft} />
    <path d="M12 3l9 5-9 5-9-5 9-5z" {...sw} />
    <path d="M3 13l9 5 9-5" {...sw} />
  </D>
);
export const IconDoc = ({ className }: IconProps) => (
  <D className={className}>
    <rect x="5" y="3" width="14" height="18" rx="3" {...soft} />
    <rect x="5" y="3" width="14" height="18" rx="3" {...sw} />
    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" {...sw} />
  </D>
);
export const IconCode = ({ className }: IconProps) => (
  <D className={className}>
    <rect x="3" y="4" width="18" height="16" rx="4.5" {...soft} />
    <path d="M9.5 9L7 12l2.5 3M14.5 9L17 12l-2.5 3" {...sw} />
  </D>
);
export const IconLifebuoy = ({ className }: IconProps) => (
  <D className={className}>
    <circle cx="12" cy="12" r="9" {...soft} />
    <circle cx="12" cy="12" r="9" {...sw} />
    <circle cx="12" cy="12" r="3.5" {...sw} />
    <path d="M5.2 5.2l3.4 3.4M15.4 15.4l3.4 3.4M18.8 5.2l-3.4 3.4M8.6 15.4l-3.4 3.4" {...sw} />
  </D>
);
export const IconStar = ({ className }: IconProps) => (
  <D className={className}>
    <path d="M12 3.5l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.6 6.8 19.4l1.2-5.8-4.4-4 5.9-.7L12 3.5z" {...soft} />
    <path d="M12 3.5l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.6 6.8 19.4l1.2-5.8-4.4-4 5.9-.7L12 3.5z" {...sw} />
  </D>
);
export const IconCalendar = ({ className }: IconProps) => (
  <D className={className}>
    <rect x="4" y="5" width="16" height="16" rx="3.5" {...soft} />
    <rect x="4" y="5" width="16" height="16" rx="3.5" {...sw} />
    <path d="M4 9.5h16M8.5 3v4M15.5 3v4" {...sw} />
  </D>
);
export const IconLock = ({ className }: IconProps) => (
  <D className={className}>
    <rect x="5" y="10" width="14" height="10" rx="3.2" {...soft} />
    <rect x="5" y="10" width="14" height="10" rx="3.2" {...sw} />
    <path d="M8 10V8a4 4 0 018 0v2" {...sw} />
  </D>
);
export const IconSpark = ({ className }: IconProps) => (
  <D className={className}>
    <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" {...soft} />
    <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" {...sw} />
  </D>
);
export const IconTarget = ({ className }: IconProps) => (
  <D className={className}>
    <circle cx="12" cy="12" r="9" {...soft} />
    <circle cx="12" cy="12" r="9" {...sw} />
    <circle cx="12" cy="12" r="5" {...sw} />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </D>
);

/* Sonar — concentric "ping" arcs emanating from a core, the intelligence engine */
export const IconSonar = ({ className }: IconProps) => (
  <D className={className}>
    <circle cx="12" cy="12" r="9" {...soft} />
    <circle cx="12" cy="13" r="1.8" fill="currentColor" />
    <path d="M12 11.2a4.4 4.4 0 014.4 4.4M12 7.6a8 8 0 018 8" {...sw} />
  </D>
);

/* People / team mark for buyer-persona cards */
export const IconUsers = ({ className }: IconProps) => (
  <D className={className}>
    <circle cx="9" cy="8.5" r="5.5" {...soft} />
    <circle cx="9" cy="9" r="2.6" {...sw} />
    <path d="M3.8 18a5.2 5.2 0 0110.4 0" {...sw} />
    <path d="M16 7.3a2.6 2.6 0 010 5.2M16.5 18a5.2 5.2 0 00-2.1-4.2" {...sw} />
  </D>
);

/* Building / institution mark for government & finance */
export const IconBank = ({ className }: IconProps) => (
  <D className={className}>
    <path d="M4 10l8-5 8 5v1H4v-1z" {...soft} />
    <path d="M4 10l8-5 8 5M5.5 11v6M10 11v6M14 11v6M18.5 11v6M3.5 20h17" {...sw} />
  </D>
);
