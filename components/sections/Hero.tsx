export function Hero() {
  return (
    <section className="bg-navy-950 px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold tracking-widest text-emerald-400 uppercase">
          Biotech AI Consulting
        </p>
        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
          AI that ships in
          <br />
          regulated biotech.
        </h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
          We&apos;ve built, validated, and shipped AI systems in pharma &mdash; not just talked
          about them. From GxP validation to FDA-ready deployments, BigBio bridges the gap between
          AI hype and regulated reality.
        </p>
        <a
          href="mailto:chris@bigbio.ai"
          className="inline-block rounded-md bg-emerald-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-emerald-400"
        >
          Let&apos;s talk
        </a>
      </div>
    </section>
  )
}
