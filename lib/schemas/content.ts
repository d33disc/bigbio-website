import { z } from 'zod'

/**
 * Schema for MDX frontmatter metadata
 * Validates all content metadata to ensure consistency
 */
export const FrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  publishedAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()).optional(),
  author: z.string().default('BigBio.ai Team'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  slug: z.string().optional(),
})

export type Frontmatter = z.infer<typeof FrontmatterSchema>

/**
 * Schema for blog post frontmatter (extends base schema)
 */
export const BlogFrontmatterSchema = FrontmatterSchema.extend({
  category: z.enum(['AI Strategy', 'Case Study', 'Industry Insights', 'Technology']),
  readingTime: z.number().optional(),
  featured: z.boolean().default(false),
})

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>

/**
 * Schema for case study frontmatter
 */
export const CaseStudyFrontmatterSchema = FrontmatterSchema.extend({
  client: z.string(),
  industry: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.string()),
  testimonial: z
    .object({
      quote: z.string(),
      author: z.string(),
      title: z.string(),
    })
    .optional(),
})

export type CaseStudyFrontmatter = z.infer<typeof CaseStudyFrontmatterSchema>

/**
 * Validates frontmatter and returns typed result
 * Throws with detailed error if validation fails
 */
export function validateFrontmatter<T extends z.ZodSchema>(schema: T, data: unknown): z.infer<T> {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
        .join('\n')
      throw new Error(`Invalid frontmatter:\n${issues}`)
    }
    throw error
  }
}
