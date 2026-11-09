import Link from "next/link";
import { SA } from "@/lib/theme";
import { Btn } from "@/components/system/Btn";

/* ────────────────────────────────────────────────────────────────
   The page kit — what every inner page shares, in the home page's
   blueprint language (2026-11):

   · WRAP      the one container: the 1176px column between the two end
               guides, with a 32px gutter so content never sits on a line
   · Crumbs    a mono breadcrumb trail, so no inner page is a dead end
   · Wash      retired: headers sit on the plain canvas
   · PageHero  left-aligned header: crumbs, headline, one line, actions;
               an optional card sits under it
   · PlainHero the same header without actions, for the legal pages
   ──────────────────────────────────────────────────────────────── */

export const WRAP = "max-w-[1176px] mx-auto px-6 sm:px-8";

export function Crumbs({ here, trail = [], tone = "light", center }: { here: string; trail?: [string, string][]; tone?: "light" | "dark"; center?: boolean }) {
  const dim = tone === "dark" ? "rgba(255,255,255,0.8)" : SA.sub;
  const ink = tone === "dark" ? "#FFFFFF" : SA.ink;
  return (
    <nav aria-label="Breadcrumb" className="font-mono-g text-[13px] uppercase tracking-[0.06em]">
      <ol className={`flex flex-wrap items-center gap-2 ${center ? "justify-center" : ""}`}>
        <li>
          <Link href="/" className="transition-colors duration-150 hover:underline underline-offset-4" style={{ color: dim }}>
            Home
          </Link>
        </li>
        <li aria-hidden style={{ color: dim }}>
          /
        </li>
        {trail.map(([label, href]) => (
          <li key={href} className="contents">
            <Link href={href} className="transition-colors duration-150 hover:underline underline-offset-4" style={{ color: dim }}>
              {label}
            </Link>
            <span aria-hidden style={{ color: dim }}>
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="font-medium" style={{ color: ink }}>
          {here}
        </li>
      </ol>
    </nav>
  );
}

/* the header wash, retired in the blueprint system: headers sit on the canvas */
export function Wash(props: { tall?: boolean }) {
  void props;
  return null;
}

type Action = { label: string; href: string; external?: boolean };

export function PageHero({
  here,
  trail,
  title,
  lede,
  primary,
  secondary,
  children,
  id = "page-h",
}: {
  here: string;
  trail?: [string, string][];
  title: string;
  lede: string;
  primary?: Action;
  secondary?: Action;
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <section className="relative isolate" aria-labelledby={id}>
      <Wash tall={!!children} />
      <div className={`${WRAP} pt-32 sm:pt-40 ${children ? "pb-0" : "pb-16 sm:pb-24"}`}>
        <Crumbs here={here} trail={trail} />
        <h1 id={id} className="mt-6 font-display t-display max-w-[20ch]" style={{ color: SA.ink }}>
          {title}
        </h1>
        <p className="mt-8 font-sans-g t-sub max-w-[52ch]" style={{ color: SA.sub }}>
          {lede}
        </p>
        {(primary || secondary) && (
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            {primary && (
              <Btn href={primary.href} external={primary.external} variant="brand" size="lg" arrow className="w-full sm:w-auto">
                {primary.label}
              </Btn>
            )}
            {secondary && (
              <Btn href={secondary.href} external={secondary.external} variant="secondary" size="lg" arrow className="w-full sm:w-auto">
                {secondary.label}
              </Btn>
            )}
          </div>
        )}
      </div>
      {children && <div className={`${WRAP} mt-16 pb-8`}>{children}</div>}
    </section>
  );
}

export function PlainHero({ crumb, title, lede, meta }: { crumb: string; title: string; lede: string; meta?: string }) {
  return (
    <section className="relative isolate" aria-labelledby="page-h">
      <Wash />
      <div className={`${WRAP} pt-32 sm:pt-40 pb-16 sm:pb-24`}>
        <Crumbs here={crumb} />
        <h1 id="page-h" className="mt-6 font-display t-display max-w-[20ch]" style={{ color: SA.ink }}>
          {title}
        </h1>
        <p className="mt-8 font-sans-g t-sub max-w-[52ch]" style={{ color: SA.sub }}>
          {lede}
        </p>
        {meta && (
          <p className="mt-6 font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: SA.sub }}>
            {meta}
          </p>
        )}
      </div>
    </section>
  );
}

/* a white card on the wash or the page */
export const CARD = "rounded-2xl bg-white";
export const CARD_EDGE = { border: `1px solid ${SA.line}` } as const;

/* a spot on its soft well */
export function SpotWell({ children, size = 80, tint = "#E7EAF0" }: { children: React.ReactNode; size?: number; tint?: string }) {
  return (
    <span className="shrink-0 grid place-items-center rounded-[12px]" style={{ width: size, height: size, background: tint }}>
      {children}
    </span>
  );
}
