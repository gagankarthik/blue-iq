"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { SA } from "@/lib/theme";
import { PageHero, WRAP } from "@/components/page/kit";
import { SPRING_SOFT } from "@/components/saas/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /contact

   A contact page is a name, an email, and a sentence about what you want.
   Everything past that is the page getting in the way of the one thing it
   exists to do.

   Two things have now been cut from this page for being exactly that:
   a 592-line version with a five-state machine, and after it a "What's this
   about?" selector — four options, each with its own hint line — which was
   twenty words of chrome asking a question the message box already answers.
   Whoever is writing to us can just say what they want.

   NO BACKEND. `send()` is simulated — nothing leaves the browser. So the
   success state does NOT claim we received anything, because we didn't: it
   hands the note back as a mailto, addressed to the one mailbox this site
   actually publishes. Wire this to a real endpoint and that copy is the first
   thing that has to change.
   ──────────────────────────────────────────────────────────────── */

const EMAIL = "hello@blue-iq.ai";

type Errors = { name?: string; email?: string; message?: string };

export default function ContactClient() {
  const reduce = useReducedMotion();
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!v.name.trim()) next.name = "Please tell us your name.";
    if (!v.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) next.email = "That email does not look right.";
    if (!v.message.trim()) next.message = "Tell us what you are trying to read.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    await new Promise((r) => setTimeout(r, 800));
    setState("sent");
  }

  const mailto =
    `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry — ${v.name.trim()}`)}` +
    `&body=${encodeURIComponent([v.message.trim(), "", "—", v.name.trim(), v.email.trim()].filter(Boolean).join("\n"))}`;

  const inputStyle = (bad?: string) => ({
    background: SA.surface,
    border: `1px solid ${bad ? SA.red : SA.line2}`,
    color: SA.ink,
  });
  const inputClass = "w-full rounded-lg px-3.5 py-3 font-sans-g text-[15px] outline-none";

  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero
          title="Send us the ugliest document you have."
          lede="The only test worth running is the one on your own files. Tell us what you're trying to read, and we'll show you the fields it returns, the score on each one, and the ones it flags."
        />

        <section className={`${WRAP} pb-28 sm:pb-36`}>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] gap-y-14 lg:gap-x-24 items-start">
            <div className="pt-10" style={{ borderTop: `1px solid ${SA.line2}` }}>
              {state === "sent" ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={SPRING_SOFT}
                >
                  <Check className="w-7 h-7" strokeWidth={1.5} style={{ color: SA.accent }} aria-hidden />
                  <h2
                    className="mt-5 font-display font-normal leading-[1.15]"
                    style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", letterSpacing: "-0.03em", color: SA.ink }}
                  >
                    Your message is written. One click sends it.
                  </h2>
                  {/* Straight with the person: there is no mailbox behind this
                      form yet, and telling them "we got it" would be a lie told
                      to a real customer on their first contact with us. */}
                  <p className="mt-4 font-sans-g leading-[1.75] max-w-[48ch]" style={{ fontSize: "1rem", color: SA.sub }}>
                    This form isn&apos;t wired to a mailbox yet, so nothing left your browser. The button below opens
                    your own mail app with everything you typed already composed.
                  </p>
                  <a
                    href={mailto}
                    className="inline-flex items-center gap-2 mt-8 rounded-lg px-6 py-3 font-sans-g text-[15px] font-semibold text-white transition-transform active:translate-y-px"
                    style={{ background: SA.ink }}
                  >
                    Open it in your mail app
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={send} noValidate className="flex flex-col gap-7">
                  <div className="grid sm:grid-cols-2 gap-x-5 gap-y-7">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-sans-g text-[14px] font-medium" style={{ color: SA.ink }}>
                        Name
                      </label>
                      <input id="name" value={v.name} onChange={set("name")} className={inputClass} style={inputStyle(errors.name)} aria-invalid={!!errors.name} />
                      {errors.name && (
                        <p role="alert" className="font-sans-g text-[13px]" style={{ color: SA.red }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-sans-g text-[14px] font-medium" style={{ color: SA.ink }}>
                        Work email
                      </label>
                      <input id="email" type="email" value={v.email} onChange={set("email")} className={inputClass} style={inputStyle(errors.email)} aria-invalid={!!errors.email} />
                      {errors.email && (
                        <p role="alert" className="font-sans-g text-[13px]" style={{ color: SA.red }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-sans-g text-[14px] font-medium" style={{ color: SA.ink }}>
                      What are you trying to read?
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={v.message}
                      onChange={set("message")}
                      placeholder="The documents, roughly how many a month, and anything else you want to ask — pricing, a custom build, a security review."
                      className={`${inputClass} resize-y`}
                      style={inputStyle(errors.message)}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p role="alert" className="font-sans-g text-[13px]" style={{ color: SA.red }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-sans-g text-[15px] font-semibold text-white transition-transform active:translate-y-px disabled:opacity-70"
                      style={{ background: SA.ink }}
                    >
                      {state === "sending" && <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} aria-hidden />}
                      {state === "sending" ? "Sending…" : "Send it"}
                    </button>

                    <p className="font-sans-g text-[14px]" style={{ color: SA.faint }}>
                      Or email{" "}
                      <a href={`mailto:${EMAIL}`} className="font-semibold hover:underline underline-offset-4" style={{ color: SA.accent }}>
                        {EMAIL}
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Pricing, plainly. There are no published tiers, so there are no
                Starter/Pro/Enterprise cards here — inventing three would be the
                easiest lie on the entire site to tell. */}
            <aside id="pricing" className="pt-10 scroll-mt-28" style={{ borderTop: `1px solid ${SA.line2}` }}>
              <h2
                className="font-display font-normal leading-[1.15]"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", letterSpacing: "-0.03em", color: SA.ink }}
              >
                What it costs
              </h2>
              <p className="mt-5 font-sans-g leading-[1.75]" style={{ fontSize: "1rem", color: SA.sub }}>
                We don&apos;t publish plans. A price that ignored what you&apos;re reading and how much of it arrives
                would be a made-up number. What you pay follows the volume and which products are in play.
              </p>
              <p className="mt-4 font-sans-g leading-[1.75]" style={{ fontSize: "1rem", color: SA.sub }}>
                Tell us the documents and roughly how many a month, and we&apos;ll come back with a real figure.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
