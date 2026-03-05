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
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          What we do
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-gray-500">
          Hands-on consulting from someone who has built and shipped AI products in pharma — not
          just advised on them.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-gray-200 p-8 transition-colors hover:border-gray-300"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="leading-relaxed text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
