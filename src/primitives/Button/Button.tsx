import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import type { ButtonFill, ButtonIntent, ButtonSize } from '../../types';
import { cx } from '../../utils/cx';
import { isSafeHref } from '../../utils/safeHref';
import { resolvedFill } from '../../utils/resolvedFill';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  fill?: ButtonFill;
  size?: ButtonSize;
  loading?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    intent = 'primary',
    fill,
    size = 'md',
    loading = false,
    leading,
    trailing,
    className,
    type = 'button',
    disabled,
    href,
    target,
    rel,
    children,
    ...rest
  },
  ref,
) {
  const paint = resolvedFill(intent, fill);
  const classNameResolved = cx(
    styles.button,
    styles[intent],
    styles[size],
    paint && styles[paint],
    className,
  );
  const inner = (
    <>
      {loading ? <Spinner size={12} label="" /> : leading}
      {children}
      {trailing}
    </>
  );
  if (href && isSafeHref(href) && !disabled && !loading) {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as never}
        className={classNameResolved}
        href={href}
        target={target}
        rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        aria-busy={loading || undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classNameResolved}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {inner}
    </button>
  );
});
