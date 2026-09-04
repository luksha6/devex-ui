import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import type { ControlSize } from '../../types';
import { Input } from '../Input/Input';
import { FieldShell } from './FieldShell';

export interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. `className` lands on the shell, not the input. */
  label: string;
  hint?: ReactNode;
  error?: string;
  size?: ControlSize;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, id, className, size, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={inputId} className={className}>
      {(describedBy) => (
        <Input
          {...rest}
          ref={ref}
          id={inputId}
          size={size}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      )}
    </FieldShell>
  );
});
