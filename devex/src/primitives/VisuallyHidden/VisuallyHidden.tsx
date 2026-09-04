import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './VisuallyHidden.module.css';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function VisuallyHidden({ className, children, ...rest }: VisuallyHiddenProps) {
  return (
    <span {...rest} className={cx(styles.hide, className)}>
      {children}
    </span>
  );
}
