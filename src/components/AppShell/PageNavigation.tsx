import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SidebarSection } from './AppSidebar';

interface PageNavigationProps {
  sections: SidebarSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function PageNavigation({ sections, activeId, onSelect }: PageNavigationProps) {
  const currentIndex = sections.findIndex(s => s.id === activeId);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  if (!prevSection && !nextSection) return null;

  return (
    <div className="flex items-center justify-between border-t border-white/10 mt-16 pt-8">
      {prevSection ? (
        <button
          onClick={() => {
            onSelect(prevSection.id);
            // Scroll to top when navigating
            document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-start gap-1.5 group text-left max-w-[48%] outline-none"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
            <ArrowLeft size={14} />
            Previous
          </span>
          <span className="text-[14.5px] font-medium text-white/80 group-hover:text-white transition-colors truncate w-full">
            {prevSection.label}
          </span>
        </button>
      ) : <div />}

      {nextSection ? (
        <button
          onClick={() => {
            onSelect(nextSection.id);
            // Scroll to top when navigating
            document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-end gap-1.5 group text-right max-w-[48%] outline-none"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
            Next
            <ArrowRight size={14} />
          </span>
          <span className="text-[14.5px] font-medium text-white/80 group-hover:text-white transition-colors truncate w-full">
            {nextSection.label}
          </span>
        </button>
      ) : <div />}
    </div>
  );
}
