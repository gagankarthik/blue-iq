import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import { Btn } from "@/components/system/Btn";
import { IconArrow } from "@/components/icons/BqIcons";
import { SECTOR_SPOT } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   Sectors — sarvam.ai's "India Can" composition: a narrow statement card
   on the left with a dark pill, a wide card on the right. Here the wide
   card is the six sectors as a grid of ways in, each with its one-line job.
   ──────────────────────────────────────────────────────────────── */

export default function Sectors() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32" aria-labelledby="sectors-h">
      <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-4 rounded-[24px] bg-white p-8 sm:p-10 flex flex-col" style={{ border: "1px solid #ECECEF" }}>
          <h2 id="sectors-h" className="font-display t-h1" style={{ color: "#1F1F1F" }}>
            Built for your sector
          </h2>
          <p className="mt-4 font-sans-g text-[1.0625rem] leading-[1.6]" style={{ color: "#55565E" }}>
            From admissions to credentialing to contract review, Blue-IQ reads the paperwork each industry runs on.
          </p>
          <div className="mt-auto pt-10">
            <Btn href="/solutions" size="lg">
              Explore solutions
            </Btn>
          </div>
        </div>

        <ul className="col-span-12 lg:col-span-8 rounded-[24px] bg-white grid sm:grid-cols-2 overflow-hidden" style={{ border: "1px solid #ECECEF" }}>
          {INDUSTRIES.map((x, k) => {
            const S = SECTOR_SPOT[x.id];
            return (
              <li
                key={x.id}
                className={`${k % 2 ? "sm:border-l" : ""} ${k >= 2 ? "sm:border-t" : ""} ${k ? "max-sm:border-t" : ""}`}
                style={{ borderColor: "#ECECEF" }}
              >
                <Link href={`/solutions/${x.id}`} className="group flex h-full items-start gap-5 p-6 sm:p-7 transition-colors duration-150 hover:bg-[#FAFAFA]">
                  <span
                    className="shrink-0 grid place-items-center w-16 h-16 rounded-[16px] transition-transform duration-300 group-hover:scale-[1.04]"
                    style={{ background: "#EEF3FF" }}
                  >
                    {S && <S size={44} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-sans-g text-[1.125rem] font-medium" style={{ color: "#1F1F1F" }}>
                        {x.name}
                      </span>
                      <IconArrow size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: "#9A9BA3" }} />
                    </span>
                    <span className="block mt-1.5 font-sans-g text-[15px] leading-[1.55]" style={{ color: "#55565E" }}>
                      {x.line}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
