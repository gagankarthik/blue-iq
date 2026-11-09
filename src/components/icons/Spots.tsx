import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsSplit,
  BracketsCurly,
  Broadcast,
  ChartLineUp,
  ChatCircle,
  Cloud,
  Cube,
  Desktop,
  FileText,
  FirstAidKit,
  Gauge,
  GraduationCap,
  HardDrives,
  Invoice,
  LockKey,
  PlugsConnected,
  Question,
  Receipt,
  Scales,
  Scan,
  ShieldCheck,
  Signature,
  Table,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

/* ────────────────────────────────────────────────────────────────
   "Spots" (2026-11): the larger icon marks inside tiles and wells. They
   were hand-drawn multi-colour illustrations; they are now the standard
   Phosphor glyph, in cobalt, centred in the same square box at about half
   its size, so every layout that placed a Spot keeps its footprint. The
   export names are unchanged, so every page picked this up as is.
   ──────────────────────────────────────────────────────────────── */

type P = { size?: number; className?: string; title?: string };
export type Spot = (p: P) => React.ReactElement;

function spot(G: Icon): Spot {
  function SpotGlyph({ size = 56, className, title }: P) {
    return (
      <span
        className={`inline-grid place-items-center shrink-0 ${className ?? ""}`}
        style={{ width: size, height: size, color: "#1F4FE6" }}
        role={title ? "img" : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      >
        <G size={Math.round(size * 0.5)} weight="regular" />
      </span>
    );
  }
  return SpotGlyph;
}

/* products */
export const SpotCapture = spot(Scan);
export const SpotSpend = spot(Receipt);
export const SpotGovern = spot(Signature);
export const SpotCustom = spot(Cube);
export const SpotSonar = spot(Broadcast);

/* the company */
export const SpotScale = spot(ChartLineUp);
export const SpotSecure = spot(ShieldCheck);
export const SpotIntegrate = spot(PlugsConnected);
export const SpotTeam = spot(UsersThree);

/* the pipeline */
export const SpotRead = spot(FileText);
export const SpotExtract = spot(Table);
export const SpotScore = spot(Gauge);
export const SpotRoute = spot(ArrowsSplit);

/* sectors */
export const SpotIT = spot(Desktop);
export const SpotEducation = spot(GraduationCap);
export const SpotWorkforce = spot(UsersThree);
export const SpotHealth = spot(FirstAidKit);
export const SpotLegal = spot(Scales);
export const SpotProcurement = spot(Invoice);

export const SECTOR_SPOT: Record<string, Spot> = {
  it: SpotIT,
  education: SpotEducation,
  workforce: SpotWorkforce,
  healthcare: SpotHealth,
  legal: SpotLegal,
  procurement: SpotProcurement,
};

/* deployment */
export const SpotCloud = spot(Cloud);
export const SpotVpc = spot(LockKey);
export const SpotOnPrem = spot(HardDrives);

/* contact and help */
export const SpotChat = spot(ChatCircle);
export const SpotFaq = spot(Question);
export const SpotApi = spot(BracketsCurly);
