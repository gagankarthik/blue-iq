import type { SVGProps } from "react";

/* ────────────────────────────────────────────────────────────────
   The Blue-IQ icon set.

   Drawn for this site, not borrowed from a library. One grammar across all
   of them, so they read as a family:

   · 24px grid, 1.5px stroke, round caps and joins, `currentColor` line.
   · One soft "duo" plane per icon — a filled shape behind the line work, in
     `--duo` (defaults to the line colour at 14%). It is the thing that makes
     them ours: a library icon is line-only.
   · Where a glyph can carry the site's idea — a field being scored, a flag
     raised for review — it does. Capture is a page under a scan bracket;
     Spend is two documents meeting at a check; Govern is a page under a
     shield.
   ──────────────────────────────────────────────────────────────── */

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, style, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ ...style }}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* the duo plane — a filled, stroke-less shape at low opacity */
const D = ({ d }: { d: string }) => <path d={d} stroke="none" style={{ fill: "var(--duo, currentColor)", fillOpacity: "var(--duo-o, 0)" }} />;

export type BqIcon = (p: P) => React.ReactElement;

/* ── products ── */

export const IconCapture: BqIcon = (p) => (
  <Base {...p}>
    <D d="M7 4h7l4 4v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    <path d="M14 4H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8l-4-4Z" />
    <path d="M14 4v4h4" />
    <path d="M9 12h6M9 15.5h4" />
    <path d="M3 8V4.5A1.5 1.5 0 0 1 4.5 3H6M3 16v3.5A1.5 1.5 0 0 0 4.5 21H6M21 16v3.5a1.5 1.5 0 0 1-1.5 1.5H18" />
  </Base>
);

export const IconSpend: BqIcon = (p) => (
  <Base {...p}>
    <D d="M4 5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v14l-2-1.3L9 19l-2-1.3L5 19l-1-.7V5Z" />
    <path d="M13 11V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13.3l1 .7 2-1.3L9 19" />
    <path d="M7 8h3M7 11h2" />
    <rect x="12" y="11" width="8" height="10" rx="1" />
    <path d="m14.4 16.2 1.5 1.5 2.6-3" />
  </Base>
);

export const IconGovern: BqIcon = (p) => (
  <Base {...p}>
    <D d="M15 11.5 19.5 13v3.2c0 2.6-1.9 4.3-4.5 5.3-2.6-1-4.5-2.7-4.5-5.3V13l4.5-1.5Z" />
    <path d="M13 3H6a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h3" />
    <path d="M13 3l4 4v2" />
    <path d="M8 8h4M8 11h3" />
    <path d="M15 11.5 19.5 13v3.2c0 2.6-1.9 4.3-4.5 5.3-2.6-1-4.5-2.7-4.5-5.3V13l4.5-1.5Z" />
    <path d="m13.3 16.3 1.2 1.2 2.2-2.4" />
  </Base>
);

export const IconSonar: BqIcon = (p) => (
  <Base {...p}>
    <D d="M12 12m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    <path d="M8.5 12a3.5 3.5 0 0 1 3.5-3.5" />
    <path d="M5 12a7 7 0 0 1 7-7" />
    <path d="M2 12A10 10 0 0 1 12 2" opacity=".55" />
    <path d="M15.5 12a3.5 3.5 0 0 1-3.5 3.5M19 12a7 7 0 0 1-7 7" />
    <path d="M22 12a10 10 0 0 1-10 10" opacity=".55" />
  </Base>
);

export const IconCustom: BqIcon = (p) => (
  <Base {...p}>
    <D d="M4 4h7v7H4zM13 13h7v7h-7z" />
    <rect x="4" y="4" width="7" height="7" rx="1.2" />
    <rect x="13" y="13" width="7" height="7" rx="1.2" />
    <path d="M16.5 4v6M13.5 7h6" />
    <path d="M4 16.5h7" strokeDasharray="1.6 2" />
  </Base>
);

/* ── editions & industries ── */

export const IconCampus: BqIcon = (p) => (
  <Base {...p}>
    <D d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
    <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
    <path d="M6 10.5V15c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
    <path d="M21.5 8.5V14" />
  </Base>
);

export const IconWorkforce: BqIcon = (p) => (
  <Base {...p}>
    <D d="M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Z" />
    <rect x="5" y="4" width="14" height="16" rx="2" />
    <circle cx="12" cy="10" r="2.4" />
    <path d="M8.2 16.6c.6-1.7 2.1-2.6 3.8-2.6s3.2.9 3.8 2.6" />
    <path d="M10 4V2.8h4V4" />
  </Base>
);

export const IconNetwork: BqIcon = (p) => (
  <Base {...p}>
    <D d="M9 9h6v6H9z" />
    <rect x="9" y="9" width="6" height="6" rx="1.2" />
    <circle cx="4.5" cy="4.5" r="1.8" />
    <circle cx="19.5" cy="4.5" r="1.8" />
    <circle cx="4.5" cy="19.5" r="1.8" />
    <circle cx="19.5" cy="19.5" r="1.8" />
    <path d="M5.8 5.8 9 9M18.2 5.8 15 9M5.8 18.2 9 15M18.2 18.2 15 15" />
  </Base>
);

