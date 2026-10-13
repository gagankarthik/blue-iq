import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { CONTROLS, type Control } from "@/lib/trust";
import { Btn } from "@/components/system/Btn";
import { type BqIcon, IconShield, IconLock, IconFingerprint, IconKey, IconFolderLock, IconServer, IconFlag } from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   Trust — dense on purpose. A security reviewer wants a controls list they
   can scan, not six friendly cards, so this is a ruled table: area, control,
   detail. Every line is a claim the company already makes; nothing here is
   a certification we do not hold.
   ──────────────────────────────────────────────────────────────── */

const ICONS: Record<Control["icon"], BqIcon> = {
  shield: IconShield,
  lock: IconLock,
  fingerprint: IconFingerprint,
  key: IconKey,
  folder: IconFolderLock,
  server: IconServer,
  flag: IconFlag,
};

/* the controls table, shared with the Trust Center */
export function ControlsTable() {
  return (
    <div className="rounded-[16px] overflow-x-auto bg-white" style={{ border: `1px solid ${SA.line}` }}>
      <table className="w-full min-w-[560px] text-left font-sans-g">
        <caption className="sr-only">Security controls</caption>
        <thead>
          <tr style={{ borderBottom: `1px solid ${SA.line}` }}>
            <th scope="col" className="px-6 py-4 t-meta w-[34%]" style={{ color: SA.faint }}>
              Area
            </th>
            <th scope="col" className="px-6 py-4 t-meta" style={{ color: SA.faint }}>
              Control
            </th>
          </tr>
        </thead>
        <tbody>
          {CONTROLS.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <tr key={c.area} className="transition-colors duration-150 hover:bg-[#F8FAFC]" style={{ borderBottom: `1px solid ${SA.line}` }}>
                <th scope="row" className="px-6 py-4 align-top font-normal">
                  <span className="inline-flex items-center gap-3 t-body font-medium" style={{ color: SA.ink }}>
                    <Icon size={20} style={{ color: SA.accent }} />
                    {c.area}
                  </span>
                </th>
                <td className="px-6 py-4 align-top">
                  <span className="block t-body font-semibold" style={{ color: SA.ink }}>
                    {c.control}
                  </span>
                  <span className="block t-body" style={{ color: SA.sub }}>
                    {c.detail}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Security() {
  return (
    <section
      id="security"
      className="relative px-5 sm:px-8 py-24 sm:py-32 scroll-mt-20"
      style={{ background: SA.bg2, borderTop: `1px solid ${SA.line}`, borderBottom: `1px solid ${SA.line}` }}
      aria-labelledby="sec-h"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionHead
            align="stack"
            kicker="Security"
            id="sec-h"
            title="Built for teams with strict compliance"
            sub="Clinical records, contracts and financial data, protected end to end."
          />
          <Reveal className="mt-8">
            <Btn href="/trust" variant="secondary" arrow>
              Visit the Trust Center
            </Btn>
          </Reveal>
        </div>

        <Reveal className="col-span-12 lg:col-span-8">
          <ControlsTable />
        </Reveal>
      </div>
    </section>
  );
}
