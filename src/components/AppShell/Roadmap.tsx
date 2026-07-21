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
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Roadmap</h2>
      <div className="space-y-10 max-w-4xl">
        {items.map((item) => (
          <div key={item.whatsNext} className="space-y-4">
            <h3 className="text-[16px] font-semibold text-white/90">{item.whatsNext}</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-1.5">
                <dt className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Why</dt>
                <dd className="text-[14.5px] text-white/80 leading-relaxed">{item.why}</dd>
              </div>
              <div className="space-y-1.5">
                <dt className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Why Not Now</dt>
                <dd className="text-[14.5px] text-white/80 leading-relaxed">{item.whyNotNow}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
