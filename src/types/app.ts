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

export interface DecisionLogEntry {
  decision: string;
  reason: string;
  alternatives: string;
  rejectedBecause: string;
  outcome: string;
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

export interface MediaLink {
  label: string;
  href: string;
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface AppMedia {
  heroVideo?: string | null;
  screenshots?: ImageItem[];
  architectureDiagram?: string | null;
  workflowDiagram?: string | null;
  wireframes?: ImageItem[];
  documents?: MediaLink[];
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
  /** 'Problem' for Product mode, 'Role' for Experience mode. */
  problemTitle: string;
  problem: string[];
  discovery: string[];

  decisionLog: DecisionLogEntry[];
  rejectedDecisions: RejectedDecisionEntry[];
  timeline: TimelineNode[];

  /** Product mode only. */
  architecture?: DiagramStep[];
  /** Experience mode only. */
  crossFunctional?: string[];
  /** Experience mode only (e.g. ICICI's BRE decision flow). */
  decisionSystems?: DiagramStep[];

  /** Exactly 4 cards — product-identity KPIs (who uses it, what improved). */
  highlights: HighlightItem[];
  /** Optional compact strip below Highlights — business-scale proof (GMV, volume). */
  impact?: HighlightItem[];
  lessons: string[];
  /** Product mode only; must be labeled as planned, never shipped, when unbuilt. */
  roadmap?: RoadmapItem[];

  /** Omit entirely (e.g. ICICI) when no demo/evidence assets exist or ever will —
   *  Demo/Evidence sections are hidden rather than showing empty placeholders. */
  media?: AppMedia;
  externalUrl?: string;
  githubUrl?: string;
}
