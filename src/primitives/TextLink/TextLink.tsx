import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './TextLink.module.css';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(function TextLink(
  { className, children, ...rest },
  ref,
) {
  return (
    <a {...rest} ref={ref} className={cx(styles.link, className)}>
      {children}
    </a>
  );
});
