"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Radar, ListChecks, Activity, ScanLine, Receipt, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { SA } from "@/lib/theme";
import { Words, SPRING_SOFT } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   What Blue-IQ does — a connected 2×2 bento.

   Four tiles, hairline-divided inside one rounded frame, each with its own
   live micro-visual:
     • Read    — a signal field: documents arriving from any source/format
     • Score   — the extracted fields of a sample credential, each with a
                 confidence, animating in as a stack
     • Confidence — that same sample plotted as a curve against the review
                 threshold, so the one flagged field is obvious at a glance
     • The suite — Capture · Spend · Govern as product cards

   Every number here is illustrative extraction output from one sample
   document — the same honest "a field with a score on it" device the site
   uses elsewhere. No business metrics, no invented customers, no fake
   product screenshots. The chart and the map are hand-built SVG, not chart
   libraries, to match how the rest of the page draws its visuals.
   ──────────────────────────────────────────────────────────────── */

const HEAD = "text-[1.15rem] font-display font-normal leading-[1.25]";
const HEAD_STYLE = { letterSpacing: "-0.018em", color: SA.ink } as React.CSSProperties;

function TileHead({ icon, tag, title, rest }: { icon: React.ReactNode; tag: string; title: string; rest: string }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 font-mono-g text-[11px] uppercase tracking-[0.16em]" style={{ color: SA.faint }}>
        <span style={{ color: SA.accent }}>{icon}</span>
        {tag}
      </span>
      <h3 className={`mt-3 ${HEAD}`} style={HEAD_STYLE}>
        {title} <span style={{ color: SA.faint }}>{rest}</span>
      </h3>
    </div>
  );
}

/* ── 1. Read — a field of signal dots with a few live "reads" ── */

