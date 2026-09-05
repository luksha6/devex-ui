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
    initialRef?: RefObject<HTMLElement | null>;
    dismissOnOutside?: boolean;
    stopEscape?: boolean;
  } = {},
) {
  const trap = options.trap ?? true;
  const lock = options.lock ?? true;
  const dismissOnOutside = options.dismissOnOutside ?? !trap;
  const stopEscape = options.stopEscape ?? !trap;
  const rootRef = options.rootRef;
  const initialRef = options.initialRef;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = panelRef.current;
    const focusables = panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    const initial = initialRef?.current;
    (
      initial ??
      focusables.find((node) => node.getAttribute('data-devex-initial') !== 'skip') ??
      panel
    )?.focus();
    if (lock) {
      acquireDialogLock();
    }
    let restore = true;

    function nodes() {
      return panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (stopEscape) {
          event.stopPropagation();
        }
        onCloseRef.current();
        return;
      }
      if (event.key === 'Tab' && !trap) {
        event.preventDefault();
        restore = false;
        const outside = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (node) => !panel?.contains(node),
        );
        const trigger =
          rootRef?.current?.querySelector<HTMLElement>(FOCUSABLE) ?? previouslyFocused;
        const index = trigger ? outside.indexOf(trigger) : -1;
        const next = event.shiftKey
          ? index > 0
            ? outside[index - 1]
            : null
          : index >= 0
            ? outside[index + 1]
            : null;
        onCloseRef.current();
        next?.focus();
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
      const target = event.target;
      const host =
        target instanceof Element
          ? target.closest('[role="dialog"], [role="menu"], [role="listbox"], [role="tooltip"]')
          : null;
      if (host && host !== panel && !panel.contains(host)) {
        return;
      }
      const list = nodes();
      (list[0] ?? panel).focus();
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (panel?.contains(target) || rootRef?.current?.contains(target)) {
        return;
      }
      onCloseRef.current();
    }

    document.addEventListener('keydown', onKeyDown, stopEscape);
    document.addEventListener('focusin', onFocusIn);
    if (dismissOnOutside) {
      document.addEventListener('pointerdown', onPointerDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown, stopEscape);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('pointerdown', onPointerDown);
      if (lock) {
        releaseDialogLock();
      }
      if (restore) {
        previouslyFocused?.focus();
      }
    };
  }, [dismissOnOutside, initialRef, lock, panelRef, rootRef, stopEscape, trap]);
}
