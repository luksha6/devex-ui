import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { ButtonFill, ButtonIntent, ButtonSize } from '../../types';
import { cx } from '../../utils/cx';
import { resolvedFill } from '../../utils/resolvedFill';
import { Spinner } from '../Spinner/Spinner';
import styles from './IconButton.module.css';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name. Maps to aria-label. Not a visible Field label. */
  label: string;
  intent?: ButtonIntent;
  fill?: ButtonFill;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    label,
    intent = 'secondary',
    fill,
    size = 'md',
    loading = false,
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
      aria-label={label}
      aria-busy={loading || undefined}
    >
      {loading ? <Spinner size={12} label="" /> : children}
    </button>
  );
});
