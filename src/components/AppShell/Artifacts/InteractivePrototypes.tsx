import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PrototypeItem } from '../../../types/app';

interface InteractivePrototypesProps {
  items: PrototypeItem[];
}

export default function InteractivePrototypes({ items }: InteractivePrototypesProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="group flex flex-col justify-between p-6 rounded-[20px] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          <div className="flex flex-col gap-6">
            {/* Hero Thumbnail */}
            {item.thumbnailSrc && (
              <a 
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full aspect-video rounded-2xl bg-white/5 overflow-hidden border border-white/10 cursor-pointer"
              >
                <img 
                  src={item.thumbnailSrc} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                  loading="lazy" 
                />
              </a>
            )}
            
            {/* Content Area */}
            <div>
              <h4 className="text-[16px] font-semibold tracking-tight text-white mb-2">{item.title}</h4>
              <p className="text-[14px] text-white/60 leading-relaxed line-clamp-3 mb-6">
                {item.description}
              </p>
            </div>
          </div>
          
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center self-start gap-1.5 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[13px] font-medium text-white/90 hover:text-white transition-colors"
          >
            <span>Open Prototype</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      ))}
    </div>
  );
}
