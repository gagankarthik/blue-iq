import Link from "next/link";
import { BB } from "@/lib/theme";
import { WRAP, PageHero } from "@/components/page/kit";
import { Head, Stagger } from "@/components/home/motion";
import { I, Tile, type Ico } from "@/components/home/icons";
import type { Spot } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   Building blocks for the inner pages (platform, sectors, trust, and the
   pages that borrow from them), in the home page's blueprint language:
   left-aligned stacked section heads, white rounded-2xl cards on the
   canvas, Phosphor glyphs on square tiles, mono uppercase labels, cobalt
   as the one accent and amber only for a value flagged for review.
   Server-rendered; the FAQ uses native <details>, so it needs no script.
   ──────────────────────────────────────────────────────────────── */

type Action = { label: string; href: string; external?: boolean };

const LABEL = "font-mono-g text-[13px] uppercase tracking-[0.06em]";
const CARD = "rounded-2xl bg-white";
const EDGE = { border: `1px solid ${BB.line}` } as const;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

/** A Spot (a Phosphor glyph sized to its box) on the same square well as a Tile. */
function SpotTile({ S, size = 48 }: { S: Spot; size?: 48 | 64 }) {
  return (
    <span aria-hidden className="shrink-0 grid place-items-center rounded-[12px]" style={{ width: size, height: size, background: BB.mist2 }}>
      <S size={size} />
    </span>
  );
}

/* the page header: crumbs, headline, one line, the actions; an optional
   card (usually a Glance) sits under it */
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

/** One section that answers one question: a stacked header, then its content
    48px below. `seam` draws the home page's hairline above it in place of the
    top padding, so consecutive sections read as separate steps. */
export function Block({
  id,
  title,
  sub,
  align = "center",
  seam = false,
  children,
}: {
  id?: string;
  kicker?: string;
  title: string;
  sub?: string;
  tone?: "white" | "tint";
  align?: "center" | "left";
  seam?: boolean;
  children: React.ReactNode;
}) {
  const hid = `${id ?? slug(title)}-h`;
  void align; // headers are left-aligned site-wide (2026-11)
  return (
    <section id={id} className={`${seam ? "pb-24" : "py-24"} scroll-mt-24`} aria-labelledby={hid}>
      <div className={WRAP}>
        {seam && <div aria-hidden className="h-px mb-24" style={{ background: BB.line }} />}
        <Head id={hid} title={title} sub={sub} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

/* capabilities: white cards, a tile (or a cobalt check) and a title */
export function CapabilityGrid({ items, icons }: { items: [string, string][]; icons?: Ico[] }) {
  return (
    <Stagger as="dl" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(([t, d], k) => {
        const G = icons?.[k];
        return (
          <div key={t} className={`${CARD} p-8`} style={EDGE}>
            {G ? (
              <Tile icon={G} />
            ) : (
              <span aria-hidden className="grid place-items-center w-10 h-10 rounded-[8px]" style={{ background: BB.mist2, color: BB.cobalt }}>
                <I.check size={20} weight="bold" />
              </span>
            )}
            <dt className="mt-8 font-sans-g t-sub font-medium" style={{ color: BB.ink }}>
              {t}
            </dt>
            <dd className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
              {d}
            </dd>
          </div>
        );
      })}
    </Stagger>
  );
}

const COLS: Record<number, string> = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };

/** Numbered steps, connected: on desktop one row of cards with an arrow in
    each gap, so the order reads left to right; stacked, the numbers carry it.
    An optional spot (or icon) per step. */
