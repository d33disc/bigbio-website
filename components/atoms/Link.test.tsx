import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Link } from './Link'

describe('Link', () => {
  it('renders as a Next.js Link for internal links', () => {
    render(<Link href="/about">About Us</Link>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/about')
    expect(link).toHaveTextContent('About Us')
  })

  it('renders as external link with proper attributes', () => {
    render(
      <Link href="https://example.com" external>
        External Site
      </Link>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('handles mailto links correctly', () => {
    render(<Link href="mailto:chris@bigbio.ai">Email Us</Link>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'mailto:chris@bigbio.ai')
    expect(link).toHaveTextContent('Email Us')
  })

  it('applies custom className', () => {
    render(
      <Link href="/" className="text-blue-600 hover:text-blue-800">
        Home
      </Link>
    )
    const link = screen.getByRole('link')
    expect(link.className).toContain('text-blue-600')
    expect(link.className).toContain('hover:text-blue-800')
  })

  it('passes through additional props', () => {
    render(
      <Link href="/" data-testid="custom-link" aria-label="Go home">
        Home
      </Link>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('data-testid', 'custom-link')
    expect(link).toHaveAttribute('aria-label', 'Go home')
  })
})
