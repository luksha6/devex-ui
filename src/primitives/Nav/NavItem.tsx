import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TextLink } from '../TextLink/TextLink';
import styles from './NavItem.module.css';

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
  children: ReactNode;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(function NavItem(
  { current, className, children, ...rest },
  ref,
) {
  return (
    <TextLink
      {...rest}
      ref={ref}
      className={cx(styles.item, current && styles.current, className)}
      aria-current={current ? 'page' : undefined}
    >
      {children}
    </TextLink>
  );
});
