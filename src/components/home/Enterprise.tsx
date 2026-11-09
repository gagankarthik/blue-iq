import { BB } from "@/lib/theme";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, Tile, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   Enterprise-grade, original copy in the blueprint system: two white
   cells of checklists side by side, then one wide tick-framed cell for
   security and governance with its controls as square mono tags (one
   neutral style, not a rainbow), and the one action, the Trust Center.
   Every statement is one the company already makes; compliance is stated
   as "aligned".
   ──────────────────────────────────────────────────────────────── */

const CARDS: { icon: Ico; t: string; d: string; items: string[] }[] = [
  {
    icon: I.team,
    t: "We work alongside you",
    d: "Our engineers start from your real documents and stay on until the workflow runs. Not a handoff, a partnership.",
    items: ["Real documents from day one", "The output agreed with you first", "Support as your documents change"],
  },
  {
    icon: I.integrate,
    t: "Fits the stack you have",
    d: "Clean data arrives in the systems your teams already use, in the shape you defined.",
    items: ["REST API and signed webhooks", "Schema-validated JSON", "Connectors for ATS, ERP and CLM"],
  },
];

const TAGS = ["SOC 2 aligned", "HIPAA aligned", "GDPR aligned", "Single sign-on", "Role-based access", "Private workspaces"];

export default function Enterprise() {
  return (
    <section className="px-6 sm:px-8 pb-24" aria-labelledby="enterprise-h">
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: BB.line }} />
      <div className="max-w-[1112px] mx-auto">
        <Head
          id="enterprise-h"
          title="Enterprise-grade. From the first file."
          sub="Control, security and people who know your documents. Built in from day one, not bolted on."
        />

        <Stagger className="mt-12 grid md:grid-cols-2 gap-4">
          {CARDS.map((c) => (
            <div key={c.t} className="p-8 rounded-2xl" style={{ background: BB.panel, border: `1px solid ${BB.line}` }}>
              <Tile icon={c.icon} size={64} />
              <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                {c.t}
              </h3>
              <p className="mt-4 font-sans-g t-base max-w-[52ch]" style={{ color: BB.ink3 }}>
                {c.d}
              </p>
              <ul className="mt-8 grid gap-4">
                {c.items.map((x) => (
                  <li key={x} className="flex items-start gap-4 font-sans-g t-base" style={{ color: BB.ink2 }}>
                    <I.check size={16} weight="bold" className="mt-1 shrink-0" style={{ color: BB.cobalt }} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>

        <div className="relative mt-4 p-8 rounded-2xl grid lg:grid-cols-2 gap-8 items-center" style={{ background: BB.panel, border: `1px solid ${BB.line}` }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Tile icon={I.trust} size={64} />
            <div>
              <h3 className="font-head h-card" style={{ color: BB.ink }}>
                Security and governance
              </h3>
              <p className="mt-4 font-sans-g t-base max-w-[52ch]" style={{ color: BB.ink3 }}>
                Documents move over TLS, projects stay in private workspaces, and every uncertain value goes to a person before it reaches your systems.
              </p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {TAGS.map((t) => (
              <li
                key={t}
                className="h-10 inline-flex items-center px-4 rounded-[8px] font-mono-g text-[13px] uppercase tracking-[0.06em]"
                style={{ background: BB.canvas, color: BB.ink2, border: `1px solid ${BB.line}` }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-center">
          <SqBtn href="/trust" tone="ink" size="lg" arrow>
            Visit the Trust Center
          </SqBtn>
        </div>
      </div>
    </section>
  );
}
