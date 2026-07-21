import type { AppContent } from '../../../types/app';
import rizentImg from '../../../assets/images/rizent.svg';

// Ground truth verified directly against the Rizent repo (server/worker/web/
// packages/shared) and its docs (docs/AI_ARCHITECTURE.md, docs/architecture.md,
// docs/user_flow.md) during this rewrite — LOC and migration counts re-run
// live, not carried over from memory. STRICT: private beta, no users, no
// launch language. Telegram only (never WhatsApp/Slack). Investor database
// and per-investor follow-up experimentation are ROADMAP — never described
// as built. No Anthropic/Claude anywhere in the stack (grep-verified) — the
// AI layer is an OpenRouter federation (GPT-4o / GPT-4o-mini) plus Gemini
// 2.0 Flash. Billing is intentionally not mentioned (positioning: private
// beta, not commercial SaaS).
const content: AppContent = {
  id: 'rizent',
  mode: 'product',
  name: 'Rizent AI',
  tagline: 'Investor outreach for founders, run end to end by an AI co-founder. Private beta.',
  accent: '#8b5cf6',
  iconSrc: rizentImg.src,
  externalUrl: 'https://rizent.me',

  overview: [],
  overviewSummary: {
    problem: "Investor outreach is high-volume and easy to drop — founders manually find relevant investors, personalize outreach, track replies across dozens of parallel threads, and remember follow-ups, all while trying to raise.",
    solution: "Rizent runs outreach end to end: pitch-deck extraction into a queryable 'digital twin', AI investor matching, drafted outreach the founder approves, reply-intent detection, and Calendar-integrated meeting booking — with a human approval gate wherever trust matters most.",
    impact: "Solo-built as a 30,233-line TypeScript monorepo across 71 Postgres migrations. Deliberately still in private beta, validating matching quality, AI cost, and reliability internally before any external rollout.",
  },
  // Problem and Discovery are intentionally folded away (lean Product IA):
  // the workflow/pain-point framing below already lives in overviewSummary,
  // and the cost-tiering investigation IS Decision Log #1/#2's reasoning —
  // repeating either as its own tab would just re-tell the same story.
  // Preserved here as ground truth, not deleted:
  //   painPoints were: (1) a dropped follow-up or stale financial figure
  //   stated as current is a real, damaging mistake — not a minor
  //   inconvenience; (2) manually tracking reply intent across many threads
  //   stops scaling past a handful of investors; (3) outreach tools automate
  //   sending but not the judgment calls (escalate/snooze/stop). (1) is now
  //   the Telegram-escalation decision below; (2)/(3) are covered by
  //   overviewSummary.solution's "human approval gate wherever trust matters".
  problemTitle: 'Problem',
  problem: [],
  discovery: [],

  decisionLog: [
    {
      decision: 'Route every AI call through a single OpenRouter federation instead of calling model providers directly',
      reason: 'Task cost should scale with how much reasoning it actually needs — not every call deserves GPT-4o pricing.',
      alternatives: ['Call OpenAI and Google APIs directly, per task.', 'Use one model tier for every AI call, regardless of task.'],
      rejectedBecause: ['Direct multi-provider calls mean managing separate keys, rate limits, and fallback logic per provider.', 'A single tier means paying GPT-4o-level cost for tasks — like reply classification — that a cheaper model handles fine.'],
      outcome: 'GPT-4o-mini handles high-volume classification and drafting, GPT-4o handles investor match-scoring, and Gemini 2.0 Flash handles pitch-deck extraction — all behind one OpenRouter key with automatic model fallback on rate limits.',
      impact: ['~$0.15/1M tokens for high-volume tasks vs. ~$5.00/1M for GPT-4o', 'Automatic fallback to GPT-3.5-turbo on 429s/5xx'],
      tag: 'AI Architecture',
    },
    {
      decision: 'Score up to 10 investors per AI call instead of one call per investor',
      reason: "Scoring investors one at a time re-sends the same startup context on every call, so cost scales linearly with the size of the investor list.",
      alternatives: ['One GPT-4o call per investor.', 'Pre-compute a single generic score instead of a per-investor match.'],
      rejectedBecause: ['Per-investor calls multiply cost with list size for no accuracy gain.', "A generic score can't reflect a specific investor's stage, sector, or portfolio conflicts."],
      outcome: 'Batch-match embeds up to 10 investor profiles per GPT-4o call, cutting tokens versus individual queries by roughly 80%, with results cached in Redis for 24 hours.',
      impact: ['~80% token reduction vs. per-investor scoring', '24h Redis cache on match-score keys'],
      tag: 'Cost Engineering',
    },
    {
      decision: 'Build sending-hours enforcement, bounce detection, and stuck-recovery directly into the send pipeline',
      reason: 'An AI that drafts great emails is worthless if the emails get flagged as spam or silently stop sending.',
      alternatives: ['Send immediately on approval, any time of day.', "Rely on Gmail's own bounce handling."],
      rejectedBecause: ['Sending outside business hours raises spam-flag risk for the whole domain.', 'Gmail surfaces bounces passively; without an active detector, a bounced address keeps getting retried.'],
      outcome: 'Emails only send 8AM–6PM UTC, bounced addresses go on a suppression list that persists even across investor delete and re-upload, and a stuck-recovery poller marks anything wedged in a "sending" state as failed every 10 minutes.',
      impact: ['8AM–6PM UTC send window enforced', 'Suppression list survives investor delete + re-upload', '10-minute stuck-recovery poll'],
      tag: 'Deliverability',
    },
    {
      decision: 'Require founder approval before any AI-drafted meeting reply or scheduling action goes out',
      reason: "Confirming a meeting time or answering an investor directly is exactly the kind of judgment call that shouldn't be fully automated.",
      alternatives: ['Auto-send AI-drafted meeting replies.', 'Only notify the founder after the reply has already gone out.'],
      rejectedBecause: ["Auto-sending removes the founder's chance to catch a wrong tone or a scheduling conflict before an investor sees it.", "After-the-fact notification doesn't prevent a bad reply from going out in the first place."],
      outcome: 'Every AI-drafted meeting reply lands in a Decision Hub with the proposed reply text, suggested time slots, and a slot lock to prevent double-booking — the founder approves, edits, or snoozes before anything sends.',
      impact: ['Founder-in-the-loop on every scheduling reply', 'Race-condition-safe slot locking on approval'],
      tag: 'Product Judgment',
    },
    {
      decision: 'Escalate to the founder over Telegram rather than let the AI answer a financial question from stale memory',
      reason: 'Investor conversations are high-trust; an AI presenting an out-of-date revenue or runway figure as current is a real, damaging error, not a minor inaccuracy.',
      alternatives: ["Let the AI answer from its best available stored figure.", "Disable financial questions from the AI's scope entirely."],
      rejectedBecause: ['Best-available-context still risks presenting a stale number as current.', 'Disabling the topic makes the tool useless for exactly the conversations it exists to handle.'],
      outcome: "Stored facts are classified as static or dynamic with an expiry policy; when a dynamic fact — like MRR — has gone stale, the agent escalates to the founder over Telegram instead of guessing.",
      impact: ['No AI-invented financial figures reach an investor', 'Telegram used as the escalation channel, not WhatsApp or email'],
      tag: 'Trust & Safety',
    },
    {
      decision: "Anchor daily AI-usage quota resets to a global UTC timestamp instead of the user's local clock",
      reason: "A per-user, local-time reset is trivially bypassed by changing the system clock or spoofing a timezone.",
      alternatives: ["Reset quotas at local midnight per user's browser timezone."],
      rejectedBecause: ['Local-time resets cannot be trusted — a user changing their system clock or timezone would earn extra free searches for free.'],
      outcome: 'Daily AI usage is checked against a single global UTC timestamp in the plan-limits middleware, so the daily limit resets at UTC midnight for every user regardless of local time or browser settings.',
      impact: ['Quota bypass via clock/timezone spoofing closed', 'Single UTC reset boundary for every user'],
      tag: 'Anti-Abuse',
    },
  ],
  rejectedDecisions: [
    { question: 'Why not ship a pre-populated investor database?', answer: "Real investor data isn't sourced and AI-enriched yet — shipping a placeholder database would misrepresent it as real. Investors currently enter only via a founder's own CSV upload during validation." },
    { question: 'Why not launch publicly now?', answer: 'Matching quality, AI cost, and reliability are still being validated internally; a public launch before that risks a bad first impression with the investors the tool depends on.' },
    { question: 'Why not let founders set a custom send-time window instead of a fixed UTC schedule?', answer: "Timezone-aware sending per recipient needs a timezone lookup (from the investor's profile or reply headers) with a safe UTC fallback — that logic is designed but not yet built, so a fixed 8AM–6PM UTC window is the safe interim default." },
  ],

  timeline: [
    { label: 'Problem', description: "Manual investor outreach doesn't scale for a solo founder raising a round — dropped follow-ups and untracked replies are real failure modes, not edge cases." },
    { label: 'Core Pipeline', description: 'Pitch-deck extraction into a digital twin, cost-tiered AI matching, Gmail outreach, and Calendar-integrated meeting booking.' },
    { label: 'Deliverability Hardening', description: 'Sending-hours enforcement, persistent bounce suppression, and stuck-email recovery built directly into the send pipeline.' },
    { label: 'Decision Hub & Escalation', description: 'Founder approval gate for AI-drafted meeting replies; Telegram escalation when a stored financial figure goes stale.' },
    { label: 'Anti-Abuse Hardening', description: 'UTC-anchored quota resets to close a clock/timezone-spoofing bypass on the daily AI usage limit.' },
    { label: 'Current — Private Beta', description: 'Internal validation of matching quality, AI cost, and reliability. No external users yet.' },
  ],

  architecture: {
    overview: 'A founder-triggered pipeline: the Express API and BullMQ worker fleet route through a cost-tiered AI layer — GPT-4o-mini for high-volume classification and drafting, GPT-4o for investor match-scoring, Gemini 2.0 Flash for pitch-deck extraction — before persisting to Postgres, Redis, and Gmail.',
    diagramSteps: [
      { label: 'Founder (Web + Telegram)' },
      { label: 'Express API' },
      { label: 'BullMQ Worker Fleet' },
      { label: 'Cost-Tiered AI (OpenRouter + Gemini)' },
      { label: 'Postgres · Redis · Gmail' },
    ],
    designPrinciples: [
      'Route every AI call through one OpenRouter key, with automatic fallback on rate limits.',
      'Match each task to the cheapest model that can actually do it — GPT-4o-mini for volume, GPT-4o for reasoning.',
      'Batch repeated-context calls (investor scoring) instead of paying for the same context on every call.',
    ],
    whyThisArchitecture: 'Decoupling application logic (API + workers) from a cost-tiered AI layer means high-volume tasks never pay premium-model pricing, and background jobs — sending, reply detection, stuck-recovery — run independently of the request/response cycle the dashboard depends on.',
    majorTradeoffs: [
      { tradeoff: 'BullMQ worker fleet vs. handling jobs inline in the API', reason: 'Inline processing would block API responses on slow operations like Gmail sends; a separate worker fleet keeps the dashboard responsive and lets sends retry independently of a request.' },
      { tradeoff: 'OpenRouter federation vs. calling OpenAI and Google directly', reason: 'A single OpenRouter key with built-in fallback is simpler to operate than managing separate provider keys, rate limits, and fallback logic per provider — at the cost of an extra routing layer.' },
    ],
  },

  highlights: [
    { label: 'Status', value: 'Private Beta' },
    { label: 'Architecture', value: 'Tiered AI' },
    { label: 'Scope', value: '30,233 LOC' },
    { label: 'Data Layer', value: '71 Migrations' },
  ],

  lessons: [],
  keyLearnings: [
    "The hardest part of an outreach agent isn't generating good drafts — it's knowing exactly when not to act, and routing that moment to the founder instead of guessing.",
    'Cost and trust are both architecture decisions, not prompting tricks — which model handles a task, and which decisions escalate to a human, should be decided at the pipeline level.',
  ],

  roadmap: [
    {
      whatsNext: 'Timezone-aware send scheduling per investor',
      why: 'Sending is currently enforced in a single 8AM–6PM UTC window for every recipient; a US-based and a Singapore-based investor get outreach at very different local hours.',
      whyNotNow: 'Requires a timezone lookup (from the investor profile or reply headers) with a UTC fallback and per-recipient queue-delay logic — designed as the next step in the send pipeline, not yet built.',
    },
    {
      whatsNext: 'Centralized, sourced investor database',
      why: "Replace the founder-CSV-upload-only workflow used during validation with real, AI-enriched investor data across sectors and stages.",
      whyNotNow: "Sourcing and enriching investor data from public sources is planned but not yet built — real investors currently enter only via a founder's own CSV upload.",
    },
    {
      whatsNext: 'Per-investor follow-up message experimentation',
      why: 'Different investors likely respond better to different follow-up framing; measuring reply and meeting-conversion rate per variant would let outreach improve over time instead of using one fixed template.',
      whyNotNow: 'Designed but not yet shipped to the deployed product.',
    },
  ],

  media: {
    heroVideo: null,
    screenshots: [],
    screenshotCategories: [
      {
        title: 'Dashboard',
        description: 'Founder-facing overview.',
        images: [
          {
            src: '/artifacts/rizent/media/dashboard-overview.jpg',
            alt: 'Rizent dashboard overview showing investor pipeline stats and recent activity',
            title: 'Dashboard Overview',
            description: 'KPI snapshot (investors, contacted, replied, meetings), a 14-day outbound/reply chart, and a recent-activity feed.',
          },
        ],
      },
      {
        title: 'Investor Discovery',
        description: 'AI-scored target lists.',
        images: [
          {
            src: '/artifacts/rizent/media/investor-discovery.jpg',
            alt: 'Investor list showing AI fit scores for a seed-stage target list',
            title: 'Investor Discovery & Fit Scoring',
            description: 'A saved investor list with an AI-driven fit score (1–10) and outreach status per investor.',
          },
        ],
      },
      {
        title: 'Campaigns & Automation',
        description: 'Outreach and the recurring investor update.',
        images: [
          {
            src: '/artifacts/rizent/media/campaigns.jpg',
            alt: 'Campaigns overview showing active and completed outreach campaigns',
            title: 'Campaign Management',
            description: 'Active and completed outreach campaigns with sent/reply counts and reply-rate tracking.',
          },
          {
            src: '/artifacts/rizent/media/monthly-update.jpg',
            alt: 'Monthly investor update campaign analytics',
            title: 'Monthly Investor Update',
            description: 'The auto-created recurring update campaign, with its own funnel: investors, emails sent, opened, replied.',
          },
        ],
      },
      {
        title: 'Decision Hub',
        description: 'Founder approval gate.',
        images: [
          {
            src: '/artifacts/rizent/media/decision-hub-approvals.jpg',
            alt: 'Decision Hub showing an AI-drafted meeting reply awaiting founder approval',
            title: 'Decision Hub — Founder Approval',
            description: 'An AI-drafted meeting-time reply with suggested slots, waiting on founder approval before it sends.',
          },
        ],
      },
      {
        title: 'Settings',
        description: "The founder and startup profile that grounds the AI's context.",
        images: [
          {
            src: '/artifacts/rizent/media/settings-profile.jpg',
            alt: 'Founder profile and startup settings page',
            title: 'Profile & Startup Settings',
            description: "Startup profile powering the AI's context — sector, stage, team size, and revenue range.",
          },
        ],
      },
    ],
    architectureDiagram: '/artifacts/rizent/docs/rizent-architecture.svg',
    workflowDiagram: '/artifacts/rizent/docs/rizent-user-flow.svg',
    wireframes: [],
    documents: [],
    externalLinks: [
      { label: 'Waitlist', href: 'https://rizent.me' },
    ],
  },
};

export default content;
