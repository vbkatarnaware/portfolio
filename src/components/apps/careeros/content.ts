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

  overview: [
    "CareerOS is an open-source, MIT-licensed job-search automation pipeline. I built it from scratch in Python after previous AI agents repeatedly exhausted API quotas without completing a single run.",
    "The solution wasn't a larger language model. It was a complete workflow redesign: using deterministic code for deterministic filtering, and spending AI compute only where reasoning actually adds value."
  ],
  problemTitle: 'Problem',
  problem: {
    workflow: "CareerOps (a prior open-source tool) tried to solve job search by running every discovered job through full AI evaluation, generation, and reporting.",
    whyFailed: "It was computationally expensive. Most of the cost was spent on jobs that were never going to be worth applying to, exhausting API quotas without yielding results.",
    painPoints: [
      "Cost scaled linearly with discovery volume, regardless of match quality.",
      "Quota exhaustion happened before a single pipeline run could complete.",
      "Heavy browser dependencies (Playwright) made it slow and brittle to run."
    ],
    opportunity: "Instead of throwing a bigger model at the problem, redesign the workflow. Use deterministic code for deterministic work, and spend AI only where reasoning actually adds value."
  },
  technicalDiscovery: {
    initialObservation: "API costs were entirely disproportionate to the number of viable applications being generated.",
    investigation: "Pipeline profiling revealed that 90%+ of AI spend was wasted evaluating 'hard mismatches'—jobs requiring clearances, on-site presence, or junior experience.",
    rootCauseAnalysis: "The architecture coupled discovery directly to deep evaluation. There was no triage layer. If a job was found, it was evaluated.",
    validation: "I implemented a basic keyword exclusion script. It immediately dropped 60% of the volume at zero cost.",
    finalInsight: "The pipeline needed an escalating series of gates: free deterministic filters first, cheap batched AI second, and expensive deep evaluation only for the survivors.",
    evidence: [
      { label: 'Initial AI Calls/Job', value: '4+' },
      { label: 'Cost/Run', value: 'Exhausted' },
      { label: 'Batched Triage', value: '50 jobs/call' },
      { label: 'Cost Reduction', value: '95%+' }
    ]
  },

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
    {
      decision: 'Build a custom orchestrator instead of using LangChain or LlamaIndex',
      reason: 'Cost optimization required absolute, granular control over every token and API call.',
      alternatives: 'LangChain, LlamaIndex, or AutoGen.',
      rejectedBecause: 'Heavy LLM frameworks abstract away the actual API calls, making it nearly impossible to aggressively optimize caching and token usage.',
      outcome: 'A lightweight, zero-framework orchestrator where every prompt, token, and cache hit is explicitly managed.',
    }
  ],

  rejectedDecisions: [
    { question: 'Why not use Playwright for PDF generation?', answer: 'It requires a full browser dependency for every render — Typst compiles standalone, with no LaTeX, browser, or system-font dependency to install.' },
    { question: 'Why not run one AI call per discovered job?', answer: 'That scales AI cost linearly with discovery volume; a free deterministic filter plus a batched gate removes most jobs before any AI spend.' },
    { question: 'Why not use LangChain for the agent orchestration?', answer: 'Frameworks like LangChain add heavy abstractions. Optimizing API costs requires granular control over exactly what gets sent to the model and when.' },
  ],

  timeline: [
    { label: 'Problem', description: 'Previous AI workflows exhausted API quotas before completing a single job search run.' },
    { label: 'v1.0', description: 'From-scratch Python rewrite: introduced deterministic filtering and batched AI gates.' },
    { label: 'v1.2–1.3', description: 'Multi-provider discovery, parallel execution, and resilient credential rotation.' },
    { label: 'v1.4–1.5', description: 'Typst-based PDF rendering engine; highly tailored resume generation.' },
    { label: 'v1.6 — Current', description: 'Local-first mode for open-source distribution; 700+ automated tests passing.' },
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

  lessons: [],
  lessonsLearned: {
    biggestLesson: "AI agents should eliminate complexity, not create it. The fastest fix wasn't a better model, it was removing unnecessary work.",
    mistake: "Assuming that because AI *can* evaluate every job, it *should*. I initially treated AI as a zero-cost commodity.",
    differently: "I would have built the content-addressed caching layer first, rather than bolting it on after burning through my first quota.",
    principle: "Computational efficiency is a product decision, made at the workflow level, not an engineering afterthought.",
    advice: "Don't let the magic of AI blind you to basic systems engineering. Escalate costs only when certainty increases."
  },

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
