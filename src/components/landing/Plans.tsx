import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '#',
    priceMonthly: 'Pay as you go',
    description: 'Perfect for small teams and early-stage staffing firms.',
    features: [
      'Up to 10,000 resume parses / month',
      'AI-powered resume parsing',
      'Skills, experience & education extraction',
      'OCR support for scanned PDFs',
      'Standard API access',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '#',
    priceMonthly: 'Volume-based',
    description: 'Built for growing staffing teams that need scale and speed.',
    features: [
      'High-volume resume parsing',
      'Advanced AI enrichment & normalization',
      'ATS & CRM integrations',
      'Bulk upload & queue processing',
      'Sub-2-second parse latency',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: 'Custom',
    description: 'Enterprise-grade compliance, security, and customization.',
    features: [
      'Unlimited parsing at scale',
      'Custom SLAs & performance guarantees',
      'On-prem or private cloud deployment',
      'PII redaction & consent tracking',
      'Bias-sensitive parsing controls',
      'Dedicated account manager',
    ],
    featured: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Plans() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8" id='plans'>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Flexible pricing for every hiring team
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Whether you’re a growing staffing firm or a global enterprise, BlueIQ scales with your hiring needs.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:mt-20 lg:max-w-5xl lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? 'relative bg-gray-900 shadow-2xl'
                : 'bg-white',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                'text-base font-semibold',
              )}
            >
              {tier.name}
            </h3>

            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-4xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
            </p>

            <p
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-6 text-base',
              )}
            >
              {tier.description}
            </p>

            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                      'h-6 w-5 flex-none',
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                  : 'text-indigo-600 ring-1 ring-indigo-200 hover:ring-indigo-300',
                'mt-8 block rounded-md px-4 py-2.5 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500',
              )}
            >
              {tier.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
