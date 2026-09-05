'use client';

import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { useOverlayPosition } from '../../utils/useOverlayPosition';
import { Portal } from '../Portal/Portal';
import styles from './Tooltip.module.css';

type ChildProps = {
  'aria-describedby'?: string;
};

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement<ChildProps>;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const stickyRef = useRef(false);
  const [open, setOpen] = useState(false);
  const { style } = useOverlayPosition(wrapRef, tipRef, open, 'center', 'top');

  function openTip() {
    setOpen(true);
  }

  function closeTip() {
    stickyRef.current = false;
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeTip();
      }
    }
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    function onPointerDown(event: PointerEvent) {
      if (!stickyRef.current) {
        return;
      }
      if (wrapRef.current?.contains(event.target as Node)) {
        return;
      }
      closeTip();
    }
    const timer = window.setTimeout(() => {
      document.addEventListener('pointerdown', onPointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const describedBy = open
    ? [children.props['aria-describedby'], id].filter(Boolean).join(' ')
    : children.props['aria-describedby'];

  const child = open ? cloneElement(children, { 'aria-describedby': describedBy }) : children;

  return (
    <span
      ref={wrapRef}
      className={cx(styles.wrap, className)}
      onPointerDownCapture={(event) => {
        const touch = event.pointerType === 'touch' || event.pointerType === 'pen';
        const coarse = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
        if (touch || coarse) {
          stickyRef.current = true;
          openTip();
        }
      }}
      onMouseEnter={() => {
        if (!stickyRef.current) {
          openTip();
        }
      }}
      onMouseLeave={() => {
        if (!stickyRef.current) {
          setOpen(false);
        }
      }}
      onFocusCapture={() => {
        if (!stickyRef.current) {
          openTip();
        }
      }}
      onBlurCapture={(event) => {
        if (stickyRef.current) {
          return;
        }
        if (!wrapRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      {child}
      {open ? (
        <Portal>
          <span
            id={id}
            ref={tipRef}
            role="tooltip"
            className={cx(styles.tip, styles.open)}
            style={{ ...style, zIndex: 'var(--z-tooltip)' }}
          >
            {content}
          </span>
        </Portal>
      ) : null}
    </span>
  );
}
