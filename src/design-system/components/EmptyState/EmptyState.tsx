import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  title: string;
  message: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, message, action, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)} role="status">
      <svg className={styles.icon} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <rect
          x="6"
          y="14"
          width="28"
          height="18"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M6 18h28" stroke="currentColor" strokeWidth="2" />
        <path d="M16 10h8v4h-8z" fill="currentColor" />
      </svg>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {action}
    </div>
  );
}
