import { useEffect, useState } from 'react';
import MacToolbar from '../components/global/MacToolbar';
import MobileDock from '../components/global/MobileDock';
import DesktopDock from '../components/global/DesktopDock';
import HeroContent from '../components/global/HeroContent';

import WindowFrame from '../components/WindowManager/WindowFrame';
import { WindowProvider, useWindows } from '../context/WindowContext';
import { StartupProvider, useStartupPhase } from '../context/StartupContext';

import FinderApp from '../components/Finder/FinderApp';
import QRapidApp from '../components/Applications/QRapidApp';
import CareerOSApp from '../components/Applications/CareerOSApp';
import MoatDailyApp from '../components/Applications/MoatDailyApp';

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

function DesktopInner({ initialBg, backgroundMap }: AppLayoutProps) {
  const [currentBg, setCurrentBg] = useState<string>(initialBg);
  const phase = useStartupPhase();
  const { openWindow } = useWindows();

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
        <WindowFrame id="careeros"><CareerOSApp /></WindowFrame>
        <WindowFrame id="moatdaily"><MoatDailyApp /></WindowFrame>
      </div>

      {/* UI Overlays */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <MacToolbar />
      </div>

      <MobileDock onOpenQRapid={() => openWindow('qrapid')} onOpenFinder={() => openWindow('finder')} />
      <DesktopDock onOpenQRapid={() => openWindow('qrapid')} onOpenFinder={() => openWindow('finder')} />
    </div>
  );
}
