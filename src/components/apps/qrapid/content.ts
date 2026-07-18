import type { AppContent } from '../../../types/app';
import customIconImg from '../../../assets/images/custom-icon.png';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8), experience[QRapid].
// Every number here must trace to a canonical bullet. Do not edit a fact here
// without updating the knowledge base first.
const content: AppContent = {
  id: 'qrapid',
  mode: 'experience',
  name: 'QRapid',
  tagline: 'Restaurant management system — QR menu, ordering, POS, billing',
  accent: '#0058d0',
  iconSrc: customIconImg.src,
  role: 'Product Lead & Founder, VJTI TBI Incubated',
  dates: 'Sep 2024 – Present',
  location: 'Mumbai, India',

  overview: [
    "QRapid is a restaurant management system covering QR menus, ordering, POS, and billing, shipped as native iOS and Android apps. I own it end to end and led a team of up to 10 across engineering, restaurant onboarding, customer support, and go-to-market.",
    "The platform has grown to 26 paying restaurant partners, 10,000+ registered diners, and $1.45M+ (₹12.05 Cr+) in processed transactions across 1,99,640 paid bills, with churn held under 5% on annual subscriptions and partners renewing after year one.",
  ],
  problemTitle: 'Role',
  problem: [
    "Restaurants running rush hours on paper menus and verbal orders see order mismatches, slow table turnaround, and heavy waiter dependency. QRapid started as a bet that a QR menu alone would fix that.",
  ],
  discovery: [
    "It didn't. Scans ran well below forecast after launch. Instead of treating it as a marketing problem, I interviewed diners and restaurant owners directly — the barrier wasn't scanning, it was perceived value: a diner already holding a physical menu had no reason to pull out a phone for the same information.",
    "That reframed the product. Adding table-side ordering meant controlling restaurant operations end to end, so I chose to build a lightweight POS rather than integrate incumbent vendors — a larger build, in exchange for owning both the diner and the operator experience.",
    "On-site observation of cashiers, waiters, and managers showed incumbent POS products competing on feature count and losing on trainability — restaurant staff turn over often and are frequently first-time software users. I shipped a deliberately narrow feature set tuned for a low learning curve instead.",
  ],

  decisionLog: [
    {
      decision: 'Build our own POS rather than integrate an existing one',
      reason: 'Table-side ordering required controlling restaurant operations end to end, not just the diner-facing menu.',
      alternatives: 'Integrate with incumbent restaurant POS vendors already used in Mumbai (e.g. Petpooja).',
      rejectedBecause: 'Incumbents were feature-bloated and hard for high-turnover, first-time-software-user staff to learn — integration would have inherited that complexity.',
      outcome: 'Shipped a narrow, low-learning-curve POS; became the foundation for ordering, billing, and QCash.',
    },
    {
      decision: 'Retime partner outreach to subscription-expiry windows',
      reason: 'Partner activation had stalled at 20% despite real product interest.',
      alternatives: 'Increase marketing spend; broaden the ICP beyond cafes; discount pricing to force switches.',
      rejectedBecause: 'Customer interviews showed restaurants only switch POS software when their current subscription nears expiry — spend or discounts don’t change that timing constraint.',
      outcome: 'Lifted activation conversion from 20% to 80% and cut partner activation time by 30%.',
    },
    {
      decision: 'Defer QCash commercialization rather than run it alongside the RMS',
      reason: 'QCash validated real demand, but the RMS was still short of full operational maturity, and B2C loyalty requires a different scale of distribution spend than the existing B2B motion.',
      alternatives: 'Launch QCash immediately as a second product line; shut it down entirely.',
      rejectedBecause: 'Running two products at once would split engineering, product, and operational focus as a bootstrapped team; but the validated demand meant killing it outright would waste real signal.',
      outcome: 'QCash stays a validated, deferred bet — revisited once the RMS reaches full operational stability.',
    },
  ],

  rejectedDecisions: [
    { question: 'Why not build loyalty (QCash) first, before the core POS?', answer: 'The RMS was the revenue-generating product and still needed operational maturity; running a second, unproven B2C product alongside it would have split focus a bootstrapped team couldn’t afford.' },
    { question: 'Why not keep QRapid as a plain QR menu?', answer: 'Customer interviews showed a QR menu alone added a scanning barrier without new value over a physical menu — it only started working once ordering was added.' },
    { question: 'Why not stay on incumbent POS software like Petpooja?', answer: 'Incumbents carried feature bloat that made them hard to train on for high-turnover restaurant staff; QRapid’s edge was a narrower, faster-to-learn product.' },
  ],

  timeline: [
    { label: 'Launch', date: 'Sep 2024', description: 'QR menu only — no ordering, no POS.' },
    { label: 'Discovery', description: 'Scans below forecast; diner and restaurant-owner interviews surface the perceived-value barrier.' },
    { label: 'Pivot to ordering + own POS', description: 'Table-side ordering added; lightweight POS built in-house rather than integrating incumbents.' },
    { label: 'QCash validated MVP', description: '55 restaurants interested, 40 organic users in month one, 12.5% repeat-visit rate — then deliberately deferred.' },
    { label: 'Current', description: '26 paying partners, 10,000+ registered diners, $1.45M+ (₹12.05 Cr+) processed across 1,99,640 bills, native iOS & Android, churn under 5%.' },
  ],

  crossFunctional: [
    "As founder, I set direction and coordinated across all four functions running the platform: engineering (what got built and in what order), restaurant onboarding and operations, customer support (the channel behind the support-call metric below), and go-to-market and partnerships.",
    "Led a team of up to 10 across those functions — this was hands-on cross-functional leadership, not a title, spanning product, engineering, operations, and growth decisions simultaneously.",
  ],

  // Product-identity KPIs: what this is, who uses it, what improved. Business
  // scale (GMV, bills, avg ticket) lives in `impact` below, kept separate —
  // Highlights answers "what is this product", Impact answers "how much
  // scale has it actually seen".
  highlights: [
    { label: 'Restaurant Partners', value: '26' },
    { label: 'Registered Diners', value: '10,000+' },
    { label: 'Platform', value: 'Native iOS & Android' },
    { label: 'Activation', value: '20% → 80%' },
  ],
  impact: [
    { label: 'Processed', value: '₹12.05 Cr' },
    { label: 'Paid Bills', value: '1,99,640' },
    { label: 'Avg Bill', value: '₹604' },
  ],

  lessons: [
    "Perceived value drives adoption, not the technology itself — the QR menu only started working once it did something a physical menu couldn't.",
    "Defined inbound support-call rate as the product-health metric for this domain: restaurant operators rarely file feature requests, they call the moment service stops. Weekly tracking drove it from all 10 of 10 partners calling twice a week at launch to 1-2 of 10 calling once a month.",
    "Validating a promising adjacent idea (QCash) doesn't by itself justify launching it — sequencing expansion behind the core product's stability is its own discipline.",
  ],

  media: {
    heroVideo: null,
    screenshots: [],
    architectureDiagram: null,
    workflowDiagram: null,
    wireframes: [],
    documents: [],
    externalLinks: [],
  },
  externalUrl: 'https://qrapid.io',
};

export default content;
