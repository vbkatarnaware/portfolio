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
    <div className='relative w-full h-screen overflow-hidden bg-black font-sans antialiased'>
      {/* Fixed Background */}
      <div
        className='absolute inset-0 bg-[length:180%_auto] bg-[position:center_60%] md:bg-cover md:bg-[position:92%_bottom] bg-no-repeat transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
        style={{ 
          backgroundImage: `url(${backgroundMap[currentBg]})`,
          opacity: phase >= 1 ? 1 : 0
        }}
      />

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
