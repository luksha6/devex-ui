'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { AlertKind } from '../../types';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Portal } from '../Portal/Portal';
import styles from './Toast.module.css';

export interface ToastRecord {
  id: string;
  kind?: AlertKind;
  title: string;
  detail?: string;
}

type ToastApi = {
  show: (record: Omit<ToastRecord, 'id'> & { id?: string; ttl?: number }) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

const ToastContext = createContext<ToastApi | null>(null);

const KIND_LABEL: Record<AlertKind, string> = {
  note: 'Note',
  ok: 'Ok',
  caution: 'Caution',
  critical: 'Critical',
};

const KIND_ICON: Record<AlertKind, 'info' | 'check' | 'caution'> = {
  note: 'info',
  ok: 'check',
  caution: 'caution',
  critical: 'caution',
};

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `toast-${crypto.randomUUID()}`;
  }
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Mount around the click target. Call `useToast().show` from inside. */
export function ToastProvider({ children }: { children?: ReactNode }) {
  const [queue, setQueue] = useState<ToastRecord[]>([]);
  const timers = useRef(new Map<string, number>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer !== undefined && typeof window !== 'undefined') {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
    setQueue((items) => items.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    if (typeof window !== 'undefined') {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    }
    timers.current.clear();
    setQueue([]);
  }, []);

  const show = useCallback(
    (record: Omit<ToastRecord, 'id'> & { id?: string; ttl?: number }) => {
      const id = record.id ?? makeId();
      const next: ToastRecord = {
        id,
        kind: record.kind,
        title: record.title,
        detail: record.detail,
      };
      setQueue((items) => [...items, next].slice(-3));
      const ttl = record.ttl ?? 4000;
      if (ttl > 0 && typeof window !== 'undefined') {
        const previous = timers.current.get(id);
        if (previous !== undefined) {
          window.clearTimeout(previous);
        }
        timers.current.set(
          id,
          window.setTimeout(() => {
            timers.current.delete(id);
            dismiss(id);
          }, ttl),
        );
      }
      return id;
    },
    [dismiss],
  );

  const api = useMemo(() => ({ show, dismiss, clear }), [show, dismiss, clear]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {queue.length > 0 ? (
        <Portal>
          <div className={styles.stack} aria-live="polite" aria-atomic="true">
            {queue.map((item) => (
              <ToastItem key={item.id} item={item} onDismiss={() => dismiss(item.id)} />
            ))}
          </div>
        </Portal>
      ) : null}
    </ToastContext.Provider>
  );
}

function ToastItem({ item, onDismiss }: { item: ToastRecord; onDismiss: () => void }) {
  const kind = item.kind ?? 'note';
  const critical = kind === 'critical';
  return (
    <div className={cx(styles.item, styles[kind])} role={critical ? 'alert' : 'status'}>
      <span className={styles.icon} aria-hidden="true">
        <Icon name={KIND_ICON[kind]} />
      </span>
      <div className={styles.body}>
        <p className={styles.kind}>{KIND_LABEL[kind]}</p>
        <p className={styles.title}>{item.title}</p>
        {item.detail ? <div className={styles.detail}>{item.detail}</div> : null}
      </div>
      <IconButton label="Dismiss" intent="ghost" size="sm" onClick={onDismiss}>
        <Icon name="close" />
      </IconButton>
    </div>
  );
}

/** Same as `ToastProvider`. Prefer `ToastProvider` in new code. */
export const Toaster = ToastProvider;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast requires ToastProvider');
  }
  return ctx;
}
