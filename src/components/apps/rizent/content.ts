import type { AppContent } from '../../../types/app';
import rizentImg from '../../../assets/images/rizent.svg';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8), projects[Rizent AI].
// STRICT: private beta, no users, no launch language. Telegram only (never
// WhatsApp). Investor database and follow-up experimentation are ROADMAP —
// never described as built or shipped.
const content: AppContent = {
  id: 'rizent',
  mode: 'product',
  name: 'Rizent AI',
  tagline: 'Investor outreach for founders, run end to end by an AI co-founder. Private beta.',
  accent: '#8b5cf6',
  iconSrc: rizentImg.src,
  externalUrl: 'https://rizent.me',
  githubUrl: 'https://github.com/vbkatarnaware/rizent',

  overview: [
    "Rizent is a private-beta AI investor-outreach platform for founders, solo-built as a 30,000+ line TypeScript monorepo — Next.js, Express, a BullMQ worker, and Postgres across 71 migrations.",
    "It covers pitch-deck ingestion, AI investor match-scoring, Gmail outreach with scheduled follow-ups, reply-intent detection, and Google Calendar meeting booking behind a founder approval gate. It is deliberately still in private beta — validating internally before any external rollout, not withheld because it's unfinished.",
  ],
  problemTitle: 'Problem',
  problem: [
    "Investor outreach for founders is high-volume, repetitive, and easy to drop: manually finding relevant investors, personalizing outreach, remembering follow-ups, and tracking replies across dozens of parallel conversations.",
  ],
  discovery: [
    "The riskiest part of automating founder-investor communication isn't outreach volume, it's letting an AI answer something it can't actually source — like a stale financial figure. That shaped the core design decision: a governed memory layer that classifies stored facts as static or dynamic, with an expiry policy.",
    "When an investor asks about revenue or runway and the stored figure has gone stale, the agent escalates to the founder over a Telegram bot instead of answering, rather than letting the AI invent a number it cannot source.",
    "Deterministic keyword matching is deliberately fenced out of the AI's decision path — it feeds content generation, but never drives intent classification, stage transitions, or scheduling.",
  ],

  decisionLog: [
    {
      decision: 'Escalate stale financial questions to the founder over Telegram rather than let the AI answer',
      reason: 'Investor conversations are high-trust; an AI-invented revenue or runway figure is a real, damaging error, not a minor inaccuracy.',
      alternatives: 'Let the AI answer from its best available context; disable financial questions entirely.',
      rejectedBecause: 'Best-available-context still risks inventing a number under investor pressure; disabling the topic makes the tool useless for the exact conversations it exists to handle.',
      outcome: 'A governed memory layer with static/dynamic fact classification and expiry, escalating to the founder only when the stored figure is stale.',
    },
    {
      decision: 'Keep Rizent in private beta rather than launch publicly',
      reason: 'Validating investor-matching quality, AI cost, and automation reliability internally before external rollout.',
      alternatives: 'Launch publicly now to start acquiring users.',
      rejectedBecause: 'Public launch before the matching engine and cost model are validated risks a bad first impression on the exact audience (investors) the tool depends on.',
      outcome: 'Real investors currently enter only through a founder’s own CSV upload while the matching engine is validated — no placeholder data shipped as if it were real.',
    },
  ],
  rejectedDecisions: [
    { question: 'Why not let the AI answer financial questions directly from memory?', answer: 'A stale or invented revenue/runway figure in front of an investor is a high-trust failure; the agent escalates to the founder over Telegram instead.' },
    { question: 'Why not ship a pre-populated investor database?', answer: 'Real investor data isn’t sourced yet — shipping a placeholder database would misrepresent it as real. Investors enter only via founder CSV upload during validation.' },
    { question: 'Why not launch publicly now?', answer: 'Matching quality, AI cost, and reliability are still being validated internally; a public launch before that risks a bad first impression with the investors the tool depends on.' },
  ],

  timeline: [
    { label: 'Problem', description: 'Manual investor outreach doesn’t scale for a solo founder raising capital.' },
    { label: 'Core build', description: 'Pitch-deck ingestion, match-scoring, Gmail outreach, reply-intent detection, Calendar booking.' },
    { label: 'Memory governance', description: 'Static/dynamic fact classification with expiry; Telegram escalation for stale financial questions.' },
    { label: 'Current — Private Beta', description: 'Internal validation of matching quality, AI cost, and reliability. No external users yet.' },
  ],

  architecture: [
    { label: 'Founder' },
    { label: 'Investor Matching' },
    { label: 'Outreach' },
    { label: 'Memory' },
    { label: 'Reply' },
    { label: 'Meeting' },
  ],

  highlights: [
    { label: 'Status', value: 'Private Beta' },
    { label: 'Concept', value: 'AI Co-founder' },
    { label: 'Scope', value: '30k+ LOC' },
    { label: 'Data Layer', value: '71 Database Migrations' },
  ],

  lessons: [
    "Fence deterministic logic out of the AI's decision path by design — keyword matching feeds content generation but never drives intent classification, stage transitions, or scheduling.",
    "Validating a product internally before public rollout is itself a product decision, not a delay — SaaS, an internal tool, and open source all remain open future paths, none decided yet.",
  ],

  roadmap: [
    {
      whatsNext: 'Per-investor follow-up message experimentation',
      why: 'Different investors may respond better to different follow-up approaches; measuring reply and meeting-conversion rates per variant would let outreach improve over time.',
      whyNotNow: 'Designed but not yet shipped to the deployed product — planned work, not a built capability.',
    },
    {
      whatsNext: 'Centralized, sourced investor database',
      why: 'Replace the founder-CSV-only workflow used during validation with real, enriched investor data.',
      whyNotNow: 'Sourcing from Apify and other free public sources, cleaned and enriched with AI, is planned but not yet built.',
    },
  ],

  media: {
    heroVideo: null,
    screenshots: [],
    architectureDiagram: null,
    workflowDiagram: null,
    wireframes: [],
    documents: [],
    externalLinks: [
      { label: 'Waitlist', href: 'https://rizent.me' },
    ],
  },
};

export default content;
