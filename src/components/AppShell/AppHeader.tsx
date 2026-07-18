import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import type { AppContent } from '../../types/app';

interface AppHeaderProps {
  content: AppContent;
}

// Compact hero that lives INSIDE the scrolling content pane (Finder-parity
// layout): small icon + name + tagline + action buttons, ~120px tall, scrolls
// away with the content. Deliberately not the old 280px full-width band —
// that pinned above the sidebar and stole its vertical space.
//
// Action buttons are entirely content-driven: Visit Website shows when
// externalUrl is set, a GitHub icon shows when githubUrl is set, and the
// whole action area collapses with no reserved space when neither is set
// (e.g. ICICI — enterprise confidential, no public destination at all).
export default function AppHeader({ content }: AppHeaderProps) {
  const hasActions = Boolean(content.externalUrl || content.githubUrl);
  return (
    <div
      className="w-full border-b border-white/5"
      style={{ background: `linear-gradient(to bottom, ${content.accent}22, transparent)` }}
    >
      <div className="max-w-4xl mx-auto flex items-center gap-4 px-6 md:px-8 py-5">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-[14px] overflow-hidden shadow-xl border border-white/10 shrink-0 bg-white/10">
          <img src={content.iconSrc} alt={content.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-[20px] md:text-[24px] font-bold tracking-tight leading-tight">{content.name}</h1>
          <p className="text-[12px] md:text-[13px] text-white/60 font-medium truncate">{content.tagline}</p>
        </div>
        {hasActions && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {content.externalUrl && (
              <a
                href={content.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="h-8 px-4 bg-white text-black rounded-full text-[13px] font-semibold flex items-center gap-1.5 hover:bg-white/90 transition-colors shadow-lg"
              >
                VISIT
                <ArrowUpRight size={13} />
              </a>
            )}
            {content.githubUrl && (
              <a
                href={content.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${content.name} on GitHub`}
                className="h-8 w-8 bg-white/10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
              >
                <BsGithub size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
