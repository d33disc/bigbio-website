export function Hero() {
  return (
    <section className="bg-navy-950 border-t-4 border-emerald-500 px-6 py-28 text-white md:py-40">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-4 text-sm font-semibold tracking-widest text-emerald-400 uppercase">
            Biotech AI Consulting
          </p>
          <h1 className="mb-6 text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl">
            AI that ships in
            <br />
            regulated biotech.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            We&apos;ve built, validated, and shipped AI systems in pharma &mdash; not just talked
            about them. From GxP validation to FDA-ready deployments, BigBio bridges the gap between
            AI hype and regulated reality.
          </p>
          <a
            href="mailto:chris@bigbio.ai"
            className="inline-block rounded-md bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            Let&apos;s talk
          </a>
        </div>
        <div className="hidden text-center lg:block">
          <p className="text-6xl font-bold text-emerald-400">25</p>
          <p className="mt-1 text-sm tracking-widest text-gray-400 uppercase">Years in biotech</p>
        </div>
      </div>
    </section>
  )
}
