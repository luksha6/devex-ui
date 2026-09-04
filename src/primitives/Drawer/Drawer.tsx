'use client';

import { forwardRef, useId, useRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useOverlayLock } from '../../utils/useOverlayLock';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Portal } from '../Portal/Portal';
import styles from './Drawer.module.css';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  /** `bottom` is the mobile sheet. `end` is the side panel (becomes bottom under 640px). */
  side?: 'bottom' | 'end';
  className?: string;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { open, onClose, title, children, actions, side = 'bottom', className },
  ref,
) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <DrawerFrame
        ref={ref}
        onClose={onClose}
        title={title}
        actions={actions}
        side={side}
        className={className}
      >
        {children}
      </DrawerFrame>
    </Portal>
  );
});

const DrawerFrame = forwardRef<HTMLDivElement, Omit<DrawerProps, 'open'>>(function DrawerFrame(
  { onClose, title, children, actions, side = 'bottom', className },
  ref,
) {
  const titleId = useId();
  const bodyId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const described = Boolean(children);
  useOverlayLock(panelRef, onClose);

  function assignRef(node: HTMLDivElement | null) {
    panelRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  return (
    <div
      className={cx(styles.backdrop, side === 'end' ? styles.backdropEnd : styles.backdropBottom)}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={assignRef}
        className={cx(
          styles.panel,
          side === 'end' ? styles.panelEnd : styles.panelBottom,
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={described ? bodyId : undefined}
        tabIndex={-1}
      >
        <div className={styles.grab} aria-hidden="true" />
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <IconButton label="Close" intent="ghost" className={styles.close} onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </div>
        {children ? (
          <div id={bodyId} className={styles.body}>
            {children}
          </div>
        ) : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  );
});
