import type { ReactNode } from 'react';
import styles from './specimens.module.css';

export function Foundation({
  title,
  rule,
  why,
  children,
}: {
  title: string;
  rule: string;
  why: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.lede}>
        <p className={styles.heading} role="heading" aria-level={1}>
          {title}
        </p>
        <p className={styles.rule}>{rule}</p>
      </header>
      {children}
      <p className={styles.why}>{why}</p>
    </div>
  );
}

export { styles as specimen };
