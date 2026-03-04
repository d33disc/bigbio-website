# AI Biotech Executive Content Pipeline - Adversarial Audit

## 1) Diagnosis (quoted evidence)

### Critical Gaps Identified

| Gap | Plan Evidence | Severity |
|-----|---------------|----------|
| **No signal detection** | "Pull data (clinical trials, FDA, preprints)" - no criteria for what's important | CRITICAL |
| **No content prompts** | "Template-driven article structure" - template doesn't exist, no voice/style | CRITICAL |
| **Wrong positioning** | "Domain: cell therapy, drug safety, clinical landscape" - generic, not "AI biotech exec consultant" | HIGH |
| **Wrong model** | "Claude API" (line 83, 115) - expensive, should use DeepSeek/Qwen | HIGH |
| **LinkedIn API fallacy** | "LinkedIn post via API" (line 38, 99-102) - notoriously difficult approval | HIGH |
| **No LinkedIn formatting** | "LinkedIn-ready text file" (line 147) - LinkedIn strips markdown, needs conversion | HIGH |
| **Broken infrastructure** | "Use existing blog-starter" (line 55) - repo is MVP/broken per user | HIGH |
| **Missing domain asset** | bigbio.ai not mentioned - owned domain unutilized | MEDIUM |
| **No acceptance criteria** | "Configure blog-starter" (line 58) - what does "configured" mean? | MEDIUM |

### Quoted Problems

> "Topics: Rotate all three (cell therapy, clinical trials, drug safety)" (line 141)

**Problem:** These are generic biotech topics, not differentiated AI+biotech executive positioning.

> "Call Claude API to generate article" (line 83)

**Problem:** Claude Sonnet at ~$3/1M tokens is 60x more expensive than DeepSeek R1 at $0.55/1M.

> "GitHub Action generates LinkedIn-ready text file" (line 147)

**Problem:** No conversion logic exists. LinkedIn uses plain text with specific line break behavior, not markdown.

---

## 2) Assumptions + Risk Register

### Assumptions [ASSUMPTION]

| ID | Assumption | Validation Method |
|----|------------|-------------------|
| A1 | ToolUniverse tools return structured data parseable for signal scoring | Test with live API calls |
| A2 | DeepSeek R1 / Qwen quality sufficient for thought leadership | Generate 5 test articles, compare |
| A3 | Cowork browser automation reliably posts to LinkedIn | Manual test in sandbox |
| A4 | bigbio.ai can be redirected/used without InMotion complexity | Check DNS settings |
| A5 | GitHub Actions can install ToolUniverse + run Python in under 10 min | Test workflow |

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **R1: Signal scoring produces garbage** | Medium | High | Manual override always available; tune scoring weights iteratively |
| **R2: Generated content sounds AI-generic** | High | Critical | Strong persona prompt + human edit pass required |
| **R3: Cowork browser automation breaks** | Medium | Medium | Fallback: copy/paste (30 sec manual) |
| **R4: ToolUniverse API rate limits** | Low | Medium | Cache results; stagger queries |
| **R5: LinkedIn shadowbans automated-looking posts** | Medium | High | Human review mandatory; vary posting times |
| **R6: Vercel rebuild takes longer than expected** | High | Medium | Use Vercel's official templates, not custom |

---

## 3) Snippet Playbook (clusters + triggers + templates)

### Cluster 1: Signal Detection

**Trigger:** Daily cron OR manual invocation
**Purpose:** Score incoming data for newsworthiness

```python
# signal_scorer.py
SIGNAL_CRITERIA = {
    "mentions_ai_ml": 3,           # AI/ML in biotech = core positioning
    "major_pharma_involved": 2,    # J&J, Novartis, Pfizer = credibility
    "cell_therapy_related": 3,     # Core expertise
    "manufacturing_angle": 3,      # Differentiated knowledge
    "regulatory_milestone": 2,     # FDA approval, IND, BLA
    "funding_announced": 1,        # Market signal
    "safety_signal": 2,            # Pharmacovigilance angle
    "recency_days": lambda d: 3 if d <= 1 else (2 if d <= 3 else 1)
}

def score_item(item: dict) -> int:
    """Returns 0-20 score. Threshold: 8+ = publish-worthy"""
    # Implementation scores each criterion
```

### Cluster 2: Content Generation Prompts

**Trigger:** Item scores ≥8 on signal detection
**Purpose:** Generate draft in correct voice

