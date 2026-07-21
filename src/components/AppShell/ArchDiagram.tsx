import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { DiagramStep } from '../../types/app';

interface ArchDiagramProps {
  steps: DiagramStep[];
  title?: string;
}

// Lightweight node -> node flow diagram, styled HTML/CSS only (no chart
// library), matching existing tokens. Horizontal on desktop, vertical on
// mobile — same information, re-flowed for touch (Mobile principle).
export default function ArchDiagram({ steps, title = 'Architecture' }: ArchDiagramProps) {
  if (!steps || steps.length === 0) return null;
  return (
    <div>
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">{title}</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-y-2 md:gap-y-3 gap-x-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col md:flex-row items-center gap-2">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-[13px] font-medium text-white/90 text-center shadow-sm whitespace-nowrap">
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center text-white/25 shrink-0 py-1 md:py-0">
                <ChevronDown size={16} className="md:hidden" />
                <ChevronRight size={16} className="hidden md:block" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
