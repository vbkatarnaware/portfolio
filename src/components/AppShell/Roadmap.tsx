import React from 'react';
import type { RoadmapItem } from '../../types/app';

interface RoadmapProps {
  items: RoadmapItem[];
}

// What's next / why / why not now — the honest deferral framing (not
// marketing). Product mode only; items describing unbuilt work must stay
// worded as planned, never as shipped, in the content module itself.
export default function Roadmap({ items }: RoadmapProps) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h2 className="text-[18px] md:text-[20px] font-semibold mb-4 tracking-tight">Roadmap</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.whatsNext} className="bg-white/5 border border-white/5 rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold text-white mb-3">{item.whatsNext}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
              <div>
                <dt className="text-white/40 uppercase text-[10px] font-semibold tracking-wider mb-1">Why</dt>
                <dd className="text-white/70 leading-[1.5]">{item.why}</dd>
              </div>
              <div>
                <dt className="text-white/40 uppercase text-[10px] font-semibold tracking-wider mb-1">Why Not Now</dt>
                <dd className="text-white/70 leading-[1.5]">{item.whyNotNow}</dd>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
