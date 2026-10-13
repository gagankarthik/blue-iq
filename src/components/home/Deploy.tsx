import { type Spot, SpotCloud, SpotVpc, SpotOnPrem } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   Where it runs — three deployment models side by side, each a white card
   whose top half is a soft well holding its spot. Same Sonar, same scores,
   wherever it is hosted.
   ──────────────────────────────────────────────────────────────── */

const MODELS: { Spot: Spot; t: string; d: string; tag: string; well: string }[] = [
  {
    Spot: SpotCloud,
    t: "Blue-IQ Cloud",
    d: "Fully managed, scales on its own, and the fastest way to value.",
    tag: "Managed by us",
    well: "linear-gradient(180deg, #E6EDFF 0%, #F6F8FF 100%)",
  },
  {
    Spot: SpotVpc,
    t: "Private cloud (VPC)",
    d: "Inside your own security perimeter, with our team running it.",
    tag: "Your perimeter",
    well: "linear-gradient(180deg, #E3F4FF 0%, #F5FBFF 100%)",
  },
  {
    Spot: SpotOnPrem,
    t: "On-premises",
    d: "Full control on your own hardware, air-gapped for regulated industries.",
    tag: "Your hardware",
    well: "linear-gradient(180deg, #E5F6EE 0%, #F5FBF8 100%)",
  },
];

export default function Deploy() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32" aria-labelledby="deploy-h">
      <div className="max-w-[1240px] mx-auto">
        <h2 id="deploy-h" className="mx-auto text-center font-display t-h1 max-w-[20ch]" style={{ color: "#1F1F1F" }}>
          Built to run anywhere your business runs
        </h2>
        <p className="mt-4 mx-auto text-center font-sans-g text-[1.125rem] leading-[1.6] max-w-[48ch]" style={{ color: "#55565E" }}>
          The same Sonar and the same scores, wherever your documents have to stay.
        </p>

        <ul className="mt-12 grid md:grid-cols-3 gap-3">
          {MODELS.map((m) => (
            <li key={m.t} className="rounded-[24px] bg-white overflow-hidden" style={{ border: "1px solid #ECECEF" }}>
              <div className="h-52 grid place-items-center" style={{ background: m.well }}>
                <m.Spot size={104} />
              </div>
              <div className="p-7">
                <span
                  className="inline-flex h-7 items-center px-3 rounded-full font-sans-g text-[13px] font-medium"
                  style={{ background: "#F3F3F5", color: "#3A3B44" }}
                >
                  {m.tag}
                </span>
                <h3 className="mt-4 font-sans-g text-[1.375rem] font-medium" style={{ color: "#1F1F1F" }}>
                  {m.t}
                </h3>
                <p className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: "#55565E" }}>
                  {m.d}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
