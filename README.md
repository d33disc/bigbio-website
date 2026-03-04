# BigBio.ai — Professional Biotech AI Consulting

Next.js 15 static site deployed to InMotion shared hosting via GitHub Actions FTP.

## Quick Start

```bash
npm install
npm run dev          # Local dev at http://localhost:3000
npm run build        # Static export to out/
npx serve out        # Preview production build
```

## Architecture

- **Framework:** Next.js 15 with static export (`output: "export"`)
- **Content:** @next/mdx + remark-gfm — markdown-authored pages
- **Styling:** Tailwind v4 + @tailwindcss/typography
- **Deploy:** GitHub Actions → FTP to InMotion cPanel

See [implementation-plan.md](implementation-plan.md) for full details.
