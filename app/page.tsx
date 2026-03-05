import { generateMetadata as generateSEOMetadata, generateJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Results } from '@/components/sections/Results'
import { About } from '@/components/sections/About'
import { CallToAction } from '@/components/sections/CallToAction'
import { Footer } from '@/components/sections/Footer'

export const metadata = generateSEOMetadata({
  title: 'BigBio.ai - Biotech AI Consulting',
  description:
    'AI that ships in regulated biotech. Strategy, validation, and technical leadership for pharma and life sciences.',
  path: '/',
})

export default function Home() {
  const structuredData = generateJsonLd('Organization')

  return (
    <>
      <JsonLd data={structuredData} />
      <main>
        <Hero />
        <Services />
        <Results />
        <About />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
