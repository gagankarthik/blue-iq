"use client";

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import SiteShell from "@/components/SiteShell";
import { C } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import { MeshGradient, GRAD } from "@/components/visuals";
import { Check } from "@/components/icons";

const BTN = `linear-gradient(135deg, ${C.blue}, ${GRAD.royal})`;
const field = "w-full rounded-xl px-4 py-3 font-sans-g text-[14.5px] outline-none transition-shadow";
const fieldStyle: React.CSSProperties = { background: C.surface, border: `1px solid ${C.line2}`, color: C.ink };
const labelCls = "block font-sans-g text-[13px] font-medium mb-2";

const assurances = [
  ["A reply within a business day", "A specialist on your industry reaches out — not a generic sales queue."],
  ["A scoped pilot, not a pitch", "We map HIRE, GOVERN, and SPEND to your real workflow before anything else."],
  ["Your data stays yours", "SOC 2 Type II controls across every step. Nothing is used to train shared models."],
];

export default function Contact() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <MeshGradient className="[mask-image:radial-gradient(90%_60%_at_50%_0%,#000,transparent)]"
          blobs={[
            { c: GRAD.indigo, x: "30%", y: "12%", s: 420, o: 0.32 },
            { c: GRAD.royal, x: "70%", y: "8%", s: 380, o: 0.3 },
            { c: GRAD.cyan, x: "82%", y: "30%", s: 320, o: 0.22 },
          ]} />

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-24 sm:pb-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* intro */}
            <Reveal>
              <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: C.blue2 }}>Contact</motion.span>
              <motion.h1 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.035em] leading-[0.98]" style={{ fontSize: "clamp(40px,5.4vw,68px)", color: C.ink }}>
                Let&apos;s see Blue-IQ on your work.
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="mt-6 font-sans-g text-[17px] leading-relaxed max-w-[44ch]" style={{ color: C.sub }}>
                Tell us a little about your team and what you&apos;re trying to fix. We&apos;ll set up a scoped walkthrough.
              </motion.p>
              <motion.ul variants={fadeUp} custom={3} className="mt-10 space-y-5 max-w-md">
                {assurances.map(([h, b]) => (
                  <li key={h} className="flex gap-3.5">
                    <span className="grid place-items-center w-6 h-6 rounded-full shrink-0 mt-0.5 text-white" style={{ background: BTN }}><Check className="w-3 h-3" /></span>
                    <div>
                      <div className="font-display text-[15px] font-bold tracking-tight" style={{ color: C.ink }}>{h}</div>
                      <div className="font-sans-g text-[13.5px] leading-relaxed mt-0.5" style={{ color: C.sub }}>{b}</div>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </Reveal>

            {/* form */}
            <Reveal>
              <motion.form variants={fadeUp} action="#" method="POST" className="rounded-[1.6rem] p-7 sm:p-9" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 1px 2px rgba(14,17,22,0.04), 0 24px 60px -28px rgba(14,17,22,0.22)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first-name" className={labelCls} style={{ color: C.ink }}>First name</label>
                    <input id="first-name" name="first-name" type="text" autoComplete="given-name" className={field} style={fieldStyle} />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelCls} style={{ color: C.ink }}>Last name</label>
                    <input id="last-name" name="last-name" type="text" autoComplete="family-name" className={field} style={fieldStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className={labelCls} style={{ color: C.ink }}>Company</label>
                    <input id="company" name="company" type="text" autoComplete="organization" className={field} style={fieldStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelCls} style={{ color: C.ink }}>Work email</label>
                    <input id="email" name="email" type="email" autoComplete="email" className={field} style={fieldStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className={labelCls} style={{ color: C.ink }}>Phone number</label>
                    <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line2}`, background: C.surface }}>
                      <div className="relative grid shrink-0">
                        <select id="country" name="country" autoComplete="country" aria-label="Country" className="appearance-none bg-transparent py-3 pr-8 pl-4 font-sans-g text-[14px] outline-none" style={{ color: C.sub }}>
                          <option>US</option><option>CA</option><option>EU</option>
                        </select>
                        <ChevronDownIcon aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4" style={{ color: C.faint }} />
                      </div>
                      <input id="phone-number" name="phone-number" type="text" placeholder="(312) 847-1928" className="flex-1 min-w-0 bg-transparent py-3 px-2 font-sans-g text-[14.5px] outline-none" style={{ color: C.ink }} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelCls} style={{ color: C.ink }}>What are you trying to fix?</label>
                    <textarea id="message" name="message" rows={4} className={field} style={fieldStyle} defaultValue="" />
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <input id="agree" name="agree" type="checkbox" className="mt-1 w-4 h-4 rounded accent-[#002181]" />
                    <label htmlFor="agree" className="font-sans-g text-[13px] leading-relaxed" style={{ color: C.sub }}>
                      I agree to the{" "}
                      <Link href="/privacy" className="font-medium underline-offset-2 hover:underline" style={{ color: C.blue2 }}>privacy policy</Link>.
                    </label>
                  </div>
                </div>
                <button type="submit" className="mt-7 w-full inline-flex items-center justify-center gap-2 font-sans-g text-[15px] font-medium text-white py-3.5 rounded-full transition-transform active:scale-[0.99]" style={{ background: BTN, boxShadow: `0 16px 34px -16px ${C.blue}` }}>
                  Request a demo
                </button>
                <p className="mt-4 text-center font-mono-g text-[11px]" style={{ color: C.faint }}>
                  Prefer email? <a href="mailto:hello@blue-iq.com" className="underline-offset-2 hover:underline" style={{ color: C.sub }}>hello@blue-iq.com</a>
                </p>
              </motion.form>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
