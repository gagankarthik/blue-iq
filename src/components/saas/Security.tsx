import { BB } from "@/lib/theme";
import { CONTROLS, type Control } from "@/lib/trust";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, Tile, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   Security, in the blueprint language. A reviewer scans for a control and
   its one-line detail, so each control is a card: area as a mono label,
   the control as the title, the detail under it. Compliance leads and runs
   double width, stated exactly as the company states it: aligned, not
   certified. Every line is a claim the company already makes.
   ──────────────────────────────────────────────────────────────── */

const ICONS: Record<Control["icon"], Ico> = {
  shield: I.trust,
  lock: I.vpc,
  fingerprint: I.workforce,
  key: I.team,
  folder: I.all,
  server: I.cloud,
  flag: I.flag,
};

/* the controls, shared with the Trust Center: a grid of cards (the name is
   kept from when it was a table) */
export function ControlsTable() {
  return (
    <Stagger as="ul" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CONTROLS.map((c, k) => (
        <li key={c.area} className={`rounded-2xl bg-white p-8 flex flex-col ${k === 0 ? "sm:col-span-2" : ""}`} style={{ border: `1px solid ${BB.line}` }}>
          <span className="flex items-center gap-4">
            <Tile icon={ICONS[c.icon]} size={40} />
            <span className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.cobaltDeep }}>
              {c.area}
            </span>
          </span>
          <h3 className="mt-8 font-sans-g t-sub font-medium" style={{ color: BB.ink }}>
            {c.control}
          </h3>
          <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
            {c.detail}
          </p>
        </li>
      ))}
    </Stagger>
  );
}

export default function Security() {
  return (
    <section id="security" className="px-6 sm:px-8 pb-24 scroll-mt-24" aria-labelledby="sec-h">
      <div className="max-w-[1112px] mx-auto">
        <div aria-hidden className="h-px mb-24" style={{ background: BB.line }} />
        <Head id="sec-h" title="Built for teams with strict compliance" sub="Clinical records, contracts and financial data, protected end to end." />
        <div className="mt-12">
          <ControlsTable />
        </div>
        <div className="mt-12 flex justify-center">
          <SqBtn href="/trust" tone="outline" arrow>
            Visit the Trust Center
          </SqBtn>
        </div>
      </div>
    </section>
  );
}
