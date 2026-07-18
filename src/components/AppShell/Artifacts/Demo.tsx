import React, { lazy, Suspense } from 'react';
import { Video } from 'lucide-react';
import PlaceholderCard from './PlaceholderCard';

const ProductDemo = lazy(() => import('./ProductDemo'));

interface DemoProps {
  videoUrl?: string | null;
}

// First-class "hook" section — the first thing most visitors click. Split
// out from Evidence because a demo is proof-by-watching, not proof-by-reading;
// it deserves its own sidebar entry rather than being buried in a media list.
export default function Demo({ videoUrl }: DemoProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-[18px] md:text-[20px] font-semibold tracking-tight">Demo</h2>
      <Suspense fallback={<PlaceholderCard icon={Video} label="Loading" note="" />}>
        <ProductDemo videoUrl={videoUrl} />
      </Suspense>
    </div>
  );
}
