import React, { createContext, useContext, useState, useCallback } from 'react';

export type AppId = 'finder' | 'qrapid' | 'icici' | 'careeros' | 'rizent' | 'moatdaily';

export interface WindowData {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultWidth?: number;
  defaultHeight?: number;
  /** Cascade slot assigned on open: each open window is offset ~30px down-right
   *  from the previous so stacked windows stay visibly distinct (real-macOS
   *  cascade behavior). Only set on closed→open transitions. */
  cascade?: number;
}

interface WindowContextType {
  windows: Record<AppId, WindowData>;
  openWindow: (id: AppId, title?: string, defaultWidth?: number, defaultHeight?: number) => void;
  closeWindow: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  updateWindowTitle: (id: AppId, title: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

// Initial state map
const initialWindows: Record<AppId, WindowData> = {
  finder: { id: 'finder', title: 'Explore Me', isOpen: typeof window !== 'undefined' && ['/about', '/experience', '/resume', '/contact', '/products'].includes(window.location.pathname), isMinimized: false, isMaximized: false, zIndex: 10, defaultWidth: 920, defaultHeight: 600 },
  qrapid: { id: 'qrapid', title: 'QRapid', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 11, defaultWidth: 920, defaultHeight: 620 },
  icici: { id: 'icici', title: 'ICICI Bank', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 12, defaultWidth: 920, defaultHeight: 620 },
  careeros: { id: 'careeros', title: 'CareerOS', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 13, defaultWidth: 920, defaultHeight: 620 },
  rizent: { id: 'rizent', title: 'Rizent AI', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 14, defaultWidth: 920, defaultHeight: 620 },
  moatdaily: { id: 'moatdaily', title: 'MoatDaily', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 15, defaultWidth: 920, defaultHeight: 620 },
};

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowData>>(initialWindows);
  const [highestZ, setHighestZ] = useState(20);

  const bringToFront = useCallback((id: AppId) => {
    setHighestZ(prev => {
      const nextZ = prev + 1;
      setWindows(curr => ({
        ...curr,
        [id]: { ...curr[id], zIndex: nextZ }
      }));
      return nextZ;
    });
  }, []);

  const openWindow = useCallback((id: AppId, title?: string, defaultWidth?: number, defaultHeight?: number) => {
    setHighestZ(prev => {
      const nextZ = prev + 1;
      setWindows(curr => {
        // Assign a cascade slot only when actually opening (closed → open).
        // Re-clicking an already-open app just brings it forward in place.
        const wasOpen = curr[id].isOpen;
        const openCount = Object.values(curr).filter(w => w.isOpen).length;
        return {
          ...curr,
          [id]: {
            ...curr[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
            ...(!wasOpen && { cascade: openCount % 5 }),
            ...(title && { title }),
            ...(defaultWidth && { defaultWidth }),
            ...(defaultHeight && { defaultHeight })
          }
        };
      });
      return nextZ;
    });
  }, []);

  const closeWindow = useCallback((id: AppId) => {
    setWindows(curr => ({
      ...curr,
      [id]: { ...curr[id], isOpen: false }
    }));
  }, []);

  const updateWindowTitle = useCallback((id: AppId, title: string) => {
    setWindows(curr => ({
      ...curr,
      [id]: { ...curr[id], title }
    }));
  }, []);

  const toggleMinimize = useCallback((id: AppId) => {
    setWindows(curr => ({
      ...curr,
      [id]: { ...curr[id], isMinimized: !curr[id].isMinimized }
    }));
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows(curr => ({
      ...curr,
      [id]: { ...curr[id], isMaximized: !curr[id].isMaximized }
    }));
  }, []);

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, toggleMinimize, toggleMaximize, bringToFront, updateWindowTitle }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
};
