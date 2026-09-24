"use client";

import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import VaultArt from "@/components/art/VaultArt";
import { type BqIcon, IconLock, IconKey, IconServer, IconShield, IconFingerprint, IconFolderLock } from "@/components/icons/BqIcons";

/* Trust. The drawing on one side, the six controls on the other as a
   two-column list — no card per control, just an icon, a name and one
   sentence. Every statement is one the company already makes. */

const CONTROLS: [BqIcon, string, string][] = [
  [IconLock, "Encrypted in transit", "TLS from your systems to ours and back."],
  [IconKey, "Role-based access", "People see only the projects they are on."],
  [IconFingerprint, "Single sign-on", "Your identity provider. Offboarding is instant."],
  [IconFolderLock, "Private workspaces", "Projects isolated to the people you name."],
  [IconServer, "Hardened infrastructure", "Monitored cloud regions with redundancy."],
  [IconShield, "GDPR-grade handling", "Personal data handled to GDPR standards."],
];

export default function Security() {
  return (
    <section id="security" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg2 }} aria-labelledby="sec-h">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-x-16 gap-y-12 items-center">
        <Reveal className="order-2 lg:order-1 rounded-[24px] px-6 pt-8 pb-4 sm:px-10" style={{ background: SA.navy }}>
          <div className="max-w-[440px] mx-auto">
            <VaultArt />
          </div>
          <div className="flex flex-wrap justify-center gap-2 pb-4">
            {["SOC 2", "HIPAA", "GDPR"].map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-sans-g text-[13px] font-medium text-white" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)" }}>
                <IconShield size={15} style={{ color: "#8EC2FF" }} />
                {s} aligned
              </span>
            ))}
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead
            align="stack"
            id="sec-h"
            title="Enterprise-grade document security"
            sub="Clinical records, contracts and financial data, protected end to end and aligned to SOC 2, HIPAA and GDPR."
          />
          <Reveal delay={0.1} as="ul" className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {CONTROLS.map(([Icon, t, d]) => (
              <li key={t} className="flex gap-4">
                <Icon size={26} className="shrink-0" style={{ color: SA.accent }} />
                <div>
                  <h3 className="font-sans-g text-[15.5px] font-semibold" style={{ color: SA.ink }}>
                    {t}
                  </h3>
                  <p className="mt-1.5 font-sans-g text-[14.5px] leading-[1.6]" style={{ color: SA.sub }}>
                    {d}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
