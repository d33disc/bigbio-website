# CLAUDE.md

## Project

bigbio.ai — professional biotech AI consulting website for BigBio. Next.js static site deployed via FTP to InMotion shared hosting (cPanel).

## Tech Stack

- **Framework:** Next.js 15 with static export (`output: "export"`)
- **Content:** @next/mdx + remark-gfm — pages authored in MDX
- **Styling:** Tailwind v4 + @tailwindcss/typography (prose classes)
- **Deploy:** GitHub Actions → FTP (SamKirkland/FTP-Deploy-Action@v4.3.6) → InMotion `public_html/`
- **Routing:** Static HTML files; minimal `.htaccess` (DirectoryIndex + 404 only)

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
- `public/.htaccess` — Minimal Apache config (DirectoryIndex + 404 only; ModSecurity blocks rewrites/headers)
- `.github/workflows/deploy.yml` — CI/CD: build + FTP deploy on push to main

Static export means no server-side features (no API routes, no SSR, no ISR). All pages compile to flat HTML/CSS/JS in `out/`.

## Deploy

Push to `main` triggers GitHub Actions deploy. FTP secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`) are set in GitHub repo settings.

**Hosting note:** ModSecurity is currently disabled in cPanel (pending InMotion whitelist ticket). Once whitelisted, re-enable ModSecurity and restore `.htaccess` security headers.

## Code Generation Guidelines for AI Tools

When Claude Code or other AI tools generate code for this project:

### Architecture Constraints

- **No API routes** — static export only, no server-side code
- **No SSR, ISR, or ISG** — all pages must be pre-rendered to static HTML
- **Content via MDX** — use `content/` directory for markdown-authored pages
- **Components in React** — interactive elements, not MDX text

### Code Patterns

- **Components:** One per file, functional components with hooks
- **TypeScript strict:** No `any` types without explicit `/* @ts-expect-error */` comment
- **Props validation:** Use TypeScript interfaces, not PropTypes
- **Functions:** Max 20 lines, max 15 cyclomatic complexity
- **Files:** Max 200 lines (excluding comments), clear single responsibility

### Naming Conventions

- **Components:** PascalCase filenames (e.g., `Button.tsx`, `LinkCard.tsx`)
- **Utilities:** camelCase filenames (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Files match exports:** Component file name = component name
- **Directories:** lowercase (e.g., `components/atoms/`, `src/utils/`)

### Code Quality

Before committing, code must pass:

```bash
npm run lint:fix          # Auto-fix linting issues
npm run type-check       # TypeScript strict checking
npm run test:unit        # Unit tests must pass
npm run build            # Static export must succeed
```

**No exceptions.** PRs that don't pass these checks will be blocked.

### Testing

- **Unit tests required** for utilities, components with logic
- **Test file naming:** `Component.test.tsx` (co-located with component)
- **Test runner:** Vitest with happy-dom
- **Coverage targets:** 80% lines, functions, branches

### Constraints & NO-NOs

- ❌ No `console.log()` in production code (only `console.warn`, `console.error`)
- ❌ No external API calls (static export means no runtime fetch)
- ❌ No environment variables (build-time only)
- ❌ No dynamic routing (all routes must be known at build time)
- ❌ No third-party scripts that require a server
- ✅ Use MDX for content-heavy pages
- ✅ Use React components for interactive UI
- ✅ Use Tailwind classes (no inline styles)

### Before Submitting Code

1. Run full quality checks: `npm run lint:fix && npm run type-check && npm run test:unit && npm run build`
2. Verify no errors or warnings
3. Test locally: `npx serve out`
4. Commit with descriptive message
5. Push to feature branch (never directly to `main`)

### Reference

- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [MDX in Next.js](https://nextjs.org/docs/app/guides/mdx)
- [Tailwind v4 Docs](https://tailwindcss.com)
