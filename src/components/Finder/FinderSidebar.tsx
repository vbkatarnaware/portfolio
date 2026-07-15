import React from 'react';
import { User, FileText, Briefcase, Mail, AppWindow } from 'lucide-react';

export const FAVORITES = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'products', label: 'Products', icon: AppWindow },
];

interface FinderSidebarProps {
  activeTab: string;
  onTabSelect: (id: string, action?: string) => void;
}

export default function FinderSidebar({ activeTab, onTabSelect }: FinderSidebarProps) {
  return (
    <nav 
      aria-label="Finder Sidebar"
      className="w-[200px] bg-black/20 border-r border-white/10 p-3 hidden md:flex flex-col shrink-0"
    >
      <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1 px-2 mt-2">
        Favorites
      </h3>
      <ul className="space-y-0.5" role="menu">
        {FAVORITES.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li
              key={item.id}
              role="menuitem"
              tabIndex={0}
              onClick={() => onTabSelect(item.id)}
              onKeyDown={(e) => { if (e.key === 'Enter') onTabSelect(item.id); }}
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
  );
}
