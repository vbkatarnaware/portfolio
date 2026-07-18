import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PlaceholderCardProps {
  icon: LucideIcon;
  label: string;
  note: string;
}

// Elegant "coming soon" card — media slots always render (never hide) so a
// future asset drops in by editing content.ts only, never a component.
export default function PlaceholderCard({ icon: Icon, label, note }: PlaceholderCardProps) {
  return (
    <div className="bg-white/[0.03] border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[120px]">
      <Icon size={20} className="text-white/25" />
      <p className="text-[13px] font-medium text-white/50">{label}</p>
      <p className="text-[12px] text-white/30">{note}</p>
    </div>
  );
}
