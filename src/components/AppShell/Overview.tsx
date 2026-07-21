import React from 'react';
import type { AppContent } from '../../types/app';
import Highlights from './Highlights';
import ProseSection from './ProseSection';

interface OverviewProps {
  content: AppContent;
}

export default function Overview({ content }: OverviewProps) {
  return (
    <div className="space-y-12">
      {/* 1. KPIs at the very top for recruiter scannability */}
      {((content.highlights?.length ?? 0) > 0 || (content.impact?.length ?? 0) > 0) && (
        <Highlights items={content.highlights} impact={content.impact} />
      )}

      {/* Executive Summary — real video walkthroughs live in the dedicated
          Demo section (content.media.heroVideo), not a hardcoded placeholder. */}
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

      {/* Key Learnings — a compact affordance for lean-IA Product apps whose
          full Lessons Learned tab was folded away; Experience apps keep the
          full tab instead and never set this field. */}
      {content.keyLearnings && content.keyLearnings.length > 0 && (
        <div className="max-w-3xl">
          <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Key Learnings</h2>
          <ul className="space-y-3">
            {content.keyLearnings.map((learning, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-[14.5px] text-white/80 max-w-[65ch]">
                <span className="text-white/20 mt-[2px]">•</span>
                <span className="leading-relaxed">{learning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
