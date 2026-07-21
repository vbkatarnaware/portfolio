import React from 'react';
import type { AppContent } from '../../types/app';
import Highlights from './Highlights';
import ProseSection from './ProseSection';
import ProductWalkthrough from './ProductWalkthrough';

interface OverviewProps {
  content: AppContent;
}

export default function Overview({ content }: OverviewProps) {
  return (
    <div className="space-y-12">
      {/* 1. KPIs at the very top for recruiter scannability */}
      {(content.highlights?.length > 0 || content.impact?.length > 0) && (
        <Highlights items={content.highlights} impact={content.impact} />
      )}

      {/* Product Walkthrough */}
      <ProductWalkthrough />

      {/* 2. Executive Summary */}
      {content.overviewSummary ? (
        <div className="max-w-3xl">
          <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Overview</h2>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">The Problem</div>
              <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">
                {content.overviewSummary.problem}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">The Solution</div>
              <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">
                {content.overviewSummary.solution}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">The Impact</div>
              <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">
                {content.overviewSummary.impact}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback for apps still using paragraphs */
        <ProseSection title="Overview" paragraphs={content.overview} />
      )}
    </div>
  );
}
