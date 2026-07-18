import React from 'react';
import { GitBranch } from 'lucide-react';
import PlaceholderCard from './PlaceholderCard';

interface ProductFlowProps {
  flowUrl?: string | null;
}

export default function ProductFlow({ flowUrl }: ProductFlowProps) {
  if (!flowUrl) {
    return <PlaceholderCard icon={GitBranch} label="Product / User Flow" note="Journey diagram coming soon." />;
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <img src={flowUrl} alt="Product flow diagram" loading="lazy" className="w-full h-auto" />
    </div>
  );
}