```markdown
# PERSONA PROMPT (system)

You are Davis, an AI + biotech executive with deep expertise in:
- Cell therapy manufacturing (CAR-T, iPSC)
- GMP process development and scale-up
- AI/ML applications in biotech operations
- Regulatory strategy (FDA, EMA)

Voice characteristics:
- Direct, no fluff
- Technical but accessible to biotech executives
- Contrarian when warranted (challenge conventional wisdom)
- Numbers and specifics over vague claims
- First-person perspective with real experience references

You are NOT:
- A generic AI summarizer
- A cheerleader for every announcement
- Afraid to say "this doesn't matter" or "I'm skeptical"

Article types:
1. SIGNAL: Breaking news + your take (400-600 words)
2. ANALYSIS: Deep dive on trend (800-1200 words)
3. CONTRARIAN: Challenge popular narrative (600-800 words)
```

```markdown
# ARTICLE TEMPLATE

## [HEADLINE: Specific, not clickbait]

**TL;DR:** [1-2 sentences, the actual insight]

[Opening that establishes why this matters NOW - 2-3 sentences]

### What happened
[Facts only - 3-5 bullet points with sources]

### Why it matters
[Your analysis - what others are missing]

### My take
[First-person opinion based on experience]

### What to watch
[Forward-looking implications]

---
*Davis is an AI + biotech executive consultant. Contact: [method]*
```

### Cluster 3: LinkedIn Formatting

**Trigger:** Article approved, ready to post
**Purpose:** Convert markdown to LinkedIn-native format

```python
# linkedin_formatter.py

def markdown_to_linkedin(md_content: str) -> str:
    """
    LinkedIn formatting rules:
    - No markdown rendering (appears as raw text)
    - Line breaks require double newline
    - Emojis for visual breaks (sparingly)
    - 3000 char limit for posts (articles longer)
    - First 2 lines = hook (visible before "see more")
    - Hashtags at end (3-5 max)
    """
    # Strip markdown syntax
    # Convert headers to CAPS or emoji bullets
    # Ensure proper line spacing
    # Add hashtags based on content
    # Truncate if needed with "..." link to full article
```

### Cluster 4: Topic Categories (Revised)

| Category | Signal Keywords | Differentiation Angle |
|----------|-----------------|----------------------|
| **AI in Biotech Ops** | ML, automation, digital twin, predictive | "Where AI actually works vs hype" |
| **Cell Therapy Manufacturing** | CAR-T, iPSC, GMP, scale-up, vein-to-vein | "The manufacturing bottleneck no one talks about" |
| **Regulatory Intelligence** | FDA, BLA, IND, accelerated approval, RMAT | "What this approval actually signals" |
| **Biotech Business** | Series A/B, M&A, layoffs, pipeline | "Reading between the lines of the press release" |
| **Contrarian Takes** | Overhyped, skeptical, reality check | "Why I'm not excited about [X]" |

---

## 4) Plan V1

### Work Breakdown Structure

```text
1.0 INFRASTRUCTURE
    1.1 Vercel Site (NEW BUILD)
        1.1.1 Select Vercel template (blog + portfolio hybrid)
        1.1.2 Configure for bigbio.ai domain OR new subdomain
        1.1.3 Design: minimal, professional, fast
        1.1.4 Deploy MVP with 1 placeholder article
        Artifact: Live site at [domain]
        Acceptance: Lighthouse score >90, article renders correctly

    1.2 GitHub Repo Structure
        1.2.1 Create new repo (biotech-content-pipeline)
        1.2.2 Set up secrets (OPENROUTER_API_KEY, VERCEL_TOKEN)
        1.2.3 Configure branch protection (require PR review)
        Artifact: Repo with README, secrets configured
        Acceptance: Can manually trigger workflow stub

2.0 SIGNAL DETECTION
    2.1 ToolUniverse Setup
        2.1.1 Install ToolUniverse locally
        2.1.2 Test 4 core tools (clinical trials, FDA, biorxiv, pubmed)
        2.1.3 Document API response schemas
        Artifact: Working local install, schema docs
        Acceptance: Can query each tool and get structured response

    2.2 Signal Scoring System
        2.2.1 Define scoring criteria (see Cluster 1)
        2.2.2 Implement scorer in Python
        2.2.3 Test with 50 sample items, tune thresholds
        Artifact: signal_scorer.py with tests
        Acceptance: Precision >70% on "would I write about this?" test

3.0 CONTENT GENERATION
    3.1 Prompt Engineering
        3.1.1 Write persona prompt (see Cluster 2)
        3.1.2 Write article templates (3 types)
        3.1.3 Test with DeepSeek R1 via OpenRouter
        3.1.4 Iterate based on output quality
        Artifact: prompts/ directory with tested prompts
        Acceptance: 3/5 generated articles pass "would I post this?" test

    3.2 Generation Pipeline
        3.2.1 Python script: fetch data → score → generate
        3.2.2 Output: markdown file + LinkedIn text
        3.2.3 Integration with GitHub Actions
        Artifact: generate_content.py
        Acceptance: End-to-end run produces valid outputs

4.0 LINKEDIN FORMATTING
    4.1 Formatter Implementation
        4.1.1 Research LinkedIn text rendering rules
        4.1.2 Implement markdown → LinkedIn converter
        4.1.3 Test with 10 sample articles
        Artifact: linkedin_formatter.py
        Acceptance: Formatted text renders correctly in LinkedIn preview

5.0 PUBLISHING WORKFLOW
    5.1 GitHub Actions
        5.1.1 Cron workflow (Tue/Fri 6am PST)
        5.1.2 Create draft PR with article + LinkedIn text
        5.1.3 Vercel preview deployment on PR
        Artifact: .github/workflows/content-pipeline.yml
        Acceptance: PR created with preview link on schedule

    5.2 LinkedIn Posting (Cowork)
        5.2.1 Set up Cowork folder for LinkedIn posts
        5.2.2 Test browser automation with dummy post
        5.2.3 Document posting workflow
        Artifact: Documented Cowork posting SOP
        Acceptance: Can post to LinkedIn via Cowork in <2 min
```

