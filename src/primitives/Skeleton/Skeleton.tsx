import { cx } from '../../utils/cx';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'block' | 'disc';
  lines?: number;
  label?: string;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  lines = 3,
  label = 'Loading',
  className,
}: SkeletonProps) {
  const count = variant === 'text' ? Math.max(1, lines) : 1;

  return (
    <div className={cx(styles.wrap, className)} aria-busy="true" aria-live="polite">
      <VisuallyHidden>{label}</VisuallyHidden>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cx(styles.bone, styles[variant], index === count - 1 && styles.last)}
        />
      ))}
    </div>
  );
}
