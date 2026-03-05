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

---

## Consulting & Business Development

(Add entries as research is conducted)

---

_Last updated: 2026-03-05_
