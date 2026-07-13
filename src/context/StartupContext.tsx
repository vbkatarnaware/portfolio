import React, { createContext, useContext, useEffect, useState } from 'react';

export const StartupContext = createContext<number>(0);

export function useStartupPhase() {
  return useContext(StartupContext);
}

export function StartupProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Determine if mobile for faster startup
    const isMobile = window.innerWidth < 768;
    const m = isMobile ? 0.6 : 1; // 40% faster on mobile

    const timeouts = [
      setTimeout(() => setPhase(1), 100 * m),
      setTimeout(() => setPhase(2), 300 * m),
      setTimeout(() => setPhase(3), 500 * m),
      setTimeout(() => setPhase(4), 700 * m),
      setTimeout(() => setPhase(5), 900 * m),
      setTimeout(() => setPhase(6), 1100 * m),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <StartupContext.Provider value={phase}>
      {children}
    </StartupContext.Provider>
  );
}
