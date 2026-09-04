'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container?: Element | null;
}

export function Portal({ children, container }: PortalProps) {
  const [target, setTarget] = useState<Element | null>(
    () => container ?? (typeof document !== 'undefined' ? document.body : null),
  );

  useEffect(() => {
    setTarget(container ?? document.body);
  }, [container]);

  if (!target) {
    return null;
  }

  return createPortal(children, target);
}
