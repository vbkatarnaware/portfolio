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
      <h2 className="text-[18px] md:text-[20px] font-semibold mb-4 tracking-tight">{title}</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] font-medium text-white/90 text-center shrink-0">
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center text-white/25 shrink-0">
                <ChevronDown size={16} className="md:hidden" />
                <ChevronRight size={16} className="hidden md:block" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
