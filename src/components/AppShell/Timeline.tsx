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
    <div>
      <h2 className="text-[18px] md:text-[20px] font-semibold mb-4 tracking-tight">Timeline</h2>
      <div className="relative pl-6 border-l border-white/15 space-y-6">
        {nodes.map((node, i) => (
          <div key={node.label} className="relative">
            <div
              className={`absolute w-2.5 h-2.5 rounded-full -left-[29px] top-1 ${
                i === nodes.length - 1
                  ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'bg-white/40'
              }`}
            />
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-[14px] font-semibold text-white">{node.label}</h3>
              {node.date && <span className="text-white/40 text-[12px] font-medium">{node.date}</span>}
            </div>
            {node.description && (
              <p className="text-white/60 text-[13px] leading-[1.5] mt-1">{node.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
