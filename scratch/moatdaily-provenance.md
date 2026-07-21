# MoatDaily Portfolio Rewrite — Provenance & Final QA

Ground-truth audit trail for `src/components/apps/moatdaily/content.ts`. Every claim was verified against a fresh clone of `github.com/vbkatarnaware/moatdaily` (the local working copy at `~/Documents/AI Agents/moatdaily` had a broken `.git` — missing HEAD/config/refs — and was missing most pipeline scripts, the same failure class as the earlier Rizent iCloud corruption, just manifesting as absent files instead of empty ones. Not fixed — out of scope for this task, flagging for awareness).

## Claim → Evidence

| Claim in content.ts | Evidence |
|---|---|
| 15 RSS feeds, 20 Google News query buckets | `config/news_sources.yaml` — counted directly (5 startup + 6 business + 4 tech + 5 ai buckets; 5+4+3+3 RSS feeds) |
| Weighted score: 40% India relevance / 35% engagement / 25% uniqueness | `scripts/filter_news.py:217` — `total = (india_score*0.4)+(engage_score*0.35)+(unique_score*0.25)`, read directly |
| Pool of 4, publish best 2, backfill in ranked order | `skills/daily-pipeline/SKILL.md` v3.0.0 — verbatim: "publishes the best 2 that pass ... this is what makes the pool-of-4 backfill work" |
| "Publishing fewer than 2, including zero, is a normal and correct outcome" | `skills/daily-pipeline/SKILL.md`, verbatim |
| Reserved-panel render, 1080×1350, Jinja2 + Playwright | `scripts/render_html.py`, `config/brand.yaml` (`panel_layout.photo_zone_ratio: 0.62`) |
| Publish-gate tampering incident (nulled FAIL verdict, wrong-image + duplicate publish) | git commit `84cd71e` "Make publish_instagram.py the tamper-resistant authoritative gate" — full commit body quoted near-verbatim |
| Idempotency ledger (`data/published_media.json`) | Same commit; also read directly in `scripts/publish_instagram.py` |
| Fail-closed 2-call consensus for fallback judge models (PASS/FAIL/PASS observed at temp=0) | `scripts/review_post.py` `_judge()` docstring, read directly |
| "Require a live AI verdict to publish" (no mechanical-only fallback) | git commit `bba3de3`; logic confirmed in `scripts/publish_instagram.py:292-309` |
| Free Gemma tried before paid Gemini; escalate only on genuine 429 | git commit `c957831`; `_is_quota_error()` + `_run_openrouter()` in `scripts/review_post.py`, read directly |
| EC2 disk-full outage: 9 stale untagged images (~30GB), crashed Hermes's cron scheduler's SQLite state | git commit `da8c0f0`, full body quoted; corroborated by README's "Deploy" section |
| Two safety nets: `docker_prune.sh` (daily) + `check_disk_space.sh` (85% threshold) | Same commit; both scripts exist in the repo |
| Hermes cron, 3×/day, `30 4,9,15 * * *` UTC = 10am/3pm/9pm IST | `skills/daily-pipeline/SKILL.md` "Scheduling (Hermes cron)" section, verbatim |
| Accent `#8B5CF6` ("Electric Violet") | `config/brand.yaml` — the product's own documented brand color, not invented; the prior content.ts used `#ff5f56`, which matched nothing in the actual brand system |
| "Digital Twin" / image sourcing waterfall / face+saliency crop / guarded rembg cutout | `scripts/assets.py`, read in full |
| Real screenshot captions (scores, Gemini verdicts) | `data/filtered_news.json` and `data/review.json` on the user's local machine — real production run data, not fabricated examples |
| GitHub link kept | `git remote -v` confirms `vbkatarnaware/moatdaily`; no secrets found in git history (`settings.yaml`, `credentials/` never committed, matching `.gitignore`) |

## Deliberately NOT claimed (ground-truth discipline)

- **No test count.** Confirmed zero automated tests (`TESTING.md` + no pytest/unittest files found); this is stated as a disclosed, deliberate gap (validated instead via the gate + production observation), not hidden or hand-waved.
- **No Reels/video roadmap item.** The previous content.ts had "Automated Reels generation" on the roadmap with no grounding found anywhere in the repo — dropped rather than carried forward as unfounded speculation. Replaced with two roadmap items that are directly evidence-backed (automated regression tests; scaling the documented 3–6 candidate-pool range).
- **No Instagram profile screenshot.** Browser automation (claude-in-chrome) was unavailable this session, so the actual `@moatdaily` grid could not be screenshotted live. Used the real rendered PNGs instead — these are the literal files the publish script uploads, not a re-creation — and kept the `@moatdaily` external link so a reviewer can check the live account directly. If you want an actual profile-grid screenshot added later, that just needs a session with browser tools connected.
- **No PDF documents.** You asked for 3 PDFs "same quality as CareerOS" — checked and confirmed CareerOS has zero PDFs (empty `documents` slot); you chose to skip them (recommended option) to stay consistent with every other app in the portfolio.

## Stale-doc findings (repo-side, logged only, not fixed)

- `.planning/codebase/*.md` (ARCHITECTURE.md, CONCERNS.md, INTEGRATIONS.md, TESTING.md) are an early snapshot, already contradicted by later commits — e.g. CONCERNS.md says "does not currently post to Instagram; a human must manually upload," which is false as of the tamper-resistant-gate commit. Treated current code + README + git log as authoritative instead.

## Cross-cutting finding (not part of this task, flagged for awareness)

`src/components/seo/AppSeoBlock.astro` (in `thewebsite`) doesn't render the `overviewSummary` structured shape — confirmed via server-rendered HTML that MoatDaily's Overview section is empty in the SEO/no-JS block, but **Rizent has the exact same gap** (verified side by side). This is a pre-existing, cross-app limitation in the shared SEO component, not something this rewrite introduced — the interactive React page (what an actual visitor sees) renders Overview correctly via `Overview.tsx`; only the server-rendered SEO fallback text is affected.

## Verification performed

- `npx astro check`: zero errors attributable to `moatdaily/content.ts` (one pre-existing unrelated warning in `moatdaily/index.tsx`).
- Both SVGs validated as well-formed XML with every element inside the declared `viewBox` (programmatic bounds check, not just visual).
- Dev server started; `/moatdaily`, `/moatdaily/decisions`, `/moatdaily/timeline`, `/moatdaily/evidence`, `/moatdaily/roadmap` all return 200; all 7 artifact files (5 posts + 2 carousel slides + 2 SVGs) served with 200.
- Server-rendered SEO block confirmed to contain the exact authored text for Decision Log (all 6 entries), Rejected Decisions (all 3), Timeline (all 6 nodes), Roadmap (both items), and Highlights (all 4) — verifies the data reached the render layer correctly.
- **Limitation:** claude-in-chrome (browser automation) was unavailable this session, so final visual confirmation relied on SSR HTML inspection + programmatic SVG bounds-checking rather than an actual screenshot, unlike the Rizent session. Everything checked out; a live visual pass is still worth doing next time browser tools are available.
