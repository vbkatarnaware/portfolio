import React from 'react';
import vipulImg from '../../assets/images/vipul-picture.jpg';

// Aligned to the canonical resume summary (careeros/.careeros/profile.yaml v8,
// summary_variants.default): PM-first identity, AI as a working tool, not a
// label. Numbers must trace to canonical facts — see qrapid/content.ts and
// icici/content.ts for sourcing.
export default function AboutView() {
  return (
    <article className="max-w-[70ch] text-[15px] font-sans">
      <header className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full p-1 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] shrink-0 bg-black/20">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={vipulImg.src}
              alt="Vipul Katarnaware - Product Manager"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-white mb-1">
            Vipul Katarnaware
          </h1>
          <p className="text-white/90 font-semibold text-[15px]">
            Product Manager · B2B SaaS · FinTech · AI Products
          </p>
          <p className="text-white/60 font-medium text-[13px] mt-1 leading-relaxed max-w-[50ch]">
            I lead with customer discovery, then use AI to build and measure faster — never the other way around.
          </p>
        </div>
      </header>

      <div className="space-y-6 text-white/70 leading-relaxed text-[14px]">
        <p className="text-white/90 font-medium text-[15px]">
          Product Manager with hands-on founder and enterprise experience.
        </p>
        <p>
          I validate problems with users before building, ship end to end, and use AI as a working tool for product and GTM execution — not a substitute for customer-facing decision making.
        </p>
        <p>
          At <strong>QRapid</strong>, I interviewed diners and restaurant owners to find why the QR menu wasn't converting, then made the sequencing calls that grew it into a native iOS and Android restaurant platform: 26 paying partners, 10,000+ registered diners, and $1.45M+ (₹12.05 Cr+) in processed transactions. At <strong>ICICI Bank</strong>, I owned the Business Rules Engine deciding credit eligibility and underwriting for millions of loan and credit card applications a year, and evaluated an external geospatial data vendor that lifted campaign approval quality by an estimated 15%.
        </p>
        <p>
          I build AI-native tools of my own — CareerOS, Rizent, and MoatDaily — to prove the same product philosophy holds outside a single company: take a complex operational workflow, understand the people doing it, simplify it, and automate only the repetitive part.
        </p>
      </div>
    </article>
  );
}
