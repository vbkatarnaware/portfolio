import React from 'react';
import type { HighlightItem } from '../../types/app';

interface HighlightsProps {
  items: HighlightItem[];
  /** Compact strip below the grid — business-scale proof (GMV, volume),
   *  kept visually distinct from the product-identity cards above it. */
  impact?: HighlightItem[];
}

// The 4-card grid, generalized from Applications/QRapidApp.tsx's metrics grid
// and deliberately renamed from "Metrics" — many of these cards carry
// credibility signals (e.g. "MIT Licensed", "Private Beta"), not just numbers.
// Highlights answer "what is this, who uses it, what improved" (product KPIs);
// the optional Impact strip answers "how much scale has this actually seen"
// (business-scale proof) — kept separate because a senior-PM case study
// distinguishes the product from the business metrics that prove its scale.
const getDesktopGridCols = (len: number) => {
  if (len === 1) return 'md:grid-cols-1';
  if (len === 2) return 'md:grid-cols-2';
  if (len === 3) return 'md:grid-cols-3';
  return 'md:grid-cols-4';
};

export default function Highlights({ items, impact }: HighlightsProps) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-8 max-w-4xl pb-2">
      <div>
        <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Highlights</h2>
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm overflow-hidden">
          <div className={`grid grid-cols-2 ${getDesktopGridCols(items.length)}`}>
            {items.map((item, idx) => (
              <div 
                key={item.label} 
                className={`p-4 md:p-5 flex flex-col justify-center
                  ${idx >= 2 ? 'border-t border-white/[0.05] md:border-t-0' : ''}
                  ${idx % 2 !== 0 ? 'border-l border-white/[0.05]' : 'border-l-0'} 
                  ${idx > 0 ? 'md:border-l md:border-white/[0.05]' : 'md:border-l-0'}
                `}
              >
                <div className="text-[20px] font-medium tracking-tight text-white/90 tabular-nums mb-1.5">
                  {item.value}
                </div>
                <div className="text-[12px] font-medium text-white/40 leading-snug">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {impact && impact.length > 0 && (
        <div className="pt-2">
          <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">Business Impact</h3>
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl shadow-sm overflow-hidden">
            <div className={`grid grid-cols-2 ${getDesktopGridCols(impact.length)}`}>
              {impact.map((item, idx) => (
                <div 
                  key={item.label} 
                  className={`p-4 md:p-5 flex flex-col justify-center
                    ${idx >= 2 ? 'border-t border-white/[0.05] md:border-t-0' : ''}
                    ${idx % 2 !== 0 ? 'border-l border-white/[0.05]' : 'border-l-0'} 
                    ${idx > 0 ? 'md:border-l md:border-white/[0.05]' : 'md:border-l-0'}
                  `}
                >
                  <div className="text-[20px] font-medium tracking-tight text-white/90 tabular-nums mb-1.5">
                    {item.value}
                  </div>
                  <div className="text-[12.5px] font-medium text-white/50 leading-snug">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
