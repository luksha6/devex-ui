import type { ElementType } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { TextLink } from '../TextLink/TextLink';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  label?: string;
  linkAs?: ElementType;
  className?: string;
}

export function Breadcrumb({ items, label = 'Breadcrumb', linkAs, className }: BreadcrumbProps) {
  return (
    <nav className={cx(styles.nav, className)} aria-label={label}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 ? (
                <span className={styles.sep} aria-hidden="true">
                  <Icon name="chevron-right" size={12} />
                </span>
              ) : null}
              {last || !item.href ? (
                <span className={styles.here} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <TextLink href={item.href} as={linkAs} className={styles.link}>
                  {item.label}
                </TextLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
