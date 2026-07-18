import type { AppContent } from '../../../types/app';
import iciciIconImg from '../../../assets/images/icici.png';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8), experience[ICICI Bank].
// GeoIQ is a third-party vendor that was evaluated and integrated, never
// built — the approval-quality figures carry the profile's own hedge and
// must never be stated as independently audited.
const content: AppContent = {
  id: 'icici',
  mode: 'experience',
  name: 'ICICI Bank',
  tagline: 'Business Rules Engine — credit eligibility, underwriting, lending policy',
  accent: '#f5a623',
  iconSrc: iciciIconImg.src,
  role: 'Product Manager: Policy Manager, Retail Assets and Lending Systems',
  dates: 'Jul 2023 – Aug 2024',
  location: 'Mumbai, India',

  overview: [
    "At ICICI Bank I owned the Business Rules Engine (BRE) deciding credit eligibility, underwriting, ledger workflows, and financial transaction flows for millions of applications a year, shipping cross-functional policy changes with Risk, Engineering, and Analytics.",
    "I specified and shipped major new rule sets on the BRE for credit card and personal loan decisioning — eligibility, underwriting, and pricing logic evaluated at that same scale.",
  ],
  problemTitle: 'Role',
  problem: [
    "Retail lending decisions run through a business rules engine evaluating hundreds of parameters per application. My role was enterprise product execution inside that engine: requirements, rule design, cross-functional alignment, and production releases — at a scale where every change touches millions of applications.",
  ],
  discovery: [
    "One input stood out as under-performing: an internal 5-point location rating used in pre-approval targeting. In Mumbai, high-rise housing and low-income settlements often sit within a few hundred meters of each other, so applicants with very different economic profiles were receiving the same location score.",
    "The fix wasn't a smarter decisioning algorithm — it was a better input. I evaluated GeoIQ, an external geospatial intelligence vendor, as a richer address-level signal, then wrote the BRD, aligned Risk, Engineering, Analytics, Compliance, and the vendor team, and led UAT before production rollout.",
    "I used SQL throughout to size rule impact before writing a BRD, verify engine outputs against expected decisions during UAT, and check approval and rejection patterns after release.",
  ],

  decisionLog: [
    {
      decision: 'Integrate an external geospatial data vendor (GeoIQ) rather than refine the internal scoring algorithm',
      reason: 'The problem traced to input granularity, not decisioning logic — internal ratings couldn’t distinguish adjacent high- and low-income areas.',
      alternatives: 'Build a proprietary geospatial scoring model in-house; adjust weighting on the existing 5-point rating.',
      rejectedBecause: 'Better decisions don’t always require a new algorithm; a coarse input stays coarse no matter how it’s weighted. An external data vendor already had address-level granularity.',
      outcome: 'Campaign approval quality improved by an estimated 15% with no increase in default rate, and eligibility lifted 10-15% for qualified applicants whose addresses had been scored too coarsely (self-reported, not independently audited).',
    },
  ],
  rejectedDecisions: [
    { question: 'Why not build a proprietary geospatial model instead of integrating a vendor?', answer: 'The gap was data granularity, not modeling sophistication — an external vendor with existing address-level data solved it faster and more reliably than building one from scratch.' },
  ],

  timeline: [
    { label: 'Join', date: 'Jul 2023', description: 'Policy Manager, Retail Assets and Lending Systems — BRE ownership for credit card and personal loan decisioning.' },
    { label: 'Diagnose', description: 'Trace weak pre-approval targeting to the coarse internal location rating.' },
    { label: 'GeoIQ evaluation', description: 'BRD, cross-functional alignment across Risk, Engineering, Analytics, Compliance, and the vendor.' },
    { label: 'UAT & rollout', description: 'Production release after sign-off across all retail-asset products.' },
    { label: 'Outcome', date: 'Aug 2024', description: '~15% campaign approval quality lift; role concludes.' },
  ],

  decisionSystems: [
    { label: 'Application' },
    { label: 'BRE Rule Evaluation' },
    { label: 'Eligibility & Underwriting' },
    { label: 'Pricing' },
    { label: 'Decision' },
  ],
  crossFunctional: [
    "Every release cleared requirement review, risk validation, engineering alignment, UAT, and compliance sign-off — enterprise product development optimizes for stability before speed, at a scale where one rule change touches millions of applications.",
    "The GeoIQ initiative alone required sustained alignment across Risk, Engineering, Analytics, Compliance, and an external vendor team, from BRD through production UAT.",
  ],

  highlights: [
    { label: 'Scale', value: 'Enterprise' },
    { label: 'System', value: 'Business Rules Engine' },
    { label: 'Delivery', value: 'Cross-functional' },
    { label: 'Volume', value: 'Millions of Decisions/Year' },
  ],

  lessons: [
    "Better decisions don't always require building new algorithms — sometimes they require improving the quality of an input.",
    "Documentation and structured release process are themselves a product skill at enterprise scale, not overhead around the real work.",
  ],

  // No media object: enterprise-confidential work has no screenshots, demo,
  // or public repo, and never will — Demo/Evidence are omitted entirely
  // rather than showing empty placeholders (see AppShell.tsx). No externalUrl
  // or githubUrl either, for the same reason — the header collapses cleanly.
};

export default content;
