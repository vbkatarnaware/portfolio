import type { AppContent } from '../../../types/app';
import moatdailyImg from '../../../assets/images/moatdaily.png';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8), projects[MoatDaily].
// This is an Instagram news pipeline, not a financial newsletter — the
// previous site copy (Ghost/Stripe, 12k subscribers, 42% open rate)
// described a different product and must not reappear anywhere. Public repo,
// no license — never "open source".
const content: AppContent = {
  id: 'moatdaily',
  mode: 'product',
  name: 'MoatDaily',
  tagline: 'Instagram newsroom for startup, AI, and business news, publishing daily through an automated pipeline',
  accent: '#ff5f56',
  iconSrc: moatdailyImg.src,
  externalUrl: 'https://instagram.com/moatdaily',
  githubUrl: 'https://github.com/vbkatarnaware/moatdaily',

  overview: [
    "MoatDaily is an autonomous Instagram pipeline covering startup, AI, and business news, publishing daily since July 2026 on a three-times-daily cron.",
    "Stories are pulled from 15 curated RSS feeds and 20 Google News query buckets, ranked by a weighted scoring rubric — India relevance at 40%, an engagement signal at 35%, and a uniqueness check at 25% — before anything renders and publishes via Jinja2, Playwright, and the Instagram Graph API.",
  ],
  problemTitle: 'Problem',
  problem: [
    "Publishing relevant, well-designed daily content on a fixed cadence is a repetitive editorial job — sourcing, ranking, writing, rendering, and reviewing every post by hand doesn't scale for a single operator.",
  ],
  discovery: [
    "The core editorial risk isn't sourcing content, it's shipping a bad post: a wrong fact, a low-quality image, or a factual mismatch between the caption and the source article. That risk shaped the most important decision in the pipeline: the publish gate.",
    "After an AI agent was found editing a stored review verdict in production, the publish gate was redesigned to be authoritative against its own orchestrator — the publisher now re-runs the live visual-quality check itself rather than trusting a stored file, and any fallback judge model requires two agreeing passes after one model returned pass, fail, and pass again on identical input at temperature zero.",
  ],

  decisionLog: [
    {
      decision: 'Make the publish gate re-verify itself instead of trusting a stored review verdict',
      reason: 'An AI agent was found editing the stored review verdict file in production, which could let a rejected post slip through.',
      alternatives: 'Trust the stored review.json verdict as the final word before publishing.',
      rejectedBecause: 'A stored verdict can be edited after the fact by the same orchestrating agent that produced it — trusting it blindly removes the safety the gate exists to provide.',
      outcome: 'The publisher re-runs the live visual-quality check itself immediately before publishing, independent of any stored file.',
    },
    {
      decision: 'Require two agreeing passes from fallback judge models',
      reason: 'One fallback model was observed returning pass, fail, and pass again on identical input at temperature zero.',
      alternatives: 'Trust a single pass from any available judge model.',
      rejectedBecause: 'A single-pass judgment from a model with observed inconsistency risks publishing content that should have failed review.',
      outcome: 'Fallback judges must agree twice before a post clears the gate.',
    },
    {
      decision: 'Weight ranking by India relevance (40%), engagement (35%), and uniqueness (25%)',
      reason: 'The feed needed to prioritize a specific audience (India-focused startup/AI/business news) while still surfacing stories worth reading, not just regionally relevant ones.',
      alternatives: 'Rank purely by recency; rank purely by source authority.',
      rejectedBecause: 'Recency alone surfaces noise; source authority alone misses regionally relevant stories from smaller outlets.',
      outcome: 'A single weighted score ranks all candidates from 15 RSS feeds and 20 Google News query buckets before anything renders.',
    },
  ],
  rejectedDecisions: [
    { question: 'Why not trust the stored review verdict before publishing?', answer: 'It can be edited after the fact by the same orchestrating agent — the gate now re-runs the live check itself, independent of any stored file.' },
    { question: 'Why not accept a single pass from a fallback judge model?', answer: 'One fallback model was observed giving inconsistent verdicts on identical input; two agreeing passes are now required before a post clears review.' },
  ],

  timeline: [
    { label: 'Problem', description: 'Manual daily content sourcing, ranking, and publishing doesn’t scale for one operator.' },
    { label: 'Pipeline built', description: 'RSS + Google News sourcing, weighted ranking, mechanical pre-filter, AI visual-quality review.' },
    { label: 'Gate hardened', description: 'Publish gate made authoritative against its own orchestrator after a production tampering incident.' },
    { label: 'Current', date: 'Jul 2026 –', description: 'Publishing daily on a three-times-daily cron.' },
  ],

  architecture: [
    { label: 'Feeds' },
    { label: 'Ranking' },
    { label: 'Editorial AI' },
    { label: 'Publish Gate' },
    { label: 'Instagram' },
  ],

  highlights: [
    { label: 'Cadence', value: 'Daily Publishing' },
    { label: 'Review', value: 'AI Editorial Pipeline' },
    { label: 'Sourcing', value: '15 News Sources' },
    { label: 'Operation', value: 'Autonomous Workflow' },
  ],

  lessons: [
    "A gate that trusts its own stored output isn't a gate — it has to re-verify itself against the thing it's actually protecting, especially when the same automation that writes the verdict could also edit it.",
    "Model inconsistency is a reliability problem to design around, not an edge case to ignore — a single pass from an inconsistent judge isn't evidence.",
    "Root-caused an EC2 disk-full outage that was silently crashing the cron scheduler, then shipped two standing safety nets — automated image pruning and a disk-usage tripwire — from the server crontab.",
  ],

  roadmap: [
    {
      whatsNext: 'Automated Reels generation',
      why: 'Instagram rewards short-form video more than static posts and carousels.',
      whyNotNow: 'The current pipeline is validated for static/carousel formats; Reels generation is planned, not yet built.',
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
      { label: 'GitHub', href: 'https://github.com/vbkatarnaware/moatdaily' },
    ],
  },
};

export default content;
