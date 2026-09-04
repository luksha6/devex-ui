import { useId, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './PropertyField.module.css';

export interface PropertyFieldProps {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PropertyField({ label, hint, children, className }: PropertyFieldProps) {
  const labelId = useId();
  const hintId = hint ? `${labelId}-hint` : undefined;

  return (
    <div
      className={cx(styles.row, className)}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={hintId}
    >
      <div className={styles.meta}>
        <p id={labelId} className={styles.label}>
          {label}
        </p>
        {hint ? (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        ) : null}
      </div>
      <div className={styles.control}>{children}</div>
    </div>
  );
}
