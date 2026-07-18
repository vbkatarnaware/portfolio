import React from 'react';
import { PenTool } from 'lucide-react';
import type { ImageItem } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';

interface WireframesProps {
  items?: ImageItem[];
}

export default function Wireframes({ items }: WireframesProps) {
  if (!items || items.length === 0) {
    return <PlaceholderCard icon={PenTool} label="Wireframes & Mockups" note="Early concepts and design explorations coming soon." />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((w) => (
        <div key={w.src} className="rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-video">
          <img src={w.src} alt={w.alt} loading="lazy" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
