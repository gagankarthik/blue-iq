import SiteShell from "@/components/SiteShell";
import { UI } from "@/lib/theme";

export type LegalSection = { h: string; body: string[] };

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
          style={{ background: "radial-gradient(55% 80% at 80% 0%, rgba(44,73,214,0.10), transparent 60%)" }} />
        <article className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-24">
          <p className="font-mono-g text-[11px] uppercase tracking-[0.18em]" style={{ color: UI.blue2 }}>Legal</p>
          <h1 className="font-display font-light tracking-[-0.025em] leading-[1.05] mt-3" style={{ fontSize: "clamp(34px,4.4vw,56px)", color: UI.ink }}>{title}</h1>
          <p className="font-mono-g text-[12px] mt-4" style={{ color: UI.faint }}>Last updated {updated}</p>
          <p className="font-sans-g text-[15.5px] leading-relaxed mt-7" style={{ color: UI.sub }}>{intro}</p>

          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <section key={i} className="scroll-mt-24" id={`s-${i + 1}`}>
                <h2 className="font-display text-[20px] font-semibold mb-3 flex gap-3" style={{ color: UI.ink }}>
                  <span className="font-mono-g text-[13px] tabular-nums pt-1" style={{ color: UI.blue2 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.h}</span>
                </h2>
                <div className="pl-8">
                  {s.body.map((p, j) => (
                    <p key={j} className="font-sans-g text-[14.5px] leading-relaxed mb-3" style={{ color: UI.sub }}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="font-sans-g text-[13.5px] mt-14 pt-7" style={{ color: UI.faint, borderTop: `1px solid ${UI.line}` }}>
            Questions about this document? Contact <a href="mailto:hello@blue-iq.com" className="font-medium" style={{ color: UI.blue2 }}>hello@blue-iq.com</a>.
          </p>
        </article>
      </section>
    </SiteShell>
  );
}
