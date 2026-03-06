# Design Prompt Playbook

Use this as the default operating manual for design iterations on BigBio.ai.
It is built for both beginners and advanced users.

Primary mode: JSON-first prompt packets for reproducibility.
Fallback mode: plain text prompt blocks for fast iteration.

## Document 5 W's (Traceability)

- Who:
  Maintainers are BigBio contributors and AI coding assistants working in this repo.
- What:
  A single-source playbook for reproducible design prompting and implementation.
- When:
  Created and actively updated during the 2026-03-06 design-system hardening cycle.
- Where:
  Canonical path is `data/design_prompt_playbook.md`; used alongside `CLAUDE.md`,
  `data/copy_bank.md`, and `data/career_history.md`.
- Why:
  Prevent prompt drift, protect factual integrity, and make design outputs
  repeatable across sessions, models, and team members.

## Purpose and Use Cases

- Purpose:
  Provide a deterministic prompt workflow that yields patch-ready code, not generic design advice.
- Primary use case:
  Homepage and section redesign work where brand, claims, and accessibility must stay controlled.
- Secondary use case:
  Fast iteration under tight constraints with dial-based tuning and minimal ambiguity.
- Not for:
  Net-new product architecture, backend features, or any work that violates static export constraints.

## README: Exactly What To Copy/Paste

This section is the fastest way to use this file correctly.

1. Choose one path only:
   Path 1 (recommended): `Block A + Block C`
   Path 2 (fallback): `Block A + one Block B template`
2. Fill required placeholders like `[SECTION NAME]`.
3. Do not rename JSON fields in `Block C`.
4. Send as one message.

## Why JSON-First Is Better

- Less ambiguity than "vibe-only" prompts.
- Easier to diff between iterations.
- Better repeatability across sessions and models.
- Clear constraints reduce policy and architecture drift.

## Reproducible Mode (Recommended)

Use this when quality and consistency matter.

1. Fill `PromptConfig` JSON with exact scope and dial values.
2. Keep `schemaVersion` and field names unchanged.
3. Change one dial at a time between iterations.
4. Require strict output sections and patch-ready code.

### PromptConfig JSON Contract

```json
{
  "schemaVersion": "1.0",
  "project": {
    "name": "bigbio.ai",
    "stack": ["nextjs-app-router", "typescript-strict", "tailwind-v4", "static-export"],
    "constraints": {
      "noApiRoutes": true,
      "noSSR": true,
      "noISR": true,
      "noRuntimeFetch": true,
      "sectionOrderLocked": true,
      "icons": {
        "library": "lucide-react",
        "noUploadedIconImages": true,
        "decorativeAriaHidden": true,
        "sizeScale": [16, 20, 24]
      }
    }
  },
  "contentPolicy": {
    "claimsSource": "data/career_history.md",
    "approvedCopySource": "data/copy_bank.md",
    "noFabricatedClaims": true,
    "noFabricatedTestimonials": true
  },
  "task": {
    "mode": "full-site",
    "sections": ["Hero", "Services", "Results", "About", "CTA", "Footer"],
    "goal": "Premium, technical, operator-led clarity",
    "includeMotion": true,
    "motionStyle": "subtle-purposeful"
  },
  "dialSet": {
    "authority": 5,
    "energy": 3,
    "density": 3,
    "novelty": 2,
    "warmth": 2
  },
  "outputSpec": {
    "requiredSections": [
      "Design Intent",
      "Component Edits",
      "Icon Plan",
      "Mobile Behavior",
      "Accessibility Notes",
      "Patch"
    ],
    "patchReady": true,
    "noHighLevelOnlyAdvice": true
  }
}
```

### Allowed `task.mode` Values

- `full-site`
- `section-only`
- `style-system`
- `icon-consistency`

### Block A: Core Context (Always Copy)

```md
You are working in the BigBio.ai Next.js static-export codebase.

Hard constraints:

- Static export only (no API routes, SSR, ISR, runtime fetches).
- All claims must trace to data/career_history.md and approved copy in data/copy_bank.md.
- Use lucide-react for standard UI icons (no uploaded icon image files).
- Decorative icons must use aria-hidden="true".
- Keep existing section order unless explicitly asked to change it.
- Return patch-ready code edits, not high-level advice.

Quality requirements per section changed:

- Design intent
- Exact TSX/Tailwind edits
- Mobile behavior notes
- Accessibility notes
```

### Block C: JSON Prompt Packet (Recommended, Copy/Paste)

````md
Use the JSON config below as the source of truth.
Follow it exactly.

Execution rules:

1. Enforce all constraints in the JSON.
2. Produce output in this exact order:
   - Design Intent
   - Component Edits
   - Icon Plan
   - Mobile Behavior
   - Accessibility Notes
   - Patch
3. Return patch-ready code edits only.
4. If any request conflicts with JSON constraints, explain conflict and provide compliant alternative.

PromptConfig:

