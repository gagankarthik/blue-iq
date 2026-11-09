import type { CSSProperties } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  Broadcast,
  Check,
  Cube,
  FileText,
  FirstAidKit,
  Flag,
  FolderLock,
  Fingerprint,
  Gauge,
  GraduationCap,
  HardDrives,
  Key,
  Lightning,
  Lock,
  Plus,
  Receipt,
  Scales,
  Scan,
  ShieldCheck,
  Signature,
  Stack,
  TreeStructure,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

/* ────────────────────────────────────────────────────────────────
   The site's line icons (2026-11): Phosphor, regular weight, one family.
   The export names are the ones every page already imports, so the whole
   site moved to the standard set without touching each page. The same
   concept maps to the same glyph here and in components/home/icons.tsx.
   ──────────────────────────────────────────────────────────────── */

type P = { size?: number; className?: string; style?: CSSProperties };
export type BqIcon = (p: P) => React.ReactElement;

function wrap(G: Icon): BqIcon {
  function BqIconGlyph({ size = 24, className, style }: P) {
    return <G size={size} weight="regular" className={className} style={style} aria-hidden />;
  }
  return BqIconGlyph;
}

/* products */
export const IconCapture = wrap(Scan);
export const IconSpend = wrap(Receipt);
export const IconGovern = wrap(Signature);
export const IconSonar = wrap(Broadcast);
export const IconCustom = wrap(Cube);

/* sectors */
export const IconCampus = wrap(GraduationCap);
export const IconWorkforce = wrap(UsersThree);
export const IconNetwork = wrap(TreeStructure);
export const IconHealth = wrap(FirstAidKit);
export const IconScale = wrap(Scales);
export const IconReceipt = wrap(Receipt);

/* security */
export const IconLock = wrap(Lock);
export const IconKey = wrap(Key);
export const IconServer = wrap(HardDrives);
export const IconShield = wrap(ShieldCheck);
export const IconFingerprint = wrap(Fingerprint);
export const IconFolderLock = wrap(FolderLock);

/* the engine */
export const IconScore = wrap(Gauge);
export const IconFlag = wrap(Flag);
export const IconApi = wrap(BracketsCurly);
export const IconLayers = wrap(Stack);
export const IconBolt = wrap(Lightning);
export const IconDocs = wrap(FileText);

/* ui */
export const IconArrow = wrap(ArrowRight);
export const IconArrowUpRight = wrap(ArrowUpRight);
export const IconCheck = wrap(Check);
export const IconPlus = wrap(Plus);
