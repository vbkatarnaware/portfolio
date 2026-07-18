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
export default function Highlights({ items, impact }: HighlightsProps) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[18px] md:text-[20px] font-semibold mb-4 tracking-tight">Highlights</h2>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col justify-center items-center text-center"
            >
              <span className="text-[10px] md:text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <span className="text-[15px] md:text-[17px] font-bold tracking-tight text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {impact && impact.length > 0 && (
        <div>
          <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-1">Impact</h3>
          <div className="flex flex-wrap gap-2">
            {impact.map((item) => (
              <div
                key={item.label}
                className="flex-1 min-w-[120px] bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 flex flex-col items-center text-center"
              >
                <span className="text-[13px] md:text-[14px] font-bold tracking-tight text-white">
                  {item.value}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
