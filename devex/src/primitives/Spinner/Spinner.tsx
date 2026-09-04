import { cx } from '../../utils/cx';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 12 | 16 | 20;
  label?: string;
  className?: string;
}

export function Spinner({ size = 16, label = 'Loading', className }: SpinnerProps) {
  const labeled = label.length > 0;
  return (
    <svg
      className={cx(styles.spinner, className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role={labeled ? 'status' : undefined}
      aria-label={labeled ? label : undefined}
      aria-hidden={labeled ? undefined : true}
    >
      <circle className={styles.track} cx="8" cy="8" r="6" />
      <circle className={styles.head} cx="8" cy="8" r="6" />
    </svg>
  );
}