### Dependencies

```text
1.1 → 1.2 (site before repo structure finalized)
1.2 → 5.1 (repo before workflows)
2.1 → 2.2 (tools before scoring)
2.2 → 3.2 (scoring before generation)
3.1 → 3.2 (prompts before pipeline)
3.2 → 4.1 (generation before formatting)
4.1 → 5.1 (formatting before workflow)
```

### Milestones

| Milestone | Deliverable | Acceptance Criteria |
|-----------|-------------|---------------------|
| **M1: Infrastructure** | Live Vercel site + configured repo | Site loads, workflow stub runs |
| **M2: Signal Detection** | Working scorer with tuned thresholds | 70% precision on test set |
| **M3: Content Generation** | Prompts + generation script | 3/5 articles pass quality gate |
| **M4: Publishing** | Full pipeline end-to-end | PR created on schedule, Cowork posts |

---

## 5) Reviewer Scores + Disagreements (V1)

### Scores (0-5 scale)

| Reviewer | Score | Reasoning |
|----------|-------|-----------|
| **Operator** | 3/5 | "Too many steps before first article ships. Where's the MVP?" |
| **Skeptic** | 2/5 | "Signal scoring 70% precision is arbitrary. No fallback if ToolUniverse unreliable. bigbio.ai integration undefined." |
| **Architect** | 4/5 | "Good structure. Prompts and formatter are reusable. Missing: how to iterate on prompt quality over time." |

### Disagreements

1. **Operator vs Architect:** Operator wants to ship article #1 manually before building automation. Architect wants clean infrastructure first.

2. **Skeptic concern:** "What if ToolUniverse is down or returns garbage? No manual topic selection path."

3. **All reviewers:** bigbio.ai mentioned but not integrated into plan.

---

## 6) Plan V2 + Delta

### Delta from V1

1. **Added Phase 0: Manual MVP** - Ship first article manually to validate content quality before automation
2. **Added manual topic fallback** - Can bypass signal scoring with manual topic input
3. **Clarified bigbio.ai** - Decision point: redirect to Vercel OR build separate
4. **Added prompt iteration loop** - Weekly review of generated content quality

### Plan V2 WBS (Updated sections only)

```text
0.0 MANUAL MVP (NEW - before any automation)
    0.1 Write First Article Manually
        0.1.1 Pick topic manually (no automation)
        0.1.2 Research using ToolUniverse tools in Claude Code
        0.1.3 Write article in your voice
        0.1.4 Format for LinkedIn manually
        0.1.5 Post to LinkedIn, observe engagement
        Artifact: 1 published LinkedIn article
        Acceptance: Posted, >10 engagements (likes/comments)

    0.2 Validate Voice/Positioning
        0.2.1 Get feedback from 3 target audience members
        0.2.2 Refine persona prompt based on feedback
        Artifact: Revised persona prompt
        Acceptance: Feedback incorporated, prompt updated

1.0 INFRASTRUCTURE (revised)
    1.0.1 DECISION: bigbio.ai usage
        Option A: Redirect bigbio.ai → Vercel site
        Option B: Keep bigbio.ai separate, new domain for blog
        Option C: Build on bigbio.ai directly (InMotion)
        Artifact: Decision documented
        Acceptance: DNS configured per decision

    1.1 Vercel Site (unchanged)
    ...

2.0 SIGNAL DETECTION (revised)
    2.2.4 [NEW] Manual override input
        - Script accepts --topic flag to bypass scoring
        - Allows "I want to write about X" workflow
        Artifact: CLI with --topic option
        Acceptance: Can generate article on manually specified topic

3.0 CONTENT GENERATION (revised)
    3.3 [NEW] Prompt Iteration Loop
        3.3.1 Weekly review: score last 4 articles (1-5)
        3.3.2 Identify patterns in low-scoring articles
        3.3.3 Update prompts based on patterns
        Artifact: prompt_changelog.md
        Acceptance: Average article quality trending up over 4 weeks
```

