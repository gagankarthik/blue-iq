import Image from "next/image";
import { BB } from "@/lib/theme";

/* ────────────────────────────────────────────────────────────────
   The loading state: a skeleton of the page that is about to arrive.

   It keeps the nav's place, draws the shape of an inner page in neutral
   blocks with a slow sheen (crumbs, a left-aligned stacked header, two
   actions, then a row of cards), and runs a thin indeterminate bar along
   the top. No fake percentage: we do not know the duration. Reduced motion
   gets the same layout, still.

   Server component, CSS-only motion: it paints before any JS arrives.
   ──────────────────────────────────────────────────────────────── */

function Bone({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`bq-bone rounded-[8px] ${className}`} style={style} />;
}

const WRAP = "max-w-[1176px] mx-auto px-6 sm:px-8";

export default function Loading() {
  return (
    <div className="min-h-[100dvh]" style={{ background: BB.canvas }} role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page</span>

      <div aria-hidden className="fixed top-0 inset-x-0 z-[70] h-[2px] overflow-hidden" style={{ background: BB.mist2 }}>
        <div className="bq-progress h-full w-1/3" style={{ background: BB.cobalt }} />
      </div>

      <div aria-hidden className={`${WRAP} h-[72px] flex items-center gap-8`} style={{ borderBottom: `1px solid ${BB.line}` }}>
        <Image src="/logo.svg" alt="" width={115} height={30} priority />
        <div className="hidden lg:flex gap-8">
          <Bone className="h-[12px] w-16" />
          <Bone className="h-[12px] w-16" />
          <Bone className="h-[12px] w-16" />
        </div>
        <Bone className="ml-auto h-12 w-32 rounded-[12px]" />
      </div>

      <div aria-hidden className={`${WRAP} pt-24 sm:pt-32`}>
        <Bone className="h-[12px] w-32" />
        <Bone className="mt-8 h-12 sm:h-14 w-[min(88%,640px)]" />
        <Bone className="mt-4 h-12 sm:h-14 w-[min(60%,440px)]" />
        <Bone className="mt-8 h-4 w-[min(92%,560px)]" />
        <Bone className="mt-4 h-4 w-[min(76%,460px)]" />
        <div className="mt-12 flex gap-4">
          <Bone className="h-14 w-40 rounded-[12px]" />
          <Bone className="h-14 w-44 rounded-[12px]" />
        </div>
      </div>

      <div aria-hidden className={`${WRAP} mt-24 grid grid-cols-1 md:grid-cols-3 gap-4`}>
        <Bone className="h-64 rounded-2xl" />
        <Bone className="h-64 rounded-2xl" />
        <Bone className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
