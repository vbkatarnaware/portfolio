import React, { createContext, useContext, useState, useCallback } from 'react';

export type AppId = 'finder' | 'qrapid' | 'icici' | 'careeros' | 'rizent' | 'moatdaily';

export interface Point { x: number; y: number; }
export interface Size { width: number; height: number; }

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
  /** Drag offset from the cascade-computed origin, and current size — both
   *  in-memory only (never persisted to storage), so a page refresh always
   *  resets every window to its default position/size, matching real macOS
   *  app relaunch behavior. Survive minimize/restore within the session. */
  position?: Point;
  size?: Size;
  /** Snapshot taken the instant a window is maximized, so exiting fullscreen
   *  restores the exact position/size it had before, not a default. */
  previousBounds?: { position: Point; size: Size };
}

interface WindowContextType {
  windows: Record<AppId, WindowData>;
  openWindow: (id: AppId, title?: string, defaultWidth?: number, defaultHeight?: number) => void;
  closeWindow: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  updateWindowTitle: (id: AppId, title: string) => void;
  updatePosition: (id: AppId, position: Point) => void;
  updateSize: (id: AppId, size: Size) => void;
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
    // Keep the address bar in sync with the Dock, mirroring in-window section
    // navigation (AppShell.handleSelect). Skipped when already there (e.g.
    // the initial deep-link mount) so it doesn't add a redundant history entry.
    if (typeof window !== 'undefined' && window.location.pathname !== `/${id}`) {
      window.history.pushState(null, '', `/${id}`);
    }
  }, []);

  const closeWindow = useCallback((id: AppId) => {
    setWindows(curr => {
      const next = { ...curr, [id]: { ...curr[id], isOpen: false } };
      // Only touch the URL if it was actually pointing at the window being
      // closed — closing via the Dock/traffic-light shouldn't clobber a URL
      // the user reached some other way. Deep-linked sections (/app/section)
      // reset to the app root: the section belongs to a window that no
      // longer exists once its content stops being on screen.
      if (typeof window !== 'undefined' && window.location.pathname.split('/')[1] === id) {
        const stillOpen = Object.values(next).filter(w => w.isOpen);
        if (stillOpen.length === 0) {
          window.history.pushState(null, '', '/');
        } else {
          const frontMost = stillOpen.reduce((a, b) => (b.zIndex > a.zIndex ? b : a));
          window.history.pushState(null, '', `/${frontMost.id}`);
        }
      }
      return next;
    });
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
    setWindows(curr => {
      const w = curr[id];
      if (!w.isMaximized) {
        // Entering fullscreen: snapshot exactly where the window was so the
        // green button always restores to it, not a default centered size.
        return {
          ...curr,
          [id]: {
            ...w,
            isMaximized: true,
            previousBounds: {
              position: w.position ?? { x: 0, y: 0 },
              size: w.size ?? { width: w.defaultWidth ?? 800, height: w.defaultHeight ?? 500 },
            },
          },
        };
      }
      // Exiting fullscreen: restore the snapshot.
      const bounds = w.previousBounds;
      return {
        ...curr,
        [id]: {
          ...w,
          isMaximized: false,
          ...(bounds && { position: bounds.position, size: bounds.size }),
        },
      };
    });
  }, []);

  const updatePosition = useCallback((id: AppId, position: Point) => {
    setWindows(curr => ({ ...curr, [id]: { ...curr[id], position } }));
  }, []);

  const updateSize = useCallback((id: AppId, size: Size) => {
    setWindows(curr => ({ ...curr, [id]: { ...curr[id], size } }));
  }, []);

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, toggleMinimize, toggleMaximize, bringToFront, updateWindowTitle, updatePosition, updateSize }}>
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
