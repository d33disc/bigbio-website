import { validateFrontmatter, FrontmatterSchema } from './schemas/content'
import type { Frontmatter } from './schemas/content'

/**
 * Content loading utilities for MDX files
 * Provides type-safe content loading with validation
 */

export interface MDXContent<T = Frontmatter> {
  frontmatter: T
  content: string
  slug: string
}

/**
 * Loads and validates an MDX file
 * @param module - The imported MDX module
 * @param slug - The content slug
 * @param schema - Zod schema for frontmatter validation
 */
export function loadMDXContent<T extends Frontmatter>(
  module: any,
  slug: string,
  schema = FrontmatterSchema as any
): MDXContent<T> {
  const frontmatter = validateFrontmatter(schema, {
    ...module.frontmatter,
    slug,
  })

  return {
    frontmatter,
    content: module.content || '',
    slug,
  }
}

/**
 * Sorts content by published date (newest first)
 */
export function sortByDate<T extends Frontmatter>(items: MDXContent<T>[]): MDXContent<T>[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt).getTime()
    const dateB = new Date(b.frontmatter.publishedAt).getTime()
    return dateB - dateA
  })
}

/**
 * Filters out draft content in production
 */
export function filterDrafts<T extends Frontmatter>(items: MDXContent<T>[]): MDXContent<T>[] {
  if (process.env.NODE_ENV === 'production') {
    return items.filter((item) => !item.frontmatter.draft)
  }
  return items
}

/**
 * Gets content by tag
 */
export function getContentByTag<T extends Frontmatter>(
  items: MDXContent<T>[],
  tag: string
): MDXContent<T>[] {
  return items.filter((item) => item.frontmatter.tags.includes(tag))
}

/**
 * Generates a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}
