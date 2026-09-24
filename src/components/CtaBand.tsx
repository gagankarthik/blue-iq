"use client";

import { useState } from "react";
import { SA } from "@/lib/theme";
import SonarField from "@/components/art/SonarField";
import { Reveal } from "@/components/saas/parts";
import { IconArrow } from "@/components/icons/BqIcons";

/* The close. Full-bleed navy over the same live Sonar field as the hero, so
   the page ends where it began. One sentence, one field, one button: the
   email carries straight into the contact form, so nobody types it twice. */
export default function CtaBand() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr("Enter a valid work email.");
      return;
    }
    window.location.href = `/contact?email=${encodeURIComponent(email.trim())}`;
  };

  return (
    <section className="relative isolate overflow-hidden text-center" style={{ background: SA.navy }} aria-labelledby="cta-h">
      <SonarField auto={3200} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(8,16,43,0.85), rgba(8,16,43,0))" }} />

      <Reveal className="relative max-w-[680px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <h2 id="cta-h" className="font-display font-semibold leading-[1.05] text-white" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", letterSpacing: "-0.035em" }}>
          See Sonar read your hardest document.
        </h2>
        <p className="mt-3 mx-auto font-sans-g text-[1rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.76)", maxWidth: "44ch" }}>
          Book a demo and we will process your own files live: every field, every confidence score, every flag.
        </p>

        <form onSubmit={submit} noValidate className="mt-7 mx-auto max-w-[480px]">
          <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-[22px] sm:rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <label htmlFor="cta-email" className="sr-only">
              Work email
            </label>
            <input
              id="cta-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (err) setErr("");
              }}
              aria-invalid={!!err}
              aria-describedby={err ? "cta-err" : undefined}
              className="flex-1 min-w-0 bg-transparent px-5 py-3 font-sans-g text-[15px] text-white placeholder:text-white/50 outline-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans-g text-[15px] font-semibold transition-colors active:scale-[0.98] hover:bg-[#EDF3FF]"
              style={{ background: "#fff", color: SA.ink }}
            >
              Book a demo
              <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <p id="cta-err" role="alert" className="mt-2 min-h-[18px] font-sans-g text-[13.5px]" style={{ color: "#FFC56B" }}>
            {err}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
