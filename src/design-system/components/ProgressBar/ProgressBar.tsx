import { cx } from '../../utils/cx';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
  label?: string;
  'aria-label'?: string;
  className?: string;
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function ProgressBar({
  value,
  label,
  'aria-label': ariaLabel,
  className,
}: ProgressBarProps) {
  const clamped = clamp(value);

  return (
    <div className={cx(styles.wrap, className)}>
      {label ? (
        <div className={styles.meta}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{Math.round(clamped)}%</span>
        </div>
      ) : null}
      <progress
        className={styles.bar}
        max={100}
        value={clamped}
        aria-label={ariaLabel ?? label ?? 'Progress'}
        data-complete={clamped >= 100}
      />
    </div>
  );
}
