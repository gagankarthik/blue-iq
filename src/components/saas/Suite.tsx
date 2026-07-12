"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING_SOFT, Words } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   What we do.

   This section used to be a product catalogue: ParsingLab, Govern, custom
   builds, one per row. That is an org chart, not an argument — it asks a
   stranger to care about three names before they know what the company does.

   It is now an overview of the work, in the order the work happens: we read
   the paperwork, we score what we read, we put it where you already work. A
   reader who never scrolls past this knows what Blue-IQ is.

   The products are still here, but demoted to a single line at the foot,
   which is the right weight: they are how the work is delivered, not the
   thing being sold. Blue-IQ is the umbrella; no one product is the site.

   The numbers (01/02/03) are gone. They implied a sequence you had to follow
   and added a column of ordinal noise to every row.
   ──────────────────────────────────────────────────────────────── */

type Move = {
  id: string;
  line: string;
  body: string;
  image: string;
};

const U = "https://images.unsplash.com/photo-";
const Q = "?w=900&q=75&auto=format&fit=crop";

const moves: Move[] = [
  {
    id: "read",
    line: "We read the paperwork your business already runs on.",
    body: "Resumes, agreements, invoices, compliance files. A PDF, a Word document, a scan, a page photographed on someone's phone. It arrives however it arrives, and it comes back as structured data — no templates to maintain, no rules to write.",
    image: `${U}1586281380349-632531db7ed4${Q}`,
  },
  {
    id: "score",
    line: "We tell you how far to trust every field.",
    body: "Every value comes back with a confidence score, and anything the engine cannot read is flagged for a person instead of guessed at. A wrong value that looks certain costs you far more than a blank one, so we never return one.",
    image: `${U}1450101499163-c8848c66ca85${Q}`,
  },
  {
    id: "ship",
    line: "We put it where your team already works.",
    body: "A documented API for the teams who want to build on it, and a finished product for the teams who do not. Same engine underneath either way — designed, engineered, and supported by us.",
    image: `${U}1517048676732-d65bc937f952${Q}`,
  },
];

const EASE = "cubic-bezier(0.25, 1, 0.5, 1)";

function Row({ m, open, onOpen }: { m: Move; open: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();

  /* The row is a container, the headline is the button. It cannot be one big
     <button> wrapping everything — an <a> inside a <button> is invalid markup
     and Safari swallows the click. */
  return (
    <div
      onMouseEnter={onOpen}
      className="group flex items-start gap-5 sm:gap-10 py-8 sm:py-10"
      style={{ borderTop: `1px solid ${SA.line2}` }}
    >
      <div className="flex-1 min-w-0">
        <button onClick={onOpen} aria-expanded={open} className="block w-full text-left">
          <motion.span
            className="block font-display font-normal leading-[1.1]"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", letterSpacing: "-0.03em" }}
            initial={false}
            animate={{ color: open ? SA.ink : SA.faint }}
            transition={{ duration: 0.3 }}
          >
            {m.line}
          </motion.span>
        </button>

        {/* the body only exists once you have asked for it */}
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={!open}
        >
          <p className="pt-5 font-sans-g leading-[1.75] max-w-[56ch]" style={{ fontSize: "1.02rem", color: SA.sub }}>
            {m.body}
          </p>

          {/* on a phone the image sits here, in the flow, at full width — the
              side rail is a desktop luxury and would be a postage stamp at 390px */}
          <div className="sm:hidden relative mt-6 rounded-2xl overflow-hidden aspect-[16/10]" style={{ background: SA.bg3 }}>
            <img src={m.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>
      </div>

      {/* a closed sliver that opens into a photograph. Grey while closed, so the
          open row is the only one in colour. */}
      <span
        aria-hidden
        className="relative shrink-0 hidden sm:block rounded-xl overflow-hidden self-start"
        style={{
          width: open ? 360 : 84,
          height: open ? 236 : 60,
          background: SA.bg3,
          transition: reduce ? "none" : `width 620ms ${EASE}, height 620ms ${EASE}`,
        }}
      >
        <img
          src={m.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{
            filter: open ? "grayscale(0)" : "grayscale(1)",
            opacity: open ? 1 : 0.5,
            transition: reduce ? "none" : `filter 620ms ${EASE}, opacity 620ms ${EASE}`,
          }}
        />
        <span className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${SA.line2}` }} />
      </span>
    </div>
  );
}

export default function Suite() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section className="relative px-5 sm:px-8" style={{ background: SA.bg }} aria-labelledby="suite-h">
      <div className="max-w-[1180px] mx-auto">
        <div className="pt-28 sm:pt-40 pb-16 sm:pb-20 text-center">
          <Words
            as="h2"
            text="Your business runs on documents nobody has time to read."
            className="mx-auto font-display font-normal leading-[1.08] max-w-[20ch]"
            style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)", letterSpacing: "-0.032em", color: SA.ink }}
          />
          <span id="suite-h" className="sr-only">
            What Blue-IQ does
          </span>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...SPRING_SOFT, delay: 0.25 }}
            className="mt-7 mx-auto font-sans-g leading-[1.7] max-w-[52ch]"
            style={{ fontSize: "1.08rem", color: SA.sub }}
          >
            Every hire, every contract, every invoice turns up as a file someone has to open, interpret, and re-type
            into a system. Blue-IQ reads them instead.
          </motion.p>
        </div>

        <div>
          {moves.map((m, i) => (
            <Row key={m.id} m={m} open={open === i} onOpen={() => setOpen(i)} />
          ))}
          <div style={{ borderTop: `1px solid ${SA.line2}` }} />
        </div>

        {/* The products, at the weight they deserve on an umbrella site: one
            line. They are how the work is delivered, not the thing being sold. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={SPRING_SOFT}
          className="pt-10 pb-28 sm:pb-40 flex flex-col sm:flex-row sm:items-baseline gap-x-8 gap-y-4"
        >
          <p className="font-sans-g text-[15px] leading-[1.7]" style={{ color: SA.sub }}>
            Today that ships as{" "}
            <a
              href="https://www.parsinglab.blue-iq.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold inline-flex items-center gap-0.5 hover:underline underline-offset-4"
              style={{ color: SA.accent }}
            >
              ParsingLab
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>{" "}
            for hiring,{" "}
            <a
              href="https://govern.blue-iq.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold inline-flex items-center gap-0.5 hover:underline underline-offset-4"
              style={{ color: SA.accent }}
            >
              Govern
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>{" "}
            for contracts, and the products we build for teams neither one fits.
          </p>
          <a
            href="/products"
            className="group shrink-0 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold sm:ml-auto"
            style={{ color: SA.accent }}
          >
            See the suite
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
