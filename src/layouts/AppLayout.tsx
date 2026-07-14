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
      {/* Universal Background Layer (The Infinite Canvas) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black overflow-hidden">
        
        {/* Layer 1: The Infinite Canvas (CSS Base Lighting) */}
        <div
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            // Ambient base colors sampled from the 3D studio render
            background: 'radial-gradient(circle at 50% 40%, #3a3d46 0%, #2a2c33 40%, #15161a 100%)',
            opacity: phase >= 1 ? 1 : 0
          }}
        />

        {/* Layer 2: The Focal Point Anchor (3D Render + Edge Masking) */}
        <div
          className="absolute inset-0 bg-no-repeat transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ 
            backgroundImage: `url(${backgroundMap[currentBg]})`,
            opacity: phase >= 1 ? 1 : 0,
            
            // The Mathematical Anchor
            // Mobile: 75dvh to guarantee text clearance. Desktop: cover or 100dvh for immersion.
            backgroundSize: 'auto max(75dvh, 600px)',
            backgroundPosition: 'center 50%',
            
            // Edge Feathering to blend the PNG into the Infinite Canvas
            maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 50%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 50%, transparent 95%)'
          }}
        />

        {/* Desktop-specific adjustments (override for widescreen immersion) */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            .absolute.inset-0.bg-no-repeat {
              background-size: cover !important;
              background-position: 92% bottom !important;
              -webkit-mask-image: none !important;
              mask-image: none !important;
            }
          }
        `}} />

        {/* Shadow floor for text and dock contrast (Mobile Only) */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
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
