export function About() {
  return (
    <section className="bg-gray-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">About</h2>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 text-lg leading-relaxed text-gray-600">
            <p>
              BigBio is Chris Davis — a biotech operator with 25 years spanning drug discovery, AI
              product development, and regulatory strategy.
            </p>
            <p>
              As founder and CEO of Mango Inc, Chris built an AI-native biotech from scratch: a
              machine-vision platform that cut sterility testing from 14 days to 90 minutes. He
              raised $4.24M+, licensed exclusive Caltech IP, secured a $345K NIIMBL grant with
              J&amp;J as corporate partner.
            </p>
            <p>
              Before Mango, Chris screened 6M compounds at Novartis NIBR, managed a $1.2B GI
              franchise pipeline at Shire, and co-founded a computational biology institute under
              MacArthur Fellow Stuart Kauffman at the University of Calgary — delivering a 24/7
              autonomous discovery platform 10 months early and 35% under budget.
            </p>
            <p>
              Education: MS Biotechnology from Johns Hopkins, BS Molecular Biology from UNM,
              executive programs at Harvard Law School (Negotiation) and Thunderbird (Alliance
              Management).
            </p>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-sm tracking-widest text-gray-500 uppercase">Experience</p>
              <p className="text-lg font-semibold text-gray-900">25 years in biotech</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-sm tracking-widest text-gray-500 uppercase">Education</p>
              <p className="text-lg font-semibold text-gray-900">MS Johns Hopkins, BS UNM</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-sm tracking-widest text-gray-500 uppercase">Executive</p>
              <p className="text-lg font-semibold text-gray-900">Harvard Law, Thunderbird</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-sm tracking-widest text-gray-500 uppercase">Founded</p>
              <p className="text-lg font-semibold text-gray-900">Mango Inc (AI biotech)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
