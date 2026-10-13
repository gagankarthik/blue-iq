import { Btn } from "@/components/system/Btn";
import { IconCheck } from "@/components/icons/BqIcons";
import { type Spot, SpotTeam, SpotIntegrate, SpotSecure } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   Enterprise-grade — sarvam.ai's closing trust block: a centred heading
   and line, two cards of checklists side by side, one wide card for
   security with colour-coded pills, one dark pill. Every statement is one
   the company already makes; compliance is stated as "aligned".
   ──────────────────────────────────────────────────────────────── */

const CARDS: { Spot: Spot; t: string; d: string; items: string[] }[] = [
  {
    Spot: SpotTeam,
    t: "We work alongside you",
    d: "Our engineers start from your real documents and stay on until the workflow runs. Not a handoff, a partnership.",
    items: ["Real documents from day one", "The output agreed with you first", "Support as your documents change"],
  },
  {
    Spot: SpotIntegrate,
    t: "Fits the stack you have",
    d: "Clean data arrives in the systems your teams already use, in the shape you defined.",
    items: ["REST API and signed webhooks", "Schema-validated JSON", "Connectors for ATS, ERP and CLM"],
  },
];

const PILLS: { t: string; bg: string; c: string; b: string }[] = [
  { t: "SOC 2 aligned", bg: "#EEF3FF", c: "#2348B8", b: "#D6E1FF" },
  { t: "HIPAA aligned", bg: "#ECFDF5", c: "#065F46", b: "#C9F0DD" },
  { t: "GDPR aligned", bg: "#FFF4E8", c: "#8F4507", b: "#FBDDBD" },
  { t: "Single sign-on", bg: "#F3F0FF", c: "#4B32B0", b: "#E0D9FF" },
  { t: "Role-based access", bg: "#FFF0F3", c: "#9F1D40", b: "#FBD3DC" },
  { t: "Private workspaces", bg: "#EAF7FB", c: "#0B5A72", b: "#CBEAF3" },
];

export default function Enterprise() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32" aria-labelledby="enterprise-h">
      <div className="max-w-[1240px] mx-auto">
        <h2 id="enterprise-h" className="mx-auto text-center font-display t-h1 max-w-[18ch]" style={{ color: "#1F1F1F" }}>
          Enterprise-grade. From the first file.
        </h2>
        <p className="mt-4 mx-auto text-center font-sans-g text-[1.125rem] leading-[1.6] max-w-[50ch]" style={{ color: "#55565E" }}>
          Control, security and people who know your documents. Built in from day one, not bolted on.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-3">
          {CARDS.map((c) => (
            <div key={c.t} className="rounded-[24px] bg-white p-8 sm:p-10" style={{ border: "1px solid #ECECEF" }}>
              <span className="grid place-items-center w-20 h-20 rounded-[18px]" style={{ background: "#EEF3FF" }}>
                <c.Spot size={56} />
              </span>
              <h3 className="mt-6 font-sans-g text-[1.375rem] font-medium" style={{ color: "#1F1F1F" }}>
                {c.t}
              </h3>
              <p className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: "#55565E" }}>
                {c.d}
              </p>
              <ul className="mt-6 grid gap-3">
                {c.items.map((x) => (
                  <li key={x} className="flex items-center gap-3 font-sans-g text-base" style={{ color: "#3A3B44" }}>
                    <span className="grid place-items-center w-5 h-5 rounded-full shrink-0" style={{ background: "#2F5FE0", color: "#FFFFFF" }}>
                      <IconCheck size={12} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 rounded-[24px] bg-white p-8 sm:p-10 grid lg:grid-cols-2 gap-8 items-center" style={{ border: "1px solid #ECECEF" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <span className="shrink-0 grid place-items-center w-20 h-20 rounded-[18px]" style={{ background: "#EEF3FF" }}>
                <SpotSecure size={56} />
              </span>
              <div>
                <h3 className="font-sans-g text-[1.375rem] font-medium" style={{ color: "#1F1F1F" }}>
                  Security and governance
                </h3>
                <p className="mt-2 font-sans-g text-base leading-[1.6] max-w-[52ch]" style={{ color: "#55565E" }}>
                  Documents move over TLS, projects stay in private workspaces, and every uncertain value goes to a person before it reaches your systems.
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {PILLS.map((p) => (
                <li
                  key={p.t}
                  className="h-10 inline-flex items-center px-4 rounded-[12px] font-sans-g text-[15px] font-medium"
                  style={{ background: p.bg, color: p.c, border: `1px solid ${p.b}` }}
                >
                  {p.t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Btn href="/trust" size="lg">
            Visit the Trust Center
          </Btn>
        </div>
      </div>
    </section>
  );
}
