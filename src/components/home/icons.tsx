import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  Broadcast,
  Buildings,
  ChatCircle,
  Check,
  Cloud,
  Cube,
  Desktop,
  FileText,
  Files,
  FirstAidKit,
  Flag,
  Gauge,
  GraduationCap,
  HardDrives,
  IdentificationBadge,
  Invoice,
  LockKey,
  Palette,
  Pause,
  Play,
  Plugs,
  PlugsConnected,
  Question,
  Receipt,
  Scales,
  Scan,
  ShieldCheck,
  Signature,
  SquaresFour,
  Stack,
  Tag,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

/* ────────────────────────────────────────────────────────────────
   The icon set for the home page, nav and footer: Phosphor, one family,
   regular weight, one colour per context. Every concept maps to exactly one
   glyph here, so the same thing always looks the same everywhere. The SSR
   build renders in server and client components alike.
   ──────────────────────────────────────────────────────────────── */

export type Ico = Icon;

export const I = {
  capture: Scan,
  spend: Receipt,
  govern: Signature,
  custom: Cube,
  sonar: Broadcast,
  campus: GraduationCap,
  workforce: IdentificationBadge,
  editions: Stack,
  all: SquaresFour,
  api: BracketsCurly,
  formats: Files,
  scores: Gauge,
  trust: ShieldCheck,
  about: Buildings,
  pricing: Tag,
  contact: ChatCircle,
  faq: Question,
  media: Palette,
  team: UsersThree,
  integrate: PlugsConnected,
  migrate: Plugs,
  cloud: Cloud,
  vpc: LockKey,
  onprem: HardDrives,
  docs: FileText,
  flag: Flag,
  arrow: ArrowRight,
  external: ArrowUpRight,
  check: Check,
  pause: Pause,
  play: Play,
} satisfies Record<string, Icon>;

export const SECTOR_ICON: Record<string, Icon> = {
  it: Desktop,
  education: GraduationCap,
  workforce: UsersThree,
  healthcare: FirstAidKit,
  legal: Scales,
  procurement: Invoice,
};

type TileTone = "light" | "onColor" | "onDark";

const TILE: Record<TileTone, { bg: string; fg: string }> = {
  light: { bg: "#E7EAF0", fg: "#1F4FE6" }, // on canvas and white
  onColor: { bg: "#FFFFFF", fg: "#1F4FE6" }, // on cobalt and ink cells
  onDark: { bg: "rgba(255,255,255,0.08)", fg: "#AFC3FF" }, // on the ink block
};

/** The one icon tile: a square well, the glyph centred at half its size. */
export function Tile({ icon: G, size = 48, tone = "light" }: { icon: Icon; size?: 40 | 48 | 64; tone?: TileTone }) {
  const t = TILE[tone];
  return (
    <span
      aria-hidden
      className="shrink-0 grid place-items-center"
      style={{ width: size, height: size, borderRadius: size === 40 ? 8 : 12, background: t.bg, color: t.fg }}
    >
      <G size={size / 2} weight="regular" />
    </span>
  );
}