---

## 7) Reviewer Scores + Disagreements (V2)

### Scores

| Reviewer | Score | Reasoning |
|----------|-------|-----------|
| **Operator** | 4/5 | "Phase 0 MVP is right. Ship first, automate later. Still want timeline compressed." |
| **Skeptic** | 3/5 | "Better. Still unclear: what model specifically? Cost per article? What if engagement is 0?" |
| **Architect** | 4/5 | "Iteration loop is good. Need to specify model selection criteria." |

### Disagreements (V2)

1. **Model selection:** Plan says "DeepSeek R1 via OpenRouter" but no comparison test or fallback.

2. **Engagement failure case:** What if articles get 0 engagement? Pivot criteria undefined.

3. **Cost specifics:** V2 still doesn't have concrete $/article estimate for chosen model.

---

## 8) Plan V3 + Delta (FINAL)

### Delta from V2

1. **Model decision:** DeepSeek R1 primary, Qwen 2.5 72B fallback, with cost estimates
2. **Engagement failure criteria:** <5 engagements after 5 articles = pivot positioning
3. **Concrete costs added**

### Final Model Selection

| Model | Provider | Cost/1M tokens | Quality | Decision |
|-------|----------|----------------|---------|----------|
| DeepSeek R1 | OpenRouter | $0.55 in / $2.19 out | High | **PRIMARY** |
| Qwen 2.5 72B | OpenRouter | $0.27 in / $0.27 out | Good | Fallback |
| Claude Sonnet | Anthropic | $3 in / $15 out | Excellent | Edit pass only if needed |

**Est. cost per article:** ~$0.05-0.15 (1500 token input, 1500 token output)
**Monthly cost (8 articles):** ~$0.40-1.20

### Engagement Failure Criteria

| Metric | After 5 Articles | Action |
|--------|------------------|--------|
| Avg engagements <5 | After 5 articles | Pivot: change topics or voice |
| Avg engagements 5-20 | After 5 articles | Continue, iterate prompts |
| Avg engagements >20 | After 5 articles | Scale: increase frequency |

### Final WBS Summary

| Phase | Duration | Key Deliverable |
|-------|----------|-----------------|
| **0. Manual MVP** | Week 1 | 1 published article, validated voice |
| **1. Infrastructure** | Week 2 | Live Vercel site, repo configured |
| **2. Signal Detection** | Week 2-3 | Working scorer + manual override |
| **3. Content Generation** | Week 3 | Tested prompts, generation script |
| **4. LinkedIn Formatting** | Week 3 | Formatter producing valid output |
| **5. Publishing Workflow** | Week 4 | Full automation running |

---

## 9) Daily Execution Checklist

```text
□ Check ToolUniverse data pull results (if automated)
□ Review signal scores for today's candidates
□ If score ≥8: proceed to generation
□ If no high scores: manual topic selection OR skip day
□ Review generated draft (<5 min read)
□ Edit if needed (target: <15 min)
□ Approve PR if quality passes
□ Wait for Vercel preview deployment
□ Verify article renders correctly
□ Copy LinkedIn-formatted text
□ Open Cowork → post to LinkedIn (or manual paste)
□ Verify LinkedIn post is live
□ Note any issues for weekly review
```

---

## 10) Weekly Review Checklist

```text
□ Count total articles published this week
□ Record engagement metrics per article (likes, comments, shares)
□ Calculate average engagement
□ Compare to previous week
□ If avg <5 after 5+ articles: schedule positioning pivot session
□ Review generated article quality (1-5 score each)
□ Identify lowest-scoring article: what went wrong?
□ Update prompts if pattern identified
□ Log prompt changes in prompt_changelog.md
□ Check ToolUniverse reliability (any failures?)
□ Check Vercel deployment reliability
□ Check Cowork posting reliability
□ Review costs (OpenRouter dashboard)
□ Identify 1 process improvement for next week
□ Update this checklist if needed
```

---

## Resources

| Resource | Status | Notes |
|----------|--------|-------|
| bigbio.ai | Owned, InMotion hosted | Decision pending: redirect vs separate |
| blog-starter repo | Exists, MVP/broken | Rebuild on Vercel template |
| Claude Max | Active | Cowork available |
| GitHub Pro | Active | Actions unlimited |
| OpenRouter | [NEEDS SETUP] | For DeepSeek R1 access |

---

## Next Action

**Phase 0.1.1:** Pick a topic manually and write the first article without any automation. This validates voice and positioning before building infrastructure.

Suggested first topic: "Why most AI-in-biotech announcements are noise" (contrarian take, establishes critical voice)
