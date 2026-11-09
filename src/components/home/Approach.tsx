import { BB } from "@/lib/theme";
import { Head, Stagger } from "@/components/home/motion";
import FlowDiagram from "@/components/home/FlowDiagram";
import { SqBtn } from "@/components/home/ui";

/* ────────────────────────────────────────────────────────────────
   How Sonar works (#how, the hero's second action). Split: on the left the
   heading and the four verbs of the pipeline as a ruled definition list;
   on the right the working flow diagram in a white, tick-framed panel.
   ──────────────────────────────────────────────────────────────── */

const STEPS: [string, string][] = [
  ["Read", "PDFs, Word files, scans and phone photos, read in context."],
  ["Extract", "The fields you need from any layout, with no templates."],
  ["Score", "A confidence score on every value, not one per file."],
  ["Route", "Sure values to your systems, the rest to a person."],
];

export default function Approach() {
  return (
    <section id="how" className="scroll-mt-24 px-6 sm:px-8 pb-24" aria-labelledby="approach-h">
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: "#D9DCE2" }} />
      <div className="max-w-[1112px] mx-auto grid lg:grid-cols-3 gap-y-12 items-start">
        <div className="lg:pr-8">
          <Head
            id="approach-h"
            title="Intelligence that knows how sure it is"
            sub="Sonar reads your documents, scores every value it finds, and routes anything uncertain to a person, so nothing wrong slips through."
          />
          <Stagger as="dl" className="mt-8">
            {STEPS.map(([t, d]) => (
              <div key={t} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                <dt className="font-mono-g text-[13px] uppercase tracking-[0.06em] pt-1" style={{ color: BB.cobalt }}>
                  {t}
                </dt>
                <dd className="font-sans-g t-base" style={{ color: BB.ink2 }}>
                  {d}
                </dd>
              </div>
            ))}
          </Stagger>
          <div className="mt-8">
            <SqBtn href="/platform" tone="outline" arrow>
              How Sonar works
            </SqBtn>
          </div>
        </div>

        <div
          className="relative bg-white lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BB.line}`, boxShadow: "0 8px 16px -8px rgba(14,17,22,0.08)" }}
        >
          {/* phones: keep the diagram at a readable size and let it scroll */}
          <div className="overflow-x-auto p-6 lg:p-8" tabIndex={0} role="region" aria-label="How Sonar routes a document">
            <div className="min-w-[560px]">
              <FlowDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
