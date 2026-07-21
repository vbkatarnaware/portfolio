import React from 'react';
import type { AppContent, ArchitectureDetails, DiagramStep } from '../../types/app';
import ArchDiagram from './ArchDiagram';

interface ArchitectureProps {
  content: AppContent;
}

export default function Architecture({ content }: ArchitectureProps) {
  const data = content.architecture;
  if (!data) return null;

  const isObject = typeof data === 'object' && !Array.isArray(data);

  if (!isObject) {
    return <ArchDiagram steps={data as DiagramStep[]} />;
  }

  const details = data as ArchitectureDetails;

  return (
    <div className="space-y-12 max-w-4xl pb-12">
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Architecture</h2>

      {/* Overview */}
      {details.overview && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Overview</div>
          <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{details.overview}</p>
        </div>
      )}

      {/* Arch Diagram */}
      {details.diagramSteps && details.diagramSteps.length > 0 && (
        <div className="pt-4 pb-4">
          <ArchDiagram steps={details.diagramSteps} title="Pipeline" />
        </div>
      )}

      {/* Design Principles */}
      {details.designPrinciples && details.designPrinciples.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Design Principles</div>
          <ul className="space-y-2 text-[14.5px] text-white/80 max-w-[65ch]">
            {details.designPrinciples.map((principle, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="text-white/20 mt-[2px]">•</span>
                <span className="leading-relaxed">{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tradeoffs */}
      {details.majorTradeoffs && details.majorTradeoffs.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">Major Tradeoffs</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.majorTradeoffs.map((tradeoff, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-xl flex flex-col gap-2">
                <div className="text-[14.5px] font-medium text-white/90">{tradeoff.tradeoff}</div>
                <div className="text-[13.5px] text-white/60 leading-relaxed">{tradeoff.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Why This Architecture */}
      {details.whyThisArchitecture && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Why This Approach</div>
          <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{details.whyThisArchitecture}</p>
        </div>
      )}

      {/* PDF Download */}
      {details.pdfUrl && (
        <div className="pt-6">
          <a href={details.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/15 text-white/90 rounded-lg text-[13px] font-medium transition-colors border border-white/5">
            Download Architecture PDF
          </a>
        </div>
      )}
    </div>
  );
}
