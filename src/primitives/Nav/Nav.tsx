import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TextLink } from '../TextLink/TextLink';
import { NavItem } from './NavItem';
import styles from './Nav.module.css';

export interface NavLink {
  href: string;
  label: string;
  current?: boolean;
}

export interface NavProps {
  brand: ReactNode;
  brandHref?: string;
  links?: readonly NavLink[];
  trailing?: ReactNode;
  /** Accessible name for the landmark. Default is Primary. */
  label?: string;
  className?: string;
}

export function Nav({
  brand,
  brandHref = '/',
  links = [],
  trailing,
  label = 'Primary',
  className,
}: NavProps) {
  return (
    <nav className={cx(styles.nav, className)} aria-label={label}>
      <TextLink className={styles.brand} href={brandHref}>
        {brand}
      </TextLink>
      {links.length > 0 ? (
        <div className={styles.links}>
          {links.map((link) => (
            <NavItem key={link.href} href={link.href} current={link.current}>
              {link.label}
            </NavItem>
          ))}
        </div>
      ) : null}
      {trailing}
    </nav>
  );
}
