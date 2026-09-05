import { cx } from '../../utils/cx';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cx(styles.vertical, className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return <hr className={cx(styles.horizontal, className)} />;
}
