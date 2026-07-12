"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, KeyRound, Server, ShieldCheck, Fingerprint, FolderLock } from "lucide-react";
import { SA } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import { SPRING_SOFT } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   Trust, as a ledger.

   This was six identical cards, each with a tinted rounded-square icon
   above a bold title above three lines of grey text — the most recognisable
   feature grid on the internet, and banned outright by DESIGN.md §10. It is
   now a ruled list: the row is the container, the 1px rule is the only
   chrome, and the eye reads straight down the left column of controls.
   Nothing is boxed, because nothing here needs elevation.
   ──────────────────────────────────────────────────────────────── */

/* Each of these was two clauses long and said its point in the first one. The
   second clause has been cut in every case. */
const controls: [typeof Lock, string, string][] = [
  [Lock, "Encrypted transmission", "Documents move over TLS, from your systems to ours and back."],
  [KeyRound, "Access control", "Roles and granular permissions: a teammate sees the projects they are on, and nothing else."],
  [Server, "Data-centre security", "Hardened, continuously monitored cloud regions with redundancy built in."],
  [ShieldCheck, "GDPR compliance", "Personal data handled to GDPR standards, with the records to prove it."],
  [Fingerprint, "Single sign-on", "Authenticate through your own identity provider — offboarding a person offboards their access."],
  [FolderLock, "Private workspaces", "Projects stay isolated to the teammates you name."],
];

function Row({ i, Icon, t, d }: { i: number; Icon: typeof Lock; t: string; d: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ ...SPRING_SOFT, delay: i * 0.05 }}
      className="group grid md:grid-cols-[2rem_minmax(0,0.5fr)_minmax(0,1fr)] gap-y-2 md:gap-x-8 py-7 md:py-8"
      style={{ borderTop: `1px solid ${SA.line2}`, "--acc": SA.accent } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="self-start pt-0.5 transition-colors duration-300"
        style={{ color: SA.faint }}
      >
        <Icon className="w-5 h-5 group-hover:[color:var(--acc)]" strokeWidth={1.5} />
      </span>

      <h3
        className="font-display font-medium tracking-[-0.02em] text-[1.15rem] md:text-[1.35rem] leading-[1.25]"
        style={{ color: SA.ink }}
      >
        {t}
      </h3>

      <p className="font-sans-g text-[15px] leading-[1.7] max-w-[58ch]" style={{ color: SA.sub }}>
        {d}
      </p>
    </motion.div>
  );
}

export default function Security() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative px-5 sm:px-8 py-24 sm:py-36"
      style={{ background: SA.bg2, borderTop: `1px solid ${SA.line}` }}
      aria-labelledby="sec-h"
    >
      <div className="max-w-[1180px] mx-auto">
        <div id="sec-h">
          <SectionHead
            title="Your documents are the sensitive ones"
            sub="Clinical records, signed contracts, financial detail. We treat them that way, from encryption in transit to workspace isolation and GDPR-grade handling."
          />
        </div>

        <div className="mt-16">
          {controls.map(([Icon, t, d], i) => (
            <Row key={t} i={i} Icon={Icon} t={t} d={d} />
          ))}

          {/* the alignment claim closes the ledger as its final rule */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ ...SPRING_SOFT, delay: 0.1 }}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2 pt-7 md:pt-8"
            style={{ borderTop: `1px solid ${SA.line2}` }}
          >
            <span className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: SA.faint }}>
              Aligned to
            </span>
            <span className="font-mono-g text-[13px] uppercase tracking-[0.18em]" style={{ color: SA.ink }}>
              SOC 2 <span style={{ color: SA.line2 }}>·</span> HIPAA <span style={{ color: SA.line2 }}>·</span> GDPR
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
