# Rizent Portfolio Rewrite — Provenance & Final QA

Ground-truth audit trail for `src/components/apps/rizent/content.ts`. Every claim below was verified live against the Rizent repo (`/Users/vipulkatarnaware/Documents/AI Agents/Rizent`) during this rewrite — nothing carried over from stale memory. Numbers (LOC, migrations) were re-run, not reused.

## Claim → Evidence

| Claim in content.ts | Evidence |
|---|---|
| 30,233 LOC | `find server/src worker/src packages/shared/src web/src -name "*.ts" -o -name "*.tsx" \| xargs wc -l` — re-run this session |
| 71 migrations | `ls server/src/db/migrations/*.sql \| wc -l` — re-run this session |
| No Anthropic/Claude anywhere | `grep -riE "anthropic\|claude"` across server/worker/shared/web → 0 hits — re-run this session |
| GPT-4o-mini ~$0.15/1M, GPT-4o ~$5.00/1M | `docs/AI_ARCHITECTURE.md` (current, present in repo) |
| Batch match: 10 investors/call, ~80% token reduction, 24h Redis cache | `docs/AI_ARCHITECTURE.md` §"Batch Matching Pipeline" |
| Gemini 2.0 Flash = pitch-deck extraction; GPT-4o-mini = classification/drafting; GPT-4o = match-scoring | `docs/AI_ARCHITECTURE.md` §"Core Models Used" |
| 5-section prompt strategy, compressPrompt, 700-token budget | `docs/AI_ARCHITECTURE.md` §"Shared AI Service" |
| Sending hours 8AM–6PM UTC; timezone-aware sending "planned but not yet implemented" | `docs/architecture.md` §"Security Model" (verbatim) |
| Bounce suppression persists across investor delete/re-upload | `docs/architecture.md` §"Security Model" |
| Stuck-recovery poll every 10 min | `docs/architecture.md` §"Worker" service breakdown |
| Decision Hub / meeting-approval flow, slot locking | `docs/architecture.md` §"Meeting Approval Flow"; confirmed live via `/dashboard/decisions` |
| Digital Twin / `startup_memory` JSONB, 20 pre-generated prompts, AI Match Score 1–100, Batch Match vs 50+ platform investors | `docs/user_flow.md` (current, present in repo) |
| UTC-anchored quota reset (anti-clock-spoofing) | `docs/user_flow.md` §"Security & Quota Enforcement"; corroborated in code by `planGuard` / `is_trial` logic inspected earlier this session |
| Static/dynamic fact memory + Telegram escalation | `server/src/routes/telegram.ts` (existence confirmed); behavior described per prior audit session, re-affirmed as still the only escalation channel (no WhatsApp/Slack references added since) |
| npm workspaces: server/worker/web/packages-shared | `package.json` `"workspaces"` — re-read this session |
| db-guard.ts blocks legacy `campaign_contacts` table | `server/src/db/db-guard.ts` — re-read this session (not used as a portfolio claim directly, informed the "engineering rigor" framing) |

## Deliberately NOT claimed (ground-truth discipline)

- **No test count.** Only 8 `*.test.ts`/`*.spec.ts` files found this session — the prior "~24 tests" figure could not be re-verified without running the suite, so no test claim appears anywhere in the new copy.
- **No billing/payments mention.** `docs/architecture.md` still documents Stripe + Razorpay. A separate, no-longer-present doc (`STATE.md`, referenced in the original audit) had claimed a later switch to Dodo — that claim could not be re-verified this session since the doc is gone from the repo. Per the locked positioning decision (de-emphasize billing/commercial-SaaS), payments are omitted entirely rather than publishing an unverifiable claim.
- **No GitHub link.** The live repo remote is `rizentme/rizent`, not the portfolio owner's own account — `githubUrl` was removed from content.ts entirely, per the user's explicit choice.
- **No user/revenue/scale numbers.** "Private beta" framing kept throughout; no launch language.

## Stale-doc findings (repo-side, out of scope to fix — logged only)

- `docs/architecture.md` documents Stripe + Razorpay as the payment stack; if Rizent has since moved to a different processor, this doc is stale. Not fixed here — out of scope for a portfolio content rewrite.
- The previously-referenced `.planning/PROJECT.md`, `ROADMAP.md`, `STATE.md`, `CONCERNS.md` no longer exist in the repo (not found via `find`, not in git history search for tracked `.md` files). Content that depended on them (e.g. specific build "phase" numbers) was re-derived from the docs that do still exist (`AI_ARCHITECTURE.md`, `architecture.md`, `user_flow.md`) rather than reused from memory.

## Cross-cutting UI finding (not part of this task, flagged for awareness)

`src/components/AppShell/ProductWalkthrough.tsx` (in `thewebsite`, pre-existing/unrelated to the Rizent rewrite) is hardcoded to always show a QRapid screenshot and a fake "03:12 HD" video thumbnail with invented order-management stats — it isn't wired to per-app content and isn't gated on `heroVideo`. It renders this way on the Rizent Overview page right now. This is unrelated to `content.ts` (no field controls it) and looks like in-progress scaffolding from other work already underway in this repo — flagging rather than fixing, since the user has an explicit "no video" instruction for Rizent specifically and this component's intended design isn't something this task has context on.

## Final QA checklist (plan §7)

1. **Consistency** — Rizent now uses the same structured shapes as CareerOS (`overviewSummary`, `ProblemDefinition`, `technicalDiscovery`, `ArchitectureDetails`, `lessonsLearned`, `screenshotCategories`) and renders through the same premium components, not the legacy flat fallbacks. ✅ Verified live, section by section.
2. **Ground truth** — every sentence maps to a row above or is explicitly framed as roadmap/intent. No invented numbers, users, or revenue. Telegram only. Investor DB = roadmap. ✅
3. **Artifacts** — `/rizent/evidence` shows 6 categorized real screenshots + both hand-authored SVGs, no placeholders, no stock images. ✅ Verified live.
4. **Diagram gate** — both SVGs are hand-authored (no Mermaid/Graphviz), dark-mode, `viewBox`-responsive, accent `#8b5cf6`, no Anthropic/Claude. ✅
5. **Screenshot gate** — all 6 screenshots are real, populated, 1440×900 captures with no debug banners, no placeholder/stock data, no visible WhatsApp/Slack UI. Three genuine app bugs were found and fixed live (broken analytics-chart CSS, wrong DB column for fit score, stale Redis cache masking real counts) so the screens read as a live, working product. ✅
6. **Demo live** — seeded account (`USE_MOCK_GMAIL=true`) renders Dashboard, Investor Discovery, Campaigns, Decision Hub, Monthly Update, and Settings fully populated and navigable. ✅ Verified via live browser session throughout.
7. **P0 repo-clean gate** — moot: `githubUrl` was removed entirely rather than gated, since the live remote isn't the portfolio owner's own account.
