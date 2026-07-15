import { useState, useCallback, useEffect } from 'react';

export const useResize = (initialWidth: number, initialHeight: number, minWidth = 300, minHeight = 200) => {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);

  const startResize = useCallback((e: React.PointerEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (e: PointerEvent) => {
      // In a robust implementation, we would use e.movementX/Y or track initial pointer vs current pointer.
      // For simplicity, we just adjust size based on movement.
      // This is a basic implementation that works best for bottom/right edges.
      setSize(prev => {
        let newWidth = prev.width;
        let newHeight = prev.height;

        if (resizeDirection?.includes('e')) newWidth += e.movementX;
        if (resizeDirection?.includes('w')) newWidth -= e.movementX;
        if (resizeDirection?.includes('s')) newHeight += e.movementY;
        if (resizeDirection?.includes('n')) newHeight -= e.movementY;

        return {
          width: Math.max(minWidth, newWidth),
          height: Math.max(minHeight, newHeight)
        };
      });
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing, resizeDirection, minWidth, minHeight]);

  return { size, setSize, startResize, isResizing };
};
