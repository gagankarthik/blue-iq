import Link from "next/link";
import { SA } from "@/lib/theme";
import { Btn } from "@/components/system/Btn";

/* ────────────────────────────────────────────────────────────────
   The page kit — what every inner page shares, in the landing page's
   language:

   · WRAP      the one container: 1240px, 20px / 32px gutters
   · Crumbs    a breadcrumb trail, so no inner page is a dead end
   · Wash      the soft brand-blue colour wash behind every page header
   · PageHero  centred header on the wash: crumbs, serif title, one line,
               pills; an optional framed card sits under it on the wash
   · PlainHero the same header without actions, for the legal pages
   ──────────────────────────────────────────────────────────────── */

export const WRAP = "max-w-[1240px] mx-auto px-5 sm:px-8";

export function Crumbs({ here, trail = [], tone = "light", center }: { here: string; trail?: [string, string][]; tone?: "light" | "dark"; center?: boolean }) {
  const dim = tone === "dark" ? "rgba(255,255,255,0.8)" : "#4A4B53";
  const ink = tone === "dark" ? "#FFFFFF" : SA.ink;
  return (
    <nav aria-label="Breadcrumb" className="font-sans-g text-[14px]">
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

/* the header wash: lighter than the home hero, same family */
export function Wash({ tall }: { tall?: boolean }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-x-0 top-0 -z-10 ${tall ? "h-[760px]" : "h-full"}`}
      style={{
        background: [
          "radial-gradient(80% 70% at 50% -12%, rgba(79,123,242,0.55) 0%, rgba(143,174,255,0.45) 32%, rgba(199,214,255,0.35) 52%, rgba(250,250,250,0) 76%)",
          "radial-gradient(40% 50% at 0% 60%, rgba(170,190,255,0.45) 0%, rgba(250,250,250,0) 70%)",
          "radial-gradient(40% 50% at 100% 60%, rgba(150,215,255,0.45) 0%, rgba(250,250,250,0) 70%)",
        ].join(", "),
      }}
    />
  );
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
      <div className={`${WRAP} pt-32 sm:pt-40 ${children ? "pb-0" : "pb-16 sm:pb-24"} text-center`}>
        <Crumbs here={here} trail={trail} center />
        <h1 id={id} className="mt-6 mx-auto font-display t-display max-w-[20ch]" style={{ color: SA.ink }}>
          {title}
        </h1>
        <p className="mt-5 mx-auto font-sans-g text-[1.125rem] sm:text-[1.25rem] leading-[1.6] max-w-[52ch]" style={{ color: "#3A3B44" }}>
          {lede}
        </p>
        {(primary || secondary) && (
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            {primary && (
              <Btn href={primary.href} external={primary.external} size="lg" className="w-full sm:w-auto">
                {primary.label}
              </Btn>
            )}
            {secondary && (
              <Btn href={secondary.href} external={secondary.external} variant="secondary" size="lg" arrow={secondary.external} className="w-full sm:w-auto">
                {secondary.label}
              </Btn>
            )}
          </div>
        )}
      </div>
      {children && <div className={`${WRAP} mt-14 sm:mt-16 pb-8`}>{children}</div>}
    </section>
  );
}

export function PlainHero({ crumb, title, lede, meta }: { crumb: string; title: string; lede: string; meta?: string }) {
  return (
    <section className="relative isolate" aria-labelledby="page-h">
      <Wash />
      <div className={`${WRAP} pt-32 sm:pt-40 pb-14 sm:pb-20 text-center`}>
        <Crumbs here={crumb} center />
        <h1 id="page-h" className="mt-6 mx-auto font-display t-h1 max-w-[20ch]" style={{ color: SA.ink }}>
          {title}
        </h1>
        <p className="mt-4 mx-auto font-sans-g text-[1.125rem] leading-[1.6] max-w-[52ch]" style={{ color: "#3A3B44" }}>
          {lede}
        </p>
        {meta && (
          <p className="mt-5 font-sans-g text-[14px]" style={{ color: "#4A4B53" }}>
            {meta}
          </p>
        )}
      </div>
    </section>
  );
}

/* a white card on the wash or the page */
export const CARD = "rounded-[24px] bg-white";
export const CARD_EDGE = { border: `1px solid ${SA.line}` } as const;

/* a spot on its soft well */
export function SpotWell({ children, size = 80, tint = "#EEF3FF" }: { children: React.ReactNode; size?: number; tint?: string }) {
  return (
    <span className="shrink-0 grid place-items-center rounded-[18px]" style={{ width: size, height: size, background: tint }}>
      {children}
    </span>
  );
}
