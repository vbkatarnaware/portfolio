import React from 'react';
import { FileText, Download } from 'lucide-react';
import type { MediaLink } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

interface DocumentsProps {
  items?: MediaLink[];
}

export default function Documents({ items }: DocumentsProps) {
  if (!items || items.length === 0) {
    return <PlaceholderCard icon={FileText} label="Documents" note="PRDs, BRDs, and case studies coming soon." />;
  }
  return (
    <div className="flex flex-col gap-2">
      {items.map((doc) => (
        <a
          key={doc.href}
          href={doc.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <FileText size={16} className="text-white/50 group-hover:text-white/80 shrink-0" />
          <span className="text-[13px] font-medium text-white/80 flex-1">{doc.label}</span>
          <Download size={14} className="text-white/30 group-hover:text-white/60 shrink-0" />
        </a>
      ))}
    </div>
  );
}
