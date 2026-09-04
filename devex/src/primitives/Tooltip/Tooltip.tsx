'use client';

import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { Portal } from '../Portal/Portal';
import styles from './Tooltip.module.css';

type ChildProps = {
  'aria-describedby'?: string;
};

export interface TooltipProps {
  content: ReactNode;
  /** Single focusable element. `aria-describedby` is merged only while open. */
  children: ReactElement<ChildProps>;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const stickyRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  function place() {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
  }

  function openTip() {
    place();
    setOpen(true);
  }

  function closeTip() {
    stickyRef.current = false;
    setOpen(false);
  }

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    place();
    function onScroll() {
      place();
    }
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeTip();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
            role="tooltip"
            className={cx(styles.tip, styles.open)}
            style={{ top: coords.top, left: coords.left }}
          >
            {content}
          </span>
        </Portal>
      ) : null}
    </span>
  );
}