```json
{
  "schemaVersion": "1.0",
  "project": {
    "name": "bigbio.ai",
    "stack": ["nextjs-app-router", "typescript-strict", "tailwind-v4", "static-export"],
    "constraints": {
      "noApiRoutes": true,
      "noSSR": true,
      "noISR": true,
      "noRuntimeFetch": true,
      "sectionOrderLocked": true,
      "icons": {
        "library": "lucide-react",
        "noUploadedIconImages": true,
        "decorativeAriaHidden": true,
        "sizeScale": [16, 20, 24]
      }
    }
  },
  "contentPolicy": {
    "claimsSource": "data/career_history.md",
    "approvedCopySource": "data/copy_bank.md",
    "noFabricatedClaims": true,
    "noFabricatedTestimonials": true
  },
  "task": {
    "mode": "section-only",
    "sections": ["[SECTION NAME]"],
    "goal": "[ONE SENTENCE GOAL]",
    "includeMotion": true,
    "motionStyle": "subtle-purposeful"
  },
  "dialSet": {
    "authority": 5,
    "energy": 3,
    "density": 3,
    "novelty": 2,
    "warmth": 2
  },
  "outputSpec": {
    "requiredSections": [
      "Design Intent",
      "Component Edits",
      "Icon Plan",
      "Mobile Behavior",
      "Accessibility Notes",
      "Patch"
    ],
    "patchReady": true,
    "noHighLevelOnlyAdvice": true
  }
}
```
````

### Block B: Choose One (Copy Exactly One)

- `B1` for full homepage redesign
- `B2` for one-section redesign
- `B3` for style system cleanup
- `B4` for icon consistency only

### Send Format (Use This Shape)

Path 1 (recommended):

```md
[PASTE BLOCK A]

[PASTE BLOCK C JSON PACKET]
```

Path 2 (fallback):

```md
[PASTE BLOCK A]

[PASTE ONE BLOCK B TEMPLATE]
```

## ASCII Flow Diagram

```text
+------------------------------+
|  Read Source-of-Truth Files  |
|  - career_history.md         |
|  - copy_bank.md              |
|  - business_config.md        |
+--------------+---------------+
       |
       v
+------------------------------+
|  Choose Prompt Mode          |
|  A + C (recommended)         |
|  A + B (fallback)            |
+--------------+---------------+
       |
       v
+------------------------------+
|  Build Prompt Message        |
|  Block A: Core Context       |
|  Block C: JSON Packet        |
|  Block B: Optional Template  |
+--------------+---------------+
       |
       v
+------------------------------+
|  Send Prompt To AI           |
|  Keep field names unchanged  |
+--------------+---------------+
       |
       v
+------------------------------+
|  AI Output Must Include      |
|  1) Design Intent            |
|  2) Component Edits          |
|  3) Icon Plan                |
|  4) Mobile Behavior          |
|  5) Accessibility Notes      |
|  6) Patch                    |
+--------------+---------------+
       |
       v
+------------------------------+
|  Validate Output             |
|  - claim traceability        |
|  - lint/type/test/build      |
|  - mobile + a11y checks      |
+--------------+---------------+
       |
  +--------+--------+
  |                 |
  v                 v
+-------------+   +-------------------+
|  PASS       |   |  FAIL             |
|  ship patch |   |  adjust 1 dial    |
|  and commit |   |  and re-run loop  |
+-------------+   +-------------------+
```

## Start Here (Beginner Quick Start)

If you are new, do this exact sequence:

1. Read `data/career_history.md` and `data/copy_bank.md` first.
2. Pick one scope only: full homepage or one section.
3. Set the five design dials (1-5 each).
4. Use Path 1 (`Block A + Block C`) unless you need quick fallback mode.
5. Ask for patch-ready code only.
6. Review output for facts, mobile behavior, and accessibility.
7. Run checks: lint, type-check, tests, build.
8. If output misses target vibe, adjust only one dial at a time and re-prompt.

## What To Read Before Prompting

- `data/career_history.md`: source of truth for all claims and metrics.
- `data/copy_bank.md`: approved messaging and tone.
- `data/business_config.md`: current services, rates, CTA state.
- `CLAUDE.md`: project constraints and quality gates.

## Non-Negotiable Constraints

- Static export only. No API routes, SSR, or ISR.
- No fabricated claims, metrics, clients, or testimonials.
- Use `lucide-react` for standard UI iconography.
- Decorative icons must use `aria-hidden="true"`.
- Keep existing section order unless explicitly requested.
- Return patch-ready edits, not abstract advice.

## Dial Controls (How To Tune Vibe)

Set each dial from 1-5.

- Authority: `1 casual` -> `5 institutional`
- Energy: `1 calm` -> `5 intense`
- Density: `1 airy` -> `5 information-rich`
- Novelty: `1 familiar` -> `5 surprising`
- Warmth: `1 clinical` -> `5 human`

Default BigBio dial set:

```md
Authority: 5
Energy: 3
Density: 3
Novelty: 2
Warmth: 2
```

## Which Prompt To Use

- Use `Full Site` when visual language feels inconsistent.
- Use `Section-Only` when one block is weak.
- Use `Style System` when repeated UI patterns drift.
- Use `Icon Rules` when icon usage becomes inconsistent.

