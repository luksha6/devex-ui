'use client';

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import type { ControlSize } from '../../types';
import { FieldShell } from '../Field/FieldShell';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import styles from './SearchField.module.css';

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label: string;
  hint?: ReactNode;
  error?: string;
  size?: ControlSize;
  /** Fires when the clear control is pressed. Uncontrolled fields also empty the input. */
  onClear?: () => void;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { label, hint, error, id, className, value, defaultValue, onClear, size, onChange, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inner = useRef<HTMLInputElement | null>(null);
  const [draft, setDraft] = useState(() => String(value ?? defaultValue ?? ''));
  const hasValue = String(value ?? draft) !== '';

  function assignRef(node: HTMLInputElement | null) {
    inner.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (value === undefined) {
      setDraft(event.target.value);
    }
    onChange?.(event);
  }

  function clear() {
    onClear?.();
    if (value === undefined && inner.current) {
      inner.current.value = '';
      setDraft('');
      inner.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={inputId} className={className}>
      {(describedBy) => (
        <div className={styles.wrap}>
          <span className={styles.leading} aria-hidden="true">
            <Icon name="search" />
          </span>
          <Input
            {...rest}
            ref={assignRef}
            id={inputId}
            type="search"
            value={value}
            defaultValue={defaultValue}
            size={size}
            onChange={handleChange}
            className={styles.input}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
          />
          {hasValue ? (
            <IconButton
              label="Clear"
              intent="ghost"
              size="sm"
              className={styles.clear}
              onClick={clear}
            >
              <Icon name="close" />
            </IconButton>
          ) : null}
        </div>
      )}
    </FieldShell>
  );
});
