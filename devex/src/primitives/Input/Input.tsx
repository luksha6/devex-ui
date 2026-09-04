import { forwardRef, type InputHTMLAttributes } from 'react';
import type { ControlSize } from '../../types';
import { cx } from '../../utils/cx';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ControlSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', className, type = 'text', ...rest },
  ref,
) {
  return (
    <input {...rest} ref={ref} type={type} className={cx(styles.input, styles[size], className)} />
  );
});
