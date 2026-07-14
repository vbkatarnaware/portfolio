import { useEffect, useState } from 'react';
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
    <div className='fixed inset-0 w-full overflow-hidden bg-black font-sans antialiased'>
      {/* Desktop Background */}
      <div
        className='absolute inset-0 hidden md:block bg-cover bg-[position:92%_bottom] bg-no-repeat transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
        style={{ 
          backgroundImage: `url(${backgroundMap[currentBg]})`,
          opacity: phase >= 1 ? 1 : 0
        }}
      />

      {/* Mobile Background — CSS simulation of 3D studio lighting */}
      <div className="absolute inset-0 md:hidden bg-black z-0 pointer-events-none">
        <div
          className='absolute inset-0 transition-opacity duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
          style={{ 
            background: 'radial-gradient(150% 100% at 50% 10%, #4a4f5c 0%, #5d616d 40%, #a29a91 75%, #d4cec6 100%)',
            opacity: phase >= 1 ? 1 : 0,
          }}
        />
        {/* Extremely Subtle Top Gradient (10% opacity) */}
        <div className="absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-black/10 to-transparent" />
        
        {/* Shadow floor for text and dock contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
