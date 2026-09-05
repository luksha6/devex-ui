import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TextLink } from '../TextLink/TextLink';
import styles from './Page.module.css';

export interface PageProps {
  nav?: ReactNode;
  rail?: ReactNode;
  children: ReactNode;
  skipLabel?: string;
  contentId?: string;
  measure?: 'prose' | 'wide';
  className?: string;
}

export function Page({
  nav,
  rail,
  children,
  skipLabel = 'Skip to content',
  contentId = 'devex-main',
  measure = 'prose',
  className,
}: PageProps) {
  return (
    <div className={cx(styles.page, className)}>
      <TextLink className={styles.skip} href={`#${contentId}`}>
        {skipLabel}
      </TextLink>
      {nav}
      <div className={cx(styles.body, rail ? styles.withRail : undefined)}>
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
