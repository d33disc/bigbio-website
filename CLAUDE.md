# CLAUDE.md

## Project

bigbio.ai — professional biotech AI consulting website for BigBio. Next.js static site deployed via FTP to InMotion shared hosting (cPanel).

## Tech Stack

- **Framework:** Next.js 15 with static export (`output: "export"`)
- **Content:** @next/mdx + remark-gfm — pages authored in MDX
- **Styling:** Tailwind v4 + @tailwindcss/typography (prose classes)
- **Deploy:** GitHub Actions → FTP (SamKirkland/FTP-Deploy-Action@v4.3.6) → InMotion `public_html/`
- **Routing:** Apache .htaccess SPA fallback (in `public/.htaccess`)

## Commands

```bash
npm run dev          # Local dev server
npm run build        # Static export → out/
npx serve out        # Preview production build locally
```

## Architecture

- `content/` — MDX content files (home.mdx, future blog posts)
- `src/app/` — Next.js App Router pages and layout
- `src/components/` — React components
- `mdx-components.tsx` — Root-level MDX → React component mapping
- `public/.htaccess` — Apache rewrite rules for SPA routing on InMotion
- `.github/workflows/deploy.yml` — CI/CD: build + FTP deploy on push to main

Static export means no server-side features (no API routes, no SSR, no ISR). All pages compile to flat HTML/CSS/JS in `out/`.

## Deploy

Push to `main` triggers GitHub Actions deploy. FTP secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`) are set in GitHub repo settings.
