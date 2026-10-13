import { Btn } from "@/components/system/Btn";

/* The close — a dark rounded card: deep ink fading to brand indigo at the
   base, a light serif line, two pills. Every page ends on it. */
export default function CloseCta({
  title = "Put Sonar to work on your documents",
  sub = "Send us a few real files. We will read them with Sonar, live, and show you every value it finds.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="px-3 sm:px-8 pt-8 pb-3 sm:pb-4" aria-labelledby="close-h">
      <div
        className="relative max-w-[1240px] mx-auto rounded-[28px] overflow-hidden px-6 sm:px-12 py-20 sm:py-24 text-center"
        style={{ background: "linear-gradient(180deg, #1E2130 0%, #262C4D 50%, #3A4CA8 100%)" }}
      >
        <h2 id="close-h" className="relative mx-auto font-display t-h1 text-white max-w-[20ch]">
          {title}
        </h2>
        <p className="relative mt-4 mx-auto font-sans-g text-[1.125rem] leading-[1.6] max-w-[46ch]" style={{ color: "#DDE1F0" }}>
          {sub}
        </p>
        <div className="relative mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Btn href="/contact?topic=A%20demo" tone="dark" size="lg" className="w-full sm:w-auto">
            Book a demo
          </Btn>
          <Btn href="/contact" variant="secondary" tone="dark" size="lg" className="w-full sm:w-auto">
            Contact us
          </Btn>
        </div>
      </div>
    </section>
  );
}
