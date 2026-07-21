import React from 'react';
import type { AppContent } from '../../types/app';
import { Beaker, Search, Activity, CheckCircle2, Lightbulb } from 'lucide-react';

interface TechnicalDiscoveryProps {
  content: AppContent;
}

export default function TechnicalDiscovery({ content }: TechnicalDiscoveryProps) {
  const data = content.technicalDiscovery;
  if (!data) return null;

  return (
    <div className="space-y-12 max-w-4xl pb-12">
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Technical Discovery</h2>
      
      <div className="space-y-8">
        {/* Initial Observation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            <Search size={14} className="text-white/30" />
            Initial Observation
          </div>
          <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch] pl-5 border-l-2 border-white/10">
            {data.initialObservation}
          </p>
        </div>

        {/* Investigation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            <Activity size={14} className="text-white/30" />
            Investigation
          </div>
          <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch] pl-5 border-l-2 border-white/10">
            {data.investigation}
          </p>
        </div>

        {/* Root Cause Analysis */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            <Beaker size={14} className="text-white/30" />
            Root Cause Analysis
          </div>
          <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch] pl-5 border-l-2 border-white/10">
            {data.rootCauseAnalysis}
          </p>
        </div>

        {/* Validation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            <CheckCircle2 size={14} className="text-white/30" />
            Validation
          </div>
          <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch] pl-5 border-l-2 border-white/10">
            {data.validation}
          </p>
        </div>

        {/* Final Insight */}
        <div className="bg-[#1c1c1e] p-6 rounded-xl border border-white/5 shadow-sm mt-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">
            <Lightbulb size={14} className="text-white/50" />
            Final Insight
          </div>
          <p className="text-[15px] font-medium text-white/90 leading-relaxed">
            {data.finalInsight}
          </p>
        </div>
      </div>

      {/* Quantitative Evidence */}
      {data.evidence && data.evidence.length > 0 && (
        <div className="pt-8 border-t border-white/5">
          <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-6">Evidence</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.evidence.map((item, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-4">
                <div className="text-[18px] font-medium text-white/90 tabular-nums mb-1">{item.value}</div>
                <div className="text-[12px] text-white/40 leading-snug">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
