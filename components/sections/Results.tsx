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
    <section className="bg-gray-50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Results that trace to receipts
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-gray-500">
          Every number here is verified. No invented metrics, no inflated claims.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-navy-900 mb-1 text-3xl font-bold">{metric.value}</p>
              <p className="mb-2 font-semibold text-gray-900">{metric.label}</p>
              <p className="text-sm text-gray-500">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
