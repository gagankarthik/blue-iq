import Link from "next/link";
import { SA } from "@/lib/theme";
import { WRAP, PageHero, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { IconArrow, IconCheck } from "@/components/icons/BqIcons";
import type { Spot } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   Server-rendered building blocks for the detail pages (platform, sector,
   trust), in the landing page's language: centred serif section heads,
   white rounded cards on the off-white page, spots on soft wells. No
   client JavaScript: the FAQ uses native <details>.
   ──────────────────────────────────────────────────────────────── */

type Action = { label: string; href: string; external?: boolean };

export function DetailHeader({
  here,
  trail,
  title,
  lede,
  primary,
  secondary,
  aside,
}: {
  here: string;
  trail?: [string, string][];
  eyebrow?: string;
  title: string;
  lede: string;
  primary: Action;
  secondary?: Action;
  aside?: React.ReactNode;
}) {
  return (
    <PageHero here={here} trail={trail} title={title} lede={lede} primary={primary} secondary={secondary}>
      {aside}
    </PageHero>
  );
}

export function Block({
  id,
  title,
  sub,
  align = "center",
  children,
}: {
  id?: string;
  kicker?: string;
  title: string;
  sub?: string;
  tone?: "white" | "tint";
  align?: "center" | "left";
  children: React.ReactNode;
}) {
  const hid = id ? `${id}-h` : undefined;
  const c = align === "center";
  return (
    <section id={id} className="py-20 sm:py-28 scroll-mt-24" aria-labelledby={hid}>
      <div className={WRAP}>
        <div className={c ? "text-center" : ""}>
          <h2 id={hid} className={`font-display t-h1 max-w-[22ch] ${c ? "mx-auto" : ""}`} style={{ color: SA.ink }}>
            {title}
          </h2>
          {sub && (
            <p className={`mt-4 font-sans-g text-[1.125rem] leading-[1.6] max-w-[56ch] ${c ? "mx-auto" : ""}`} style={{ color: SA.sub }}>
              {sub}
            </p>
          )}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

/* capabilities: white cards, a check on a blue disc */
export function CapabilityGrid({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map(([t, d]) => (
        <div key={t} className={`${CARD} p-7`} style={CARD_EDGE}>
          <dt className="flex items-center gap-3 font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
            <span className="grid place-items-center w-6 h-6 rounded-full shrink-0" style={{ background: SA.accent, color: "#FFFFFF" }}>
              <IconCheck size={13} />
            </span>
            {t}
          </dt>
          <dd className="mt-3 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
            {d}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* numbered steps as cards; an optional spot per step */
export function StepTrack({ steps, spots }: { steps: [string, string][]; spots?: Spot[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {steps.map(([t, d], k) => {
        const S = spots?.[k];
        return (
          <li key={t} className={`${CARD} p-7 flex flex-col`} style={CARD_EDGE}>
            <div className="flex items-start justify-between">
              {S ? (
                <SpotWell>
                  <S size={56} />
                </SpotWell>
              ) : (
                <span
                  className="grid place-items-center w-11 h-11 rounded-full font-sans-g text-[16px] font-medium tabular-nums"
                  style={{ background: SA.accentSoft, color: "#2348B8" }}
                >
                  {k + 1}
                </span>
              )}
              {S && (
                <span className="font-mono-g text-[13px]" style={{ color: SA.faint }}>
                  0{k + 1}
                </span>
              )}
            </div>
            <span className="mt-6 block font-sans-g text-[1.25rem] font-medium" style={{ color: SA.ink }}>
              {t}
            </span>
            <span className="mt-2 block font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
              {d}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* sample output: field, value, score (with a word, not just a colour) */
export function OutputTable({ caption, rows, line = 0.9 }: { caption: string; rows: { field: string; value: string; score: number }[]; line?: number }) {
  return (
    <div className={`${CARD} overflow-x-auto max-w-[900px] mx-auto`} style={CARD_EDGE}>
      <table className="w-full min-w-[480px] text-left">
        <caption className="px-6 pt-5 pb-3 text-left font-sans-g text-[14px]" style={{ color: SA.faint }}>
          {caption}
        </caption>
        <thead>
          <tr style={{ borderBottom: `1px solid ${SA.line}` }}>
            {["Field", "Value", "Confidence"].map((h) => (
              <th key={h} scope="col" className="px-6 py-3 font-sans-g text-[13px] font-medium" style={{ color: SA.faint }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const low = r.score < line;
            return (
              <tr key={r.field} style={{ borderTop: i ? `1px solid ${SA.line}` : undefined }}>
                <th scope="row" className="px-6 py-3.5 font-mono-g text-[14px] font-normal" style={{ color: SA.sub }}>
                  {r.field}
                </th>
                <td className="px-6 py-3.5 font-mono-g text-[14px]" style={{ color: SA.ink }}>
                  {r.value}
                </td>
                <td className="px-6 py-3.5">
                  <span
                    className="inline-flex items-center gap-1 h-6 px-2 rounded-[6px] font-mono-g text-[12px] font-medium tabular-nums"
                    style={{ background: low ? "#FEF3C7" : "#ECFDF5", color: low ? "#78350F" : "#065F46" }}
                  >
                    {low ? "Review" : "Accepted"} {r.score.toFixed(2)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* a no-JS FAQ: native disclosure, keyboard and screen-reader ready */
export function FaqList({ faqs }: { faqs: [string, string][] }) {
  return (
    <div className="max-w-[860px] mx-auto grid gap-2">
      {faqs.map(([q, a]) => (
        <details key={q} className={`group ${CARD} px-6`} style={CARD_EDGE}>
          <summary
            className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none font-sans-g text-[17px] font-medium [&::-webkit-details-marker]:hidden"
            style={{ color: SA.ink }}
          >
            {q}
            <span
              aria-hidden
              className="shrink-0 grid place-items-center w-8 h-8 rounded-full text-[18px] leading-none transition-transform duration-200 group-open:rotate-45"
              style={{ background: SA.bg2, color: SA.ink }}
            >
              +
            </span>
          </summary>
          <p className="pb-6 pr-10 font-sans-g text-base leading-[1.65]" style={{ color: SA.sub }}>
            {a}
          </p>
        </details>
      ))}
    </div>
  );
}

/* related pages, as cards; an optional spot per card */
export function RelatedLinks({ items }: { items: { t: string; d: string; href: string; Spot?: Spot }[] }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((x) => (
        <li key={x.href + x.t}>
          <Link
            href={x.href}
            className={`group ${CARD} h-full flex items-start gap-5 p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#D4D4DA] hover:shadow-[0_16px_32px_-24px_rgba(30,33,48,0.3)]`}
            style={CARD_EDGE}
          >
            {x.Spot && (
              <SpotWell size={64}>
                <x.Spot size={44} />
              </SpotWell>
            )}
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-3 font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                {x.t}
                <IconArrow size={16} className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: SA.faint }} />
              </span>
              <span className="mt-1.5 block font-sans-g text-[15px] leading-[1.55]" style={{ color: SA.sub }}>
                {x.d}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* "at a glance": a framed card of facts that sits on the header wash */
export function Glance({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div
      className="max-w-[1000px] mx-auto rounded-[28px] p-2"
      style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 30px 60px -40px rgba(30,40,90,0.35)" }}
    >
      <div className={`${CARD} overflow-hidden`} style={CARD_EDGE}>
        <p className="px-6 pt-5 pb-1 font-sans-g text-[13px] font-medium uppercase tracking-[0.12em] text-center" style={{ color: SA.faint }}>
          {title}
        </p>
        <dl className={`grid sm:grid-cols-2 ${rows.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {rows.map(([k, v]) => (
            <div key={k} className="px-6 py-5 text-center">
              <dt className="font-sans-g text-[14px]" style={{ color: SA.faint }}>
                {k}
              </dt>
              <dd className="mt-1.5 font-sans-g text-[1.0625rem] font-medium leading-snug" style={{ color: SA.ink }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
