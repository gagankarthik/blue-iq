import React from 'react'

const FAQ = () => {
  return (
    <section className="w-full bg-white px-6 py-20" id ="faq">
      <div className="relative mx-auto max-w-2xl rounded-lg bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:px-10">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-center text-center">
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-neutral-500 md:text-xl">
              Everything you need to know about BlueIQ
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-xl divide-y divide-neutral-200">
            {/* FAQ 1 */}
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>How accurate is BlueIQ?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 group-open:animate-fadeIn">
                  BlueIQ uses advanced NLP, OCR, and confidence scoring to deliver
                  industry-leading resume parsing accuracy across roles and formats.
                </p>
              </details>
            </div>

            {/* FAQ 2 */}
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>Does BlueIQ support scanned resumes and images?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 group-open:animate-fadeIn">
                  Yes. Built-in OCR enables BlueIQ to accurately process scanned PDFs
                  and mobile-captured resume images.
                </p>
              </details>
            </div>

            {/* FAQ 3 */}
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>What languages are supported?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 group-open:animate-fadeIn">
                  BlueIQ supports multilingual resume parsing for all major global
                  languages, enabling international hiring at scale.
                </p>
              </details>
            </div>

            {/* FAQ 4 */}
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>Is there a free trial available?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 group-open:animate-fadeIn">
                  Yes. BlueIQ offers a free trial with limited usage so you can
                  evaluate parsing quality and integrations before upgrading.
                </p>
              </details>
            </div>

            {/* FAQ 5 */}
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>How do integrations work?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-neutral-600 group-open:animate-fadeIn">
                  BlueIQ includes pre-built connectors for popular ATS and CRM
                  platforms, along with API and no-code options for custom workflows.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
