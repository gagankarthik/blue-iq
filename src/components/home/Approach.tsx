import { Btn } from "@/components/system/Btn";
import { type Spot, SpotRead, SpotExtract, SpotScore, SpotRoute } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   How Sonar works — one deep navy panel, the page's change of key. A split
   header, then four steps in a row, each with its own spot on a light well.
   ──────────────────────────────────────────────────────────────── */

const STEPS: { Spot: Spot; t: string; d: string }[] = [
  { Spot: SpotRead, t: "Read", d: "PDFs, Word files, scans and phone photos, read in context." },
  { Spot: SpotExtract, t: "Extract", d: "The fields you need from any layout, with no templates." },
  { Spot: SpotScore, t: "Score", d: "A confidence score on every value, not one per file." },
  { Spot: SpotRoute, t: "Route", d: "Sure values to your systems, the rest to a person." },
];

export default function Approach() {
  return (
    <section className="px-3 sm:px-8 py-12 sm:py-16" aria-labelledby="approach-h">
      <div className="max-w-[1240px] mx-auto rounded-[28px] px-5 sm:px-12 py-16 sm:py-20" style={{ background: "#1E2130" }}>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-end">
          <h2 id="approach-h" className="font-display t-h1 text-white max-w-[16ch]">
            Intelligence that knows how sure it is
          </h2>
          <div>
            <p className="font-sans-g text-[1.0625rem] leading-[1.6] max-w-[48ch]" style={{ color: "#C9CCDA" }}>
              Sonar reads your documents, scores every value it finds, and routes anything uncertain to a person, so nothing wrong slips through.
            </p>
            <div className="mt-6">
              <Btn href="/platform" variant="secondary" tone="dark" arrow>
                How Sonar works
              </Btn>
            </div>
          </div>
        </div>

        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STEPS.map((s, k) => (
            <li key={s.t} className="rounded-[20px] p-6" style={{ background: "#272B3D", border: "1px solid #343950" }}>
              <div className="flex items-start justify-between">
                <span className="grid place-items-center w-20 h-20 rounded-[16px]" style={{ background: "#EEF3FF" }}>
                  <s.Spot size={56} />
                </span>
                <span className="font-mono-g text-[13px]" style={{ color: "#A9AEC4" }}>
                  0{k + 1}
                </span>
              </div>
              <h3 className="mt-6 font-sans-g text-[1.25rem] font-medium text-white">{s.t}</h3>
              <p className="mt-2 font-sans-g text-[15px] leading-[1.6]" style={{ color: "#C9CCDA" }}>
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
