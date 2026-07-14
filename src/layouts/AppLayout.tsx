import { useEffect, useState } from 'react';
import '../styles/hero-background.css';
import MacToolbar from '../components/global/MacToolbar';

import MobileDock from '../components/global/MobileDock';
import DesktopDock from '../components/global/DesktopDock';
import HeroContent from '../components/global/HeroContent';
import Window from '../components/global/Window';
import QRapidApp from '../components/projects/QRapidApp';
import FinderApp from '../components/projects/FinderApp';
import { StartupProvider, useStartupPhase } from '../context/StartupContext';

interface AppLayoutProps {
  initialBg: string;
  backgroundMap: Record<string, string>;
}

export default function Desktop({ initialBg, backgroundMap }: AppLayoutProps) {
  return (
    <StartupProvider>
      <DesktopInner initialBg={initialBg} backgroundMap={backgroundMap} />
    </StartupProvider>
  );
}

function DesktopInner({ initialBg, backgroundMap }: AppLayoutProps) {
  const [currentBg, setCurrentBg] = useState<string>(initialBg);
  const [isQRapidOpen, setIsQRapidOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const phase = useStartupPhase();

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
    <div className='fixed inset-0 w-full overflow-hidden bg-[#d9d7dc] font-sans antialiased'>
      {/* Universal Background Layer (CSS Generated VisionOS Style) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Oversized breathing background container */}
        <div className="hero-background">
          <div className="hero-layer hero-layer-main" />
          <div className="hero-layer hero-layer-warm" />
          <div className="hero-layer hero-layer-reflection" />
          <div className="hero-layer hero-layer-grain" />
        </div>

        {/* Independent Avatar Layer */}
        <div className="absolute inset-0 flex items-end justify-center">
          <img 
            src="/avatar-cutout.png" 
            alt="Vipul Katarnaware"
            className="w-auto h-[65%] md:h-[75%] lg:h-[80%] object-contain object-bottom"
            style={{ 
              opacity: phase >= 1 ? 1 : 0, 
              transition: 'opacity 1200ms ease',
              filter: 'drop-shadow(0 -10px 40px rgba(0,0,0,0.05))'
            }}
          />
        </div>
      </div>

      {/* Hero Content Layer */}
      <HeroContent />

      {/* Windows Layer */}
      <Window
        id="qrapid"
        title="QRapid"
        isOpen={isQRapidOpen}
        onClose={() => setIsQRapidOpen(false)}
        width={900}
        height={600}
      >
        <QRapidApp />
      </Window>

      <Window
        id="finder"
        title="Explore Me"
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        width={850}
        height={550}
      >
        <FinderApp />
      </Window>

      {/* UI Overlays */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <MacToolbar />
      </div>

      <MobileDock onOpenQRapid={() => setIsQRapidOpen(true)} onOpenFinder={() => setIsFinderOpen(true)} />
      <DesktopDock onOpenQRapid={() => setIsQRapidOpen(true)} onOpenFinder={() => setIsFinderOpen(true)} />
    </div>
  );
}
