// Canonical content shape for every macOS "case study" application window.
// One AppContent object is the single source of truth, consumed by BOTH the
// interactive React shell and the server-rendered Astro SEO block. A section
// renders only when its field has data (truthfulness rule) — Artifacts is the
// one exception, where empty slots render a placeholder instead of hiding.

export type AppMode = 'experience' | 'product';

export interface HighlightItem {
  label: string;
  value: string;
}

export interface OverviewSummary {
  problem: string;
  solution: string;
  impact: string;
}

export interface CustomerResearch {
  hero: {
    title: string;
    description: string;
    metrics: { label: string; value: string }[];
  };
  biggestDiscoveries: {
    title: string;
    description: string;
    influencedDecision: string;
  }[];
  visualMapping: {
    research: string;
    decision: string;
    feature: string;
    outcome: string;
  }[];
  personas: {
    role: string;
    goals: string[];
    painPoints: string[];
    decisionInfluence: string;
  }[];
  jtbd: {
    when: string;
    iWant: string;
    soICan: string;
  }[];
  methods: string[];
  quotes: { text: string; attribution: string }[];
  bottomSummary: { label: string; value: string }[];
}

export interface ProblemDefinition {
  workflow: string;
  whyFailed: string;
  painPoints: string[];
  opportunity: string;
}

export interface TechnicalDiscovery {
  initialObservation: string;
  investigation: string;
  rootCauseAnalysis: string;
  validation: string;
  finalInsight: string;
  evidence: { label: string; value: string }[];
}

export interface LessonsLearned {
  biggestLesson: string;
  mistake: string;
  differently: string;
  principle: string;
  advice: string;
}

export interface DecisionLogEntry {
  decision: string;
  summary?: string;
  reason: string | string[];
  alternatives: string[];
  rejectedBecause: string[];
  outcome: string;
  impact: string[];
  date?: string;
  stage?: string;
  tag?: string;
  confidence?: string;
}

export interface RejectedDecisionEntry {
  question: string;
  answer: string;
}

export interface TimelineNode {
  label: string;
  date?: string;
  description?: string;
}

export interface RoadmapItem {
  whatsNext: string;
  why: string;
  whyNotNow: string;
}

export interface DiagramStep {
  label: string;
}

export interface ArchitectureDetails {
  overview: string;
  diagramSteps: DiagramStep[];
  designPrinciples: string[];
  whyThisArchitecture: string;
  majorTradeoffs: { tradeoff: string; reason: string }[];
  pdfUrl?: string;
}

export interface MediaLink {
  label: string;
  href: string;
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface ScreenshotCategory {
  title: string;
  description: string;
  images: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
}

export interface DocumentItem {
  title: string;
  category: string;
  pages: number;
  date: string;
  status: string;
  description: string;
  thumbnailSrc: string;
  pdfUrl?: string;
  embedUrl?: string;
}


export interface UserFlowItem {
  title: string;
  description: string;
  date: string;
  verifiedStatus?: string;
  mediaUrl: string;
  pngUrl?: string;
  svgUrl?: string;
}

export interface PrototypeItem {
  title: string;
  description: string;
  href: string;
  thumbnailSrc?: string;
}

export interface AppMedia {
  heroVideo?: string | null;
  screenshots?: ImageItem[];
  screenshotCategories?: ScreenshotCategory[];
  interactivePrototypes?: PrototypeItem[];
  architectureDiagram?: string | null;
  workflowDiagram?: string | null; // @deprecated use userFlows
  userFlows?: UserFlowItem[];
  wireframes?: ImageItem[];
  documents?: DocumentItem[];
  externalLinks?: MediaLink[];
  /** Metabase/Looker-style dashboard screenshots or embeds. */
  dashboards?: ImageItem[];
  /** A/B test or experiment write-ups. */
  experiments?: MediaLink[];
  /** Standalone decision memos not already covered by the Decision Log. */
  decisionDocs?: MediaLink[];
  /** Catch-all for anything that doesn't fit the named slots above. */
  otherAssets?: MediaLink[];
}

export interface AppContent {
  id: string;
  mode: AppMode;
  name: string;
  tagline: string;
  accent: string;
  iconSrc: string;
  role?: string;
  dates?: string;
  location?: string;

  overview: string[];
  overviewSummary?: OverviewSummary;
  /** 'Problem' for Product mode, 'Role' for Experience mode. */
  problemTitle: string;
  problem: string[] | ProblemDefinition;
  roleCards?: string[];
  discovery: string[];
  customerResearch?: CustomerResearch;
  technicalDiscovery?: TechnicalDiscovery;

  decisionLog: DecisionLogEntry[];
  rejectedDecisions: RejectedDecisionEntry[];
  timeline: TimelineNode[];

  /** Product mode only. */
  architecture?: DiagramStep[] | ArchitectureDetails;
  /** Experience mode only. */
  crossFunctional?: string[];
  /** Experience mode only (e.g. ICICI's BRE decision flow). */
  decisionSystems?: DiagramStep[];

  /** Exactly 4 cards — product-identity KPIs (who uses it, what improved). */
  highlights: HighlightItem[];
  /** Optional compact strip below Highlights — business-scale proof (GMV, volume). */
  impact?: HighlightItem[];
  lessons: string[];
  lessonsLearned?: LessonsLearned;
  /** Product mode only — 1-2 sharpest principles, shown as a compact block at
   *  the end of Overview when a Product's full Lessons Learned tab has been
   *  folded away (lean Product IA). Experience apps keep the full tab instead. */
  keyLearnings?: string[];
  metadataChips?: string[];
  /** Product mode only; must be labeled as planned, never shipped, when unbuilt. */
  roadmap?: RoadmapItem[];

  /** Omit entirely (e.g. ICICI) when no demo/evidence assets exist or ever will —
   *  Demo/Evidence sections are hidden rather than showing empty placeholders. */
  media?: AppMedia;
  externalUrl?: string;
  githubUrl?: string;
}
