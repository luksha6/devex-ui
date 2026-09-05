import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TextLink } from '../TextLink/TextLink';
import styles from './AppShell.module.css';

export interface AppShellProps {
  nav?: ReactNode;
  sidebar?: ReactNode;
  rail?: ReactNode;
  children: ReactNode;
  skipLabel?: string;
  contentId?: string;
  measure?: 'prose' | 'wide';
  sidebarLabel?: string;
  className?: string;
}

export function AppShell({
  nav,
  sidebar,
  rail,
  children,
  skipLabel = 'Skip to content',
  contentId = 'devex-main',
  measure = 'wide',
  sidebarLabel = 'Sections',
  className,
}: AppShellProps) {
  return (
    <div className={cx(styles.shell, className)}>
      <TextLink className={styles.skip} href={`#${contentId}`}>
        {skipLabel}
      </TextLink>
      {nav}
      <div
        className={cx(
          styles.frame,
          sidebar ? styles.withSidebar : undefined,
          rail ? styles.withRail : undefined,
        )}
      >
        {sidebar ? (
          <aside className={styles.sidebar} aria-label={sidebarLabel}>
            {sidebar}
          </aside>
        ) : null}
        <article
          id={contentId}
          className={cx(styles.article, measure === 'wide' && styles.wide)}
          tabIndex={-1}
        >
          {children}
        </article>
        {rail ? <aside className={styles.rail}>{rail}</aside> : null}
      </div>
    </div>
  );
}
