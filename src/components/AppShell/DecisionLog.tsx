import React, { useState } from 'react';
import type { DecisionLogEntry } from '../../types/app';
import { CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

interface DecisionLogProps {
  entries?: DecisionLogEntry[];
}

function DecisionRow({ log, isLast }: { log: DecisionLogEntry; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors text-left focus:outline-none"
      >
        <div className="flex flex-col gap-1 flex-1 pr-4">
          <h3 className="text-[14px] font-medium text-white/90 leading-snug">{log.decision}</h3>
          <div className="flex items-center gap-2.5">
            <p className="text-[12px] text-white/50">{log.date || log.stage || 'Decision Record'}</p>
            {log.confidence && (
              <span className="hidden sm:inline-block px-2 py-0.5 bg-white/10 rounded-md text-[10px] text-white/60 font-medium tracking-wide whitespace-nowrap shrink-0">
                {log.confidence}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <ChevronRight
            size={16}
            className={`text-white/30 transition-transform duration-200 shrink-0 ${open ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-6 pt-5 bg-black/20 border-t border-white/5 inner-shadow-sm">
          <div className="space-y-6 max-w-2xl">
            {/* Summary */}
            {log.summary && (
              <p className="text-white/90 leading-relaxed text-[14.5px] font-medium">{log.summary}</p>
            )}

            {/* Why Row */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Why</div>
              <p className="text-[14.5px] text-white/80 leading-relaxed">
                {Array.isArray(log.reason) ? log.reason.join(' ') : log.reason}
              </p>
            </div>

            {/* Considered vs Rejected */}
            {(log.alternatives || log.rejectedBecause) && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Considered</div>
                <ul className="space-y-2">
                  {Array.isArray(log.alternatives) && Array.isArray(log.rejectedBecause) ? (
                      log.alternatives.map((a, i) => (
                        <li key={i} className="flex flex-col text-[14.5px] leading-snug">
                          <div className="text-white/90 font-medium">{a}</div>
                          <div className="text-white/60">{log.rejectedBecause[i]}</div>
                        </li>
                      ))
                  ) : (
                      <li className="flex flex-col text-[14.5px] leading-snug">
                        <div className="text-white/90 font-medium">{log.alternatives}</div>
                        <div className="text-white/60">{log.rejectedBecause}</div>
                      </li>
                  )}
                </ul>
              </div>
            )}

            {/* Impact Row */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Impact</div>
              <div className="text-[14.5px] text-white/90 font-medium leading-relaxed">{log.outcome}</div>
              {Array.isArray(log.impact) ? (
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {log.impact.map((imp, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-white/60 text-[13px]">
                      <CheckCircle2 size={14} className="text-[#27c93f]/70" />
                      {imp}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-white/60 text-[13px]">
                  <CheckCircle2 size={14} className="text-[#27c93f]/70" />
                  {log.impact}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {!isLast && <div className="ml-4 border-b border-white/5" />}
    </>
  );
}

export default function DecisionLog({ entries }: DecisionLogProps) {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 max-w-4xl pb-12">
      <h2 className="text-[12px] font-semibold text-white/50 uppercase tracking-wider ml-1">Key Product Decisions</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden shadow-sm">
        {entries.map((log, idx) => (
          <DecisionRow key={idx} log={log} isLast={idx === entries.length - 1} />
        ))}
      </div>
    </div>
  );
}
