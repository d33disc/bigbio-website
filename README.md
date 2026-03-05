# BigBio.ai -- Professional Biotech AI Consulting

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
- **Content:** @next/mdx + remark-gfm -- markdown-authored pages
- **Styling:** Tailwind v4 + @tailwindcss/typography
- **Deploy:** GitHub Actions -> FTP to InMotion cPanel

## Deployment

### How It Works

Push to `main` triggers `.github/workflows/deploy.yml`, which builds the static site and uploads `out/` to InMotion via FTP (SamKirkland/FTP-Deploy-Action@v4.3.6).

- **FTP server:** Pure-FTPd on port 21
- **Server directory:** `/home/bigbio5/public_html/`
- **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` in GitHub repo settings

### InMotion Hosting Gotchas

- **ModSecurity 406:** InMotion's ModSecurity blocks `RewriteEngine`, `Header set`, and `mod_deflate` directives in `.htaccess`. Any of these triggers a 406 error on every request.
- **`.htaccess` must be minimal:** Only `DirectoryIndex` and `ErrorDocument` are safe. No rewrites, no security headers, no compression.
- **ModSecurity status:** Currently disabled in cPanel to unblock deploys. Pending InMotion support ticket to whitelist the domain. Once whitelisted, re-enable and restore headers.
- **server-dir path:** Must be `/home/bigbio5/public_html/` (absolute path, trailing slash).
- **cPanel access:** `https://<server-hostname>:2083` (credentials in 1Password, never in code).

### Reference

- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [MDX in Next.js](https://nextjs.org/docs/app/guides/mdx)
- [Tailwind v4 Docs](https://tailwindcss.com)
- [InMotion FTP Setup Guide](https://www.inmotionhosting.com/support/website/ftp/)
