import React, { lazy, Suspense } from 'react';
import type { AppMedia } from '../../../types/app';
import PlaceholderCard from './PlaceholderCard';
import { Video, FlaskConical, FileSignature, Paperclip } from 'lucide-react';

// Heavy sub-slots (galleries, diagrams) are lazy-loaded so the initial
// desktop stays light; placeholder cards for empty slots load eagerly.
const ScreenshotsGallery = lazy(() => import('./ScreenshotsGallery'));
const ArchitectureDiagramSlot = lazy(() => import('./ArchitectureDiagramSlot'));
const ProductFlow = lazy(() => import('./ProductFlow'));
const Wireframes = lazy(() => import('./Wireframes'));
const Dashboards = lazy(() => import('./Dashboards'));
const Documents = lazy(() => import('./Documents'));
const ExternalLinks = lazy(() => import('./ExternalLinks'));
const LinkCardList = lazy(() => import('./LinkCardList'));

interface EvidenceProps {
  media: AppMedia;
}

// Permanent section on every app that has a `media` object at all (Workstream
// G) — the "prove it" layer a visitor reaches after watching the Demo.
// Reusable card taxonomy: every sub-slot always renders, either the real
// asset or an elegant placeholder, so the IA stays stable while assets land
// incrementally. Adding a future screenshot/diagram/PDF/dashboard requires
// editing only the app's content.ts, never a component.
export default function Evidence({ media }: EvidenceProps) {
  const fallback = <PlaceholderCard icon={Video} label="Loading" note="" />;
  return (
    <div className="space-y-8">
      <h2 className="text-[18px] md:text-[20px] font-semibold tracking-tight">Evidence</h2>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Screenshots</h3>
        <Suspense fallback={fallback}><ScreenshotsGallery screenshots={media.screenshots} /></Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Architecture Diagram</h3>
        <Suspense fallback={fallback}><ArchitectureDiagramSlot diagramUrl={media.architectureDiagram} /></Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Product / User Flow</h3>
        <Suspense fallback={fallback}><ProductFlow flowUrl={media.workflowDiagram} /></Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Wireframes & Mockups</h3>
        <Suspense fallback={fallback}><Wireframes items={media.wireframes} /></Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Dashboards</h3>
        <Suspense fallback={fallback}><Dashboards items={media.dashboards} /></Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Documents</h3>
        <Suspense fallback={fallback}><Documents items={media.documents} /></Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Experiments</h3>
        <Suspense fallback={fallback}>
          <LinkCardList items={media.experiments} icon={FlaskConical} label="Experiments" note="A/B tests and experiment write-ups will be added here." />
        </Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Decision Docs</h3>
        <Suspense fallback={fallback}>
          <LinkCardList items={media.decisionDocs} icon={FileSignature} label="Decision Docs" note="Standalone decision memos will be added here." />
        </Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Other Assets</h3>
        <Suspense fallback={fallback}>
          <LinkCardList items={media.otherAssets} icon={Paperclip} label="Other Assets" note="Anything else worth sharing will be added here." />
        </Suspense>
      </section>

      <section>
        <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">External Links</h3>
        <Suspense fallback={fallback}><ExternalLinks items={media.externalLinks} /></Suspense>
      </section>
    </div>
  );
}
