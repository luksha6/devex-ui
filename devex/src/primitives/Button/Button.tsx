import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { ButtonFill, ButtonIntent, ButtonSize } from '../../types';
import { cx } from '../../utils/cx';
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
    children,
    ...rest
  },
  ref,
) {
  const paint = resolvedFill(intent, fill);
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cx(styles.button, styles[intent], styles[size], paint && styles[paint], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? <Spinner size={12} label="" /> : leading}
      {children}
      {trailing}
    </button>
  );
});
