import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutGrid, FileQuestion, Search, ListChecks, XCircle, GitCommit,
  Network, BarChart3, PlayCircle, FolderOpen, Lightbulb, Map, Users, GitBranch,
} from 'lucide-react';
import { useWindows } from '../../context/WindowContext';
import type { AppId } from '../../context/WindowContext';
import type { AppContent } from '../../types/app';
import AppHeader from './AppHeader';
import AppSidebar, { type SidebarSection } from './AppSidebar';
import ProseSection from './ProseSection';
import Overview from './Overview';
import Role from './Role';
import CustomerResearch from './CustomerResearch';
import TechnicalDiscovery from './TechnicalDiscovery';
import DecisionLog from './DecisionLog';
import RejectedDecisions from './RejectedDecisions';
import Timeline from './Timeline';
import Architecture from './Architecture';
import ArchDiagram from './ArchDiagram';
import Highlights from './Highlights';
import Roadmap from './Roadmap';
import Demo from './Artifacts/Demo';
import Evidence from './Artifacts/Evidence';
import CrossFunctionalGraph from './CrossFunctionalGraph';
import LessonsLearned from './LessonsLearned';
import PageNavigation from './PageNavigation';

interface AppShellProps {
  appId: AppId;
  content: AppContent;
}

// A section's content field may be a non-empty array OR a populated structured
// object (ProblemDefinition, ArchitectureDetails, TechnicalDiscovery,
// LessonsLearned, …). `.length` is `undefined` on an object, so a plain
// `field?.length` guard silently hides every structured section — hence this
// shared check that handles arrays, objects, and primitives alike.
function hasData(value: unknown): boolean {
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return Boolean(value);
}

// The reusable macOS "case study" application shell. One component, two IA
// modes (Experience / Product), driven entirely by `content`. A narrative
// section is included in the sidebar only if its content field has data
// (truthfulness rule) — Demo and Evidence render whenever `content.media`
// is present, showing placeholders for any still-empty slot, and are
// omitted entirely when `media` itself is absent (see the sections list below).
export default function AppShell({ appId, content }: AppShellProps) {
  const { openWindow, updateWindowTitle } = useWindows();

  const sections = useMemo<SidebarSection[]>(() => {
    const list: SidebarSection[] = [
      { id: 'overview', label: 'Overview', icon: LayoutGrid },
    ];
    if (hasData(content.problem) || hasData(content.roleCards)) {
      list.push({ id: 'problem', label: content.problemTitle, icon: FileQuestion });
    }
    if (hasData(content.discovery) || hasData(content.technicalDiscovery) || hasData(content.customerResearch)) {
      list.push({ id: 'discovery', label: 'Discovery', icon: Search });
    }
    if (content.decisionLog?.length) {
      list.push({ id: 'decisions', label: 'Decision Log', icon: ListChecks });
    }
    if (content.rejectedDecisions?.length) {
      list.push({ id: 'rejected', label: 'Rejected Decisions', icon: XCircle });
    }
    if (content.timeline?.length) {
      list.push({ id: 'timeline', label: 'Timeline', icon: GitCommit });
    }
    if (hasData(content.architecture)) {
      list.push({ id: 'architecture', label: 'Architecture', icon: Network });
    }
    if (content.crossFunctional?.length) {
      list.push({ id: 'cross-functional', label: 'Cross-functional', icon: Users });
    }
    if (content.decisionSystems?.length) {
      list.push({ id: 'decision-systems', label: 'Decision Systems', icon: GitBranch });
    }
    // Demo and Evidence are present whenever the app has a media object at
    // all (placeholder rule) — Demo is the "hook" a visitor clicks first,
    // Evidence the supporting proof they reach for after, kept as two
    // separate sidebar entries so each makes its own first impression. Apps
    // with no assets and none ever expected (e.g. ICICI, enterprise
    // confidential) omit `media` entirely, so no blank placeholder section
    // ever shows — that's the difference between "not yet" and "never".
    if (content.media) {
      if (content.media.heroVideo) {
        list.push({ id: 'demo', label: 'Demo', icon: PlayCircle });
      }
      list.push({ id: 'evidence', label: 'Artifacts', icon: FolderOpen });
    }
    if (hasData(content.lessons) || hasData(content.lessonsLearned)) {
      list.push({ id: 'lessons', label: 'Lessons Learned', icon: Lightbulb });
    }
    if (hasData(content.roadmap)) {
      list.push({ id: 'roadmap', label: 'Roadmap', icon: Map });
    }
    return list;
  }, [content]);

  const [activeId, setActiveId] = useState(sections[0]?.id ?? 'overview');

  useEffect(() => {
    updateWindowTitle(appId, content.name);
  }, [appId, content.name, updateWindowTitle]);

  // Deep-linking, mirrors FinderApp.tsx: /<app>/<section>
  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts[0] === appId && parts[1] && sections.some((s) => s.id === parts[1])) {
        setActiveId(parts[1]);
      }
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    window.history.pushState(null, '', `/${appId}/${id}`);
  };

  return (
    // Finder-parity layout: sidebar runs full height on the left (desktop) or
    // as a top chip strip (mobile); EVERYTHING else — including the hero —
    // lives inside the right scrolling pane. The hero scrolls away with the
    // content instead of eating the sidebar's vertical space.
    <div className="flex flex-col md:flex-row h-full text-white/90 bg-[#1c1c1e] overflow-hidden">
      <AppSidebar sections={sections} activeId={activeId} onSelect={handleSelect} />
      <main className="flex-1 overflow-y-scroll overflow-x-hidden" role="main">
        <AppHeader content={content} />
        <div className="max-w-4xl mx-auto space-y-10 p-6 md:p-8">
          {activeId === 'overview' && <Overview content={content} />}
          {activeId === 'problem' && <Role content={content} />}
          {activeId === 'discovery' && (content.technicalDiscovery ? <TechnicalDiscovery content={content} /> : <CustomerResearch content={content} />)}
          {activeId === 'decisions' && <DecisionLog entries={content.decisionLog} />}
          {activeId === 'rejected' && <RejectedDecisions entries={content.rejectedDecisions} />}
          {activeId === 'timeline' && <Timeline nodes={content.timeline} />}
          {activeId === 'architecture' && <Architecture content={content} />}
          {activeId === 'cross-functional' && <CrossFunctionalGraph paragraphs={content.crossFunctional} />}
          {activeId === 'decision-systems' && <ArchDiagram steps={content.decisionSystems ?? []} title="Decision Systems" />}
          {activeId === 'demo' && content.media && <Demo videoUrl={content.media.heroVideo} />}
          {activeId === 'evidence' && content.media && <Evidence media={content.media} />}
          {activeId === 'lessons' && <LessonsLearned content={content} />}
          {activeId === 'roadmap' && <Roadmap items={content.roadmap ?? []} />}
          
          <PageNavigation sections={sections} activeId={activeId} onSelect={handleSelect} />
        </div>
      </main>
    </div>
  );
}
