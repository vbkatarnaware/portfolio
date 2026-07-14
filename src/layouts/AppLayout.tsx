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
  mobileAvatarSrc: string;
}

export default function Desktop({ initialBg, backgroundMap, mobileAvatarSrc }: AppLayoutProps) {
  return (
    <StartupProvider>
      <DesktopInner initialBg={initialBg} backgroundMap={backgroundMap} mobileAvatarSrc={mobileAvatarSrc} />
    </StartupProvider>
  );
}

function DesktopInner({ initialBg, backgroundMap, mobileAvatarSrc }: AppLayoutProps) {
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
      {/* Desktop Background */}
      <div
        className='absolute inset-0 hidden min-[1025px]:block bg-cover bg-[position:92%_bottom] bg-no-repeat transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
        style={{
          backgroundImage: `url(${backgroundMap[currentBg]})`,
          opacity: phase >= 1 ? 1 : 0
        }}
      />

      {/* Native (phone + iPad portrait) Background — independent background + foreground-avatar layers */}
      <div className="absolute inset-0 min-[1025px]:hidden bg-black z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: background — a clean gradient sampled from the wallpaper's own tones.
            (Not the wallpaper image itself: that source still has the figure baked in, which
            would double-expose against the independent avatar layer below.) */}
        <div
          className='absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
          style={{
            background: 'radial-gradient(120% 90% at 15% 8%, #4a4f5c 0%, #3a3f4a 35%, #55555f 60%, #cfc7c1 100%)',
            opacity: phase >= 1 ? 1 : 0
          }}
        />

        {/* Extremely Subtle Top Gradient (10% opacity) */}
        <div className="absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-black/10 to-transparent" />

        {/* Shadow floor for text and dock contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Layer 2: avatar — independent transparent-PNG foreground layer, sits above the background
          and its contrast gradients, but below the text (HeroContent is z-10). Sized and centered
          entirely with responsive CSS (clamp/svh/vw) — no per-device pixel values, no cropping
          (object-fit: contain), so it can never overlap the reserved title/philosophy text zones. */}
      <div
        className="absolute inset-0 min-[1025px]:hidden z-[5] flex flex-col items-center pointer-events-none transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          paddingTop: 'calc(max(env(safe-area-inset-top), 24px) + clamp(115px, 22svh, 180px))',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + max(min(150px, 22svh), 100px) + clamp(70px, 12svh, 110px))',
          opacity: phase >= 2 ? 1 : 0
        }}
      >
        <img
          src={mobileAvatarSrc}
          alt="Vipul Katarnaware"
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            maxHeight: '100%',
            width: 'auto',
            height: 'clamp(220px, 56svh, 560px)',
            maxWidth: '82vw',
            objectFit: 'contain'
          }}
        />
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
