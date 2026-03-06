import { cn } from '@/lib/utils'

const services = [
  {
    title: 'AI Strategy Assessment',
    description:
      "Evaluate your organization's AI readiness for regulated environments. Identify high-impact opportunities and build a roadmap that clears GxP hurdles from day one.",
  },
  {
    title: 'GxP AI Validation',
    description:
      'Validation frameworks for AI/ML systems in pharma and biotech. USP, CLIA/CAP, and FDA OPDP experience across cell therapy, diagnostics, and manufacturing.',
  },
  {
    title: 'Fractional CTO',
    description:
      'Technical leadership for AI-native biotech startups. From architecture to team-building, get founder-level experience without the full-time commitment.',
  },
  {
    title: 'Expert Network Calls',
    description:
      'Deep-domain expertise via Third Bridge, AlphaSights, and GLG. Biotech AI, regulatory strategy, and drug discovery — on demand.',
  },
] as const

export function Services() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          What we do
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-gray-500">
          Hands-on consulting from someone who has built and shipped AI products in pharma — not
          just advised on them.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                'rounded-lg border border-gray-200 p-8 transition-all duration-200',
                'hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md',
                index < 2 && 'border-l-4 border-l-emerald-500'
              )}
            >
              <p className="mb-4 text-sm font-semibold tracking-widest text-gray-300">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="leading-relaxed text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
