import { forwardRef, useId, type SelectHTMLAttributes, type ReactNode } from 'react';
import type { ControlSize } from '../../types';
import { cx } from '../../utils/cx';
import { FieldShell } from '../Field/FieldShell';
import { Icon } from '../Icon/Icon';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  size?: ControlSize;
  hint?: ReactNode;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, id, className, size = 'md', hint, error, ...rest },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={selectId} className={className}>
      {(describedBy) => (
        <div className={styles.wrap}>
          <select
            {...rest}
            ref={ref}
            id={selectId}
            className={cx(styles.select, styles[size])}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <Icon name="chevron-down" />
          </span>
        </div>
      )}
    </FieldShell>
  );
});
