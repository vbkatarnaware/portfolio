import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import type { ImageItem } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

interface DashboardsProps {
  items?: ImageItem[];
}

export default function Dashboards({ items }: DashboardsProps) {
  if (!items || items.length === 0) {
    return <PlaceholderCard icon={LayoutDashboard} label="Dashboards" note="Metrics dashboards will be added here." />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((d) => (
        <div key={d.src} className="rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-video">
          <img src={d.src} alt={d.alt} loading="lazy" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
