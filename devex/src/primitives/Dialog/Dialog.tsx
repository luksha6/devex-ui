'use client';

import { forwardRef, useId, useRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useOverlayLock } from '../../utils/useOverlayLock';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Portal } from '../Portal/Portal';
import styles from './Dialog.module.css';

/** Modal. Not compound — no Dialog.Header, Dialog.Root, or DialogContent. */
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  /** Dialog width. Not control size. */
  width?: 'sm' | 'md';
  className?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, onClose, title, children, actions, width = 'md', className },
  ref,
) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <DialogFrame
        ref={ref}
        onClose={onClose}
        title={title}
        actions={actions}
        width={width}
        className={className}
      >
        {children}
      </DialogFrame>
    </Portal>
  );
});

const DialogFrame = forwardRef<HTMLDivElement, Omit<DialogProps, 'open'>>(function DialogFrame(
  { onClose, title, children, actions, width = 'md', className },
  ref,
) {
  const titleId = useId();
  const bodyId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const described = Boolean(children);
  useOverlayLock(dialogRef, onClose);

  function assignRef(node: HTMLDivElement | null) {
    dialogRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={assignRef}
        className={cx(styles.dialog, styles[width], className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={described ? bodyId : undefined}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <IconButton label="Close" intent="ghost" className={styles.close} onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </div>
        {children ? <div id={bodyId}>{children}</div> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  );
});
