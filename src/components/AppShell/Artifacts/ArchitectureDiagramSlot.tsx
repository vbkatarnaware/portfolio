import React from 'react';
import { Workflow } from 'lucide-react';
import PlaceholderCard from './PlaceholderCard';

interface ArchitectureDiagramSlotProps {
  diagramUrl?: string | null;
}

// Media slot for an uploaded/interactive diagram asset — distinct from
// AppShell/ArchDiagram.tsx, which renders the always-on inline flow diagram
// built from content.architecture. This slot is for a richer artifact later
// (e.g. an exported interactive SVG or a full system diagram image).
export default function ArchitectureDiagramSlot({ diagramUrl }: ArchitectureDiagramSlotProps) {
  if (!diagramUrl) {
    return <PlaceholderCard icon={Workflow} label="Architecture Diagram" note="Interactive architecture diagram coming soon." />;
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <img src={diagramUrl} alt="Architecture diagram" loading="lazy" className="w-full h-auto" />
    </div>
  );
}
