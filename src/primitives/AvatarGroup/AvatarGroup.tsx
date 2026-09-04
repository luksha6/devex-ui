import { Children, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './AvatarGroup.module.css';

export interface AvatarGroupProps {
  label: string;
  max?: number;
  children: ReactNode;
  className?: string;
}

export function AvatarGroup({ label, max = 4, children, className }: AvatarGroupProps) {
  const avatars = Children.toArray(children);
  const visible = avatars.slice(0, max);
  const extra = avatars.length - visible.length;

  return (
    <div className={cx(styles.group, className)} role="group" aria-label={label}>
      {visible}
      {extra > 0 ? <span className={styles.extra}>+{extra}</span> : null}
    </div>
  );
}
