# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

bigbio.ai — professional biotech AI consulting website for BigBio. Replaces a legacy placeholder with a Next.js static site deployed via FTP to InMotion shared hosting (cPanel).

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

## Testing

Always use Red-Green TDD:

1. **Red** — Write a failing test first
2. **Green** — Write the minimum code to make it pass
3. **Refactor** — Clean up while keeping tests green

## Linting (Mandatory)

All files must pass linting and type checking before work is considered done. No exceptions, no tech debt. Lint after every change, fix all violations immediately.

```bash
# JavaScript/TypeScript
eslint --fix .                        # Auto-fix then verify
eslint .                              # Check only

# Markdown
markdownlint-cli2 '**/*.md'           # Lint all markdown
markdownlint-cli2 --fix '**/*.md'     # Auto-fix markdown
markdownlint-cli2 path/to/file.md     # Lint single file

# Python (if any .py files)
ruff check --fix .                    # Auto-fix then verify
ruff format .                         # Format
ruff check .                          # Check only
mypy .                                # Type check (strict mode)

# Shell scripts
shellcheck script.sh                  # Lint shell scripts

# YAML (GitHub Actions, configs)
yamllint .                            # Lint YAML files

# JSON
jsonlint file.json                    # Validate JSON

# Formatting (JS/TS/CSS/JSON/YAML)
prettier --write .                    # Auto-format
prettier --check .                    # Check only
```

**Rules:**

- Run the relevant linter(s) after every file edit — do not batch or defer
- Auto-fix first (`--fix`), then verify zero errors remain
- If auto-fix cannot resolve a violation, fix it manually before proceeding
- Never suppress, ignore, or skip lint rules without explicit user approval
- Never bypass type checking — all Python must pass `mypy --strict`
- Zero warnings, zero errors — clean output required

**Tools (all via Homebrew):**

| Tool              | Purpose                        |
| ----------------- | ------------------------------ |
| eslint            | JS/TS linting                  |
| prettier          | JS/TS/CSS/JSON/YAML formatting |
| markdownlint-cli2 | Markdown linting               |
| ruff              | Python linting + formatting    |
| mypy              | Python type checking (strict)  |
| shellcheck        | Shell script analysis          |
| yamllint          | YAML linting                   |
| jsonlint          | JSON validation                |

**Configs:** Project `.markdownlint.jsonc` (required — markdownlint-cli2 doesn't read `~/`). Global: `~/.ruff.toml`, `~/.mypy.ini`, `~/.prettierrc`, `~/.editorconfig`.

## Package Installation

Prefer Homebrew (`brew install`) for all CLI tools when possible. Only use npm/pip for project-local dependencies that Homebrew doesn't provide.
