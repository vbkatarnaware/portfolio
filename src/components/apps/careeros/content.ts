import type { AppContent } from '../../../types/app';
import careerosImg from '../../../assets/images/careeros.png';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8), projects[CareerOS].
// Status is MIT-licensed open-source, personally used — never "acquired",
// never a user/revenue count. 700+ automated tests is a verified, rounded
// figure (742 collected, 741 passing).
const content: AppContent = {
  id: 'careeros',
  mode: 'product',
  name: 'CareerOS',
  tagline: 'Workflow redesign for the modern job search, using AI only where it earns its cost',
  accent: '#27c93f',
  iconSrc: careerosImg.src,
  externalUrl: 'https://careeros.codes',
  githubUrl: 'https://github.com/vbkatarnaware/careeros',

  overview: [
    "CareerOS is an open-source, MIT-licensed job-search pipeline I rebuilt from scratch in Python after CareerOps — the open-source AI agent I first tried — exhausted a Claude Pro quota 2-3 times without completing a single pipeline run.",
    "The rebuild isn't a bigger model. It's a workflow redesign: deterministic code does deterministic work, and AI is spent only where reasoning actually adds value.",
  ],
  problemTitle: 'Problem',
  problem: [
    "CareerOps tried to solve job search by running every discovered job through full AI evaluation, generation, and reporting. That's comprehensive, but computationally expensive — most of the cost was spent on jobs that were never going to be worth applying to.",
  ],
  discovery: [
    "The problem wasn't AI capability, it was workflow design. A free deterministic filter now removes hard mismatches before any AI is spent. A batched AI gate — 50 jobs per call, against a lean profile subset — triages what's left, and full per-job evaluation runs only on survivors.",
    "A content-addressed cache, keyed on job content, profile version, and prompt version, means no AI call ever repeats for an answer already computed.",
    "The most expensive artifact — a deep interview-prep report — was moved out of the daily loop entirely. It's opt-in, on-demand, and forbidden from recomputing the evaluation it expands on, because most discovered jobs never become an actual application.",
  ],

  decisionLog: [
    {
      decision: 'Render resumes with Typst instead of the Playwright + HTML templating CareerOps used',
      reason: 'PDF rendering needed to be fast, low-resource, and dependency-free for an open-source tool anyone can clone and run.',
      alternatives: 'Keep CareerOps’ Playwright-and-HTML-templating approach.',
      rejectedBecause: 'Playwright means a full browser dependency for every PDF render — heavy, slow, and one more thing to fail on a fresh clone.',
      outcome: 'Zero LaTeX, browser, or system-font dependency in the resume pipeline.',
    },
    {
      decision: 'Batch jobs through a cheap AI gate rather than one full AI call per job',
      reason: 'Most discovered jobs are hard mismatches that don’t need full evaluation reasoning.',
      alternatives: 'Run full per-job AI evaluation on every discovered job, as CareerOps did.',
      rejectedBecause: 'One AI call per job scales cost linearly with discovery volume regardless of match quality — exactly what exhausted the original quota.',
      outcome: 'A free deterministic filter plus a batched 50-jobs-per-call AI gate triages before expensive evaluation ever runs.',
    },
    {
      decision: 'Move interview prep out of the daily pipeline to opt-in',
      reason: 'Most discovered jobs never become an actual application, so pre-generating deep prep for all of them is wasted spend.',
      alternatives: 'Generate interview prep inside the standard evaluation step, as CareerOps did.',
      rejectedBecause: 'Interview prep is the single most expensive artifact in the pipeline; generating it by default multiplies cost for content that’s usually never read.',
      outcome: 'On-demand, one command per job, and explicitly forbidden from recomputing the evaluation it expands on.',
    },
  ],

  rejectedDecisions: [
    { question: 'Why not use Playwright for PDF generation?', answer: 'It requires a full browser dependency for every render — Typst compiles standalone, with no LaTeX, browser, or system-font dependency to install.' },
    { question: 'Why not run one AI call per discovered job?', answer: 'That scales AI cost linearly with discovery volume; a free deterministic filter plus a batched gate removes most jobs before any AI spend.' },
    { question: 'Why not generate interview prep inside the standard evaluation step?', answer: 'Most discovered jobs never become an actual application — pre-generating the most expensive artifact for all of them wastes the majority of that spend.' },
  ],

  timeline: [
    { label: 'Problem', description: 'CareerOps exhausts a Claude Pro quota 2-3 times without completing a single pipeline.' },
    { label: 'v1.0', description: 'From-scratch Python rewrite: deterministic pipeline, AI Gate, single discovery provider.' },
    { label: 'v1.2–1.3', description: 'Multi-provider discovery, parallel execution, resilient credential rotation.' },
    { label: 'v1.4–1.5', description: 'Typst-based PDF rendering; tailored resume/cover-letter generation.' },
    { label: 'v1.6 — Current', description: 'Local-first mode for open-source use; 700+ automated tests; 11 releases shipped over six days.' },
  ],

  architecture: [
    { label: 'Job Discovery' },
    { label: 'Deterministic Filter' },
    { label: 'AI Gate' },
    { label: 'Evaluation' },
    { label: 'Artifacts' },
  ],

  highlights: [
    { label: 'License', value: 'MIT' },
    { label: 'Testing', value: '700+ Automated Tests' },
    { label: 'Distribution', value: 'Open Source' },
    { label: 'Status', value: 'Active Development' },
  ],

  lessons: [
    "AI agents should eliminate complexity, not create it — the fastest fix wasn't a better model, it was removing unnecessary work.",
    "Computational efficiency is a product decision, made at the workflow level, not an engineering afterthought.",
    "An anti-scripting guardrail exists in the pipeline today after an agent once faked AI-gate keep/drop calls with a keyword-matching script instead of reasoning over each job — now a standing rule for every run.",
  ],

  media: {
    heroVideo: null,
    screenshots: [],
    architectureDiagram: null,
    workflowDiagram: null,
    wireframes: [],
    documents: [],
    externalLinks: [
      { label: 'GitHub', href: 'https://github.com/vbkatarnaware/careeros' },
    ],
  },
};

export default content;