export function StepTrack({ steps, spots, icons }: { steps: [string, string][]; spots?: Spot[]; icons?: Ico[] }) {
  return (
    <Stagger as="ol" className={`grid sm:grid-cols-2 ${COLS[steps.length] ?? "lg:grid-cols-4"} gap-4`}>
      {steps.map(([t, d], k) => {
        const S = spots?.[k];
        const G = icons?.[k];
        const last = k === steps.length - 1;
        return (
          <li key={t} className={`relative ${CARD} p-8 flex flex-col`} style={{ ...EDGE, zIndex: steps.length - k }}>
            <div className="flex items-center justify-between gap-4">
              {G ? <Tile icon={G} /> : S ? <SpotTile S={S} /> : null}
              <span className={LABEL} style={{ color: BB.cobalt }}>
                Step {String(k + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
              {t}
            </h3>
            <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
              {d}
            </p>
            {!last && (
              <span
                aria-hidden
                className="hidden lg:grid absolute top-1/2 -right-6 -translate-y-1/2 w-8 h-8 place-items-center rounded-[8px] bg-white"
                style={{ ...EDGE, color: BB.cobalt }}
              >
                <I.arrow size={16} />
              </span>
            )}
          </li>
        );
      })}
    </Stagger>
  );
}

/** The two outcomes of a confidence score, as chips. Amber means review. */
export function ScoreChip({ low, score }: { low: boolean; score?: number }) {
  return (
    <span
      className="inline-flex items-center gap-2 h-8 px-3 rounded-[8px] font-mono-g text-[13px] uppercase tracking-[0.06em] tabular-nums whitespace-nowrap"
      style={low ? { background: "#FFF6E0", color: BB.amberInk, border: `1px solid ${BB.amber}` } : { background: BB.mist2, color: BB.cobaltDeep }}
    >
      {low ? <I.flag size={16} /> : <I.check size={16} weight="bold" />}
      {low ? "Review" : "Accepted"}
      {score !== undefined && <span>{score.toFixed(2)}</span>}
    </span>
  );
}

/** What happens either side of the review line: one ruled row per outcome. */
export function RouteLegend({ rows }: { rows: { low: boolean; t: string; d: string }[] }) {
  return (
    <dl className={`${CARD} px-8`} style={EDGE}>
      {rows.map((r, k) => (
        <div key={r.t} className="py-8" style={{ borderTop: k ? `1px solid ${BB.line}` : undefined }}>
          <dt>
            <ScoreChip low={r.low} />
            <span className="mt-4 block font-sans-g t-sub font-medium" style={{ color: BB.ink }}>
              {r.t}
            </span>
          </dt>
          <dd className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
            {r.d}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* sample output: field, value, score (with a word and a glyph, not just a colour) */
export function OutputTable({ caption, rows, line = 0.9 }: { caption: string; rows: { field: string; value: string; score: number }[]; line?: number }) {
  return (
    <div className={`${CARD} overflow-x-auto`} style={EDGE} tabIndex={0} role="region" aria-label={caption}>
      <table className="w-full min-w-[520px] text-left">
        <caption className={`px-8 pt-8 pb-4 text-left ${LABEL}`} style={{ color: BB.ink3 }}>
          {caption}
        </caption>
        <thead>
          <tr style={{ borderBottom: `1px solid ${BB.line}` }}>
            {["Field", "Value", "Confidence"].map((h) => (
              <th key={h} scope="col" className={`px-8 py-4 font-medium ${LABEL}`} style={{ color: BB.ink3 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const low = r.score < line;
            return (
              <tr key={r.field} style={{ borderTop: i ? `1px solid ${BB.line}` : undefined, background: low ? "#FFFBF0" : undefined }}>
                <th scope="row" className="px-8 py-4 font-mono-g text-[13px] font-normal" style={{ color: BB.ink3 }}>
                  {r.field}
                </th>
                <td className="px-8 py-4 font-mono-g text-[13px]" style={{ color: BB.ink }}>
                  {r.value}
                </td>
                <td className="px-8 py-4">
                  <ScoreChip low={low} score={r.score} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* a no-JS FAQ: one card of ruled questions, each a native disclosure,
   keyboard and screen-reader ready */
export function FaqList({ faqs }: { faqs: [string, string][] }) {
  return (
    <div className={`${CARD} max-w-[860px] px-8`} style={EDGE}>
      {faqs.map(([q, a], k) => (
        <details key={q} className="group" style={{ borderTop: k ? `1px solid ${BB.line}` : undefined }}>
          <summary
            className="flex items-center justify-between gap-8 py-8 cursor-pointer list-none font-sans-g t-sub font-medium [&::-webkit-details-marker]:hidden"
            style={{ color: BB.ink }}
          >
            {q}
            <span
              aria-hidden
              className="shrink-0 grid place-items-center w-8 h-8 rounded-[8px] text-[20px] leading-none transition-transform duration-200 group-open:rotate-45"
              style={{ background: BB.mist2, color: BB.cobalt }}
            >
              +
            </span>
          </summary>
          <p className="-mt-4 pb-8 pr-12 font-sans-g t-base max-w-[64ch]" style={{ color: BB.ink3 }}>
            {a}
          </p>
        </details>
      ))}
    </div>
  );
}

/* related pages, as whole-card links; an optional spot or icon per card */
export function RelatedLinks({ items }: { items: { t: string; d: string; href: string; Spot?: Spot; icon?: Ico }[] }) {
  return (
    <Stagger as="ul" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((x) => (
        <li key={x.href + x.t}>
          <Link
            href={x.href}
            className={`group ${CARD} h-full flex flex-col p-8 transition-[border-color,box-shadow] duration-200 hover:border-[#9AA0AC] hover:shadow-[0_8px_16px_-8px_rgba(14,17,22,0.12)]`}
            style={EDGE}
          >
            <span className="flex items-start justify-between gap-4">
              {x.icon ? <Tile icon={x.icon} /> : x.Spot ? <SpotTile S={x.Spot} /> : <span />}
              <I.arrow size={20} aria-hidden className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: BB.cobalt }} />
            </span>
            <span className="mt-8 block font-sans-g t-sub font-medium" style={{ color: BB.ink }}>
              {x.t}
            </span>
            <span className="mt-4 block font-sans-g t-base" style={{ color: BB.ink3 }}>
              {x.d}
            </span>
          </Link>
        </li>
      ))}
    </Stagger>
  );
}

/* "at a glance": one white card of facts, label over value, ruled cells */
export function Glance({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className={`${CARD} overflow-hidden`} style={EDGE}>
      <p className={`px-8 pt-8 ${LABEL}`} style={{ color: BB.ink3 }}>
        {title}
      </p>
      <dl className={`mt-4 grid sm:grid-cols-2 ${rows.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {rows.map(([k, v]) => (
          <div key={k} className="px-8 py-8" style={{ borderTop: `1px solid ${BB.line}` }}>
            <dt className={LABEL} style={{ color: BB.cobalt }}>
              {k}
            </dt>
            <dd className="mt-4 font-sans-g t-base font-medium" style={{ color: BB.ink }}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
