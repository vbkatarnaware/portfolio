import React from 'react';

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
              Conceived, built, and shipped an autonomous AI-agent layer using n8n, Zapier, and LLM APIs to drive lead qualification and partner onboarding end to end.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Owned the QRapid POS product from scratch—concept, data model, and shipped UI—scaling it to over $240,000 (INR 2 Cr+) in processed transaction volume.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Pivoted based on direct customer feedback: rebuilt an exported-to-Excel inventory feature into a native embedded-spreadsheet module, closing a gap competitors had ignored.
            </li>
          </ul>
        </div>

        <div className="relative pl-6 border-l border-white/15">
          <div className="absolute w-2 h-2 bg-white/40 rounded-full -left-[4px] top-1.5" />
          <h3 className="text-[16px] font-semibold text-white tracking-tight">ICICI Bank</h3>
          <p className="text-white/50 text-[13px] mb-3 font-medium">Product Manager (Policy) <span className="opacity-50 mx-1">|</span> Jul 2023 – Aug 2024</p>
          <ul className="text-white/70 leading-[1.6] space-y-2 list-none">
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Engineered GeoIQ, a geospatial scoring layer using SQL and address-level data to uncover geographic loan clustering, raising campaign approval quality by 15%.
            </li>
            <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-1 before:bg-white/30 before:rounded-full">
              Owned the Business Rules Engine governing credit eligibility, underwriting, and ledger flows for millions of applications annually.
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
              Sustained profitable monthly recurring revenue with zero additional headcount.
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
