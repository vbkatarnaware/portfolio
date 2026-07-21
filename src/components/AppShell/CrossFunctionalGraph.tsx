import React from 'react';

interface CrossFunctionalGraphProps {
  functions?: string[];
  paragraphs?: string[];
}

export default function CrossFunctionalGraph({ functions, paragraphs }: CrossFunctionalGraphProps) {
  const defaultFunctions = ['Engineering', 'Operations', 'Customer Success', 'Go-to-Market', 'Partnerships'];
  const nodes = functions || defaultFunctions;

  return (
    <div className="pb-8">
      <h2 className="text-[20px] font-semibold mb-6 tracking-tight text-white">Cross-functional Leadership</h2>
      
      <div className="mb-8 flex flex-wrap items-center gap-y-3 gap-x-2">
        <div className="flex items-center gap-2 mr-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          <span className="text-[14.5px] font-medium text-white/90">Product</span>
        </div>
        
        <span className="text-[14px] text-white/40 italic mr-2">driving execution across</span>
        
        <div className="flex flex-wrap gap-2">
          {nodes.map(f => (
            <span key={f} className="px-2.5 py-1 text-[12.5px] font-medium text-white/70 bg-white/[0.03] border border-white/[0.05] rounded-md shadow-sm">
              {f}
            </span>
          ))}
        </div>
      </div>

      {paragraphs && paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-relaxed text-white/80 max-w-[65ch]">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
