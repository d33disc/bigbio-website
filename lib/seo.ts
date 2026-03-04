import type { Metadata } from 'next'
import type { Frontmatter } from './schemas/content'

/**
 * SEO configuration and utilities for metadata generation
 */

// Site-wide SEO configuration
export const siteConfig = {
  title: 'BigBio.ai',
  description: 'Biotech AI Consulting - Transform your R&D with AI strategy and implementation',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bigbio.ai',
  author: 'Chris Davis',
  email: 'chris@bigbio.ai',
  twitter: '@bigbio_ai',
  locale: 'en_US',
  keywords: [
    'biotech AI consulting',
    'pharmaceutical AI strategy',
    'AI readiness assessment',
    'drug discovery AI',
    'clinical trials AI',
    'GxP compliance AI',
    'life sciences consulting',
    'AI transformation',
  ],
}

/**
 * Generates metadata for a page
 */
export function generateMetadata(options: {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const {
    title = siteConfig.title,
    description = siteConfig.description,
    path = '/',
    image = '/og-image.png',
    noIndex = false,
  } = options

  const url = `${siteConfig.url}${path}`
  const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.title}`

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,

    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: siteConfig.twitter,
      images: [`${siteConfig.url}${image}`],
    },

    alternates: {
      canonical: url,
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generates metadata from MDX frontmatter
 */
export function generateMetadataFromFrontmatter(frontmatter: Frontmatter, path: string): Metadata {
  return generateMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path,
    noIndex: frontmatter.draft,
  })
}

/**
 * Generates JSON-LD structured data for a page
 */
export function generateJsonLd(type: 'Organization' | 'Article' | 'Service', data?: any) {
  const baseOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.title,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: 'US',
    founder: {
      '@type': 'Person',
      name: siteConfig.author,
    },
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseOrganization,
        ...data,
      }

    case 'Article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        publisher: baseOrganization,
        ...data,
      }

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Biotech AI Consulting',
        provider: baseOrganization,
        serviceType: 'AI Strategy & Implementation',
        ...data,
      }

    default:
      return baseOrganization
  }
}

// Note: JsonLd component moved to components/JsonLd.tsx as a client component
