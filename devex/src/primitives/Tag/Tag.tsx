import type { Lifecycle } from '../../types';
import { cx } from '../../utils/cx';
import styles from './Tag.module.css';

export interface TagProps {
  kind: Lifecycle;
  children?: string;
  className?: string;
}

export function Tag({ kind, children, className }: TagProps) {
  const label = children ?? kind;
  return (
    <span className={cx(styles.tag, styles[kind], className)}>
      <span className={cx(styles.dot, kind === 'internal' && styles.hollow)} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export function RequiredTag({
  children = 'req',
  className,
}: {
  children?: string;
  className?: string;
}) {
  return <span className={cx(styles.tag, styles.req, className)}>{children}</span>;
}
