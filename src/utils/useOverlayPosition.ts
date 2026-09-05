'use client';

import { useLayoutEffect, useState, type CSSProperties, type RefObject } from 'react';
import { placeOverlay, type OverlayAlign, type OverlaySide } from './placeOverlay';

export function useOverlayPosition(
  triggerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  open: boolean,
  align: OverlayAlign = 'start',
  prefer: OverlaySide = 'bottom',
): { style: CSSProperties; side: OverlaySide } {
  const [placed, setPlaced] = useState({
    top: 0,
    left: 0,
    side: prefer,
  });

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    let frames = 0;
    let raf = 0;
    function measure() {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!trigger || !panel) {
        if (frames < 8) {
          frames += 1;
          raf = requestAnimationFrame(measure);
        }
        return;
      }
      setPlaced(
        placeOverlay(
          trigger,
          { width: panel.width, height: panel.height },
          { width: window.innerWidth, height: window.innerHeight },
          { align, prefer },
        ),
      );
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [align, open, panelRef, prefer, triggerRef]);

  return {
    side: placed.side,
    style: {
      position: 'fixed',
      top: placed.top,
      left: placed.left,
      zIndex: 'var(--z-overlay)',
    },
  };
}
