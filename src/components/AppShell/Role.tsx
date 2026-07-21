import React from 'react';
import type { AppContent, ProblemDefinition } from '../../types/app';
import ProseSection from './ProseSection';

interface RoleProps {
  content: AppContent;
}

export default function Role({ content }: RoleProps) {
  const isProblemObject = content.problem && typeof content.problem === 'object' && !Array.isArray(content.problem);
  
  if ((!content.roleCards || content.roleCards.length === 0) && (!content.problem || (Array.isArray(content.problem) && content.problem.length === 0))) {
    return null;
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">{content.problemTitle}</h2>
      
      {content.roleCards && content.roleCards.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {content.roleCards.map((role, idx) => (
            <span key={idx} className="px-2.5 py-1 text-[12.5px] font-medium text-white/70 bg-white/[0.03] border border-white/[0.05] rounded-md shadow-sm">
              {role}
            </span>
          ))}
        </div>
      ) : isProblemObject ? (
        <div className="space-y-8">
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Existing Workflow</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{(content.problem as ProblemDefinition).workflow}</p>
          </div>
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Why It Failed</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{(content.problem as ProblemDefinition).whyFailed}</p>
          </div>
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Key Pain Points</div>
            <ul className="space-y-2 text-[14.5px] text-white/80 max-w-[65ch]">
              {(content.problem as ProblemDefinition).painPoints.map((point, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-white/20 mt-[2px]">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Opportunity Identified</div>
            <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{(content.problem as ProblemDefinition).opportunity}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {(content.problem as string[])?.map((p, idx) => (
            <p key={idx} className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
