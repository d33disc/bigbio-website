import React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'

export interface LinkProps {
  href: string
  external?: boolean
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  'aria-label'?: string
  'data-testid'?: string
  target?: string
  rel?: string
}

export function Link({
  href,
  external,
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
}: LinkProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('https')
  const isMailto = href.startsWith('mailto:')
  const isInternal = !isExternal && !isMailto

  // Base styles for all links
  const baseStyles =
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600'
  const combinedClassName = cn(baseStyles, className)

  if (isInternal) {
    const nextLinkProps: any = {
      href,
      className: combinedClassName,
    }
    if (onClick) nextLinkProps.onClick = onClick
    if (ariaLabel) nextLinkProps['aria-label'] = ariaLabel
    if (dataTestId) nextLinkProps['data-testid'] = dataTestId

    return <NextLink {...nextLinkProps}>{children}</NextLink>
  }

  const anchorProps: any = {
    href,
    className: combinedClassName,
  }
  if (onClick) anchorProps.onClick = onClick
  if (ariaLabel) anchorProps['aria-label'] = ariaLabel
  if (dataTestId) anchorProps['data-testid'] = dataTestId
  if (isExternal) {
    anchorProps.target = '_blank'
    anchorProps.rel = 'noopener noreferrer'
  }

  return <a {...anchorProps}>{children}</a>
}
