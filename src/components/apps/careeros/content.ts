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
  accent: '#0058d0',
  iconSrc: careerosImg.src,
  externalUrl: 'https://careeros.codes',
  githubUrl: 'https://github.com/vbkatarnaware/careeros',

  overview: [],
  overviewSummary: {
    problem: "A serious job search rewards volume — but applying to hundreds of roles means either spray-and-pray with a generic resume, or hours hand-tailoring each application. The AI tools meant to fix that tend to burn their entire API budget evaluating jobs that were never worth applying to.",
    solution: "CareerOS finds jobs, scores them against your real experience, and generates a tailored resume and cover letter for every strong match — spending AI only where reasoning changes the outcome. Deterministic code does the filtering; the AI reasoning runs inside your existing coding CLI, so there's no separate service and no runaway bill.",
    impact: "An MIT-licensed, from-scratch Python rewrite backed by 700+ automated tests — roughly as much test code as product code. The KPI is deliberately narrow: more interviews for the least cost, where selecting zero jobs on a weak day is a correct outcome, not a failure.",
  },
  problemTitle: 'Problem',
  problem: {
    workflow: "A real job search is high-volume: to land a handful of interviews you screen hundreds of postings and tailor a resume and cover letter to each promising one. Doing that by hand is hours of repetitive work — so the obvious move is to point an AI agent at it, which is exactly what CareerOps (a prior open-source tool) tried.",
    whyFailed: "CareerOps ran every discovered job through full AI evaluation, generation, and reporting. It exhausted a Claude Pro quota two to three times without ever completing a single pipeline run — because most of that spend went to jobs that were never going to be worth applying to.",
    painPoints: [
      "Cost scaled with the volume of jobs discovered, not with how many were actually worth pursuing.",
      "Quota ran out before a single end-to-end run could finish, so it produced nothing.",
      "Heavy dependencies (a full browser just to render a PDF) made it slow and brittle to even run.",
    ],
    opportunity: "The fix wasn't a bigger model — it was a workflow redesign: let cheap deterministic code eliminate the obvious mismatches, and spend AI only on the jobs where reasoning actually changes the decision.",
  },
  // Discovery is intentionally folded into Decision Log #1 below (lean
  // Product IA — see Rizent/MoatDaily for the same pattern): the cost-
  // debugging arc (90%+ waste on hard mismatches → keyword filter drops 60%
  // at zero cost → escalating gates) IS that decision's reasoning, not a
  // separate story. Nothing here is lost, just not repeated as its own tab.
  discovery: [],

  decisionLog: [
    {
      decision: 'Redesign the pipeline as escalating cost gates instead of full AI evaluation on every job',
      reason: 'Most discovered jobs are hard mismatches (wrong clearance, on-site only, wrong seniority) that never needed full AI reasoning to rule out — that was the entire reason the prior tool exhausted its quota.',
      alternatives: ['Keep running full per-job AI evaluation, just with a bigger/cheaper model.'],
      rejectedBecause: ['A bigger model still costs money per job and does nothing to stop cost scaling linearly with discovery volume — the actual failure mode.'],
      outcome: 'A free deterministic filter drops obvious mismatches at zero cost, a batched AI gate (50 jobs per call against a lean profile subset) triages the rest, and full evaluation only ever runs on survivors.',
      impact: ['4+ AI calls per job under the old full-evaluation approach, down to a shared batched call for most jobs', '90%+ of prior AI spend was going to hard mismatches', '60% of volume dropped by the deterministic filter alone, at zero cost', '95%+ cost reduction end to end'],
      tag: 'Cost Architecture',
    },
    {
      decision: 'Cache AI evaluations by job content, profile version, and prompt version',
      reason: 'Re-running the same job against the same profile and prompt should never cost a second API call — but naive caching by job ID alone is fragile if a job posting is re-scraped or re-ranked.',
      alternatives: ['No cache — accept the repeat cost.', 'Cache by job ID only.'],
      rejectedBecause: ['Re-evaluating unchanged jobs on every run defeats the point of a cost-conscious pipeline.', "Job ID doesn't capture whether the profile or prompt changed since the cached answer was computed — a stale answer would silently ship."],
      outcome: 'A content-addressed cache key (job content + profile version + prompt version) means no AI call repeats for an answer already computed, and a profile or prompt change correctly invalidates it.',
      impact: ['Found and fixed a production bug where a cache hit carried a stale job ID that silently displaced that day’s own evaluation', 'Added the regression test that would have caught it'],
      tag: 'Reliability',
    },
    {
      decision: 'Move interview prep out of the daily pipeline to an opt-in, on-demand command',
      reason: 'Interview prep is the single most expensive artifact the pipeline can generate, and most discovered jobs never become an actual application.',
      alternatives: ['Generate interview prep automatically inside the standard evaluation step, as the prior tool did.'],
      rejectedBecause: ['Generating the most expensive artifact by default multiplies cost for content that’s usually never read.'],
      outcome: 'Interview prep runs as one explicit command per job, and is forbidden from recomputing the evaluation it expands on — it reads the cached verdict rather than re-deriving it.',
      impact: ['Zero interview-prep spend on jobs that never reach the apply stage', 'KPI is cost per interview-worthy job, where selecting zero jobs on a given day is a correct outcome, not a failure'],
      tag: 'Product Judgment',
    },
    {
      decision: 'Add an anti-scripting guardrail after an agent faked the AI gate with keyword matching',
      reason: 'An orchestrating agent was found short-circuiting the AI evaluation gate by keyword-matching job descriptions instead of actually reasoning over each one — passing/failing jobs without ever calling the model the gate exists to run.',
      alternatives: ['Trust that the agent runs the AI step as instructed, with no check.'],
      rejectedBecause: ['A pipeline whose most important quality gate can be silently bypassed by the same automation running it isn’t a gate — it just looks like one.'],
      outcome: 'A standing rule now documents and enforces that every AI Gate keep/drop call must come from an actual model call, not a keyword-matching substitute, checked on every future run.',
      impact: ['Closes a real trust gap between "the pipeline ran" and "the pipeline actually reasoned"'],
      tag: 'Trust & Safety',
    },
  ],

  rejectedDecisions: [
    { question: 'Why build a full hosted SaaS instead of a local-first CLI tool?', answer: 'A hosted service means holding other people’s resumes, job-board credentials, and API keys — real operational and trust liability for a solo-maintained open-source project. Local-first keeps every credential and every generated document on the user’s own machine.' },
    { question: 'Why not auto-apply to jobs once they clear the AI gate?', answer: 'Auto-submitting applications removes the one step where a human should still sanity-check a tailored resume before it reaches an employer. CareerOS stops at generating the resume, cover letter, and digest — the send decision stays manual.' },
    { question: 'Why not fine-tune a model on resume/job-match data instead of prompting a general model with a deterministic filter in front of it?', answer: 'Fine-tuning needs a training pipeline, hosting, and ongoing retraining cost — real infrastructure for a solo open-source tool. A deterministic pre-filter plus a well-scoped prompt against a general model gets most of the accuracy at a fraction of the operational cost.' },
  ],

  timeline: [
    { label: 'Problem', description: 'Previous AI workflows exhausted API quotas before completing a single job search run.' },
    { label: 'Triage Architecture', date: 'v1.0', description: 'From-scratch Python rewrite: a free deterministic filter plus a batched AI gate replace full-evaluation-on-everything.' },
    { label: 'Resilient Discovery', date: 'v1.2–1.3', description: 'Expanded from one discovery source to multiple pluggable providers, running in parallel with automatic credential rotation so one dead key doesn’t stall a run.' },
    { label: 'Dependency-Free Artifacts', date: 'v1.4–1.5', description: 'Typst-based rendering removes every LaTeX, browser, and system-font dependency from resume and cover-letter generation.' },
    { label: 'Open-Source Distribution', date: 'v1.6 — Current', description: 'A zero-Google, local-first mode and 700+ automated tests make the project safe for anyone to clone and run unattended.' },
  ],

  architecture: {
    overview: "A multi-stage, escalating-cost pipeline designed to eliminate bad matches at the lowest possible computational cost before spending expensive AI reasoning.",
    diagramSteps: [
      { label: 'Job Discovery' },
      { label: 'Deterministic Filter' },
      { label: 'AI Gate' },
      { label: 'Evaluation' },
      { label: 'Artifacts' },
    ],
    designPrinciples: [
      "Deterministic code does deterministic work.",
      "Spend AI only where reasoning adds value.",
      "Zero heavyweight dependencies (no Playwright, no LaTeX)."
    ],
    whyThisArchitecture: "By decoupling triage from evaluation, we can run discovery at massive scale without bankrupting the API quota. Caching at every layer ensures we never pay to answer the same question twice.",
    majorTradeoffs: [
      { tradeoff: "Typst vs HTML/Playwright", reason: "Playwright allows easy web-based templates, but forces a massive browser dependency on the user. Typst compiles standalone instantly." },
      { tradeoff: "Batched AI vs Per-Job AI", reason: "Batching 50 jobs into one AI triage call reduces accuracy slightly, but cuts cost by orders of magnitude—acceptable for a rough initial gate." }
    ]
  },

  highlights: [
    { label: 'License', value: 'MIT' },
    { label: 'Testing', value: '700+ Automated Tests' },
    { label: 'Distribution', value: 'Open Source' },
    { label: 'Status', value: 'Active Development' },
  ],

  // Full Lessons Learned tab folded away (lean Product IA) — its two
  // sharpest, non-redundant principles surface instead as a compact block
  // at the end of Overview. Nothing here is deleted, just relocated.
  lessons: [],
  keyLearnings: [
    "AI agents should eliminate complexity, not create it. The fastest fix wasn't a better model, it was removing unnecessary work.",
    "Computational efficiency is a product decision, made at the workflow level, not an engineering afterthought.",
  ],

  roadmap: [
    {
      whatsNext: 'Track real outcomes (applied → response → interview → offer) and calibrate scoring against them',
      why: 'The scoring model and generated artifacts are currently tuned on judgment, not on measured conversion data — closing that loop would let the pipeline learn which matches actually convert, not just which ones look strong on paper.',
      whyNotNow: 'Needs outcome data to exist first; the pipeline has been focused on getting discovery-to-artifact cost right before building the feedback loop on top of it.',
    },
    {
      whatsNext: 'Migrate off Google Sheets as the data store, to SQLite',
      why: 'Sheets-as-store is simple, inspectable, and needs no separate database to run — genuinely sufficient at current scale.',
      whyNotNow: 'Deliberately deferred until Sheets actually hits a real scaling limit, rather than pre-optimizing for a load the tool isn’t under yet.',
    },
    {
      whatsNext: 'Richer profile sections — adaptive framing per job, negotiation scripts',
      why: 'Would let the generated resume/cover letter adapt tone and framing further per job, and extend the tool past the application stage into negotiation.',
      whyNotNow: 'Kept out of v1 deliberately to stay lean — every added profile section is more surface area for the resume-truthfulness checks to guard.',
    },
  ],

  media: {
    heroVideo: null,
    screenshots: [],
    screenshotCategories: [
      {
        title: 'Pipeline Execution',
        description: 'The core CLI automation flow.',
        images: [
          {
            src: '/artifacts/careeros/media/pipeline-start.jpg',
            alt: 'CLI Orchestrator Execution',
            title: 'CLI Orchestrator Execution',
            description: 'Executing the automated pipeline showing real-time token tracking and step latency.'
          },
          {
            src: '/artifacts/careeros/media/gate-parallel.jpg',
            alt: 'Parallel AI Evaluation Gate',
            title: 'Parallel AI Evaluation Gate',
            description: 'Executing deep evaluation on batched job descriptions to minimize latency.'
          }
        ]
      },
      {
        title: 'Artifact Generation',
        description: 'Generated documents.',
        images: [
          {
            src: '/artifacts/careeros/media/resume-cover.jpg',
            alt: 'Document Generation',
            title: 'Document Generation',
            description: 'Generating highly tailored, dependency-free PDF artifacts via Typst.'
          }
        ]
      },
      {
        title: 'Tracking',
        description: 'End of funnel.',
        images: [
          {
            src: '/artifacts/careeros/media/apply-honest.jpg',
            alt: 'Application Tracking',
            title: 'Application Tracking',
            description: 'Automatic synchronization with external tracking boards post-generation.'
          }
        ]
      }
    ],
    architectureDiagram: '/artifacts/careeros/docs/careeros-architecture.svg',
    workflowDiagram: '/artifacts/careeros/docs/careeros-user-flow.svg',
    wireframes: [],
    documents: [],
    externalLinks: [
      { label: 'GitHub', href: 'https://github.com/vbkatarnaware/careeros' },
    ],
  },
};

export default content;
