import { cn } from '@/lib/utils'

const metrics = [
  {
    value: '$4.24M+',
    label: 'Capital raised',
    detail: 'VC + NIIMBL grant, 84% founder equity retained',
  },
  {
    value: '90 min',
    label: 'Sterility testing',
    detail: 'vs. 14-day reference method — 200x faster',
  },
  {
    value: '60,000',
    label: 'False positives filtered',
    detail: 'From 1.2M compound screen at Novartis',
  },
  {
    value: '6M',
    label: 'Compounds screened',
    detail: 'Across 5 HTS programs at NIBR',
  },
  {
    value: '10 mo early',
    label: 'Autonomous platform delivered',
    detail: '35% under budget — Calgary drug discovery',
  },
  {
    value: '7,000+',
    label: 'Assets reviewed per week',
    detail: '100% first-pass approval at Shire',
  },
] as const

export function Results() {
  return (
    <section className="bg-navy-950 px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold tracking-widest text-emerald-400 uppercase">
          Track record
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Results that trace to receipts
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-gray-400">
          Every number here is verified. No invented metrics, no inflated claims.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                'rounded-lg border border-white/10 p-6 transition-all duration-200',
                'hover:border-emerald-400/30'
              )}
            >
              <p
                className={cn(
                  'mb-1 font-bold text-emerald-400',
                  index < 2 ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'
                )}
              >
                {metric.value}
              </p>
              <p className="mb-2 font-semibold text-white">{metric.label}</p>
              <p className="text-sm text-gray-400">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
