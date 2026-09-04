import { cx } from '../../utils/cx';
import styles from './StatCard.module.css';

export interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <article className={cx(styles.card, className)}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </article>
  );
}
