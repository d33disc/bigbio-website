import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  // Enable static export for FTP deployment
  output: 'export',

  // Configure page extensions to include MDX
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Strict React mode for better development experience
  reactStrictMode: true,

  // Image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for better compatibility with static hosting
  trailingSlash: true,

  // Explicit root prevents incorrect lockfile-based workspace inference.
  turbopack: {
    root: projectRoot,
  },
}

const withMDX = createMDX({
  // MDX configuration - keeping it simple for now
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
