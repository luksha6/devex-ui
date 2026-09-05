import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import type { ControlSize } from '../../types';
import { FieldShell } from '../Field/FieldShell';
import { Input } from '../Input/Input';

export interface DateFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label: string;
  hint?: ReactNode;
  error?: string;
  size?: ControlSize;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(function DateField(
  { label, hint, error, size = 'md', id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={fieldId} className={className}>
      {(describedBy) => (
        <Input
          {...rest}
          ref={ref}
          id={fieldId}
          type="date"
          size={size}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      )}
    </FieldShell>
  );
});
