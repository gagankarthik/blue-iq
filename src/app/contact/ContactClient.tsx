"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { EASE } from "@/components/saas/motion";
import { PageHero, WRAP } from "@/components/page/kit";
import { IconCheck, IconArrow } from "@/components/icons/BqIcons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /contact — the form is the page.

   The card sits over the header's edge so it is on screen immediately.
   Topic chips replace a free-text subject line. An email typed into the
   home page CTA arrives pre-filled (?email=). There is no mailbox behind the
   form yet, so a sent form opens the visitor's own mail app with everything
   composed, and says so, rather than pretending it was received.
   ──────────────────────────────────────────────────────────────── */

const EMAIL = "hello@blue-iq.ai";
const TOPICS = ["A demo", "Pricing", "A custom build", "Security review", "Something else"];

const NEXT: [string, string][] = [
  ["A person reads your message", "Someone from our team, not a bot."],
  ["You send a few real documents", "The messy ones are the useful ones."],
  ["We read them with Sonar, live", "Every field, every score, every flag."],
];

type Errors = { name?: string; email?: string; message?: string };

export default function ContactClient() {
  const reduce = useReducedMotion();
  const [v, setV] = useState({ name: "", email: "", company: "", message: "" });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("email");
    if (e) setV((p) => ({ ...p, email: e }));
    if (window.location.hash === "#pricing") setTopic("Pricing");
  }, []);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => (k in p ? { ...p, [k]: undefined } : p));
  };

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!v.name.trim()) next.name = "Please add your name.";
    if (!v.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) next.email = "That email does not look right.";
    if (!v.message.trim()) next.message = "Tell us a little about what you need.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("sending");
    await new Promise((r) => setTimeout(r, 600));
    setState("sent");
  }

  const mailto =
    `mailto:${EMAIL}?subject=${encodeURIComponent(`${topic}: ${v.name.trim()}${v.company.trim() ? `, ${v.company.trim()}` : ""}`)}` +
    `&body=${encodeURIComponent([v.message.trim(), "", "—", v.name.trim(), v.company.trim(), v.email.trim()].filter(Boolean).join("\n"))}`;

  const field = (bad?: string) =>
    `w-full rounded-xl px-4 py-3 font-sans-g text-[15px] outline-none transition-[border-color,box-shadow] focus:border-[#1D5BF0] focus:shadow-[0_0_0_4px_rgba(29,91,240,0.12)] ${bad ? "border-[#C0492E]" : "border-[#D6DDEA]"} border bg-white`;

  return (
    <div className="overflow-x-clip" style={{ background: SA.bg2, color: SA.ink }}>
      <SiteNav />
      <main>
        <PageHero label="Contact" title="Talk to the Blue-IQ team" lede="Book a demo on your own documents, ask about pricing, or scope a custom build." />

        <section className={`${WRAP} relative -mt-10 sm:-mt-14 pb-20 sm:pb-28`}>
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-6 items-start">
            <div className="rounded-[28px] p-6 sm:p-10 bg-white" style={{ border: `1px solid ${SA.line}`, boxShadow: "0 40px 80px -48px rgba(10,18,48,0.45)" }}>
              {state === "sent" ? (
                <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="py-6">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl" style={{ background: SA.accentSoft, color: SA.accent }}>
                    <IconCheck size={28} />
                  </span>
                  <h2 className="mt-6 font-display font-semibold text-[1.8rem] tracking-[-0.03em]" style={{ color: SA.ink }}>
                    Almost there. One click sends it.
                  </h2>
                  <p className="mt-3 font-sans-g text-[15.5px] leading-[1.6] max-w-[46ch]" style={{ color: SA.sub }}>
                    Your message is ready in your mail app, addressed to our team. Nothing has been sent yet.
                  </p>
                  <a href={mailto} className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans-g text-[15px] font-semibold text-white" style={{ background: SA.ink }}>
                    Open in my mail app <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={send} noValidate className="flex flex-col gap-6">
                  <fieldset>
                    <legend className="font-sans-g text-[14px] font-semibold" style={{ color: SA.ink }}>
                      What can we help with?
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TOPICS.map((t) => {
                        const on = t === topic;
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setTopic(t)}
                            className="rounded-full px-4 py-2 font-sans-g text-[14px] font-medium transition-colors"
                            style={{ background: on ? SA.ink : SA.bg2, color: on ? "#fff" : SA.sub, border: `1px solid ${on ? SA.ink : SA.line}` }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {([
                      ["name", "Name", "text", "name"],
                      ["email", "Work email", "email", "email"],
                    ] as const).map(([k, label, type, ac]) => (
                      <div key={k} className="flex flex-col gap-2">
                        <label htmlFor={k} className="font-sans-g text-[14px] font-semibold" style={{ color: SA.ink }}>
                          {label}
                        </label>
                        <input id={k} type={type} autoComplete={ac} value={v[k]} onChange={set(k)} className={field(errors[k])} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} />
                        {errors[k] && (
                          <p id={`${k}-err`} role="alert" className="font-sans-g text-[13px]" style={{ color: SA.red }}>
                            {errors[k]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="font-sans-g text-[14px] font-semibold" style={{ color: SA.ink }}>
                      Company <span className="font-normal" style={{ color: SA.faint }}>(optional)</span>
                    </label>
                    <input id="company" autoComplete="organization" value={v.company} onChange={set("company")} className={field()} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-sans-g text-[14px] font-semibold" style={{ color: SA.ink }}>
                      What are you trying to read?
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={v.message}
                      onChange={set("message")}
                      placeholder="For example: 2,000 vendor invoices a month, mostly scanned PDFs."
                      className={`${field(errors.message)} resize-y`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-err" : undefined}
                    />
                    {errors.message && (
                      <p id="message-err" role="alert" className="font-sans-g text-[13px]" style={{ color: SA.red }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans-g text-[15px] font-semibold text-white transition-colors active:scale-[0.98] disabled:opacity-70 hover:bg-[#16204A]"
                      style={{ background: SA.ink }}
                    >
                      {state === "sending" ? (
                        <>
                          <span aria-hidden className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /> Preparing
                        </>
                      ) : (
                        <>
                          Send message <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    <p className="font-sans-g text-[14px]" style={{ color: SA.sub }}>
                      Or email{" "}
                      <a href={`mailto:${EMAIL}`} className="font-semibold hover:underline underline-offset-4" style={{ color: SA.accent }}>
                        {EMAIL}
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>

            <aside className="flex flex-col gap-6">
              <div className="rounded-[28px] p-7 sm:p-8" style={{ background: SA.navy }}>
                <h2 className="font-display font-semibold text-[1.3rem] tracking-[-0.02em] text-white">What happens next</h2>
                <ol className="mt-6 space-y-5">
                  {NEXT.map(([t, d], k) => (
                    <li key={t} className="flex gap-4">
                      <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full font-display font-semibold text-[14px]" style={{ background: "#6AA3FF", color: SA.navy }}>
                        {k + 1}
                      </span>
                      <span>
                        <span className="block font-sans-g text-[15px] font-semibold text-white">{t}</span>
                        <span className="block font-sans-g text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {d}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div id="pricing" className="rounded-[28px] p-7 sm:p-8 bg-white scroll-mt-28" style={{ border: `1px solid ${SA.line}` }}>
                <h2 className="font-display font-semibold text-[1.3rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
                  Pricing
                </h2>
                <p className="mt-2 font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
                  Based on your volume and the products you use. Tell us both and we will send a real number.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
