import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

// Force static generation for robots.txt
export const dynamic = 'force-static'

/**
 * Generates robots.txt for search engine crawling
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
