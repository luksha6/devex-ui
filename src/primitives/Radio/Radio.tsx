'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import styles from './Radio.module.css';

interface RadioContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ label, value, onChange, name, children, className }: RadioGroupProps) {
  const generatedName = useId();
  const labelId = useId();
  return (
    <div className={cx(styles.group, className)} role="radiogroup" aria-labelledby={labelId}>
      <p id={labelId} className={styles.legend}>
        {label}
      </p>
      <RadioContext.Provider value={{ name: name ?? generatedName, value, onChange }}>
        {children}
      </RadioContext.Provider>
    </div>
  );
}

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange'
> {
  value: string;
  /** Visible label. Prefer this over `children`. */
  label?: ReactNode;
  children?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, children, className, disabled, ...rest },
  ref,
) {
  const group = useContext(RadioContext);
  if (!group) {
    throw new Error('Radio must be used inside RadioGroup');
  }

  const checked = group.value === value;

  return (
    <label className={cx(styles.row, className)}>
      <input
        {...rest}
        ref={ref}
        type="radio"
        className={styles.input}
        name={group.name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => group.onChange(value)}
      />
      <span className={styles.box} aria-hidden="true" />
      <span className={styles.label}>{label ?? children}</span>
    </label>
  );
});
