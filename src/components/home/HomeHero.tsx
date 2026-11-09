import { BB } from "@/lib/theme";
import { RotatingWord } from "@/components/home/motion";
import SonarField from "@/components/home/SonarField";
import { SqBtn } from "@/components/home/ui";

/* ────────────────────────────────────────────────────────────────
   The hero, blueprint system, carrying the original home copy:
   "We build the products that read your ___" with the rotating word, the
   portfolio paragraph, and the two original actions. The cobalt Sonar field
   pings out on the right (desktop only). Lines rise out of a mask in turn;
   the word rotates, pausing on hover and off screen. No mockup.
   ──────────────────────────────────────────────────────────────── */

const READS = ["contracts", "invoices", "resumes", "licences", "agreements"];

export default function HomeHero() {
  return (
    <section className="relative" aria-labelledby="hero-h">
      {/* the field lives inside the content column */}
      <div className="absolute inset-0 px-6 sm:px-8">
        <div className="relative h-full max-w-[1112px] mx-auto overflow-hidden">
          <SonarField />
        </div>
      </div>

      <div className="relative px-6 sm:px-8 pt-32 sm:pt-40 pb-24">
        <div className="max-w-[1112px] mx-auto">
          <h1 id="hero-h" className="font-head h-hero" style={{ color: BB.ink }}>
            <span className="bb-line">
              <span style={{ animationDelay: "0.08s" }}>We build the products</span>
            </span>
            <span className="bb-line">
              <span style={{ animationDelay: "0.2s" }}>
                that read your <RotatingWord words={READS} label="contracts, invoices, resumes, licences and agreements" color={BB.cobalt} />
              </span>
            </span>
          </h1>
          <p className="bb-in mt-8 font-sans-g t-sub max-w-[46ch]" style={{ color: BB.ink3, animationDelay: "0.36s" }}>
            Blue-IQ turns business documents into answers you can act on. Capture structures what comes in, Spend checks every invoice against what you agreed,
            and Govern keeps each contract in view. Underneath, Sonar scores every value and sends anything uncertain to a person.
          </p>
          <div className="bb-in mt-12 flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.48s" }}>
            <SqBtn href="/contact?topic=A%20demo" tone="cobalt" size="lg" arrow>
              Book a demo
            </SqBtn>
            <SqBtn href="/contact" tone="light" size="lg" arrow className="border border-[#D9DCE2]">
              Contact us
            </SqBtn>
          </div>
        </div>
      </div>
    </section>
  );
}
