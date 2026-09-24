import Image from "next/image";
import { SA } from "@/lib/theme";

/* ────────────────────────────────────────────────────────────────
   The loading state: a skeleton of the page that is about to arrive.

   A full-screen wordmark with a scan line hid the site on every navigation
   and made each click feel slower than it was. This keeps the real nav in
   place, draws the shape of the content in neutral blocks with a slow sheen,
   and runs a thin indeterminate bar along the top. No fake percentage — we
   do not know the duration. Reduced motion gets the same layout, still.

   Server component, CSS-only motion: it paints before any JS arrives.
   ──────────────────────────────────────────────────────────────── */

function Bone({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`bq-bone rounded-lg ${className}`} style={style} />;
}

export default function Loading() {
  return (
    <div className="min-h-[100dvh]" style={{ background: SA.bg }} role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page</span>

      <div aria-hidden className="fixed top-0 inset-x-0 z-[70] h-[2px] overflow-hidden" style={{ background: SA.accentSoft }}>
        <div className="bq-progress h-full w-1/3" style={{ background: SA.accent }} />
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[72px] flex items-center gap-8" style={{ borderBottom: `1px solid ${SA.line}` }}>
        <Image src="/logo.svg" alt="" width={108} height={34} priority />
        <div className="hidden lg:flex gap-6">
          <Bone className="h-3 w-16" />
          <Bone className="h-3 w-16" />
          <Bone className="h-3 w-16" />
        </div>
        <Bone className="ml-auto h-10 w-32 rounded-full" />
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-20 sm:pt-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Bone className="h-12 sm:h-14 w-[88%]" />
          <Bone className="mt-4 h-12 sm:h-14 w-[64%]" />
          <Bone className="mt-9 h-4 w-[92%]" />
          <Bone className="mt-3 h-4 w-[84%]" />
          <Bone className="mt-3 h-4 w-[70%]" />
          <div className="mt-10 flex gap-3">
            <Bone className="h-12 w-36 rounded-full" />
            <Bone className="h-12 w-44 rounded-full" />
          </div>
        </div>
        <Bone className="w-full aspect-[16/11] rounded-[24px]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 mt-24 grid grid-cols-1 lg:grid-cols-6 gap-5">
        <Bone className="lg:col-span-4 h-64 rounded-[20px]" />
        <Bone className="lg:col-span-2 h-64 rounded-[20px]" />
      </div>
    </div>
  );
}
