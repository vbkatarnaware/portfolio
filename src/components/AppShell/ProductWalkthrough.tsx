import React, { useState } from 'react';
import { Play, PlayCircle, Download, MonitorPlay, Maximize, CheckCircle2 } from 'lucide-react';

export default function ProductWalkthrough() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-[20px] font-semibold tracking-tight text-white">Product Walkthrough</h2>
        <p className="text-[12.5px] font-medium text-white/50 mt-1">See the product end-to-end in under 3 minutes.</p>
      </div>

      {/* Main Container - QuickTime / macOS style */}
      <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden shadow-sm">
        {/* Media Preview Card */}
        <div 
          className="relative aspect-video bg-[#111] group cursor-pointer overflow-hidden border-b border-white/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Thumbnail Image - using first screenshot from content as placeholder */}
          <img 
            src="/artifacts/qrapid/screenshots/03-order-management/order-main.png" 
            alt="Product Walkthrough Preview" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-md text-[11px] font-semibold text-white/90 uppercase tracking-wider shadow-sm">
              03:12
            </span>
            <span className="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-md text-[11px] font-semibold text-white/90 uppercase tracking-wider shadow-sm">
              HD
            </span>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`
              w-16 h-16 rounded-full bg-black/30 backdrop-blur-md border border-white/20 
              flex items-center justify-center text-white/90 shadow-lg
              transition-all duration-300 ease-out
              ${isHovered ? 'scale-110 bg-white/10 border-white/30 text-white' : 'scale-100'}
            `}>
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Metadata Row - macOS Finder style */}
        <div className="px-5 py-4 bg-white/[0.02]">
          <div className="grid grid-cols-4 gap-4 pb-4 border-b border-white/5">
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Duration</div>
              <div className="text-[13px] text-white/80 font-medium">3m 12s</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Recorded</div>
              <div className="text-[13px] text-white/80 font-medium">July 2026</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Build</div>
              <div className="text-[13px] text-white/80 font-medium">Production</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Platform</div>
              <div className="text-[13px] text-white/80 font-medium">Web</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
