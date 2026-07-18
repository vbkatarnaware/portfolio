import React from 'react';
import type { DecisionLogEntry } from '../../types/app';

interface DecisionLogProps {
  entries: DecisionLogEntry[];
}

// Tier-2 evidence: how a PM actually communicates a decision — what was
// chosen, why, what else was considered, why that was rejected, and what
// happened. Design rule: cards over paragraphs, so this stays scannable.
export default function DecisionLog({ entries }: DecisionLogProps) {
  if (!entries || entries.length === 0) return null;
  return (
    <div>
      <h2 className="text-[18px] md:text-[20px] font-semibold mb-4 tracking-tight">Decision Log</h2>
      <div className="space-y-4">
        {entries.map((e) => (
          <div key={e.decision} className="bg-white/5 border border-white/5 rounded-2xl p-5">
            <h3 className="text-[15px] font-semibold text-white mb-3">{e.decision}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
              <div>
                <dt className="text-white/40 uppercase text-[10px] font-semibold tracking-wider mb-1">Reason</dt>
                <dd className="text-white/70 leading-[1.5]">{e.reason}</dd>
              </div>
              <div>
                <dt className="text-white/40 uppercase text-[10px] font-semibold tracking-wider mb-1">Alternatives Considered</dt>
                <dd className="text-white/70 leading-[1.5]">{e.alternatives}</dd>
              </div>
              <div>
                <dt className="text-white/40 uppercase text-[10px] font-semibold tracking-wider mb-1">Rejected Because</dt>
                <dd className="text-white/70 leading-[1.5]">{e.rejectedBecause}</dd>
              </div>
              <div>
                <dt className="text-white/40 uppercase text-[10px] font-semibold tracking-wider mb-1">Outcome</dt>
                <dd className="text-white font-medium leading-[1.5]">{e.outcome}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
