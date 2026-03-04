import type { MDXComponents } from 'mdx/types'
import { Link } from '@/components/atoms/Link'
import { Button } from '@/components/atoms/Button'

/**
 * Custom components to use in MDX files
 * These override default HTML elements with styled versions
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Typography
    h1: ({ children, ...props }) => (
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="mt-6 mb-3 text-3xl font-semibold tracking-tight" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mt-4 mb-2 text-2xl font-semibold" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="mt-3 mb-2 text-xl font-semibold" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed text-gray-700" {...props}>
        {children}
      </p>
    ),

    // Lists
    ul: ({ children, ...props }) => (
      <ul className="mb-4 list-inside list-disc space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 list-inside list-decimal space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-gray-700" {...props}>
        {children}
      </li>
    ),

    // Links
    a: ({ href = '#', children, ...props }) => (
      <Link href={href} className="text-blue-600 underline hover:text-blue-800" {...props}>
        {children}
      </Link>
    ),

    // Code
    code: ({ children, ...props }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-red-600" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100" {...props}>
        {children}
      </pre>
    ),

    // Blockquote
    blockquote: ({ children, ...props }) => (
      <blockquote className="my-4 border-l-4 border-blue-600 pl-4 text-gray-600 italic" {...props}>
        {children}
      </blockquote>
    ),

    // Table
    table: ({ children, ...props }) => (
      <table className="mb-4 min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700" {...props}>
        {children}
      </td>
    ),

    // Horizontal rule
    hr: ({ ...props }) => <hr className="my-8 border-gray-200" {...props} />,

    // Image
    img: ({ alt = '', ...props }) => (
      <img className="h-auto max-w-full rounded-lg shadow-lg" alt={alt} {...props} />
    ),

    // Custom components available in MDX
    Button,
    Link,
  }
}
