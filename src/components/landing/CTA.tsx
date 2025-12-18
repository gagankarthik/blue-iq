export default function CTA() {
  return (
    <section className="relative isolate flex min-h-screen items-center bg-white">
      <div className="mx-auto w-full max-w-9xl px-6 lg:px-8">
        <div className="relative isolate flex min-h-[50vh] flex-col justify-center overflow-hidden bg-gray-900 px-6 py-20 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex-row lg:items-center lg:gap-x-20 lg:px-24">
          
          {/* Background Gradient */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full mask-[radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#blueiq-gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="blueiq-gradient">
                <stop stopColor="#3B82F6" />
                <stop offset={1} stopColor="#6366F1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Text Content */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Ready to Hire Smarter?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              BlueIQ transforms unstructured resumes into clean, searchable candidate
              intelligence in seconds—so your team can move faster and hire better.
            </p>

            <div className="mt-10 flex flex-col gap-6 items-center sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a Demo
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-white hover:text-gray-200"
              >
                Start Free Trial <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Visual Placeholder */}
          <div className="relative mt-16 h-80 w-full max-w-xl lg:mt-0">
            <div className="absolute inset-0 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur">
              <div className="flex h-full items-center justify-center text-sm text-gray-300">
                BlueIQ Dashboard Preview
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