## Master Prompt Template

```md
You are designing BigBio.ai in an existing Next.js static-export codebase.

Project constraints:

- Stack: Next.js App Router, TypeScript strict, Tailwind v4, static export only.
- No API routes, SSR/ISR, or runtime fetches.
- Keep existing section order unless I explicitly request changes.
- Keep all copy claims grounded in data/career_history.md and data/copy_bank.md.
- Use lucide-react icons as inline SVG components; do not use uploaded icon images.

Brand and voice:

- Audience: [biotech founders | pharma innovation leaders | investors].
- Tone: [operator-grade, direct, metric-backed, anti-buzzword].
- Core promise: "AI that ships in regulated biotech."
- Emotional outcome: [confidence, urgency, trust, technical depth].

Visual direction:

- Vibe words: [precise, clinical, modern, high-conviction].
- Color direction: [navy + emerald + neutral grays].
- Typography direction: [high-contrast headline + readable body].
- Motion direction: [subtle, purposeful, section-reveal only].

Dial set:

- Authority: [1-5]
- Energy: [1-5]
- Density: [1-5]
- Novelty: [1-5]
- Warmth: [1-5]

Output requirements:

- Scope: [Hero, Services, Results, About, CTA, Footer] or [single section].
- For each section in scope provide:
  1. design intent,
  2. exact component-level edits,
  3. lucide-react icon choices,
  4. mobile behavior,
  5. accessibility notes.
- Keep components under project quality constraints.
- Return patch-ready code changes only.
```

## Copy-Paste Prompts

### B1 Full Site Pass (Copy/Paste)

```md
Apply the Master Prompt Template to all homepage sections.

Dial set:

- Authority: 5
- Energy: 3
- Density: 3
- Novelty: 2
- Warmth: 2

Goal: Make the site feel premium, technical, and operator-led while preserving conversion clarity.
Do not change factual claims. Improve hierarchy, iconography, spacing rhythm, and CTA prominence.
```

### B2 Section-Only Pass (Copy/Paste)

```md
Redesign only the [SECTION NAME] section.
Keep all other sections unchanged.

Dial set:

- Authority: [1-5]
- Energy: [1-5]
- Density: [1-5]
- Novelty: [1-5]
- Warmth: [1-5]

Return:

1. rationale,
2. exact TSX/Tailwind edits,
3. icon choices from lucide-react,
4. mobile and accessibility checks,
5. patch-ready code.
```

### B3 Style System Pass (Copy/Paste)

```md
Create a reusable style system for BigBio homepage components.

Include:

- spacing scale usage rules,
- heading/body/label typographic rules,
- card and border treatment rules,
- icon usage rules with lucide-react,
- CTA rules (primary and secondary),
- motion rules.

Return:

1. concise design rules,
2. mapping to existing components,
3. patch-ready updates.
```

### B4 Icon Consistency Pass (Copy/Paste)

```md
Enforce a consistent lucide-react icon system across homepage sections.

Rules:

- Stroke width should be consistent per context.
- Decorative icons use aria-hidden=true.
- Icon sizes should stay within 16, 20, 24 unless justified.
- Pair icons with semantic text labels.
- Avoid more than one icon color per section.

Apply to existing components and return patch-ready code.
```

## Beginner Troubleshooting

Use this if the AI output is off-target.

- Problem: Output is too generic.
  Fix: Increase Novelty by +1 and demand "3 distinct directions first".
- Problem: Output is too flashy for biotech buyers.
  Fix: Lower Novelty by -1 and raise Authority by +1.
- Problem: Layout feels crowded.
  Fix: Lower Density by -1 and request larger spacing rhythm.
- Problem: Tone sounds like marketing buzzwords.
  Fix: Restate "operator-grade, anti-buzzword" and require copy from `data/copy_bank.md`.
- Problem: Claims look risky.
  Fix: Require traceability to `data/career_history.md` for each claim.

## Common Mistakes To Avoid

- Asking for too much in one pass without scope.
- Changing dials and copy and layout all at once.
- Forgetting to require mobile behavior.
- Forgetting to require accessibility notes.
- Accepting advice-only output instead of patch-ready code.

## Quality Checklist Before Accepting Output

- Facts match `data/career_history.md`.
- Tone matches `data/copy_bank.md`.
- Icons use `lucide-react` and decorative icons have `aria-hidden="true"`.
- Mobile layout is explicitly addressed.
- Accessibility notes are present.
- Code compiles and passes lint/type/test/build.

## Recommended Iteration Loop

1. Run one prompt with fixed scope.
2. Review output against checklist.
3. Keep what works; reject what drifts.
4. Change one dial only.
5. Re-run prompt.
6. Stop after 2-3 loops to avoid design drift.

## Suggested Next Passes

1. Add an `IconBadge` atom for repeated icon + label patterns.
2. Add motion presets (fade-up, stagger, CTA pulse) as reusable utilities.
3. Create one alternate homepage variant branch (high-density vs airy) for visual A/B review.

_Last updated: 2026-03-06_
