'use client';

import {
  Children,
  cloneElement,
  useId,
  useRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { cx } from '../../utils/cx';
import { useOverlayLock } from '../../utils/useOverlayLock';
import { useOverlayPosition } from '../../utils/useOverlayPosition';
import { Portal } from '../Portal/Portal';
import styles from './Popover.module.css';

type TriggerProps = {
  id?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  'aria-haspopup'?: 'dialog';
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
};

export interface PopoverProps {
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactElement<TriggerProps>;
  content: ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

export function Popover({
  label,
  open,
  onOpenChange,
  children,
  content,
  align = 'start',
  className,
}: PopoverProps) {
  const triggerId = useId();
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trigger = Children.only(children);
  const child = cloneElement(trigger, {
    id: trigger.props.id ?? triggerId,
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': open ? panelId : undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }
      onOpenChange(!open);
    },
  });

  return (
    <div ref={wrapRef} className={cx(styles.wrap, className)}>
      {child}
      {open ? (
        <PopoverPanel
          label={label}
          panelId={panelId}
          align={align}
          wrapRef={wrapRef}
          onOpenChange={onOpenChange}
        >
          {content}
        </PopoverPanel>
      ) : null}
    </div>
  );
}

function PopoverPanel({
  label,
  panelId,
  align,
  wrapRef,
  onOpenChange,
  children,
}: {
  label: string;
  panelId: string;
  align: 'start' | 'end';
  wrapRef: RefObject<HTMLDivElement | null>;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { style } = useOverlayPosition(wrapRef, panelRef, true, align);
  useOverlayLock(panelRef, () => onOpenChange(false), {
    trap: true,
    lock: false,
    rootRef: wrapRef,
    dismissOnOutside: true,
    stopEscape: true,
  });

  return (
    <Portal>
      <div
        ref={panelRef}
        id={panelId}
        className={styles.panel}
        style={style}
        role="dialog"
        aria-label={label}
        tabIndex={-1}
      >
        {children}
      </div>
    </Portal>
  );
}
