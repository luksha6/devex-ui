'use client';

import { useRef, type KeyboardEvent } from 'react';

export function useRovingTabIndex<T extends string>(
  ids: readonly T[],
  value: T,
  onChange: (next: T) => void,
) {
  const refs = useRef(new Map<string, HTMLButtonElement>());

  function select(next: T) {
    onChange(next);
    queueMicrotask(() => refs.current.get(next)?.focus());
  }

  function onKeyDown(event: KeyboardEvent) {
    const index = ids.findIndex((id) => id === value);
    if (index < 0) {
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = ids[(index + delta + ids.length) % ids.length];
      if (next) {
        select(next);
      }
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      const first = ids[0];
      if (first) {
        select(first);
      }
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      const last = ids[ids.length - 1];
      if (last) {
        select(last);
      }
    }
  }

  function setRef(id: T) {
    return (node: HTMLButtonElement | null) => {
      if (node) {
        refs.current.set(id, node);
      } else {
        refs.current.delete(id);
      }
    };
  }

  return { select, onKeyDown, setRef };
}
