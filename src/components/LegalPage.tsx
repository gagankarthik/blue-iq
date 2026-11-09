"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BB } from "@/lib/theme";
import { WRAP, PlainHero } from "@/components/page/kit";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   The legal pages (/privacy, /terms, /accessibility). A reading page: the
   only thing it owes you is legibility, and the only thing it owes the
   company is that you can find clause 9 without scrolling for it.

   Reading order: the header (title, intro, last updated), a contents list,
   then the document. The document is set at a 65ch measure in the body
   size, each section under a numbered heading with a hairline above it.
   On desktop the contents list sits beside the document and tracks where
   you are; below lg it is a numbered ruled list above the document.

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

const MONO = "font-mono-g text-[13px] uppercase tracking-[0.06em]";
const num = (i: number) => String(i + 1).padStart(2, "0");

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  const ids = useMemo(() => slugs(sections), [sections]);
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const secs = useRef<(HTMLElement | null)[]>([]);

  /* which section am I in? The band is the top 40% of the viewport, starting
     below the navbar. Whichever section is highest inside that band wins;
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
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />

      <main id="main">
        <PlainHero crumb={title} title={title} lede={intro} meta={`Last updated ${updated}`} />

        <div className={WRAP}>
          <div aria-hidden className="h-px" style={{ background: BB.line }} />
          <div className="py-24 lg:grid lg:grid-cols-[minmax(0,256px)_minmax(0,1fr)] lg:gap-x-16">
            {/* the contents list, below lg: numbered, ruled, above the document */}
            <nav aria-label="Contents" className="lg:hidden mb-16">
              <p className={MONO} style={{ color: BB.ink3 }}>
                Contents
              </p>
              <ol className="mt-4">
                {sections.map((s, i) => (
                  <li key={ids[i]} style={{ borderTop: `1px solid ${BB.line}` }}>
                    <a href={`#${ids[i]}`} className="flex gap-4 py-2 font-sans-g t-base hover:underline underline-offset-4" style={{ color: BB.ink }}>
                      <span className={`${MONO} pt-1 tabular-nums`} style={{ color: BB.cobalt }}>
                        {num(i)}
                      </span>
                      <span>{s.h}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* the contents list, desktop: sticky beside the document. The grid
                item stretches to the article's height, which gives it room to travel. */}
            <nav aria-label="Contents" className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pb-4">
                <p className={`${MONO} pb-4`} style={{ color: BB.ink3, borderBottom: `1px solid ${BB.line}` }}>
                  Contents
                </p>
                <ol className="mt-2">
                  {sections.map((s, i) => {
                    const on = active === ids[i];
                    return (
                      <li key={ids[i]}>
                        <a
                          href={`#${ids[i]}`}
                          aria-current={on ? "location" : undefined}
                          className="flex gap-4 py-2 pl-4 -ml-px font-sans-g t-meta-13 transition-colors duration-150 hover:underline underline-offset-4"
                          style={{ color: on ? BB.ink : BB.ink3, borderLeft: `2px solid ${on ? BB.cobalt : "transparent"}`, fontWeight: on ? 500 : 400 }}
                        >
                          <span className="font-mono-g tabular-nums" style={{ color: on ? BB.cobalt : BB.ink3 }}>
                            {num(i)}
                          </span>
                          <span>{s.h}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </nav>

            {/* the document: 65ch is the whole point */}
            <article className="max-w-[65ch] min-w-0">
              {sections.map((s, i) => (
                <section
                  key={ids[i]}
                  ref={(el: HTMLElement | null) => {
                    secs.current[i] = el;
                  }}
                  data-sid={ids[i]}
                  aria-labelledby={ids[i]}
                  className={i === 0 ? "" : "mt-12 pt-12"}
                  style={i === 0 ? undefined : { borderTop: `1px solid ${BB.line}` }}
                >
                  <h2 id={ids[i]} className="scroll-mt-28 font-head h-card" style={{ color: BB.ink }}>
                    <span aria-hidden className={`block mb-2 ${MONO} tabular-nums`} style={{ color: BB.cobalt }}>
                      {num(i)}
                    </span>
                    {s.h}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="font-sans-g t-base" style={{ color: BB.ink2 }}>
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="mt-16 pt-8 font-sans-g t-base" style={{ color: BB.ink3, borderTop: `1px solid ${BB.line}` }}>
                Questions about this document?{" "}
                <Link href="/contact" className="font-medium underline underline-offset-4" style={{ color: BB.cobalt }}>
                  Contact us
                </Link>
                .
              </p>
            </article>
          </div>
        </div>
      </main>

      {/* a legal page does not close on a sales pitch */}
      <SiteFooter cta={false} />
    </div>
  );
}
