import { useEffect, useState } from 'react';
import MacToolbar from '../components/global/MacToolbar';
import MobileDock from '../components/global/MobileDock';
import DesktopDock from '../components/global/DesktopDock';
import HeroContent from '../components/global/HeroContent';

import WindowFrame from '../components/WindowManager/WindowFrame';
import { WindowProvider, useWindows } from '../context/WindowContext';
import type { AppId } from '../context/WindowContext';
import { StartupProvider, useStartupPhase } from '../context/StartupContext';

import FinderApp from '../components/Finder/FinderApp';
import QRapidApp from '../components/apps/qrapid';
import IciciApp from '../components/apps/icici';
import CareerOSApp from '../components/apps/careeros';
import RizentApp from '../components/apps/rizent';
import MoatDailyApp from '../components/apps/moatdaily';

interface AppLayoutProps {
  initialBg: string;
  backgroundMap: Record<string, string>;
}

export default function Desktop({ initialBg, backgroundMap }: AppLayoutProps) {
  return (
    <StartupProvider>
      <WindowProvider>
        <DesktopInner initialBg={initialBg} backgroundMap={backgroundMap} />
      </WindowProvider>
    </StartupProvider>
  );
}

const DEEP_LINK_APPS = ['qrapid', 'icici', 'careeros', 'rizent', 'moatdaily'] as const;

function DesktopInner({ initialBg, backgroundMap }: AppLayoutProps) {
  const [currentBg, setCurrentBg] = useState<string>(initialBg);
  const phase = useStartupPhase();
  const { windows, openWindow, closeWindow, toggleMinimize } = useWindows();

  // Real macOS hides the Dock while any window is maximized/fullscreen —
  // it fills the screen below the menu bar, so the Dock has nowhere to sit.
  const anyMaximized = Object.values(windows).some(w => w.isOpen && w.isMaximized && !w.isMinimized);

  // Deep-linking: a direct visit to /<app> (or /<app>/<section>) opens that
  // app's window on mount, so the URLs prerendered by src/pages/[app]/
  // index.astro are real, functional entry points — not just SEO shells.
  useEffect(() => {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
    if ((DEEP_LINK_APPS as readonly string[]).includes(firstSegment)) {
      openWindow(firstSegment as AppId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep window open/close in sync with Back/Forward, not just the section
  // within an already-open window (that part is handled by AppShell/
  // FinderApp's own popstate listeners). Landing on an app's path opens it;
  // navigating away from every app's path (e.g. back to Home) closes
  // whichever app window was open — so Back after opening a window actually
  // closes it, matching the URL, instead of leaving a stale window on screen.
  useEffect(() => {
    const handlePopState = () => {
      const firstSegment = window.location.pathname.split('/').filter(Boolean)[0] ?? '';
      if ((DEEP_LINK_APPS as readonly string[]).includes(firstSegment)) {
        if (!windows[firstSegment as AppId]?.isOpen) {
          openWindow(firstSegment as AppId);
        }
        return;
      }
      // Back all the way to Home (empty path) — close any open product-app
      // windows so the desktop matches the URL. Navigating to a Finder tab
      // (/contact, /about, …) is NOT "home" and should leave other windows
      // (e.g. a product app opened alongside Finder) exactly as they are.
      if (firstSegment === '') {
        for (const appId of DEEP_LINK_APPS) {
          if (windows[appId]?.isOpen) closeWindow(appId);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [windows, openWindow, closeWindow]);

  // Global window-management shortcuts, scoped to whichever window is
  // currently focused (highest z-index) — mirrors macOS's Esc/⌘W/⌘M acting
  // on the active app, not whatever the browser happens to have focus on.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // A Lightbox/FlowLightbox/DocumentViewer overlay is open — let its own
      // Escape handler close *it* first rather than also closing/minimizing
      // the window underneath in the same keystroke. All three already set
      // this as their own open/close signal, so it's a free check here.
      if (document.body.style.overflow === 'hidden') return;

      const openWindows = Object.values(windows).filter(w => w.isOpen && !w.isMinimized);
      if (openWindows.length === 0) return;
      const focused = openWindows.reduce((a, b) => (b.zIndex > a.zIndex ? b : a));

      const isModified = e.metaKey || e.ctrlKey;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeWindow(focused.id);
      } else if (isModified && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        closeWindow(focused.id);
      } else if (isModified && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMinimize(focused.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, closeWindow, toggleMinimize]);

  useEffect(() => {
    const lastBg = localStorage.getItem('lastBackground');

    if (lastBg === initialBg) {
      const bgKeys = Object.keys(backgroundMap);
      const availableBgs = bgKeys.filter((bg) => bg !== lastBg);
      if (availableBgs.length > 0) {
        const newBg = availableBgs[Math.floor(Math.random() * availableBgs.length)];
        setCurrentBg(newBg);
      } else {
        setCurrentBg(bgKeys[0]); // fallback to the only available background
      }
    } else if (!backgroundMap[currentBg]) {
      // If currentBg is somehow invalid (e.g., from old localStorage), reset it
      setCurrentBg(Object.keys(backgroundMap)[0]);
    }

    localStorage.setItem('lastBackground', currentBg);
  }, [initialBg, backgroundMap]);

  return (
    <div className='fixed inset-0 w-full overflow-hidden bg-black font-sans antialiased'>
      {/* Universal Background Layer (The Infinite Canvas) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black overflow-hidden">
        
        {/* Layer 1: Pure Black Base */}
        <div className="absolute inset-0 bg-black" />

        {/* Layer 2: The Focal Point Anchor (3D Render) */}
        <div
          className="absolute inset-0 bg-no-repeat transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ 
            backgroundImage: `url(${backgroundMap[currentBg]})`,
            opacity: phase >= 1 ? 1 : 0,
            backgroundSize: 'auto max(75dvh, 600px)',
            backgroundPosition: 'center 50%'
          }}
        />
        
        {/* Layer 3: Edge Bleeding (Black Gradients overlay to hide hard image edges on mobile/tablet) */}
        <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black via-black/90 to-transparent min-[1025px]:hidden z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[32vh] bg-gradient-to-t from-black via-black/95 to-transparent min-[1025px]:hidden z-10" />

        {/* Desktop-specific adjustments */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1025px) {
            .absolute.inset-0.bg-no-repeat {
              background-size: cover !important;
              background-position: center bottom !important;
            }
          }
        `}} />

        {/* Shadow floor for text and dock contrast (Mobile/Tablet Only) */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black/80 via-black/20 to-transparent min-[1025px]:hidden" />
      </div>

      {/* Hero Content Layer */}
      <HeroContent />

      {/* Window Manager Layer */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        <WindowFrame id="finder"><FinderApp /></WindowFrame>
        <WindowFrame id="qrapid"><QRapidApp /></WindowFrame>
        <WindowFrame id="icici"><IciciApp /></WindowFrame>
        <WindowFrame id="careeros"><CareerOSApp /></WindowFrame>
        <WindowFrame id="rizent"><RizentApp /></WindowFrame>
        <WindowFrame id="moatdaily"><MoatDailyApp /></WindowFrame>
      </div>

      {/* UI Overlays */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <MacToolbar />
      </div>

      <MobileDock onOpenWindow={openWindow} hidden={anyMaximized} />
      <DesktopDock onOpenWindow={openWindow} hidden={anyMaximized} />
    </div>
  );
}
