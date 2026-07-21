import type { AppContent } from '../../../types/app';
import customIconImg from '../../../assets/images/custom-icon.png';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8), experience[QRapid].
// Every number here must trace to a canonical bullet. Do not edit a fact here
// without updating the knowledge base first.
const content: AppContent = {
  id: 'qrapid',
  mode: 'experience',
  name: 'QRapid',
  tagline: 'Restaurant Operating System (Ordering • POS • Billing)',
  accent: '#27c93f',
  iconSrc: customIconImg.src,
  role: 'Product Lead & Founder, VJTI TBI Incubated',
  dates: 'Sep 2024 – Present',
  location: 'Mumbai, India',

  overview: [
    "QRapid is a full-stack Restaurant Operating System purpose-built for independent restaurants, unifying table-side ordering, point-of-sale, and billing. As Founder and Product Lead, I own the product end-to-end and lead a team of 10 across engineering, operations, and go-to-market.",
    "The platform has grown to 26 paying restaurant partners, 10,000+ registered diners, and $1.45M+ (₹12.05 Cr+) in processed transactions across 1,99,640 paid bills, with churn held under 5% on annual subscriptions and partners renewing after year one.",
  ],
  overviewSummary: {
    problem: 'Restaurants running rush hours on paper menus and verbal orders face constant order mismatches, slow table turnaround, and heavy waiter dependency.',
    solution: 'A full-stack Restaurant Operating System purpose-built for independent restaurants, unifying table-side ordering, point-of-sale, and billing into a single low-learning-curve platform.',
    impact: 'Grown to 26 paying partners and 10,000+ registered diners, processing $1.45M+ (₹12.05 Cr+) across 1,99,640 paid bills with <5% annual churn.',
  },
  problemTitle: 'Role',
  problem: [
    "**Founder & Product Manager**\n\nOwned:\n• Product strategy\n• Customer discovery\n• Roadmap\n• GTM\n• Cross-functional execution\n• Product operations",
    "Restaurants running rush hours on paper menus and verbal orders see order mismatches, slow table turnaround, and heavy waiter dependency. QRapid started as a bet that a QR menu alone would fix that.",
  ],
  roleCards: [
    'Founder',
    'Product Management',
    'Product Strategy',
    'Customer Discovery',
    'Roadmap',
    'GTM',
    'Product Operations',
    'Cross-functional Leadership'
  ],
  
  discovery: [
    "It didn't. Scans ran well below forecast after launch. Instead of treating it as a marketing problem, I interviewed diners and restaurant owners directly — the barrier wasn't scanning, it was perceived value: a diner already holding a physical menu had no reason to pull out a phone for the same information.",
    "That reframed the product. Adding table-side ordering meant controlling restaurant operations end to end, so I chose to build a lightweight POS rather than integrate incumbent vendors — a larger build, in exchange for owning both the diner and the operator experience.",
    "On-site observation of cashiers, waiters, and managers showed incumbent POS products competing on feature count and losing on trainability — restaurant staff turn over often and are frequently first-time software users. I shipped a deliberately narrow feature set tuned for a low learning curve instead.",
  ],
  customerResearch: {
    hero: {
      title: 'Customer Research',
      description: 'Over 18 months, I interviewed restaurant owners, shadowed daily operations, tested prototypes, and repeatedly pivoted the product based on real-world feedback.',
      metrics: [
        { label: 'Customer Interviews', value: '100+' },
        { label: 'Restaurant Visits', value: '500+' },
        { label: 'Live Restaurant Partners', value: '26' },
        { label: 'Major Competitor Platforms', value: '6' },
        { label: 'Research', value: '18 Months' }
      ]
    },
    biggestDiscoveries: [
      {
        title: 'Restaurants don\'t switch software because of features.',
        description: 'Migration risk mattered far more than pricing or feature count.',
        influencedDecision: 'Target restaurant onboarding around subscription renewal.'
      },
      {
        title: 'Staff training mattered more than software price.',
        description: 'High turnover staff needed systems they could learn in 10 minutes without enterprise-grade manuals.',
        influencedDecision: 'Built an extremely lightweight POS instead of feature-heavy workflows.'
      },
      {
        title: 'QR menus alone weren\'t valuable.',
        description: 'Diners already had physical menus. Scanning only felt valuable to restaurants if it captured data.',
        influencedDecision: 'Expanded into Billing, CRM and Loyalty to own the first-party diner data.'
      }
    ],
    visualMapping: [
      {
        research: 'Owners refuse to migrate mid-subscription',
        decision: 'Target renewal periods',
        feature: 'Renewal CRM',
        outcome: 'Higher demo conversion'
      },
      {
        research: 'Staff overwhelmed by enterprise features',
        decision: 'Build lightweight POS',
        feature: 'Task-focused POS interface',
        outcome: 'Near-zero training time required'
      },
      {
        research: 'QR menus provide no retention value',
        decision: 'Shift focus to first-party data',
        feature: 'Integrated Loyalty & QCash',
        outcome: '10,000+ registered diners'
      }
    ],
    personas: [
      {
        role: 'Restaurant Owner',
        goals: ['Increase profitability', 'Retain repeat customers', 'Reduce dependency on food aggregators'],
        painPoints: ['High aggregator commissions', 'Lack of operational visibility', 'Mid-contract switching costs'],
        decisionInfluence: 'Shifted focus from digital menus to CRM and loyalty tools.'
      },
      {
        role: 'Restaurant Manager / Cashier',
        goals: ['Process orders fast', 'Manage staff operations smoothly', 'Minimize errors during peak hours'],
        painPoints: ['Complex software', 'High staff turnover', 'Fragmented tools across operations'],
        decisionInfluence: 'Forced the POS to be exceptionally simple with zero unnecessary features.'
      }
    ],
    jtbd: [
      {
        when: 'When I need to manage my entire restaurant operations',
        iWant: 'I want one unified operating system',
        soICan: 'So I can avoid managing multiple disconnected vendors for POS, CRM, and billing.'
      },
      {
        when: 'When dealing with third-party delivery apps',
        iWant: 'I want a way to build direct customer relationships',
        soICan: 'So I can increase repeat diners without relying entirely on Zomato or Swiggy.'
      }
    ],
    methods: [
      'Customer Interviews',
      'Restaurant Visits',
      'Shadowing',
      'Prototype Testing',
      'Competitive Analysis'
    ],
    quotes: [
      { text: 'We\'re interested, but changing our current system is difficult because our staff is already trained.', attribution: 'Restaurant Owner' },
      { text: 'If you can help us bring customers back without paying commission every time, we\'ll happily use it.', attribution: 'Restaurant Manager' }
    ],
    bottomSummary: [
      { label: 'Duration', value: '18 Months' },
      { label: 'Interviews', value: '100+' },
      { label: 'Visits', value: '500+' },
      { label: 'Competitors', value: '6' },
      { label: 'Pilots', value: 'Prototype Testing' }
    ]
  },

  decisionLog: [
    {
      decision: 'Build our own POS instead of integrating Petpooja',
      summary: 'We built our own POS because table-side ordering required complete control over the operational workflow.',
      reason: [
        'Existing POS systems were optimized for billing, not QR ordering.',
        'Integration limited product velocity.',
        'Staff found enterprise POS systems too complex.'
      ],
      alternatives: ['Petpooja', 'DotPe', 'Posist'],
      rejectedBecause: [
        'Feature-heavy',
        'Poor UX for first-time staff',
        'Vendor lock-in'
      ],
      outcome: 'Shipped a narrow, low-learning-curve POS.',
      impact: [
        'Foundation for Ordering',
        'Billing',
        'Kitchen Display',
        'Loyalty',
        'QCash'
      ],
      date: 'Sep 2024',
      stage: 'Product Strategy',
      tag: 'Architecture'
    },
    {
      decision: 'Retime partner outreach to subscription-expiry windows',
      summary: 'We shifted sales outreach to match POS renewal cycles because switching costs prevented mid-contract adoption.',
      reason: 'Partner activation had stalled at 20% despite real product interest. Restaurants operate on tight margins and annual software contracts. They rarely pay double to switch mid-year.',
      alternatives: [
        'Increase marketing spend',
        'Broaden the ICP beyond cafes',
        'Discount pricing to force switches'
      ],
      rejectedBecause: [
        'Doesn\'t solve the core timing constraint',
        'Discounts devalue the product',
        'High CAC with low activation probability'
      ],
      outcome: 'Lifted activation conversion from 20% to 80% and cut partner activation time by 30%.',
      impact: [
        '4x increase in activation conversion',
        '30% faster activation time',
        'Accelerated revenue realization',
        'Drastically reduced CAC'
      ],
      date: 'April 2025',
      stage: 'Strategic Decision',
      tag: 'Growth',
      confidence: 'High Confidence'
    },
    {
      decision: 'Defer QCash commercialization rather than run it alongside the RMS',
      summary: 'We paused our validated consumer loyalty app to maintain focus on stabilizing our core B2B revenue engine.',
      reason: 'QCash validated real demand, but the RMS was still short of full operational maturity. B2C loyalty requires a different scale of distribution spend. Running both would split our bootstrapped team\'s focus.',
      alternatives: [
        'Launch QCash immediately as a second product line',
        'Shut it down entirely'
      ],
      rejectedBecause: [
        'Splits engineering and operational focus',
        'Too early for massive B2C distribution spend',
        'Killing it outright wastes validated demand signal'
      ],
      outcome: 'QCash stays a validated, deferred bet — revisited once the RMS reaches full operational stability.',
      impact: [
        'Maintained core product focus',
        'Avoided early churn from lack of operational bandwidth',
        'Preserved B2C signal for future roadmap'
      ],
      date: 'Jan 2026',
      stage: 'Strategic Decision',
      tag: 'Prioritization',
      confidence: 'Data-Backed Decision'
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
    { label: 'QCash validated MVP', description: '55 restaurants interested, 40 organic users in month one, 12.5% repeat-visit rate, shipped as a native iOS and Android app — then deliberately deferred.' },
    { label: 'Current', description: '26 paying partners, 10,000+ registered diners, $1.45M+ (₹12.05 Cr+) processed across 1,99,640 bills, web app, churn under 5%.' },
  ],

  crossFunctional: [
    "As founder, I set direction and coordinated across all four functions running the platform: engineering (what got built and in what order), restaurant onboarding and operations, customer support (the channel behind the support-call metric below), and go-to-market and partnerships.",
    "Led a team of up to 10 across those functions — this was hands-on cross-functional leadership, not a title, spanning product, engineering, operations, and growth decisions simultaneously."
  ],

  // Product-identity KPIs: what this is, who uses it, what improved. Business
  // scale (GMV, bills, avg ticket) lives in `impact` below, kept separate —
  // Highlights answers "what is this product", Impact answers "how much
  // scale has it actually seen".
  highlights: [
    { label: 'Processed', value: '$1.45M' },
    { label: 'Paid Bills', value: '1,99,640' },
    { label: 'Registered Diners', value: '10,000+' },
    { label: 'Activation', value: '20% → 80%' },
  ],
  impact: [
    { label: 'Restaurant Partners', value: '26' },
    { label: 'Platform', value: 'Web App' },
    { label: 'Avg Bill', value: '$7.25' },
  ],

  lessons: [
    "Perceived value drives adoption, not the technology itself — the QR menu only started working once it did something a physical menu couldn't.",
    "Defined inbound support-call rate as the product-health metric for this domain: restaurant operators rarely file feature requests, they call the moment service stops. Weekly tracking drove it from all 10 of 10 partners calling twice a week at launch to 1-2 of 10 calling once a month.",
    "Validating a promising adjacent idea (QCash) doesn't by itself justify launching it — sequencing expansion behind the core product's stability is its own discipline.",
  ],
  lessonsLearned: {
    biggestLesson: 'Perceived value drives adoption, not the technology itself — the QR menu only started working once it did something a physical menu couldn\'t.',
    mistake: 'Focusing on Too Many Products Instead of One Clear Wedge\n\nOne of the biggest mistakes we made was trying to solve multiple restaurant problems at the same time. We kept expanding into new product ideas before proving a single core value proposition.\n\nAs we spent more time with restaurant owners, we realized they didn\'t need another platform with hundreds of features—they needed one problem solved exceptionally well.\n\nThis realization forced us to narrow our focus, simplify the product, and build depth instead of breadth. That shift improved customer conversations, product clarity, and our execution speed.',
    differently: 'Validate Faster, Build Faster, Standardize Earlier\n\nIf I started again, I would spend less time perfecting features and more time increasing the speed of learning.\n\nI would:\n• Build much smaller experiments and ship them faster.\n• Create SOPs for customer onboarding, feedback collection, and product testing from day one.\n• Focus heavily on inbound acquisition instead of relying primarily on outbound sales.\n• Create repeatable systems before scaling the team.\n• Shorten the feedback loop between customer conversations and product releases.\n\nThe biggest lesson wasn\'t about writing better code—it was about creating systems that allowed us to learn, iterate, and improve much faster.',
    principle: 'Technology is just a tool; distribution and adoption define the product. If users do not perceive the value immediately, the most elegant code in the world won\'t save you.',
    advice: 'Validating a promising adjacent idea (like QCash) doesn\'t by itself justify launching it — sequencing expansion behind the core product\'s stability is its own discipline.',
  },

  media: {
    heroVideo: null,
    screenshotCategories: [
      {
        title: 'Order Management',
        description: 'Real-time order queue for dine-in and parcel operations.',
        images: [
          { src: '/artifacts/qrapid/screenshots/03-order-management/order-main.png', alt: 'Order Management', title: 'Order Queue', description: 'Live order tracking and state management.' }
        ]
      },
      {
        title: 'Table Management',
        description: 'Restaurant floor plan and live table status.',
        images: [
          { src: '/artifacts/qrapid/screenshots/05-table-management/table-overview.png', alt: 'Table Management', title: 'Table Overview', description: 'Visual table map and status indicators.' }
        ]
      },
      {
        title: 'Authentication',
        description: 'Login and secure restaurant access.',
        images: [
          { src: '/artifacts/qrapid/screenshots/01-authentication/login-page.png', alt: 'Login Page', title: 'Login Page', description: 'Secure staff and owner login.' },
          { src: '/artifacts/qrapid/screenshots/01-authentication/post-login.png', alt: 'Post Login', title: 'Restaurant Selection', description: 'Select restaurant branch.' }
        ]
      },
      {
        title: 'Dashboard',
        description: 'Operational dashboard used by restaurant owners to monitor sales, revenue and business performance.',
        images: [
          { src: '/artifacts/qrapid/screenshots/02-dashboard/dashboard.png', alt: 'Dashboard', title: 'Dashboard', description: 'Real-time metrics and revenue tracking.' }
        ]
      },
      {
        title: 'Menu Management',
        description: 'Restaurant menu editor supporting categories, pricing, availability and inventory controls.',
        images: [
          { src: '/artifacts/qrapid/screenshots/04-menu-management/menu-management.png', alt: 'Menu Management', title: 'Menu Editor', description: 'Live menu editing with instant updates.' }
        ]
      },
      {
        title: 'Reports',
        description: 'Sales analytics and operational reporting dashboard.',
        images: [
          { src: '/artifacts/qrapid/screenshots/06-reports-analytics/reports.png', alt: 'Reports', title: 'Sales Analytics', description: 'Automated daily reports and export capabilities.' }
        ]
      },
      {
        title: 'Inventory',
        description: 'Inventory and stock tracking interface.',
        images: [
          { src: '/artifacts/qrapid/screenshots/07-inventory/inventory.png', alt: 'Inventory', title: 'Stock Tracking', description: 'Stock levels and low stock alerts.' }
        ]
      },
      {
        title: 'Expenses',
        description: 'Track daily restaurant expenses.',
        images: [
          { src: '/artifacts/qrapid/screenshots/08-expenses/expenses.png', alt: 'Expenses', title: 'Petty Cash', description: 'Expense logging and categorization.' }
        ]
      },
      {
        title: 'Settings',
        description: 'Restaurant configuration including GST, printers, staff and integrations.',
        images: [
          { src: '/artifacts/qrapid/screenshots/09-settings/settings.png', alt: 'Settings', title: 'Configuration', description: 'Centralized operational setup.' }
        ]
      }
    ],

    workflowDiagram: null,
    interactivePrototypes: [
      {
        title: 'QRapid Admin UI',
        description: 'Interactive prototype of the next-generation Super Admin Dashboard for restaurant onboarding, operations, billing, and subscription management.',
        href: 'https://rapid-oasis.lovable.app/dashboard',
        thumbnailSrc: '/artifacts/qrapid/screenshots/superadmin-preview.png'
      },
      {
        title: 'QCash Consumer App',
        description: 'Interactive prototype of the customer-facing loyalty and rewards experience, including onboarding, wallet, rewards, and restaurant interactions.',
        href: 'https://lovable.dev/projects/515b8993-f4e1-41aa-9c73-57aab2b6c4ab?magic_link=mc_377107ab-fcf6-4c2f-acef-584e09c79fe8',
        thumbnailSrc: '/artifacts/qrapid/screenshots/qcash-preview.png'
      }
    ],
    userFlows: [
      {
        title: 'User Flow',
        description: '',
        date: 'July 2026',
        verifiedStatus: 'Verified against production codebase',
        mediaUrl: '/artifacts/qrapid/docs/qrapid-user-flow.svg',
        svgUrl: '/artifacts/qrapid/docs/qrapid-user-flow.svg'
      }
    ],
    documents: [
      {
        title: 'Operations Hub PRD',
        category: 'Product Requirements Document',
        pages: 12,
        date: 'July 2026',
        status: 'Final',
        description: 'Defines the complete product vision, problem statement, goals, user stories, functional requirements, lifecycle logic, launch plan and product decisions for QRapid 2.0 Operations Hub.',
        thumbnailSrc: '/artifacts/qrapid/docs/QRapid_2.0_PRD_.pdf.png',
        pdfUrl: '/artifacts/qrapid/docs/QRapid_2.0_PRD_.pdf'
      },
      {
        title: 'System Architecture',
        category: 'Architecture Document',
        pages: 1,
        date: 'July 2026',
        status: 'Final',
        description: 'High-level system architecture and data flow for QRapid 2.0.',
        thumbnailSrc: '/artifacts/qrapid/docs/QRapid_2.0_Architecture_.pdf.png',
        pdfUrl: '/artifacts/qrapid/docs/QRapid_2.0_Architecture_.pdf'
      }
    ],
    externalLinks: [],
  },
  externalUrl: 'https://qrapid.io',
};

export default content;
