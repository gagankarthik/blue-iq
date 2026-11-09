import { BB } from "@/lib/theme";
import { SqBtn } from "@/components/home/ui";

/* The close: a square ink block inside the column gutter, centred: the
   ask, one line, and the same two-button pair the hero opens with. Every page ends on it
   (SiteFooter renders it when `cta` is on). */
export default function CloseCta({
  title = "Put Sonar to work on your documents",
  sub = "Send us a few real files. We will read them with Sonar, live, and show you every value it finds.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative px-6 sm:px-8" aria-labelledby="close-h">
      <div className="relative max-w-[1112px] mx-auto rounded-[24px] overflow-hidden" style={{ background: BB.ink }}>
        <div className="px-6 lg:px-8 pt-16 lg:pt-24 pb-8 text-center">
          <h2 id="close-h" className="mx-auto font-head h-sec text-white max-w-[20ch]">
            {title}
          </h2>
          <p className="mt-4 mx-auto font-sans-g t-sub max-w-[52ch]" style={{ color: "#C2C7D1" }}>
            {sub}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-6 lg:px-8 pb-16 lg:pb-24">
          <SqBtn href="/contact?topic=A%20demo" tone="cobalt" size="lg" arrow>
            Book a demo
          </SqBtn>
          <SqBtn href="/contact" tone="light" size="lg" arrow>
            Contact us
          </SqBtn>
        </div>
      </div>
    </section>
  );
}
