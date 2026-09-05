'use client';

import { useContext, useLayoutEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ThemeContext } from '../Theme/Theme';

export interface PortalProps {
  children: ReactNode;
  container?: Element | null;
}

export function Portal({ children, container }: PortalProps) {
  const theme = useContext(ThemeContext);
  const [target, setTarget] = useState<Element | null>(
    () => container ?? (typeof document !== 'undefined' ? document.body : null),
  );

  useLayoutEffect(() => {
    setTarget(container ?? document.body);
  }, [container]);

  if (!target) {
    return null;
  }

  return createPortal(
    <div data-devex="" data-theme={theme}>
      {children}
    </div>,
    target,
  );
}
