import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AppSidebarProps {
  sections: SidebarSection[];
  activeId: string;
  onSelect: (id: string) => void;
  groupLabel?: string;
}

// Generalized clone of Finder/FinderSidebar.tsx — same markup and tokens,
// data-driven by a `sections` array instead of the hardcoded FAVORITES list,
// so every app window (Experience or Product mode) shares one sidebar.
//
// Mobile principle: same information architecture, re-flowed for touch — the
// vertical sidebar (desktop) becomes a horizontal scrollable chip strip
// (mobile), never a reduced section list. Finder itself has no mobile section
// switcher today; this fixes that gap for every new app and can be retrofit
// into Finder later.
export default function AppSidebar({ sections, activeId, onSelect, groupLabel = 'Sections' }: AppSidebarProps) {
  return (
    <>
      {/* Desktop: vertical sidebar */}
      <nav
        aria-label="Application Sidebar"
        className="w-[200px] bg-black/20 border-r border-white/10 p-3 hidden md:flex flex-col shrink-0 overflow-y-auto"
      >
        <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1 px-2 mt-2">
          {groupLabel}
        </h3>
        <ul className="space-y-0.5" role="menu">
          {sections.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                role="menuitem"
                tabIndex={0}
                onClick={() => onSelect(item.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelect(item.id); }}
                className={`flex items-center gap-2 text-[13px] px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                  isActive ? 'bg-[#0058d0] text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-[#328df9]'} />
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: horizontal chip strip, same sections, touch-optimized */}
      <nav
        aria-label="Application Sections"
        className="flex md:hidden gap-1.5 overflow-x-auto px-3 py-2 border-b border-white/10 bg-black/20 shrink-0 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 ${
                isActive ? 'bg-[#0058d0] text-white' : 'bg-white/5 text-white/70'
              }`}
            >
              <Icon size={12} className={isActive ? 'text-white' : 'text-[#328df9]'} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
