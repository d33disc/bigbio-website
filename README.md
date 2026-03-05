# BigBio.ai -- Professional Biotech AI Consulting

Next.js 15 static site deployed to InMotion shared hosting via GitHub Actions rsync/SSH.

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
- **Deploy:** GitHub Actions -> rsync over SSH to InMotion cPanel

## Deployment

### How It Works

Push to `main` triggers `.github/workflows/deploy.yml`:

1. Build static site (`npm run build` -> `out/`)
2. rsync `out/` to InMotion via SSH (port 2222)
3. Verify site returns HTTP 200

### Configuration

- **SSH host:** `secure360.inmotionhosting.com:2222`
- **Server directory:** `/home/bigbio5/public_html/`
- **GitHub secrets:** `SSH_PRIVATE_KEY`, `SSH_PASSPHRASE`, `SSH_HOST`, `SSH_USERNAME`, `SSH_PORT`
- **rsync excludes:** `.well-known`, `.htaccess` (preserved on server)

### Local SSH Access

```bash
# Requires ~/.ssh/config entry and sshpass
ssh inmotion-bigbio
```

Key and passphrase stored in 1Password (`BigBio SSH - InMotion (bigbio5)`).

### InMotion Hosting Notes

- **ModSecurity:** Currently disabled in cPanel.
- **`.htaccess`:** Must be minimal -- only `DirectoryIndex` and `ErrorDocument`.
  `RewriteEngine`, `Header set`, and `mod_deflate` all trigger 406 errors.
- **WordPress:** Removed 2026-03-05. Was blocking static site with SpeedyCache.
- **cPanel:** `https://<server-hostname>:2083` (credentials in 1Password).

### Reference

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [MDX in Next.js](https://nextjs.org/docs/app/guides/mdx)
- [Tailwind v4](https://tailwindcss.com)
- [InMotion SSH](https://www.inmotionhosting.com/support/server/ssh/shared-reseller-ssh/)