function SignalField({ reduce }: { reduce: boolean | null }) {
  const COLS = 18;
  const ROWS = 7;
  // a handful of deterministic cells that light up as "documents read"
  const live = [
    { c: 3, r: 2 },
    { c: 7, r: 4 },
    { c: 11, r: 1 },
    { c: 14, r: 5 },
    { c: 9, r: 3 },
  ];
  const isLive = (c: number, r: number) => live.findIndex((p) => p.c === c && p.r === r);

  return (
    <div className="relative mt-auto rounded-xl overflow-hidden" style={{ background: SA.bg2, border: `1px solid ${SA.line}` }}>
      <svg viewBox="0 0 180 74" className="w-full h-auto block">
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const x = 8 + c * 9.2;
            const y = 10 + r * 9;
            const li = isLive(c, r);
            if (li >= 0) {
              return (
                <circle key={`${c}-${r}`} cx={x} cy={y} r={1.5} fill={SA.accent}>
                  {!reduce && (
                    <animate attributeName="opacity" values="0.25;1;0.25" dur="2.4s" begin={`${li * 0.5}s`} repeatCount="indefinite" />
                  )}
                </circle>
              );
            }
            return <circle key={`${c}-${r}`} cx={x} cy={y} r={0.7} fill={SA.ink} opacity={0.12} />;
          })
        )}
      </svg>
      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[10.5px] font-medium shadow-sm"
        style={{ background: SA.surface, border: `1px solid ${SA.line2}`, color: SA.sub }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: SA.green }} />
        Reading now
      </div>
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
        {["PDF", "DOCX", "Scan", "Photo", "Export"].map((f) => (
          <span key={f} className="font-mono-g text-[9.5px] px-1.5 py-0.5 rounded" style={{ background: SA.surface, border: `1px solid ${SA.line2}`, color: SA.faint }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 2. Score — a sample credential's fields, each with a confidence ── */

type Field = { label: string; value: string; score: string; flag?: boolean };
const FIELDS: Field[] = [
  { label: "Full name", value: "Priya Nadar", score: "0.98" },
  { label: "Licence no.", value: "RN-448127", score: "0.97" },
  { label: "Specialty", value: "Registered Nurse", score: "0.95" },
  { label: "Issuing body", value: "CA Board of Nursing", score: "0.93" },
  { label: "Expiry date", value: "Smudged on the scan", score: "Review", flag: true },
  { label: "Employer", value: "St. Luke’s Health", score: "0.96" },
];

function ScoreRow({ f, reduce }: { f: Field; reduce: boolean | null }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg px-3"
      style={{ height: 38, marginBottom: 8, background: SA.bg2, border: `1px solid ${f.flag ? "#EBD9A6" : SA.line}` }}
    >
      <span className="font-mono-g text-[10px] w-[70px] shrink-0" style={{ color: SA.faint }}>{f.label}</span>
      <span className="font-sans-g text-[12.5px] flex-1 truncate" style={{ color: SA.ink }}>{f.value}</span>
      {f.flag ? (
        <span className="inline-flex items-center gap-1.5 font-mono-g text-[10px] font-semibold px-2 py-0.5 rounded shrink-0" style={{ color: SA.amber, background: "#FBF3DE" }}>
          <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: SA.amber }} animate={reduce ? {} : { opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
          {f.score}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-mono-g text-[10px] font-semibold px-2 py-0.5 rounded tabular-nums shrink-0" style={{ color: SA.accent, background: SA.accentSoft }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: SA.accent }} />{f.score}
        </span>
      )}
    </div>
  );
}

/* A calm vertical marquee: the fields of one sample credential scroll past
   one at a time and loop seamlessly. The list is rendered twice and the track
   travels exactly one copy's height, so the seam is invisible. */
function ScoreStack({ reduce }: { reduce: boolean | null }) {
  const ROW = 46; // 38 height + 8 margin
  const copyH = FIELDS.length * ROW;
  const list = [...FIELDS, ...FIELDS];

  return (
    <div className="relative mt-auto overflow-hidden" style={{ height: ROW * 4 - 8 }}>
      <motion.div
        animate={reduce ? {} : { y: [0, -copyH] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
      >
        {list.map((f, i) => (
          <ScoreRow key={i} f={f} reduce={reduce} />
        ))}
      </motion.div>
      {/* fade the track in and out at the tile edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8" style={{ background: `linear-gradient(to bottom, ${SA.surface}, transparent)` }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8" style={{ background: `linear-gradient(to top, ${SA.surface}, transparent)` }} />
    </div>
  );
}

/* ── 3. Confidence — the same sample plotted against the review threshold ── */

function ConfidenceChart({ reduce }: { reduce: boolean | null }) {
  const conf = [0.98, 0.97, 0.95, 0.93, 0.62, 0.96];
  const labels = ["Name", "Licence", "Spec.", "Issuer", "Expiry", "Emp."];
  const W = 300, H = 150, padL = 12, padR = 12, padT = 16, padB = 26;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = conf.length;
  const x = (i: number) => padL + (i * plotW) / (n - 1);
  const y = (v: number) => padT + (1 - v) * plotH;
  const threshold = 0.9;
  const yT = y(threshold);

  const line = conf.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${x(n - 1).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${x(0).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

  return (
    <div className="mt-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
        <defs>
          <linearGradient id="conf-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SA.accent2} stopOpacity="0.22" />
            <stop offset="100%" stopColor={SA.accent2} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* review threshold */}
        <line x1={padL} y1={yT} x2={W - padR} y2={yT} stroke={SA.amber} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <text x={padL + 2} y={yT + 11} textAnchor="start" className="font-mono-g" fontSize="8" fill={SA.amber}>review line</text>

        {/* area + curve */}
        <motion.path
          d={area}
          fill="url(#conf-fill)"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={SA.accent}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* points: below the line flags amber, above sits accent */}
        {conf.map((v, i) => {
          const below = v < threshold;
          return (
            <motion.circle
              key={i}
              cx={x(i)}
              cy={y(v)}
              r={below ? 3.4 : 2.4}
              fill={below ? SA.amber : SA.accent}
              stroke={SA.surface}
              strokeWidth="1.5"
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: 0.6 + i * 0.08, ...SPRING_SOFT }}
            />
          );
        })}

        {/* x labels */}
        {labels.map((l, i) => (
          <text key={l} x={x(i)} y={H - 8} textAnchor="middle" className="font-mono-g" fontSize="7.5" fill={i === 4 ? SA.amber : SA.faint}>
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ── 4. The suite — three product cards ── */

const PRODUCTS = [
  { Icon: ScanLine, name: "Capture", line: "Any document into structured, scored data." },
  { Icon: Receipt, name: "Spend", line: "Invoices and entitlements, reconciled." },
  { Icon: ShieldCheck, name: "Govern", line: "Contract and compliance risk, surfaced." },
];

function SuiteCards() {
  return (
    <div className="mt-auto space-y-2">
      {PRODUCTS.map(({ Icon, name, line }) => (
        <div key={name} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <Icon className="w-4 h-4 shrink-0" strokeWidth={1.6} style={{ color: "#fff" }} />
          <div className="min-w-0">
            <div className="font-sans-g text-[13.5px] font-semibold leading-tight" style={{ color: "#fff" }}>{name}</div>
            <div className="font-sans-g text-[11.5px] leading-tight truncate" style={{ color: "rgba(255,255,255,0.66)" }}>{line}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── the tile shell ── */

function Tile({ i, className, children, style }: { i: number; className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ ...SPRING_SOFT, delay: reduce ? 0 : i * 0.07 }}
      className={`flex flex-col p-6 sm:p-7 min-h-[330px] ${className ?? ""}`}
      style={{ background: SA.surface, ...style }}
    >
      {children}
    </motion.div>
  );
}

export default function Suite() {
  const reduce = useReducedMotion();

  return (
    <section className="relative px-5 sm:px-8 py-24 sm:py-32" style={{ background: SA.bg2 }} aria-labelledby="suite-h">
      <div className="max-w-[1180px] mx-auto">
        {/* heading */}
        <div className="max-w-[52ch]">
          <div id="suite-h">
            <Words
              as="h2"
              text="It reads the document, scores what it pulls, and hands it back clean."
              className="font-display font-normal leading-[1.1]"
              style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.7rem)", letterSpacing: "-0.032em", color: SA.ink }}
            />
          </div>
          <p className="mt-5 font-sans-g leading-[1.7]" style={{ fontSize: "1.05rem", color: SA.sub }}>
            Every hire, contract, and invoice arrives as a file someone has to open and re-type. Blue-IQ does the reading —
            and tells you how far to trust each field before it lands in your systems.
          </p>
        </div>

        {/* connected bento: hairline dividers via a 1px gap over a line-coloured frame */}
        <div className="mt-12 sm:mt-16 rounded-[24px] overflow-hidden" style={{ border: `1px solid ${SA.line2}`, background: SA.line2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
            {/* 1. Read */}
            <Tile i={0}>
              <TileHead icon={<Radar className="w-3.5 h-3.5" />} tag="Read" title="It reads whatever lands in your pipeline —" rest="a clean PDF or a photo snapped on a phone." />
              <SignalField reduce={reduce} />
            </Tile>

            {/* 2. Score */}
            <Tile i={1}>
              <TileHead icon={<ListChecks className="w-3.5 h-3.5" />} tag="Score" title="Every field comes back with a confidence —" rest="so your team checks the one it flagged, not the whole page." />
              <ScoreStack reduce={reduce} />
            </Tile>

            {/* 3. Confidence chart */}
            <Tile i={2}>
              <TileHead icon={<Activity className="w-3.5 h-3.5" />} tag="Confidence" title="Scored against a line you set." rest="Below it, the engine flags — it never guesses." />
              <ConfidenceChart reduce={reduce} />
            </Tile>

            {/* 4. The suite — the one bold tile */}
            <Tile i={3} style={{ background: SA.accent }}>
              <div>
                <span className="inline-flex items-center gap-2 font-mono-g text-[11px] uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  The suite
                </span>
                <h3 className="mt-3 text-[1.15rem] font-display font-normal leading-[1.25]" style={{ letterSpacing: "-0.018em", color: "#fff" }}>
                  One engine, three products. <span style={{ color: "rgba(255,255,255,0.66)" }}>Packaged as Campus and Workforce for your sector.</span>
                </h3>
              </div>
              <SuiteCards />
              <a href="/products" className="group mt-5 inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold w-fit" style={{ color: "#fff" }}>
                See the suite
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
            </Tile>
          </div>
        </div>

        {/* one honest line out */}
        <div className="mt-8 flex justify-end">
          <a href="/products" className="group inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold" style={{ color: SA.accent }}>
            See how it works, end to end
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
