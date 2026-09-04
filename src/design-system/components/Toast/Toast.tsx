import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Toast.module.css';

export type ToastTone = 'success' | 'info';

export interface ToastProps {
  title: string;
  description?: string;
  tone?: ToastTone;
  className?: string;
}

export function Toast({ title, description, tone = 'info', className }: ToastProps) {
  return (
    <div className={cx(styles.toast, className)} data-tone={tone} role="status">
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}

export interface ToastRecord {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
}

export function ToastViewport({ toasts }: { toasts: readonly ToastRecord[] }): ReactNode {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <ol className={styles.region} aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <li key={toast.id}>
          <Toast title={toast.title} description={toast.description} tone={toast.tone} />
        </li>
      ))}
    </ol>
  );
}
