// Per-route SEO metadata — single source of truth for the six Finder routes
// (Home + the five Finder tabs). Splitting these out fixes the prior state
// where every tab shipped the homepage's identical <title>/description/
// canonical, which told search engines the five tabs were duplicates of Home.
//
// Copy rule: descriptions are drawn only from already-approved on-site content
// (About bio, Experience facts, the five product taglines) — no invented
// claims, metrics, or marketing language.

export type TabKey = 'home' | 'about' | 'resume' | 'experience' | 'contact' | 'products';

export interface TabMeta {
  title: string;
  description: string;
  path: string; // canonical path segment ('' = homepage)
}

const SITE = 'https://vipulkatarnaware.in';

export const TAB_META: Record<TabKey, TabMeta> = {
  home: {
    title: 'Vipul Katarnaware — Product Manager',
    description:
      'Vipul Katarnaware is a Product Manager with hands-on founder and enterprise experience, shipping 0-to-1 B2B SaaS, FinTech, and AI products and using AI as a working tool, not an identity.',
    path: '',
  },
  about: {
    title: 'About — Vipul Katarnaware, Product Manager',
    description:
      'Product Manager across B2B SaaS, FinTech, and AI products. Vipul Katarnaware leads with customer discovery, then uses AI to build and measure faster — founder of QRapid, ex-ICICI Bank.',
    path: 'about',
  },
  resume: {
    title: 'Resume — Vipul Katarnaware, Product Manager',
    description:
      'Resume of Vipul Katarnaware — Product Manager in B2B SaaS, FinTech, and AI products. Founder at QRapid, Product Manager at ICICI Bank, and builder of CareerOS, Rizent, and MoatDaily.',
    path: 'resume',
  },
  experience: {
    title: 'Experience — Vipul Katarnaware, Product Manager',
    description:
      'Product management experience across QRapid (founder), ICICI Bank (retail lending / Business Rules Engine), and earlier zero-to-one ventures — spanning discovery, roadmap, GTM, and cross-functional delivery.',
    path: 'experience',
  },
  contact: {
    title: 'Contact — Vipul Katarnaware, Product Manager',
    description:
      'Get in touch with Vipul Katarnaware — Product Manager based in Navi Mumbai, India. Email, LinkedIn, GitHub, resume download, and a link to book a call.',
    path: 'contact',
  },
  products: {
    title: 'Products — Vipul Katarnaware, Product Manager',
    description:
      'AI-native products built by Vipul Katarnaware: CareerOS (job-search workflow), Rizent (AI investor outreach for founders), and MoatDaily (autonomous AI newsroom).',
    path: 'products',
  },
};

/** Builds the Layout/AstroSeo props for a given tab, including openGraph. */
export function tabSeo(key: TabKey) {
  const meta = TAB_META[key];
  const canonical = meta.path ? `${SITE}/${meta.path}` : SITE;
  return {
    title: meta.title,
    description: meta.description,
    canonical,
    openGraph: {
      url: canonical,
      title: meta.title,
      description: meta.description,
      site_name: 'Vipul Katarnaware',
    },
  };
}
