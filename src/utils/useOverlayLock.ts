'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { acquireDialogLock, releaseDialogLock } from './dialogLock';

const FOCUSABLE =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useOverlayLock(
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  options: {
    trap?: boolean;
    lock?: boolean;
    rootRef?: RefObject<HTMLElement | null>;
  } = {},
) {
  const trap = options.trap ?? true;
  const lock = options.lock ?? true;
  const rootRef = options.rootRef;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = panelRef.current;
    const focusables = panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    (focusables[0] ?? panel)?.focus();
    if (lock) {
      acquireDialogLock();
    }

    function nodes() {
      return panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key === 'Tab' && !trap) {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panel || !trap) {
        return;
      }
      const list = nodes();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) {
        event.preventDefault();
        panel.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function onFocusIn(event: FocusEvent) {
      if (!trap || !panel || panel.contains(event.target as Node)) {
        return;
      }
      const list = nodes();
      (list[0] ?? panel).focus();
    }

    function onPointerDown(event: PointerEvent) {
      const root = rootRef?.current ?? panel;
      if (!root || root.contains(event.target as Node)) {
        return;
      }
      onCloseRef.current();
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);
    if (!trap) {
      document.addEventListener('pointerdown', onPointerDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('pointerdown', onPointerDown);
      if (lock) {
        releaseDialogLock();
      }
      previouslyFocused?.focus();
    };
  }, [lock, panelRef, rootRef, trap]);
}
