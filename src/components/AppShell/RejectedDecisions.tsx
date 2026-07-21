import React from 'react';
import { XCircle } from 'lucide-react';
import type { RejectedDecisionEntry } from '../../types/app';

interface RejectedDecisionsProps {
  entries: RejectedDecisionEntry[];
}

// The "why NOT" list — a focused view of paths not taken. Few portfolios
// show this; it's exactly the reasoning a PM interview probes for.
export default function RejectedDecisions({ entries }: RejectedDecisionsProps) {
  if (!entries || entries.length === 0) return null;
  return (
    <div>
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Rejected Decisions</h2>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.question} className="flex gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
            <XCircle size={16} className="text-white/30 shrink-0 mt-0.5" />
            <div>
              <p className="text-[14.5px] font-medium text-white/90 mb-1">{e.question}</p>
              <p className="text-[14.5px] text-white/80 leading-relaxed max-w-[65ch]">{e.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
