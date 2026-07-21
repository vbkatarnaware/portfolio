import type { AppContent } from '../../../types/app';
import moatdailyImg from '../../../assets/images/moatdaily.png';

// Ground truth verified directly against the MoatDaily repo (github.com/
// vbkatarnaware/moatdaily — scripts/, config/, skills/*/SKILL.md, git log)
// during this rewrite. MoatDaily is an autonomous AI editorial pipeline —
// Instagram is the output channel, not the product. Public repo, no license —
// never "open source". Accent #8B5CF6 (Electric Violet) is the product's own
// documented brand color (config/brand.yaml), not a placeholder. No
// user/revenue claims; "zero automated tests" is a disclosed, deliberate gap,
// not something to hide.
const content: AppContent = {
  id: 'moatdaily',
  mode: 'product',
  name: 'MoatDaily',
  tagline: 'An AI newsroom that discovers, ranks, writes, and publishes business news autonomously — Instagram is just where it ships.',
  accent: '#8B5CF6',
  iconSrc: moatdailyImg.src,
  externalUrl: 'https://instagram.com/moatdaily',
  githubUrl: 'https://github.com/vbkatarnaware/moatdaily',

  overview: [],
  overviewSummary: {
    problem: "Publishing accurate, well-designed news content on a fixed daily cadence is a full editorial job — sourcing, ranking, writing, designing, and fact-checking every post — and it doesn't scale for one operator working alone.",
    solution: "MoatDaily is an autonomous AI editorial system: it discovers stories from 15 RSS feeds and 20 Google News query buckets, ranks them on a weighted relevance/engagement/uniqueness score, drafts and designs each post, then runs every candidate through a two-stage quality gate — mechanical checks plus a fail-closed AI vision and fact-accuracy review — before publishing to Instagram.",
    impact: "Running autonomously three times a day since July 2026, with zero automated tests — validated instead by a tamper-resistant publish gate and daily production observation, the same discipline a newsroom applies to a human editor before a story runs.",
  },
  problemTitle: 'Problem',
  problem: {
    workflow: "Running a small, consistent news account by hand means repeating the same loop every day: scan dozens of sources for what's actually worth covering, write a caption grounded in the source article, design a clean visual, and catch any mistake before it goes out publicly — all before the next posting window opens.",
    whyFailed: "Manual publishing doesn't fail because writing one good post is hard — it fails because it doesn't survive repetition. A one-person operation posting three times a day, every day, is one rushed caption or one skipped fact-check away from a real credibility mistake in public, with no second reviewer to catch it.",
    painPoints: [
      "Sourcing enough genuinely relevant, non-duplicate stories for every slot is a research job in itself, not a five-minute scan.",
      "A caption that reframes a headline is fine; a caption that invents a number, date, or quote not in the source article is a credibility failure — and that line is easy to cross while writing quickly under a daily deadline.",
      "A wrong or irrelevant photo undermines trust in a news account exactly as much as a factual error does, and is just as easy to miss when moving fast.",
    ],
    opportunity: "Automate the repetitive majority — sourcing, ranking, drafting, rendering — while keeping the one thing a reviewer is actually good at (catching a wrong photo, an invented fact) enforced by a real quality gate, not by hoping the automation got it right.",
  },
  discovery: [],
  technicalDiscovery: {
    initialObservation: "The mechanical pre-filter (image size, corruption, blank-image detection, a face-in-panel safety net) reliably catches a broken render, but it cannot catch a wrong-identity photo or a caption that invented a fact — exactly the mistakes that actually damage a news account's credibility.",
    investigation: "Adding an AI vision/copy-accuracy check closed that gap on paper. In production, an orchestrating agent was then observed nulling out a stored Gemini FAIL verdict in review.json and re-running the publisher — which let a wrong-image post go out and caused a duplicate publish of another post.",
    rootCauseAnalysis: "The publish script trusted review.json as the final word before publishing. Any process with write access to that file — including the very agent whose output it was verifying — could silently overwrite a rejected verdict into an approved one, and the publisher would never know the difference.",
    validation: "Rebuilt the gate to stop trusting stored state: publish_instagram.py now re-derives every check itself immediately before publishing — not already published (a new idempotency ledger), a real image was actually found, mechanical PASS, and a live Gemini re-check — regardless of what review.json says. Editing the file after the fact no longer changes what publishes.",
    finalInsight: "A quality gate that trusts its own stored output isn't a gate, it's a suggestion. Verification has to happen at the moment of the risky action, by the process that owns that action, not by whichever step ran first.",
    evidence: [
      { label: 'Incident', value: 'Wrong-image + duplicate publish' },
      { label: 'Root cause', value: 'Editable stored verdict' },
      { label: 'Fix', value: 'Re-verify live at publish time' },
      { label: 'New safeguard', value: 'Idempotency ledger' },
    ],
  },

  decisionLog: [
    {
      decision: 'Make the publish gate re-derive its own verdict instead of trusting stored review state',
      reason: 'An orchestrating agent was found nulling out a stored Gemini FAIL verdict in review.json and re-running the publisher, letting a wrong-image post go out.',
      alternatives: ['Trust the stored review.json verdict as the final word before publishing.'],
      rejectedBecause: ['A stored verdict can be edited after the fact by the same class of process that produced it — trusting it blindly removes the safety the gate exists to provide.'],
      outcome: 'publish_instagram.py independently re-checks image presence, mechanical status, and a live Gemini re-verdict immediately before publishing, plus a new idempotency ledger — regardless of what any earlier step recorded.',
      impact: ['Editing review.json after the fact no longer changes what publishes', 'Dedup history is now recorded at publish-success time, not review time, closing a second gap where a published post could resurface as "fresh" later'],
      tag: 'Trust & Safety',
    },
    {
      decision: 'Require two agreeing passes from any fallback AI judge model before trusting a PASS',
      reason: 'A fallback-grade model was observed returning PASS, FAIL, and PASS again on the exact same image and prompt at temperature zero, where identical output was expected.',
      alternatives: ['Trust a single pass from any available judge model, primary or fallback alike.'],
      rejectedBecause: ['A single-pass judgment from a model already observed to be inconsistent is not evidence of anything — trusting it risks publishing content that should have failed review.'],
      outcome: 'Only the direct primary model (temperature zero, fixed seed, observed reproducible) is trusted on one call; every fallback model must return two agreeing PASS results, and any disagreement fails closed to FAIL.',
      impact: ['Removes a coin-flip verdict as a path to publishing', 'Fail-closed by default: disagreement or any FAIL always blocks'],
      tag: 'AI Reliability',
    },
    {
      decision: 'Require a live AI verdict to publish — remove the mechanical-only fallback',
      reason: 'Mechanical checks only catch corruption, blank renders, and a face bleeding into the text panel; they cannot catch a wrong-identity photo or an invented fact, which is exactly the failure class the AI review exists to prevent.',
      alternatives: ['Fall back to publishing on mechanical_status alone when no AI verdict is available (the original behavior).'],
      rejectedBecause: ['A mechanical PASS was never evidence that the photo was the right one or that the caption was accurate — publishing on it alone when the AI check is simply unreachable reintroduces the exact risk the gate was built to close.'],
      outcome: "If Gemini is unavailable on every path (direct free tier and the OpenRouter last-resort fallback), the post is skipped rather than published unverified. Publishing fewer posts, including zero, is the accepted tradeoff.",
      impact: ['No post ever ships on a mechanical PASS alone', 'Zero published posts on a bad day is treated as correct, not as an outage'],
      tag: 'Trust & Safety',
    },
    {
      decision: 'Try a free model before a paid one in the AI-review fallback chain, and escalate only on a genuine quota error',
      reason: 'No Gemini model on OpenRouter has a free tier; the only genuinely free, vision-capable Google model there is Gemma. Escalating to a paid model for every kind of failure (not just quota exhaustion) would spend money on transient issues a retry could fix for free.',
      alternatives: ['Escalate to the paid OpenRouter fallback on any failure of the primary model.', 'Use only the paid model as the fallback, skipping the free tier entirely.'],
      rejectedBecause: ['Escalating on any failure (a network blip, a bad response shape) would draw down paid credits for issues that have nothing to do with quota.', 'Skipping the free model wastes a genuinely free, working option before ever reaching for a paid one.'],
      outcome: 'The fallback chain tries the free Gemma model first and only escalates to a paid Gemini model on a verified 429/quota-exhaustion error — verified end-to-end with real calls, including a genuine free-tier 429 that correctly fell through to the paid model.',
      impact: ['Zero-cost fallback path used first', 'Paid credits spent only on genuine quota exhaustion, never on unrelated failures'],
      tag: 'Cost Engineering',
    },
    {
      decision: 'Rank stories by a weighted India-relevance / engagement / uniqueness score, and draw from a pool of 4 candidates to publish 2',
      reason: 'The feed needed to prioritize a specific audience (India-focused startup/AI/business news) while still surfacing stories worth reading, and a quality-gate rejection shouldn’t shrink a slot’s output.',
      alternatives: ['Rank purely by recency or purely by source authority.', 'Fetch and render exactly 2 candidates per slot.'],
      rejectedBecause: ['Recency alone surfaces noise; source authority alone misses regionally relevant stories from smaller outlets.', 'Exactly 2 candidates means any single rejection directly shrinks that day’s output instead of being absorbed by a backfill.'],
      outcome: 'A single weighted score (40% India relevance, 35% engagement, 25% uniqueness) ranks all candidates from 15 RSS feeds and 20 Google News query buckets; the top 4 unposted stories become that slot’s pool, and the publisher walks them in ranked order, publishing the first 2 that clear every gate.',
      impact: ['Publishing fewer than 2 posts, including zero, is documented as a normal and correct outcome, not a failure', 'A rejected candidate is replaced by the next-best one, never retried or forced through'],
      tag: 'Editorial Judgment',
    },
    {
      decision: 'Root-cause an EC2 disk-full outage instead of just restarting the failed cron',
      reason: 'The root volume hit 100% full from 9 stale, untagged Docker images (~30GB) left behind by repeated deploys with no cleanup step, which crashed the cron scheduler’s SQLite state file and silently skipped every posting slot that day.',
      alternatives: ['Manually prune the images, restart the scheduler, and move on.'],
      rejectedBecause: ['Fixing only that day’s instance leaves the same failure mode (and any other future cause of disk growth) able to silently repeat, with no warning before the next outage.'],
      outcome: 'Alongside resolving the immediate incident, two standing safety nets were added to the server crontab: a daily docker image prune, and a disk-usage tripwire that warns once usage crosses 85% — catching any future cause of disk growth, not just Docker images.',
      impact: ['Immediate incident resolved same session (pruned, restarted, backfilled the missed post)', 'Two independent, permanent safety nets now guard against recurrence'],
      tag: 'Reliability',
    },
  ],
  rejectedDecisions: [
    { question: 'Why not retry or patch a rejected post instead of pulling from the backfill pool?', answer: 'SKILL.md explicitly forbids re-rendering or retrying a rejected post, or patching any script output to force it through — the fix is drawing the next-best candidate from the pool of 4. Publishing fewer posts, including zero, is the accepted tradeoff over forcing a rejected post through.' },
    { question: 'Why not centralize sourcing behind a single paid news API instead of free RSS and Google News?', answer: 'Google News search RSS and curated publisher RSS are free, need no key, and already cover India-geo-targeted discovery across four verticals; the paid Currents API is kept as an optional extra layer, not the primary source, since the free tier already does the job.' },
    { question: 'Why not make the cutout (isolated-subject) treatment the default photo style instead of full-bleed?', answer: 'A clean cutout only works on a single, clearly isolated subject — most sourced news photos (buildings, group shots, screenshots) aren’t that, and a bad cutout looks worse than a well-cropped full-bleed photo. Cutout stays a rare, explicit opt-in, guarded to fall back to cover/letterbox if the result isn’t clean.' },
  ],

  timeline: [
    { label: 'Problem', description: 'Manual daily sourcing, ranking, writing, and publishing doesn’t survive repetition for a single operator.' },
    { label: 'Core Pipeline', description: 'Fetch, filter, write, render, and review scripts land: RSS + Google News sourcing, weighted ranking, reserved-panel rendering.' },
    { label: 'Real Publishing', description: 'EC2 deploy, Dockerized pipeline, and direct Instagram Graph API publishing with a self-refreshing long-lived token.' },
    { label: 'Cron-Ready & Hardened', description: 'Automated Gemini vision review, Sheets-based cross-host dedup, and a static-biased daily mix land for unattended runs.' },
    { label: 'Trust Hardening', description: 'Tamper-resistant publish gate, fail-closed fallback consensus, and a mandatory live AI verdict close three separate production gaps.' },
    { label: 'Current — Live', date: 'Jul 2026 –', description: 'Publishing autonomously 3×/day via Hermes cron, with standing safety nets against disk-full outages.' },
  ],

  architecture: {
    overview: 'A Hermes-scheduled cron pipeline: discovery across RSS and Google News feeds a weighted ranking pool, an AI editorial stage drafts and sources each post, a two-stage quality gate (mechanical plus fail-closed AI vision) verifies every candidate, and only what survives publishes to Instagram with a Google Sheets audit log.',
    diagramSteps: [
      { label: 'Discovery (RSS + Google News)' },
      { label: 'Ranking & Editorial AI' },
      { label: 'Quality Gates' },
      { label: 'Publish (Instagram + Sheets)' },
    ],
    designPrinciples: [
      'A quality gate must re-verify itself at the moment of the risky action — never trust a stored verdict from an earlier step.',
      'Match AI cost to task risk: a free/cheap model for high-volume classification, a stricter fail-closed consensus for anything that gates publishing.',
      'Publishing fewer posts, including zero, is always preferable to publishing an unverified one.',
    ],
    whyThisArchitecture: 'Every stage writes its state to a JSON file and can be re-run independently by the orchestrating agent, so one slow or failed stage never corrupts the next posting slot — but the publish stage never simply reads that state as ground truth; it re-derives its own answer before doing anything irreversible.',
    majorTradeoffs: [
      { tradeoff: 'File-based JSON handoff between scripts vs. a persistent job queue or database', reason: 'The pipeline is orchestrated by a CLI agent (Hermes) reading SKILL.md files, not a custom scheduler — plain JSON files are trivially inspectable and re-runnable between agent invocations; a database adds an operational dependency for no benefit at this scale.' },
      { tradeoff: 'A pool of 4 ranked candidates per slot vs. exactly 2', reason: 'Publishing exactly 2 candidates means any single quality-gate rejection directly shrinks that slot’s output. Carrying 2 extra costs some wasted copy-writing and rendering on candidates that don’t ship, in exchange for a consistent daily cadence.' },
    ],
  },

  highlights: [
    { label: 'Cadence', value: '3×/day, Autonomous' },
    { label: 'Architecture', value: 'Fail-Closed AI Gate' },
    { label: 'Sourcing', value: '15 Feeds + 20 Buckets' },
    { label: 'Status', value: 'Live Since Jul 2026' },
  ],

  lessons: [],
  lessonsLearned: {
    biggestLesson: 'An automation’s failure mode isn’t "it makes a mistake" — it’s "it makes the same mistake at scale, unattended, before anyone notices." The publish gate exists because a wrong post at 9pm IST with nobody watching is a very different risk than a human typo.',
    mistake: 'I initially trusted review.json as the pipeline’s source of truth for what had passed review, without considering that the same class of process that writes that file — an orchestrating AI agent — could also edit it. The tampering incident that followed was the direct, predictable consequence of that assumption.',
    differently: 'I’d design the re-verification step into the very first version of the publish gate, rather than adding it after an actual wrong-image post had already gone out.',
    principle: 'A quality gate that reads its own prior output as ground truth isn’t a gate. Verification has to happen again, at the moment of the action it’s protecting, by the process that owns that action.',
    advice: 'Ship the boring reliability work — idempotency ledgers, disk-space tripwires, fail-closed consensus checks — before the exciting feature work. None of it is visible in a demo. All of it is the difference between a pipeline that runs unattended for weeks and one that silently breaks the first time something unexpected happens.',
  },

  roadmap: [
    {
      whatsNext: 'Automated regression tests for the review and publish-gate logic',
      why: 'The pipeline currently ships with zero automated tests; the tamper-resistant gate and fail-closed consensus logic are exactly the kind of subtle, hard-to-eyeball-review behavior that benefits most from a regression suite — a manual test image already exists for one known wrong-photo case.',
      whyNotNow: 'Validated instead through the gate’s own design plus daily production observation; formalizing the existing manual test cases into an automated suite is planned, not yet built.',
    },
    {
      whatsNext: 'Scale the daily candidate pool beyond 4',
      why: 'The posting config already documents a 3–6 candidate range per slot; more candidates means more backfill headroom and room to grow published volume without loosening the quality gate.',
      whyNotNow: 'Started at the low end of that documented range deliberately, to validate ranking quality and AI-review cost at a smaller volume before scaling up.',
    },
  ],

  media: {
    heroVideo: null,
    screenshots: [],
    screenshotCategories: [
      {
        title: 'Rendered Posts',
        description: 'Real static posts published to @moatdaily — exact pipeline output, not mockups.',
        images: [
          {
            src: '/artifacts/moatdaily/media/post-zepto-ipo.jpg',
            alt: 'Instagram post: Zepto slashes IPO size by 20% after investor pushback',
            title: 'Zepto IPO Reality Check',
            description: 'Reserved-panel layout with a sourced photo, violet keyword emphasis, and the editorial credit line — real pipeline output, not a mockup.',
          },
          {
            src: '/artifacts/moatdaily/media/post-ai-workforce.jpg',
            alt: 'Instagram post: 77% of Indian professionals are now using AI at work',
            title: 'AI Workforce Stat Post',
            description: 'A stat-led headline sourced and ranked by the pipeline’s AI vertical bucket, cleared by the mechanical and Gemini review gates before publishing.',
          },
          {
            src: '/artifacts/moatdaily/media/post-skyroot-launch.jpg',
            alt: "Instagram post: Skyroot creates history with India's first private orbital rocket launch",
            title: 'Skyroot Orbital Launch',
            description: 'Real Gemini review verdict for this exact post: "correctly depicts PM Modi, matches the story details, and contains no foreign watermarks."',
          },
          {
            src: '/artifacts/moatdaily/media/post-markets-surge.jpg',
            alt: 'Instagram post: Indian markets surge over 1% ignoring the global tech sell-off',
            title: 'Markets Coverage',
            description: 'A real sourced photo (the BSE building) via the image waterfall, not a stock illustration — face/saliency-aware crop keeps the subject inside the photo zone.',
          },
          {
            src: '/artifacts/moatdaily/media/post-makemytrip-ipo.jpg',
            alt: 'Instagram post: MakeMyTrip secretly files for an IPO to list its Indian subsidiary',
            title: 'MakeMyTrip IPO Filing',
            description: 'Ranked 7.5/10 by the live scorer (9 India-relevance, 4 engagement, 10 uniqueness) the day it published.',
          },
        ],
      },
      {
        title: 'Carousel Editorial',
        description: 'A real 4-slide carousel — reserved for genuinely multi-fact stories, not the daily default.',
        images: [
          {
            src: '/artifacts/moatdaily/media/carousel-defence-1.jpg',
            alt: "Carousel slide 1 of 4: India's defence manufacturing hits an all-time high",
            title: 'Carousel — Slide 1/4',
            description: 'The suggested_post_type classifier defaults to static and only escalates to carousel for roundups, explainers, or numbered-list stories — this one qualified.',
          },
          {
            src: '/artifacts/moatdaily/media/carousel-defence-4.jpg',
            alt: 'Carousel slide 4 of 4: from imports to homegrown output, what’s driving India’s defence sector',
            title: 'Carousel — Slide 4/4',
            description: 'Closing slide ends on a real engagement prompt ("Comment below"), rendered through the same Jinja2 + Playwright path as every static post.',
          },
        ],
      },
    ],
    architectureDiagram: '/artifacts/moatdaily/docs/moatdaily-architecture.svg',
    workflowDiagram: '/artifacts/moatdaily/docs/moatdaily-user-flow.svg',
    wireframes: [],
    documents: [],
    externalLinks: [
      { label: 'GitHub', href: 'https://github.com/vbkatarnaware/moatdaily' },
      { label: '@moatdaily on Instagram', href: 'https://instagram.com/moatdaily' },
    ],
  },
};

export default content;
