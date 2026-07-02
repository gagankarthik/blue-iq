"use client";

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { UI } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";

const field = "w-full rounded-lg px-4 py-3 font-sans-g text-[14.5px] outline-none transition-shadow";
const fieldStyle: React.CSSProperties = { background: UI.surface, border: `1px solid ${UI.line2}`, color: UI.ink };
const labelCls = "block font-sans-g text-[13px] font-medium mb-2";

const assurances = [
  ["A reply within a business day", "Someone who knows your industry gets back to you, not a generic sales queue."],
  ["A walkthrough, not a pitch", "We run Blue-IQ on your real resumes or contracts before we ever talk pricing."],
  ["Your data stays yours", "SOC 2 Type II controls throughout, and nothing is used to train shared models."],
];

export default function ContactClient() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[520px] pointer-events-none"
          style={{ background: "radial-gradient(55% 80% at 70% 0%, rgba(44,73,214,0.10), transparent 62%)" }} />

        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-24 sm:pb-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* intro */}
            <Reveal>
              <motion.h1 variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
                Let&apos;s put Blue-IQ on your documents.
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g text-[17px] leading-relaxed max-w-[44ch]" style={{ color: UI.sub }}>
                Tell us what your team works with and what&apos;s slowing it down. We&apos;ll set up a short walkthrough on your own resumes or contracts.
              </motion.p>
              <motion.ul variants={fadeUp} custom={2} className="mt-10 space-y-5 max-w-md">
                {assurances.map(([h, b]) => (
                  <li key={h} className="flex gap-3.5">
                    <span className="grid place-items-center w-6 h-6 rounded-full shrink-0 mt-0.5 text-white" style={{ background: UI.blue }}><Check className="w-3 h-3" strokeWidth={3} /></span>
                    <div>
                      <div className="font-display text-[15px] font-bold tracking-tight" style={{ color: UI.ink }}>{h}</div>
                      <div className="font-sans-g text-[13.5px] leading-relaxed mt-0.5" style={{ color: UI.sub }}>{b}</div>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </Reveal>

            {/* form */}
            <Reveal>
              <motion.form variants={fadeUp} action="#" method="POST" className="rounded-2xl p-7 sm:p-9" style={{ background: UI.surface, border: `1px solid ${UI.line}`, boxShadow: "0 1px 2px rgba(18,20,26,0.05), 0 24px 60px -28px rgba(18,20,26,0.22)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first-name" className={labelCls} style={{ color: UI.ink }}>First name</label>
                    <input id="first-name" name="first-name" type="text" autoComplete="given-name" className={field} style={fieldStyle} />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelCls} style={{ color: UI.ink }}>Last name</label>
                    <input id="last-name" name="last-name" type="text" autoComplete="family-name" className={field} style={fieldStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className={labelCls} style={{ color: UI.ink }}>Company</label>
                    <input id="company" name="company" type="text" autoComplete="organization" className={field} style={fieldStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelCls} style={{ color: UI.ink }}>Work email</label>
                    <input id="email" name="email" type="email" autoComplete="email" className={field} style={fieldStyle} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className={labelCls} style={{ color: UI.ink }}>Phone number</label>
                    <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${UI.line2}`, background: UI.surface }}>
                      <div className="relative grid shrink-0">
                        <select id="country" name="country" autoComplete="country" aria-label="Country" className="appearance-none bg-transparent py-3 pr-8 pl-4 font-sans-g text-[14px] outline-none" style={{ color: UI.sub }}>
                          <option>US</option><option>CA</option><option>EU</option>
                        </select>
                        <ChevronDownIcon aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4" style={{ color: UI.faint }} />
                      </div>
                      <input id="phone-number" name="phone-number" type="text" placeholder="(312) 847-1928" className="flex-1 min-w-0 bg-transparent py-3 px-2 font-sans-g text-[14.5px] outline-none" style={{ color: UI.ink }} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelCls} style={{ color: UI.ink }}>What documents are you working with?</label>
                    <textarea id="message" name="message" rows={4} className={field} style={fieldStyle} placeholder="Resumes, contracts, SOWs, something else…" defaultValue="" />
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <input id="agree" name="agree" type="checkbox" className="mt-1 w-4 h-4 rounded accent-[#002181]" />
                    <label htmlFor="agree" className="font-sans-g text-[13px] leading-relaxed" style={{ color: UI.sub }}>
                      I agree to the{" "}
                      <Link href="/privacy" className="font-medium underline-offset-2 hover:underline" style={{ color: UI.blue2 }}>privacy policy</Link>.
                    </label>
                  </div>
                </div>
                <button type="submit" className="mt-7 w-full inline-flex items-center justify-center gap-2 font-sans-g text-[15px] font-semibold text-white py-3.5 rounded-lg transition-transform active:scale-[0.99]" style={{ background: UI.blue, boxShadow: `0 16px 34px -16px ${UI.blue}` }}>
                  Book a walkthrough
                </button>
                <p className="mt-4 text-center font-sans-g text-[12.5px]" style={{ color: UI.faint }}>
                  Prefer email? <a href="mailto:hello@blue-iq.com" className="underline-offset-2 hover:underline" style={{ color: UI.sub }}>hello@blue-iq.com</a>
                </p>
              </motion.form>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
