'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import type { ControlSize } from '../../types';
import { cx } from '../../utils/cx';
import { FieldShell } from '../Field/FieldShell';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import type { SelectOption } from '../Select/Select';
import styles from './MultiSelect.module.css';

export interface MultiSelectProps {
  label: string;
  options: readonly SelectOption[];
  /** Selected option values. Controlled. */
  value: readonly string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  hint?: ReactNode;
  error?: string;
  size?: ControlSize;
  /** When set, further adds are ignored. Removals still work. */
  max?: number;
  empty?: ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(function MultiSelect(
  {
    label,
    options,
    value,
    onChange,
    placeholder = 'Search',
    hint,
    error,
    size = 'md',
    max,
    empty = 'No matches',
    disabled = false,
    id,
    className,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const selected = useMemo(() => {
    const set = new Set(value);
    return options.filter((option) => set.has(option.value));
  }, [options, value]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  const enabledIds = useMemo(
    () => visible.filter((option) => !option.disabled).map((option) => option.value),
    [visible],
  );

  function assignRef(node: HTMLInputElement | null) {
    inner.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  function close() {
    setOpen(false);
    setQuery('');
    setActive(null);
  }

  function toggle(next: string) {
    const option = options.find((item) => item.value === next);
    if (!option || option.disabled || disabled) {
      return;
    }
    if (value.includes(next)) {
      onChange(value.filter((item) => item !== next));
      return;
    }
    if (max != null && value.length >= max) {
      return;
    }
    onChange([...value, next]);
  }

  function move(delta: number) {
    if (enabledIds.length === 0) {
      return;
    }
    const current = active ? enabledIds.indexOf(active) : -1;
    const index =
      current < 0
        ? delta > 0
          ? 0
          : enabledIds.length - 1
        : (current + delta + enabledIds.length) % enabledIds.length;
    setActive(enabledIds[index] ?? null);
  }

  useEffect(() => {
    if (!open) {
      return;
    }
    function onPointerDown(event: PointerEvent) {
      if (wrapRef.current?.contains(event.target as Node)) {
        return;
      }
      close();
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (active && enabledIds.includes(active)) {
      return;
    }
    setActive(enabledIds[0] ?? null);
  }, [open, active, enabledIds]);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      }
      move(1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      }
      move(-1);
      return;
    }
    if (event.key === 'Home' && open) {
      event.preventDefault();
      setActive(enabledIds[0] ?? null);
      return;
    }
    if (event.key === 'End' && open) {
      event.preventDefault();
      setActive(enabledIds[enabledIds.length - 1] ?? null);
      return;
    }
    if (event.key === 'Enter' && open && active) {
      event.preventDefault();
      toggle(active);
      return;
    }
    if (event.key === 'Backspace' && query === '' && value.length > 0) {
      event.preventDefault();
      onChange(value.slice(0, -1));
    }
  }

  const activeId = open && active ? `${inputId}-opt-${active}` : undefined;
  const atMax = max != null && value.length >= max;

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={inputId} className={className}>
      {(describedBy) => (
        <div
          ref={wrapRef}
          className={styles.wrap}
          onKeyDownCapture={(event) => {
            if (event.key === 'Escape' && open) {
              event.preventDefault();
              close();
              inner.current?.focus();
            }
          }}
        >
          <div className={styles.control}>
            <span className={styles.leading} aria-hidden="true">
              <Icon name="search" />
            </span>
            <Input
              ref={assignRef}
              id={inputId}
              role="combobox"
              size={size}
              className={styles.input}
              value={query}
              disabled={disabled}
              placeholder={placeholder}
              autoComplete="off"
              aria-expanded={open}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-activedescendant={activeId}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
            />
            {open ? (
              <ul id={listId} className={styles.list} role="listbox" aria-multiselectable="true">
                {visible.length === 0 ? (
                  <li className={styles.empty}>{empty}</li>
                ) : (
                  visible.map((option) => {
                    const selectedOption = value.includes(option.value);
                    const blocked = Boolean(option.disabled || (atMax && !selectedOption));
                    return (
                      <li key={option.value} className={styles.item}>
                        <button
                          type="button"
                          id={`${inputId}-opt-${option.value}`}
                          role="option"
                          className={cx(
                            styles.option,
                            option.value === active && styles.active,
                            blocked && styles.blocked,
                          )}
                          aria-selected={selectedOption}
                          aria-disabled={blocked || undefined}
                          disabled={blocked}
                          onMouseEnter={() => {
                            if (!blocked) {
                              setActive(option.value);
                            }
                          }}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => toggle(option.value)}
                        >
                          <span
                            className={cx(styles.mark, selectedOption && styles.markOn)}
                            aria-hidden="true"
                          >
                            <Icon name="check" size={12} />
                          </span>
                          {option.label}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            ) : null}
          </div>
          {selected.length > 0 ? (
            <ul className={styles.chips} aria-label={`${label} selected`}>
              {selected.map((option) => (
                <li key={option.value} className={styles.chip}>
                  <span className={styles.chipLabel}>{option.label}</span>
                  <button
                    type="button"
                    className={styles.remove}
                    aria-label={`Remove ${option.label}`}
                    disabled={disabled}
                    onClick={() => toggle(option.value)}
                  >
                    <Icon name="close" size={12} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </FieldShell>
  );
});
