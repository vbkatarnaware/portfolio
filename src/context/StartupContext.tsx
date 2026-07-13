import React, { createContext, useContext, useEffect, useState } from 'react';

export const StartupContext = createContext<number>(0);

export function useStartupPhase() {
  return useContext(StartupContext);
}

export function StartupProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 0: Initial state (0ms)
    // Phase 1: Wallpaper appears (100ms)
    // Phase 2: Menu bar fades in (300ms)
    // Phase 3: Dock slides up (500ms)
    // Phase 4: QRapid app bounce (700ms)
    // Phase 5: Hero typography fades in (900ms)
    // Phase 6: Rotating philosophy starts (1100ms)

    const timeouts = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 500),
      setTimeout(() => setPhase(4), 700),
      setTimeout(() => setPhase(5), 900),
      setTimeout(() => setPhase(6), 1100),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <StartupContext.Provider value={phase}>
      {children}
    </StartupContext.Provider>
  );
}
