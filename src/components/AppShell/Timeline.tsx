import React from 'react';
import type { TimelineNode } from '../../types/app';

interface TimelineProps {
  nodes: TimelineNode[];
}

// Vertical node-by-node timeline, styled after Finder/ExperienceView.tsx's
// existing timeline rail (border-l + dot markers) for visual consistency.
export default function Timeline({ nodes }: TimelineProps) {
  if (!nodes || nodes.length === 0) return null;
  return (
    <div className="max-w-3xl">
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Timeline</h2>
      <div className="relative pl-6 border-l border-white/10 space-y-8">
        {nodes.map((node, i) => {
          const isLast = i === nodes.length - 1;
          return (
            <div key={node.label} className="relative">
              {/* Native Finder style ring dot */}
              <div className="absolute -left-[29px] top-1.5 flex items-center justify-center w-2.5 h-2.5">
                <div className={`w-1.5 h-1.5 rounded-full ring-2 ring-offset-2 ring-offset-[#1a1a1a] ${isLast ? 'bg-white ring-white/20' : 'bg-white/30 ring-transparent'}`} />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                <h3 className="text-[14.5px] font-medium text-white/90">{node.label}</h3>
                {node.date && (
                  <span className="text-[11.5px] font-medium text-white/50 tracking-wide uppercase tabular-nums">{node.date}</span>
                )}
              </div>
              {node.description && (
                <p className="text-[14.5px] leading-relaxed text-white/80 max-w-[65ch]">{node.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
