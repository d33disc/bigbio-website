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

### Lucide React Icon System + Prompt Playbook Workflow

- **URL:** <https://lucide.dev/guide/packages/lucide-react>
- **Date:** 2026-03-06
- **Key findings:** `lucide-react` provides tree-shakeable SVG icon
  components that fit Next.js static export well. Homepage now uses
  Lucide in Hero, Services, Results, About, and CTA. Prompt consistency
  improved by codifying reusable templates and dial controls in
  `data/design_prompt_playbook.md`.
- **Relevance:** Future sessions should avoid uploading icon assets for standard UI needs and should use the prompt playbook to drive intentional, repeatable visual iterations.

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
  Deploy via rsync over SSH to `/home/bigbio5/public_html/`.
  FTP (SamKirkland/FTP-Deploy-Action) was used initially but proved
  unreliable (`dangerous-clean-slate` caused directory conflicts).
  Switched to rsync/SSH in PR #15 (2026-03-05).
- **Relevance:** Pipeline is working end-to-end. No server-side features
  available.

### InMotion SSH Access

- **URL:** <https://www.inmotionhosting.com/support/server/ssh/shared-reseller-ssh/>
- **Date:** 2026-03-05
- **Key findings:** SSH available on shared hosting via port 2222.
  Host: `secure360.inmotionhosting.com`. User: `bigbio5`.
  Key: `claude_code` (RSA 2048), passphrase-protected, generated in cPanel.
  All connection details in 1Password item
  `BigBio SSH - InMotion (bigbio5)` (SERVER category).
  Private key also at `~/.ssh/inmotion_claude_code` locally.
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
