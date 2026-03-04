import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

// Force static generation for sitemap
export const dynamic = 'force-static'

/**
 * Generates sitemap.xml for SEO
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Define your static pages
  const staticPages = ['', '/about', '/services', '/contact', '/case-studies', '/blog']

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // TODO: Add dynamic routes (blog posts, case studies) when implemented
  // const posts = await getAllPosts()
  // const dynamicRoutes = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt || post.publishedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...staticRoutes]
}
