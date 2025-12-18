import Link from "next/link";
import { ArrowUpRight, Waypoints } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-300 via-indigo-600 to-indigo-400 px-10 py-20 text-center shadow-xl">

          {/* Decorative shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/20" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">

            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-900 text-white text-xl font-bold">
              <Waypoints className="h-6 w-6" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Ready to Hire Smarter?
              <br />
              <span className="font-bold">BlueIQ</span>
            </h2>

            {/* CTA Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-indigo-700 shadow-md hover:bg-indigo-50 transition"
            >
              Start Your Free Trial
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* Trust points */}
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-indigo-100">
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-white/90 flex items-center justify-center text-indigo-600 text-xs">✓</span>
                No upfront payment
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-white/90 flex items-center justify-center text-indigo-600 text-xs">✓</span>
                Easily cancellation
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
