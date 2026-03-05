# bigbio.ai Implementation Plan

## Context

bigbio.ai currently shows a 2024 dark-neon placeholder. We're replacing it with a professional biotech AI consulting site. InMotion shared hosting (cPanel), FTP deploy via GitHub Actions.

**Approach: Pipeline first, design later.** Get the architecture working end-to-end before investing in visual design.

## Phase 1a: Pipeline (This Session)

**Goal:** Minimal Next.js + MDX site building and deploying to bigbio.ai via FTP. Proves the entire pipeline works.

### What gets built

- Next.js 15 project with static export (`output: "export"`)
- @next/mdx configured — markdown files render as pages
- @tailwindcss/typography installed — prose styling ready
- `mdx-components.tsx` — basic markdown → styled component mapping
- `content/home.mdx` — simple placeholder content ("BigBio.ai — Site under construction. Contact: `chris@bigbio.ai`")
- GitHub repo created (`d33disc/bigbio-website`)
- GitHub Actions workflow deploying `out/` → `public_html/` via FTP
- **Result:** bigbio.ai shows the new placeholder, deployed automatically on push to main

### Tech stack

| Layer     | Tool                                           |
| --------- | ---------------------------------------------- |
| Framework | Next.js 15 (static export)                     |
| Content   | @next/mdx + remark-gfm                         |
| Styling   | Tailwind v4 (latest) + @tailwindcss/typography |
| Deploy    | SamKirkland/FTP-Deploy-Action@v4.3.6           |
| Hosting   | InMotion shared/cPanel                         |

### Repo structure

```text
~/code/bigbio-website/
├── .github/workflows/deploy.yml
├── .gitignore
├── CLAUDE.md
├── mdx-components.tsx
├── next.config.mjs
├── package.json
├── content/
│   └── home.mdx                  # Placeholder content
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx              # Imports home.mdx
│   └── components/               # Empty for now
└── tsconfig.json
```

### Implementation steps

1. Scaffold Next.js in `~/code/bigbio-website/`
2. Install deps: @next/mdx, @mdx-js/loader, @mdx-js/react, @types/mdx, remark-gfm, @tailwindcss/typography
3. Configure next.config.mjs (MDX + static export)
4. Create mdx-components.tsx (basic prose mapping)
5. Create content/home.mdx (placeholder: site name + email CTA)
6. Create page.tsx that imports home.mdx
7. Create layout.tsx with basic meta tags
8. `npm run build` — verify static out/ directory
9. Create GitHub repo: `gh repo create d33disc/bigbio-website --public` (GitHub Actions minutes are free for public repos; private repos require a paid plan)
10. Add deploy.yml (copy from yourfamilytools-next)
11. Set GitHub secrets: FTP_SERVER, FTP_USERNAME, FTP_PASSWORD
12. Push to main → verify deploy → check bigbio.ai

### Deploy workflow (from yourfamilytools-next)

```yaml
name: Deploy to InMotion Hosting
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: SamKirkland/FTP-Deploy-Action@v4.3.6
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: ./public_html/ # InMotion default; verify in cPanel → File Manager. May be /public_html/bigbio.ai/ for addon domains.
          local-dir: ./out/
```

> **Backup:** Before the first deploy, back up existing bigbio.ai content from `public_html/` via cPanel File Manager or FTP download. The FTP action will overwrite files in `server-dir`.

### Apache routing (.htaccess)

Next.js static export needs `.htaccess` in `public/` so it deploys to `public_html/`:

```apacheconf
# public/.htaccess
RewriteEngine On

# Serve existing files/dirs directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Route all other requests to index.html (SPA fallback)
RewriteRule ^ /index.html [L]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
```

### Verification

1. `npm run build` succeeds
2. `npx serve out` — page renders locally
3. Push to main → GitHub Actions completes
4. bigbio.ai shows new placeholder page
5. `chris@bigbio.ai` mailto link works

### Reference files

- `~/code/yourfamilytools-next/.github/workflows/deploy.yml` — FTP deploy to copy
- `~/code/yourfamilytools-next/next.config.ts` — Static export reference
- [Next.js MDX Guide]<https://nextjs.org/docs/app/guides/mdx>
- <https://www.inmotionhosting.com/support/website/ftp/ftp-getting-started-guide/> - FTP Guide for Inmotion Hosting
- <https://claude.com/claude-code> -Generated with Claude Code Refence Docs
- <https://www.inmotionhosting.com/support/website/ftp/easily-upload-content-to-your-hosting-via-ftp/> - Upload Content to Your Hosting Via FTP

---

### Reference Facts

- FTP Username: <claudecode@bigbio.ai>
- FTP server: ftp.bigbio.ai
- FTP & explicit FTPS port: 21
- FTP Directory /home/bigbio5/

---

## Next Session: Pick Up Here

**Completed this session:**

- CLAUDE.md created with project context, commands, architecture
- `.markdownlint.jsonc` config in place
- Implementation plan finalized

**Next session — execute Phase 1a steps 1-12:**

1. Scaffold Next.js 15 project (steps 1-7)
2. Verify `npm run build` produces `out/` (step 8)
3. Create GitHub repo `d33disc/bigbio-website` if not already remote (step 9)
4. Add `.github/workflows/deploy.yml` + `public/.htaccess` (step 10)
5. Set FTP secrets in GitHub repo settings (step 11)
6. Back up existing `public_html/` content via cPanel before first deploy
7. Push to main → verify pipeline end-to-end (step 12)

**Blockers to resolve before deploying:**

- Confirm `server-dir` path in cPanel (could be `./public_html/` or `./public_html/bigbio.ai/` for addon domains)
- Have FTP credentials ready (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)

---

## Phase 1b: Visual Design (Next Session)

Pick visual direction together, then build real landing page:

- Hero, credibility bar, services, results, about, CTA, footer
- All content in content/home.mdx (markdown-authored)
- Email CTA (`chris@bigbio.ai`) throughout
- Use frontend-design skill for polished output

## Phase 2: Revenue Features (Later)

1. Calendly booking integration
2. Analytics (Plausible/GA4)
3. Blog — drop .mdx files in content/blog/
4. Case studies at /case-studies/[slug]
5. Lead magnet + email capture
6. Testimonials
