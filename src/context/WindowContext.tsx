import React, { createContext, useContext, useState, useCallback } from 'react';

export type AppId = 'finder' | 'qrapid' | 'careeros' | 'moatdaily';

export interface WindowData {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultWidth?: number;
  defaultHeight?: number;
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
  qrapid: { id: 'qrapid', title: 'QRapid', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 11, defaultWidth: 900, defaultHeight: 600 },
  careeros: { id: 'careeros', title: 'CareerOS', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 12, defaultWidth: 900, defaultHeight: 600 },
  moatdaily: { id: 'moatdaily', title: 'MoatDaily', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 13, defaultWidth: 900, defaultHeight: 600 },
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
      setWindows(curr => ({
        ...curr,
        [id]: {
          ...curr[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
          ...(title && { title }),
          ...(defaultWidth && { defaultWidth }),
          ...(defaultHeight && { defaultHeight })
        }
      }));
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
