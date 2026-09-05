'use client';

import { forwardRef, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../../primitives/Button/Button';
import { Textarea } from '../../primitives/Textarea/Textarea';
import { cx } from '../../utils/cx';
import styles from './Composer.module.css';

export interface ComposerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  error?: string;
  submitLabel?: string;
  disabled?: boolean;
  busy?: boolean;
  className?: string;
}

export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(function Composer(
  {
    label,
    value,
    onChange,
    onSubmit,
    placeholder = 'Ask for a run',
    hint = 'Control or Command plus Enter sends.',
    error,
    submitLabel = 'Send',
    disabled = false,
    busy = false,
    className,
  },
  ref,
) {
  function send() {
    const next = value.trim();
    if (!next || disabled || busy) {
      return;
    }
    onSubmit(next);
  }

  function onForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send();
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      send();
    }
  }

  return (
    <form className={cx(styles.form, className)} onSubmit={onForm}>
      <Textarea
        ref={ref}
        label={label}
        value={value}
        placeholder={placeholder}
        hint={hint}
        error={error}
        disabled={disabled || busy}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className={styles.actions}>
        <Button type="submit" loading={busy} disabled={disabled || value.trim() === ''}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
});
