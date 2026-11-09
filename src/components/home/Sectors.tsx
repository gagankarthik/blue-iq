import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import { BB } from "@/lib/theme";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, SECTOR_ICON, Tile } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   "Built for your sector", original copy, as a grid of six cards on the
   page's one ink block. Each card: the sector's icon tile, its name, its
   one-line job, what Sonar reads there, and a way to the sector page. Cards
   rise in turn; on hover the edge turns cobalt and the arrow moves.
   ──────────────────────────────────────────────────────────────── */

/* sentence-case a list item, leaving acronyms such as "NDAs" alone */
const lower = (s: string) => (/^[A-Z]{2,}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

export default function Sectors() {
  return (
    <section className="px-6 sm:px-8 pb-24" aria-labelledby="sectors-h">
      <div className="max-w-[1112px] mx-auto px-6 lg:px-8 py-16 lg:py-24 rounded-[24px]" style={{ background: BB.ink }}>
        <Head
          id="sectors-h"
          tone="dark"
          title="Built for your sector"
          sub="From admissions to credentialing to contract review, Blue-IQ reads the paperwork each industry runs on."
        />

        <Stagger as="ul" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((x) => {
            const G = SECTOR_ICON[x.id];
            return (
              <li key={x.id}>
                <Link
                  href={`/solutions/${x.id}`}
                  className="group flex flex-col h-full p-8 rounded-2xl border border-white/10 transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-[#1F4FE6] hover:bg-white/[0.04]"
                  style={{ background: BB.navy2 }}
                >
                  <span className="flex items-start justify-between">
                    {G && <Tile icon={G} tone="onDark" />}
                    <I.arrow size={16} className="text-white/50 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-white" />
                  </span>
                  <span className="mt-8 font-head h-card text-white">{x.name}</span>
                  <span className="mt-4 font-sans-g t-base" style={{ color: "#C2C7D1" }}>
                    {x.line}
                  </span>
                  <span className="mt-auto pt-8">
                    <span className="block pt-6 font-mono-g text-[13px] uppercase tracking-[0.06em] border-t border-white/10" style={{ color: BB.sky }}>
                      Sonar reads
                    </span>
                    <span className="block mt-2 font-sans-g text-[13px] leading-[1.5]" style={{ color: "#A3A9B5" }}>
                      {x.reads.slice(0, 3).map(lower).join(", ")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <SqBtn href="/solutions" tone="light" size="lg" arrow>
            Explore solutions
          </SqBtn>
        </div>
      </div>
    </section>
  );
}
