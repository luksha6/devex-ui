import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Field.module.css';

export interface FieldShellProps {
  label: string;
  hint?: ReactNode;
  error?: string;
  htmlFor: string;
  className?: string;
  children: (describedBy?: string) => ReactNode;
}

export function FieldShell({ label, hint, error, htmlFor, className, children }: FieldShellProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children(describedBy)}
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
