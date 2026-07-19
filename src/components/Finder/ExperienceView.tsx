import React from 'react';

// Canonical source: ../../careeros/.careeros/profile.yaml (v8). Every number
// and status word here must trace to a canonical experience bullet — this
// file previously conflicted with the canonical resume (wrong GMV, wrong
// timeline, GeoIQ misattributed as built rather than integrated).
export default function ExperienceView() {
  return (
    <div className="max-w-2xl text-[14px] pb-12 font-sans">
      <h1 className="text-[28px] font-semibold tracking-tight mb-8 text-white">Experience</h1>

      <div className="space-y-10">
        <div className="relative pl-6 border-l border-white/15">
          <div className="absolute w-2.5 h-2.5 bg-white rounded-full -left-[5.5px] top-1.5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <h3 className="text-[16px] font-semibold text-white tracking-tight">QRapid</h3>
          <p className="text-white/50 text-[13px] mb-3 font-medium">Product Lead · Founder <span className="opacity-50 mx-1">|</span> Sep 2024 – Present</p>
          <ul className="text-white/70 leading-[1.6] space-y-2 list-none">
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Owned QRapid's restaurant management system end to end — QR menu, ordering, POS, and billing, shipped as a web application — leading a team of up to 10 across engineering, onboarding, support, and go-to-market.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Grew the platform to 26 paying restaurant partners, 10,000+ registered diners, and $1.45M+ (₹12.05 Cr+) in processed transactions across 1,99,640 paid bills, with churn under 5%.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Defined inbound support-call rate as the product-health metric and drove it from 10 of 10 partners calling twice a week at launch to 1-2 of 10 calling once a month.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Built an AI-agent automation layer using n8n, Zapier, and LLM APIs to drive lead qualification and partner onboarding end to end.
            </li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-white/15">
          <div className="absolute w-2 h-2 bg-white/40 rounded-full -left-[4px] top-1.5" />
          <h3 className="text-[16px] font-semibold text-white tracking-tight">ICICI Bank</h3>
          <p className="text-white/50 text-[13px] mb-3 font-medium">Product Manager (Policy) <span className="opacity-50 mx-1">|</span> Jul 2023 – Aug 2024</p>
          <ul className="text-white/70 leading-[1.6] space-y-2 list-none">
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Owned the Business Rules Engine governing credit eligibility, underwriting, and ledger flows for millions of applications annually, shipping cross-functional policy changes with Risk, Engineering, and Analytics.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Traced weak pre-approval targeting to a coarse internal location rating, then evaluated GeoIQ — an external geospatial intelligence vendor — as a richer address-level input, raising campaign approval quality by an estimated 15% with no increase in default rate.
            </li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-white/15">
          <div className="absolute w-2 h-2 bg-white/40 rounded-full -left-[4px] top-1.5" />
          <h3 className="text-[16px] font-semibold text-white tracking-tight">Kaagjaat</h3>
          <p className="text-white/50 text-[13px] mb-3 font-medium">Product Lead · Founder <span className="opacity-50 mx-1">|</span> Jul 2022 – Jun 2023</p>
          <ul className="text-white/70 leading-[1.6] space-y-2 list-none">
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Bootstrapped a legal-documentation venture from zero to 50+ paying clients across Maharashtra as a solo operator, building intake, delivery, and support from scratch.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Sustained consistent monthly revenue with zero additional headcount.
            </li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-white/15">
          <div className="absolute w-2 h-2 bg-white/40 rounded-full -left-[4px] top-1.5" />
          <h3 className="text-[16px] font-semibold text-white tracking-tight">The Yarn Bazaar</h3>
          <p className="text-white/50 text-[13px] mb-3 font-medium">Market Research Intern <span className="opacity-50 mx-1">|</span> Jun 2022 – Aug 2022</p>
          <ul className="text-white/70 leading-[1.6] space-y-2 list-none">
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Designed and deployed automated data-collection pipelines, saving 2+ weeks of manual labor and increasing team throughput by an estimated 40%.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
