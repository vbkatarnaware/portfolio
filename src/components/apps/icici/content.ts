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
  overviewSummary: {
    problem: 'Retail lending decisions run through a business rules engine evaluating hundreds of parameters. A single weak input (location scoring) was negatively impacting campaign approval quality.',
    solution: 'Evaluated, integrated, and rolled out an external geospatial intelligence vendor (GeoIQ) as a richer address-level signal across all retail-asset products.',
    impact: 'Improved campaign approval quality by an estimated 15% with no increase in default rate, lifting eligibility 10-15% for qualified applicants whose addresses had been scored too coarsely.',
  },
  problemTitle: 'Role',
  problem: [
    "Retail lending decisions run through a business rules engine evaluating hundreds of parameters per application. My role was enterprise product execution inside that engine: requirements, rule design, cross-functional alignment, and production releases — at a scale where every change touches millions of applications.",
  ],
  roleCards: [
    'Enterprise Product Management',
    'Business Rules Engine (BRE)',
    'Cross-functional Alignment',
    'Risk & Compliance',
    'Analytics',
    'Vendor Integration'
  ],
  customerResearch: {
    hero: {
      title: 'Problem Discovery',
      description: 'One input stood out as under-performing: an internal 5-point location rating used in pre-approval targeting. In Mumbai, high-rise housing and low-income settlements often sit within a few hundred meters of each other, so applicants with very different economic profiles were receiving the same location score.',
      metrics: [
        { label: 'Evaluation Scale', value: 'Millions/Year' },
        { label: 'Input Granularity', value: 'Address-Level' },
        { label: 'Vendor Evaluated', value: 'GeoIQ' },
        { label: 'Cross-functional Teams', value: '4' },
      ]
    },
    biggestDiscoveries: [
      {
        title: 'Algorithms can only be as good as their inputs.',
        description: 'The problem traced to input granularity, not decisioning logic. Internal ratings couldn’t distinguish adjacent high- and low-income areas.',
        influencedDecision: 'Decided to integrate an external vendor rather than refine the internal scoring model.'
      },
      {
        title: 'Vendor data must be verified against internal truth.',
        description: 'Enterprise integration requires proving external signals don’t break internal models.',
        influencedDecision: 'Used SQL heavily to verify engine outputs against expected decisions during UAT.'
      },
      {
        title: 'Cross-functional alignment is the product.',
        description: 'At enterprise scale, deploying a single new variable touches Risk, Engineering, Analytics, and Compliance.',
        influencedDecision: 'Structured releases to optimize for stability and consensus before speed.'
      }
    ],
    visualMapping: [
      {
        research: 'Coarse 5-point location rating',
        decision: 'Evaluate external vendor',
        feature: 'GeoIQ Integration',
        outcome: 'Address-level granularity'
      },
      {
        research: 'Need to verify decisions',
        decision: 'SQL output validation',
        feature: 'Data Verification',
        outcome: 'Zero production defects'
      },
      {
        research: 'High risk of policy impact',
        decision: 'Cross-functional UAT',
        feature: 'Staged Rollout',
        outcome: 'Compliance sign-off'
      }
    ],
    personas: [
      {
        role: 'Risk Officer',
        goals: ['Maintain low default rates', 'Ensure regulatory compliance', 'Validate underwriting logic'],
        painPoints: ['Unpredictable policy changes', 'Data anomalies in scoring', 'Lack of auditability'],
        decisionInfluence: 'Required extensive UAT and SQL-based output verification before production rollout.'
      },
      {
        role: 'Analytics Manager',
        goals: ['Improve campaign approval quality', 'Lift overall eligibility'],
        painPoints: ['Coarse targeting data', 'Missed qualified applicants'],
        decisionInfluence: 'Drove the need for address-level geospatial data integration.'
      }
    ],
    jtbd: [
      {
        when: 'When evaluating a personal loan application',
        iWant: 'I want precise geospatial data based on the applicant\'s address',
        soICan: 'So I can safely approve more candidates without increasing default rates.'
      },
      {
        when: 'When rolling out a new business rule',
        iWant: 'I want cross-functional consensus from Risk and Compliance',
        soICan: 'So I can deploy changes to millions of applications without introducing systemic defects.'
      }
    ],
    methods: [
      'Data Analysis (SQL)',
      'Vendor Evaluation',
      'Cross-functional UAT',
      'Business Requirements Document (BRD)',
      'Impact Sizing'
    ],
    quotes: [
      { text: 'A coarse input stays coarse no matter how it’s weighted in the algorithm.', attribution: 'Analytics Finding' },
      { text: 'Every release must clear requirement review, risk validation, and compliance sign-off.', attribution: 'Enterprise Process' }
    ],
    bottomSummary: [
      { label: 'Role', value: 'Policy Manager' },
      { label: 'System', value: 'BRE' },
      { label: 'Vendor', value: 'GeoIQ' },
      { label: 'Impact', value: '15% Lift' }
    ]
  },

  decisionLog: [
    {
      decision: 'Integrate an external geospatial data vendor (GeoIQ) rather than refine the internal scoring algorithm',
      summary: 'We chose to buy data granularity rather than attempt to model our way out of a bad input signal.',
      reason: [
        'The problem traced to input granularity, not decisioning logic.',
        'Internal ratings couldn’t distinguish adjacent high- and low-income areas in dense cities like Mumbai.',
        'An external data vendor already had address-level granularity.'
      ],
      alternatives: ['Build a proprietary geospatial scoring model in-house', 'Adjust weighting on the existing 5-point rating'],
      rejectedBecause: [
        'Building a proprietary model from scratch would be too slow and resource-intensive.',
        'A coarse input stays coarse no matter how heavily it’s weighted; math cannot invent granularity.'
      ],
      outcome: 'Campaign approval quality improved by an estimated 15% with no increase in default rate, and eligibility lifted 10-15% for qualified applicants whose addresses had been scored too coarsely (self-reported, not independently audited).',
      impact: [
        '15% lift in campaign approval quality',
        '10-15% lift in eligibility for specific segments',
        'Maintained baseline default rates'
      ],
      date: 'Aug 2023',
      stage: 'Discovery & Evaluation',
      tag: 'Vendor Integration',
      confidence: 'High Confidence'
    },
    {
      decision: 'Rely heavily on manual SQL validation during UAT',
      summary: 'We used direct SQL querying to verify engine outputs rather than relying entirely on automated testing environments.',
      reason: 'At enterprise scale, changing business rules can have unforeseen cascading effects on underwriting. Sizing rule impact before writing a BRD and verifying engine outputs against expected decisions during UAT required hands-on data validation.',
      alternatives: ['Rely solely on QA team automation', 'Deploy to a small percentage of live traffic (Canary)'],
      rejectedBecause: [
        'QA automation might miss nuanced underwriting policy violations.',
        'Financial regulations and risk policies make live canary testing of underwriting logic extremely dangerous.'
      ],
      outcome: 'Zero critical defects introduced to production underwriting logic during the rollout.',
      impact: [
        'Ensured compliance sign-off',
        'Protected asset quality',
        'Built trust with Risk stakeholders'
      ],
      date: 'Dec 2023',
      stage: 'Testing & Rollout',
      tag: 'Quality Assurance',
      confidence: 'Medium Confidence'
    }
  ],

  rejectedDecisions: [
    { 
      question: 'Why not build a proprietary geospatial model instead of integrating a vendor?', 
      answer: 'The gap was data granularity, not modeling sophistication — an external vendor with existing address-level data solved it faster and more reliably than building one from scratch.' 
    },
    {
      question: 'Why not iterate quickly on production rules?',
      answer: 'Enterprise product development optimizes for stability before speed. At a scale where one rule change touches millions of applications, every release must clear requirement review, risk validation, engineering alignment, UAT, and compliance sign-off.'
    }
  ],

  timeline: [
    { label: 'Join', date: 'Jul 2023', description: 'Policy Manager, Retail Assets and Lending Systems — BRE ownership for credit card and personal loan decisioning.' },
    { label: 'Diagnose', date: 'Aug 2023', description: 'Trace weak pre-approval targeting to the coarse internal location rating.' },
    { label: 'Evaluation', date: 'Oct 2023', description: 'Evaluate GeoIQ as a richer address-level signal.' },
    { label: 'Alignment', date: 'Nov 2023', description: 'Write BRD, cross-functional alignment across Risk, Engineering, Analytics, Compliance, and the vendor.' },
    { label: 'UAT & Rollout', date: 'Jan 2024', description: 'Production release after SQL validation and sign-off across all retail-asset products.' },
    { label: 'Outcome', date: 'Aug 2024', description: '~15% campaign approval quality lift; role concludes.' },
  ],

  decisionSystems: [
    { label: 'Application Data Ingestion' },
    { label: 'Geospatial Resolution (GeoIQ)' },
    { label: 'BRE Rule Evaluation' },
    { label: 'Eligibility & Underwriting Policy' },
    { label: 'Risk & Pricing Calculation' },
    { label: 'Final Decision & Ledger Workflow' },
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

  lessonsLearned: {
    biggestLesson: "Better decisions don't always require building new algorithms — sometimes they require improving the quality of an input.",
    mistake: 'Assuming that "innovation" meant building complex proprietary models in-house.',
    differently: 'I would identify external data vendors even earlier in the discovery process before spending time analyzing internal data gaps.',
    principle: 'Enterprise product development optimizes for stability and correctness over speed. Scale dictates that even minor changes require robust alignment.',
    advice: "Documentation and structured release process are themselves a product skill at enterprise scale, not overhead around the real work."
  }

  // No media object: enterprise-confidential work has no screenshots, demo,
  // or public repo, and never will — Demo/Evidence are omitted entirely
  // rather than showing empty placeholders (see AppShell.tsx). No externalUrl
  // or githubUrl either, for the same reason — the header collapses cleanly.
};

export default content;
