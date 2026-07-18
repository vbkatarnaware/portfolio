import React from 'react';
import { Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { MediaLink } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

interface LinkCardListProps {
  items?: MediaLink[];
  icon: LucideIcon;
  label: string;
  note: string;
}

// Generic downloadable/linkable-card list — the shared visual pattern behind
// Documents, Experiments, Decision Docs, and Other Assets, so those slots
// don't each need a near-duplicate component.
export default function LinkCardList({ items, icon: Icon, label, note }: LinkCardListProps) {
  if (!items || items.length === 0) {
    return <PlaceholderCard icon={Icon} label={label} note={note} />;
  }
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <Icon size={16} className="text-white/50 group-hover:text-white/80 shrink-0" />
          <span className="text-[13px] font-medium text-white/80 flex-1">{item.label}</span>
          <Download size={14} className="text-white/30 group-hover:text-white/60 shrink-0" />
        </a>
      ))}
    </div>
  );
}
