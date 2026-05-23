import SiteShell from "@/components/SiteShell";
import { C } from "@/lib/theme";

export type LegalSection = { h: string; body: string[] };

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <SiteShell>
      <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-24">
        <p className="font-mono-g text-[11px] uppercase tracking-[0.18em]" style={{ color: C.blue2 }}>Legal</p>
        <h1 className="font-display font-bold tracking-[-0.025em] leading-[1.05] mt-3" style={{ fontSize: "clamp(34px,4.4vw,56px)" }}>{title}</h1>
        <p className="font-mono-g text-[12px] mt-4" style={{ color: C.faint }}>Last updated {updated}</p>
        <p className="font-sans-g text-[15.5px] leading-relaxed mt-7" style={{ color: C.sub }}>{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i} className="scroll-mt-24" id={`s-${i + 1}`}>
              <h2 className="font-display text-[20px] font-semibold mb-3 flex gap-3" style={{ color: C.ink }}>
                <span className="font-mono-g text-[13px] tabular-nums pt-1" style={{ color: C.blue2 }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{s.h}</span>
              </h2>
              <div className="pl-8">
                {s.body.map((p, j) => (
                  <p key={j} className="font-sans-g text-[14.5px] leading-relaxed mb-3" style={{ color: C.sub }}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="font-sans-g text-[13.5px] mt-14 pt-7" style={{ color: C.faint, borderTop: `1px solid ${C.line}` }}>
          Questions about this document? Contact <a href="mailto:hello@blue-iq.com" className="font-medium" style={{ color: C.blue2 }}>hello@blue-iq.com</a>.
        </p>
      </article>
    </SiteShell>
  );
}
