'use client';

import { useState, type ElementType, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Drawer } from '../Drawer/Drawer';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
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
  label?: string;
  menuLabel?: string;
  closeLabel?: string;
  linkAs?: ElementType;
  className?: string;
}

export function Nav({
  brand,
  brandHref = '/',
  links = [],
  trailing,
  label = 'Primary',
  menuLabel = 'Open menu',
  closeLabel,
  linkAs,
  className,
}: NavProps) {
  const [open, setOpen] = useState(false);

  const items = (suffix: string) =>
    links.map((link) => (
      <NavItem key={`${suffix}-${link.href}`} href={link.href} current={link.current} as={linkAs}>
        {link.label}
      </NavItem>
    ));

  return (
    <nav className={cx(styles.nav, className)} aria-label={label}>
      <TextLink className={styles.brand} href={brandHref} as={linkAs}>
        {brand}
      </TextLink>
      {links.length > 0 ? <div className={styles.links}>{items('bar')}</div> : null}
      {trailing}
      {links.length > 0 ? (
        <div className={styles.menu}>
          <IconButton label={menuLabel} intent="ghost" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </IconButton>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            title={label}
            closeLabel={closeLabel}
            side="end"
          >
            <div className={styles.sheet}>{items('sheet')}</div>
          </Drawer>
        </div>
      ) : null}
    </nav>
  );
}
