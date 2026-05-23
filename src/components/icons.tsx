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

/* ── isometric 3D product icons ── */
function Iso({ children, className = "w-7 h-7" }: { children?: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <polygon points="24,6 41.5,16 24,26 6.5,16" fill="#6E8BF2" />
      <polygon points="6.5,16 24,26 24,45.5 6.5,35.5" fill="#2C49D6" />
      <polygon points="41.5,16 24,26 24,45.5 41.5,35.5" fill="#002181" />
      {children}
    </svg>
  );
}
export const IconHire = ({ className }: IconProps) => (
  <Iso className={className}>
    <path d="M24 21V12.5M20.6 15.6L24 12.3l3.4 3.3" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Iso>
);
export const IconGovern = ({ className }: IconProps) => (
  <Iso className={className}>
    <path d="M19.6 16.1l2.9 2.9 5.9-6.2" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Iso>
);
export const IconSpend = ({ className }: IconProps) => (
  <Iso className={className}>
    <g stroke="#fff" strokeWidth="2.1" strokeLinecap="round">
      <line x1="19.5" y1="18.5" x2="19.5" y2="15.5" />
      <line x1="24" y1="19.5" x2="24" y2="12.5" />
      <line x1="28.5" y1="18.5" x2="28.5" y2="16" />
    </g>
  </Iso>
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
