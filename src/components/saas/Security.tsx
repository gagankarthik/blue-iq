"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, Users, Server, FileCheck, KeyRound, FolderLock } from "lucide-react";
import { SA } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import { SPRING, SPRING_SOFT, Spotlight } from "@/components/saas/motion";

const controls = [
  { Icon: Lock, t: "Encrypted transmission", d: "Every request and document moves over TLS-encrypted connections, from your systems to ours and back." },
  { Icon: Users, t: "Access control", d: "Assign roles and granular permissions so each teammate can view exactly the right projects, and nothing else." },
  { Icon: Server, t: "Data-centre security", d: "Infrastructure runs on hardened, continuously monitored cloud regions, with redundancy built in for uptime." },
  { Icon: FileCheck, t: "GDPR compliance", d: "We handle personal data to GDPR standards and give you the records, controls, and tooling to stay compliant too." },
  { Icon: KeyRound, t: "Single sign-on", d: "Authenticate through your own identity provider, so offboarding a person offboards their access." },
  { Icon: FolderLock, t: "Private workspaces", d: "Projects stay isolated in dedicated workspaces that only the teammates you choose can collaborate on." },
];

export default function Security() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative px-5 sm:px-8 py-20 sm:py-28"
      style={{ background: SA.bg2, borderTop: `1px solid ${SA.line}` }}
      aria-labelledby="sec-h"
    >
      <div className="max-w-[1180px] mx-auto">
        <div id="sec-h">
          <SectionHead
            eyebrow="Trust"
            title="Your documents are the"
            accent="sensitive ones"
            sub="Clinical records, signed contracts, financial detail. We treat them that way, from encryption in transit to workspace isolation and GDPR-grade handling."
          />
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {controls.map((c, i) => (
            <motion.div
              key={c.t}
              initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(7px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ ...SPRING_SOFT, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.06 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="h-full"
            >
              <Spotlight className="h-full rounded-xl">
                <div
                  className="group h-full rounded-xl p-6 transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(11,11,15,0.04),0_18px_38px_-18px_rgba(11,11,15,0.16)]"
                  style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
                >
                  <motion.span
                    className="grid place-items-center w-10 h-10 rounded-lg"
                    style={{ background: SA.accentSoft, color: SA.accent }}
                    whileHover={reduce ? undefined : { rotate: -8, scale: 1.1 }}
                    transition={SPRING}
                  >
                    <c.Icon className="w-[18px] h-[18px]" strokeWidth={1.7} />
                  </motion.span>
                  <h3 className="mt-4 font-sans-g text-[14.5px] font-semibold" style={{ color: SA.ink }}>
                    {c.t}
                  </h3>
                  <p className="mt-2 font-sans-g text-[13.5px] leading-relaxed" style={{ color: SA.sub }}>
                    {c.d}
                  </p>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {["SOC 2", "HIPAA", "GDPR"].map((b) => (
            <span
              key={b}
              className="font-mono-g text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-full"
              style={{ background: SA.surface, border: `1px solid ${SA.line2}`, color: SA.sub }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
