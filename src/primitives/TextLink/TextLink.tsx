import { forwardRef, type AnchorHTMLAttributes, type ElementType, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { isSafeHref } from '../../utils/safeHref';
import styles from './TextLink.module.css';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  as?: ElementType;
}

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(function TextLink(
  { className, children, href, target, rel, as, ...rest },
  ref,
) {
  const safe = href && isSafeHref(href) ? href : undefined;
  const blank = target === '_blank';
  if (!safe) {
    return <span className={cx(styles.link, className)}>{children}</span>;
  }
  const Tag = as ?? 'a';
  return (
    <Tag
      {...rest}
      ref={ref}
      href={safe}
      target={target}
      rel={blank ? (rel ?? 'noopener noreferrer') : rel}
      className={cx(styles.link, className)}
    >
      {children}
    </Tag>
  );
});
