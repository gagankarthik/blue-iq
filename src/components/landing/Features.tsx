import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI-Powered Resume Parsing',
    description:
      'Automatically extracts skills, job titles, experience, education, and certifications with high accuracy.',
    icon: SparklesIcon,
  },
  {
    name: 'Seamless Integrations',
    description:
      'Connects effortlessly with leading ATS and CRM platforms to fit directly into your existing workflow.',
    icon: LockClosedIcon,
  },
  {
    name: 'Compliance & Trust Controls',
    description:
      'Built-in consent tracking, PII redaction, and bias-aware parsing options help meet compliance and ethical hiring standards.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Scalable & High Performance',
    description:
      'Designed for growth with bulk resume imports, queue-based processing, and sub-2-second parsing latency.',
    icon: FingerPrintIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32" id='features'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Smart Features for Smarter Hiring
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
