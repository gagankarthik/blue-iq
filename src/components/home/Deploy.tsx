import { BB } from "@/lib/theme";
import { Head, Stagger, DrawLine } from "@/components/home/motion";
import { I, Tile, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   Where it runs, original copy in the blueprint system: the three
   deployment models on one axis of control, a cobalt rule drawing from
   "less to run" to "more control" as the section arrives, a marker where
   each model's column starts. Same Sonar, same scores, wherever it is hosted.
   ──────────────────────────────────────────────────────────────── */

const MODELS: { icon: Ico; t: string; d: string; tag: string }[] = [
  { icon: I.cloud, t: "Blue-IQ Cloud", d: "Fully managed, scales on its own, and the fastest way to value.", tag: "Managed by us" },
  { icon: I.vpc, t: "Private cloud (VPC)", d: "Inside your own security perimeter, with our team running it.", tag: "Your perimeter" },
  { icon: I.onprem, t: "On-premises", d: "Full control on your own hardware, air-gapped for regulated industries.", tag: "Your hardware" },
];

export default function Deploy() {
  return (
    <section className="px-6 sm:px-8 pb-24" aria-labelledby="deploy-h">
      <div className="max-w-[1112px] mx-auto">
        <Head id="deploy-h" title="Built to run anywhere your business runs" sub="The same Sonar and the same scores, wherever your documents have to stay." />

        <div className="mt-12">
          <div className="flex items-center justify-between font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.ink3 }}>
            <span>Less to run</span>
            <span>More control</span>
          </div>
          <div className="relative mt-4 h-[3px]" style={{ background: BB.mist2 }}>
            <DrawLine className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BB.sky} 0%, ${BB.cobalt} 55%, ${BB.ink} 100%)` }} />
            {["0%", "33.333%", "66.666%"].map((l) => (
              <span
                key={l}
                aria-hidden
                className="hidden md:block absolute top-1/2 w-3 h-3 -translate-y-1/2 bg-white"
                style={{ left: l, marginLeft: l === "0%" ? 0 : -6, border: `2px solid ${BB.cobalt}` }}
              />
            ))}
          </div>
          <Stagger as="ol" className="grid md:grid-cols-3 gap-y-12">
            {MODELS.map((m) => (
              <li key={m.t} className="pt-8 md:pr-8">
                <span className="flex items-center gap-4">
                  <Tile icon={m.icon} />
                  <span className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.cobaltDeep }}>
                    {m.tag}
                  </span>
                </span>
                <h3 className="mt-6 font-head h-card" style={{ color: BB.ink }}>
                  {m.t}
                </h3>
                <p className="mt-4 font-sans-g t-base max-w-[36ch]" style={{ color: BB.ink3 }}>
                  {m.d}
                </p>
              </li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
