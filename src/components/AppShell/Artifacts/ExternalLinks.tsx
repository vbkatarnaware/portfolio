import React from 'react';
import { Link as LinkIcon, ArrowUpRight } from 'lucide-react';
import type { MediaLink } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

interface ExternalLinksProps {
  items?: MediaLink[];
}

export default function ExternalLinks({ items }: ExternalLinksProps) {
  if (!items || items.length === 0) {
    return <PlaceholderCard icon={LinkIcon} label="External Links" note="GitHub, live site, and docs will be added here." />;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[13px] font-medium text-white/80"
        >
          {link.label}
          <ArrowUpRight size={12} className="text-white/40" />
        </a>
      ))}
    </div>
  );
}
