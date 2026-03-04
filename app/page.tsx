import { generateMetadata as generateSEOMetadata, generateJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import HomeContent from '@/content/pages/home.mdx'

export const metadata = generateSEOMetadata({
  title: 'BigBio.ai - Biotech AI Consulting',
  description:
    'Transform your biotech R&D with strategic AI implementation. Expert consulting for pharmaceutical and life sciences companies.',
  path: '/',
})

export default function Home() {
  const structuredData = generateJsonLd('Organization')

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <article className="prose prose-lg prose-gray max-w-none">
            <HomeContent />
          </article>
        </div>
      </main>
    </>
  )
}
