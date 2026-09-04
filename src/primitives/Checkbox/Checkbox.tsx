import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className={cx(styles.row, className)}>
      <input {...rest} ref={ref} id={inputId} type="checkbox" className={styles.input} />
      <span className={styles.box} aria-hidden="true">
        <Icon name="check" size={12} />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
});
