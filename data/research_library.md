# Research Library

Reference collection for website content and technical decisions.
When you discover useful references during any session, add them here.

Entry format:

```text
### [Title]
- **URL:** ...
- **Date:** YYYY-MM-DD
- **Key findings:** ...
- **Relevance:** ...
```

---

## Biotech AI & Pharma

(Add entries as research is conducted)

---

## Regulatory & GxP

(Add entries as research is conducted)

---

## AI Validation & Deployment

(Add entries as research is conducted)

---

## Web Development & Hosting

### InMotion ModSecurity .htaccess Constraints

- **URL:** N/A (discovered through deployment debugging)
- **Date:** 2026-03-05
- **Key findings:** InMotion ModSecurity blocks common .htaccess directives with HTTP 406.
  Blocked: `RewriteEngine`, `Header set/append`, `mod_deflate`.
  Safe: `DirectoryIndex`, `ErrorDocument`. ModSecurity disabled pending whitelist ticket.
- **Relevance:** .htaccess must stay minimal. Security headers need ModSecurity whitelist or CDN-level config.

### Next.js Static Export on Shared Hosting

- **URL:** N/A (discovered through deployment)
- **Date:** 2026-03-05
- **Key findings:** `output: "export"` produces flat HTML/CSS/JS in `out/`.
  FTP deploy via SamKirkland/FTP-Deploy-Action@v4.3.6 works reliably.
  `server-dir`: `/home/bigbio5/public_html/`. Pure-FTPd on port 21.
- **Relevance:** Pipeline is working end-to-end. No server-side features available.

### InMotion SSH Access

- **URL:** <https://www.inmotionhosting.com/support/server/ssh/shared-reseller-ssh/>
- **Date:** 2026-03-05
- **Key findings:** SSH available on shared hosting via port 2222.
  Host: `secure360.inmotionhosting.com`. User: `bigbio5`.
  Key: `claude_code` (RSA 2048), passphrase-protected, generated in cPanel.
  Private key in 1Password (`InMotion Hosting SSH private key for Claude code`)
  and `~/.ssh/inmotion_claude_code` locally.
  SSH config alias: `inmotion-bigbio` in `~/.ssh/config`.
  GitHub secrets: `SSH_PRIVATE_KEY`, `SSH_PASSPHRASE`, `SSH_HOST`,
  `SSH_USERNAME`, `SSH_PORT` — ready for CI/CD rsync deploy.
- **Relevance:** SSH enables rsync deploy (more reliable than FTP),
  server diagnostics, cache management, and WordPress cleanup.

### 1Password SSH Agent Integration

- **URL:** <https://developer.1password.com/docs/ssh>
- **Date:** 2026-03-05
- **Key findings:** 1Password desktop app has a built-in SSH agent.
  Enable in Settings > Developer > "Use the SSH Agent".
  Agent socket: `~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock`.
  Configure in `~/.ssh/config` via `IdentityAgent` directive.
  Can generate Ed25519/RSA keys directly (never touch disk).
  Agent config: `~/.config/1Password/ssh/agent.toml` (TOML format).
  SDK (Go/JS/Python) is for app-level secrets, NOT needed for SSH.
  The bigbio5 key is file-based (not agent-managed) due to cPanel
  generation; works via sshpass + passphrase from op.
- **Relevance:** Future keys should be generated in 1Password directly
  for zero-disk-exposure. Current setup works but is hybrid.

### InMotion SpeedyCache — Must Purge After Deploy

- **URL:** <https://www.inmotionhosting.com/support/edu/cpanel/cache-manager-cpanel/>
- **Date:** 2026-03-05
- **Key findings:** InMotion uses SpeedyCache (nginx-level page cache).
  After FTP deploy, the old site stays cached until manually purged.
  Headers: `x-speedycache-source: Server`,
  `cdn-cache-control: max-age=1296000` (15 days).
  Must "Delete All Cache" in cPanel SpeedyCache after each deploy.
  WordPress and SpeedyCache were removed on 2026-03-05.
  No longer an issue for static deploys.
- **Relevance:** Historical — resolved by removing WordPress.

---

## Consulting & Business Development

(Add entries as research is conducted)

---

_Last updated: 2026-03-05_
