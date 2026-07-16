"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { WRAP, PageHero } from "@/components/page/kit";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   The legal pages.

   The old layout was the warm-cream system: a glow blob behind the hero, a
   mono-caps "LEGAL" eyebrow over the title, bold 20px headings, and the whole
   document set in a 3xl column that ran the prose out to ~95 characters a
   line. It was a decorated page. A legal page is a READING page — the only
   thing it owes you is legibility, and the only thing it owes the company is
   that you can find clause 9 without scrolling for it.

   So: a 68ch measure, 1.8 line-height, headings large and light, a 1px rule
   between sections and nothing else, and a sticky contents list that tracks
   where you are. Below lg: the list collapses to an inline index — a sidebar
   on a phone is just a broken sidebar.

   The sticky column is load-bearing and fragile: `position: sticky` is killed
   by ANY ancestor that is a scroll container, so the page shell uses
   `overflow-x: clip` (which does not create one) and never `hidden` (which
   does). This has broken here before. Do not "fix" it back.
   ──────────────────────────────────────────────────────────────── */

export type LegalSection = { h: string; body: string[] };

/* stable, readable anchors: "How we share information" → #how-we-share-information */
function slugs(sections: LegalSection[]) {
  const used = new Map<string, number>();
  return sections.map((s) => {
    const base =
      s.h
        .toLowerCase()
        .replace(/[‘’']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  });
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const reduce = useReducedMotion();
  const ids = useMemo(() => slugs(sections), [sections]);
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const secs = useRef<(HTMLElement | null)[]>([]);

  /* which section am I in? The band is the top 40% of the viewport, starting
     below the 76px navbar. Whichever section is highest inside that band wins;
     if none is (a very short section mid-scroll), the last answer stands. */
  useEffect(() => {
    const els = secs.current.filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.sid;
          if (!id) continue;
          if (e.isIntersecting) seen.add(id);
          else seen.delete(id);
        }
        const first = ids.find((id) => seen.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero title={title} lede={intro} meta={[`Last updated ${updated}`]} />

        <section className={WRAP}>
          <div className="pb-28 sm:pb-36 lg:grid lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
            {/* ── the index, inline. Below lg this is all the contents list gets
                  to be, and it is enough: thirteen links, wrapped, on a rule. ── */}
            <nav
              aria-label="Contents"
              className="lg:hidden py-6 mb-14"
              style={{ borderTop: `1px solid ${SA.line2}`, borderBottom: `1px solid ${SA.line2}` }}
            >
              <p className="font-mono-g text-[10px] uppercase tracking-[0.2em]" style={{ color: SA.faint }}>
                Contents
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                {sections.map((s, i) => (
                  <li key={ids[i]}>
                    <a
                      href={`#${ids[i]}`}
                      className="font-sans-g text-[13.5px] leading-[1.4]"
                      style={{ color: SA.sub }}
                    >
                      {s.h}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── the index, sticky. The grid item stretches to the full height of
                  the article, which is what gives the sticky child room to travel. ── */}
            <nav aria-label="Contents" className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain">
                <p
                  className="font-mono-g text-[10px] uppercase tracking-[0.2em] pb-4"
                  style={{ color: SA.faint, borderBottom: `1px solid ${SA.line}` }}
                >
                  Contents
                </p>
                <ul className="mt-3">
                  {sections.map((s, i) => {
                    const on = active === ids[i];
                    return (
                      <li key={ids[i]}>
                        <a
                          href={`#${ids[i]}`}
                          aria-current={on ? "true" : undefined}
                          className="flex gap-3 py-[7px] font-sans-g text-[13.5px] leading-[1.45] transition-colors duration-200 hover:[color:var(--ink)]"
                          style={
                            {
                              color: on ? SA.ink : SA.faint,
                              "--ink": SA.ink,
                            } as React.CSSProperties
                          }
                        >
                          <span
                            className="font-mono-g text-[10.5px] tabular-nums pt-[3px] transition-colors duration-200"
                            style={{ color: on ? SA.accent : SA.line2 }}
                          >
                            {num(i)}
                          </span>
                          <span>{s.h}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* ── the document. 68ch is the whole point: legal prose stretched to
                  a 1180px container is prose nobody finishes. ── */}
            <article className="max-w-[68ch] min-w-0">
              {sections.map((s, i) => (
                <motion.section
                  key={ids[i]}
                  ref={(el: HTMLElement | null) => {
                    secs.current[i] = el;
                  }}
                  data-sid={ids[i]}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={i === 0 ? "" : "mt-14 pt-14"}
                  style={i === 0 ? undefined : { borderTop: `1px solid ${SA.line}` }}
                >
                  <h2
                    id={ids[i]}
                    className="scroll-mt-24 font-display font-normal leading-[1.2]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)",
                      letterSpacing: "-0.03em",
                      color: SA.ink,
                    }}
                  >
                    {s.h}
                  </h2>

                  <div className="mt-6 space-y-5">
                    {s.body.map((p, j) => (
                      <p
                        key={j}
                        className="font-sans-g leading-[1.8]"
                        style={{ fontSize: "1.02rem", color: SA.sub }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.section>
              ))}

              <p
                className="mt-16 pt-8 font-sans-g text-[14.5px] leading-[1.7]"
                style={{ color: SA.faint, borderTop: `1px solid ${SA.line2}` }}
              >
                Questions about this document? Write to{" "}
                <a
                  href="mailto:hello@blue-iq.ai"
                  className="underline underline-offset-4 decoration-1 transition-colors"
                  style={{ color: SA.accent, textDecorationColor: SA.line2 }}
                >
                  hello@blue-iq.ai
                </a>
                .
              </p>
            </article>
          </div>
        </section>
      </main>

      {/* a legal page does not close on a sales pitch */}
      <SiteFooter cta={false} />
    </div>
  );
}
