import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import type { ControlSize } from '../../types';
import { cx } from '../../utils/cx';
import { FieldShell } from '../Field/FieldShell';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: ReactNode;
  error?: string;
  size?: ControlSize;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className, rows = 4, size = 'md', ...rest },
  ref,
) {
  const generatedId = useId();
  const areaId = id ?? generatedId;

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={areaId} className={className}>
      {(describedBy) => (
        <textarea
          {...rest}
          ref={ref}
          id={areaId}
          rows={rows}
          className={cx(styles.area, styles[size])}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      )}
    </FieldShell>
  );
});