export const IconHealth: BqIcon = (p) => (
  <Base {...p}>
    <D d="M12 3.5 19 6v5.5c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6l7-2.5Z" />
    <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6l7-2.5Z" />
    <path d="M12 8.5v6M9 11.5h6" />
  </Base>
);

export const IconScale: BqIcon = (p) => (
  <Base {...p}>
    <D d="M2.5 13.5h6a3 3 0 0 1-6 0ZM15.5 13.5h6a3 3 0 0 1-6 0Z" />
    <path d="M12 3v17M7 20h10" />
    <path d="M5 6h14M12 4.5 5 6M12 4.5 19 6" />
    <path d="M5.5 6 2.5 13.5h6L5.5 6ZM18.5 6l-3 7.5h6L18.5 6Z" />
  </Base>
);

export const IconReceipt: BqIcon = (p) => (
  <Base {...p}>
    <D d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21V3Z" />
    <path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21V3Z" />
    <path d="M9 8h6M9 11.5h6M9 15h3" />
  </Base>
);

/* ── security ── */

export const IconLock: BqIcon = (p) => (
  <Base {...p}>
    <D d="M5 11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8Z" />
    <rect x="5" y="10" width="14" height="10" rx="1.5" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    <path d="M12 14v2.5" />
  </Base>
);

export const IconKey: BqIcon = (p) => (
  <Base {...p}>
    <D d="M8.5 11.5m-4.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0-9 0" />
    <circle cx="8.5" cy="11.5" r="4.5" />
    <circle cx="8.5" cy="11.5" r="1.2" />
    <path d="M13 11.5h8M18 11.5v3M21 11.5v2" />
  </Base>
);

export const IconServer: BqIcon = (p) => (
  <Base {...p}>
    <D d="M4 4h16v7H4zM4 13h16v7H4z" />
    <rect x="4" y="4" width="16" height="7" rx="1.5" />
    <rect x="4" y="13" width="16" height="7" rx="1.5" />
    <path d="M7.5 7.5h.01M7.5 16.5h.01" strokeWidth={2.2} />
    <path d="M11 7.5h6M11 16.5h6" />
  </Base>
);

export const IconShield: BqIcon = (p) => (
  <Base {...p}>
    <D d="M12 3 19.5 5.8v5.7c0 4.6-3.1 7.9-7.5 9.5-4.4-1.6-7.5-4.9-7.5-9.5V5.8L12 3Z" />
    <path d="M12 3 19.5 5.8v5.7c0 4.6-3.1 7.9-7.5 9.5-4.4-1.6-7.5-4.9-7.5-9.5V5.8L12 3Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.6" />
  </Base>
);

export const IconFingerprint: BqIcon = (p) => (
  <Base {...p}>
    <D d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0" />
    <path d="M6.5 9.5A6 6 0 0 1 17.8 10" />
    <path d="M18 13.5c-.2 2-.8 3.8-1.8 5.3" />
    <path d="M8.5 12.5a3.5 3.5 0 0 1 7 0c0 2.6-.6 4.9-1.8 6.8" />
    <path d="M12 12.5c0 3-1 5.4-2.8 7.2" />
    <path d="M6 13c0 1.8-.5 3.3-1.4 4.6" />
  </Base>
);

export const IconFolderLock: BqIcon = (p) => (
  <Base {...p}>
    <D d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" />
    <path d="M12 19H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v2" />
    <rect x="14" y="14" width="7" height="6" rx="1" />
    <path d="M15.5 14v-1.2a2 2 0 0 1 4 0V14" />
  </Base>
);

/* ── engine vocabulary ── */

export const IconScore: BqIcon = (p) => (
  <Base {...p}>
    <D d="M4 16a8 8 0 0 1 16 0H4Z" />
    <path d="M4 16a8 8 0 0 1 16 0" />
    <path d="M12 16l3.5-4.5" />
    <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
    <path d="M6.3 10.3l1 1M12 8v1.4M17.7 10.3l-1 1" />
    <path d="M4 20h16" />
  </Base>
);

export const IconFlag: BqIcon = (p) => (
  <Base {...p}>
    <D d="M6 4h11l-2.5 4L17 12H6V4Z" />
    <path d="M6 21V4h11l-2.5 4L17 12H6" />
  </Base>
);

export const IconApi: BqIcon = (p) => (
  <Base {...p}>
    <D d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="m9.5 9-3 3 3 3M14.5 9l3 3-3 3M12.8 8.5l-1.6 7" />
  </Base>
);

export const IconLayers: BqIcon = (p) => (
  <Base {...p}>
    <D d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
    <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  </Base>
);

export const IconBolt: BqIcon = (p) => (
  <Base {...p}>
    <D d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" />
    <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" />
  </Base>
);

export const IconDocs: BqIcon = (p) => (
  <Base {...p}>
    <D d="M8 3h8l4 4v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M16 3H8a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V7l-4-4Z" />
    <path d="M16 3v4h4M4 7v13a1 1 0 0 0 1 1h11" />
  </Base>
);

export const IconArrow: BqIcon = (p) => (
  <Base {...p} strokeWidth={1.75}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IconArrowUpRight: BqIcon = (p) => (
  <Base {...p} strokeWidth={1.75}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const IconCheck: BqIcon = (p) => (
  <Base {...p} strokeWidth={2}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const IconPlus: BqIcon = (p) => (
  <Base {...p} strokeWidth={1.75}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);
