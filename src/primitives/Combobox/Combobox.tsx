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
  type RefObject,
} from 'react';
import type { ControlSize } from '../../types';
import { cx } from '../../utils/cx';
import { useOverlayPosition } from '../../utils/useOverlayPosition';
import { FieldShell } from '../Field/FieldShell';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { Portal } from '../Portal/Portal';
import type { SelectOption } from '../Select/Select';
import styles from './Combobox.module.css';

export type ComboboxOption = SelectOption;

export interface ComboboxProps {
  label: string;
  options: readonly ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  error?: string;
  size?: ControlSize;
  empty?: ReactNode;
  disabled?: boolean;
  clearLabel?: string;
  id?: string;
  className?: string;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    label,
    options,
    value,
    onChange,
    placeholder = 'Search',
    hint,
    error,
    size = 'md',
    empty = 'No matches',
    disabled = false,
    clearLabel = 'Clear',
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

  const selected = options.find((option) => option.value === value);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(needle) ||
        option.detail?.toLowerCase().includes(needle) ||
        option.group?.toLowerCase().includes(needle),
    );
  }, [options, query]);

  const enabledIds = useMemo(
    () => visible.filter((option) => !option.disabled).map((option) => option.value),
    [visible],
  );

  const groups = useMemo(() => {
    const seen: string[] = [];
    const buckets = new Map<string, ComboboxOption[]>();
    visible.forEach((option) => {
      const key = option.group ?? '';
      if (!buckets.has(key)) {
        seen.push(key);
        buckets.set(key, []);
      }
      buckets.get(key)?.push(option);
    });
    return seen.map((key) => ({ key, items: buckets.get(key) ?? [] }));
  }, [visible]);

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

  function choose(next: string) {
    const option = options.find((item) => item.value === next);
    if (!option || option.disabled || disabled) {
      return;
    }
    onChange(next);
    close();
    inner.current?.focus();
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
      if ((event.target as HTMLElement | null)?.closest?.(`[data-devex-list="${listId}"]`)) {
        return;
      }
      close();
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [listId, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (active && enabledIds.includes(active)) {
      return;
    }
    setActive(value && enabledIds.includes(value) ? value : (enabledIds[0] ?? null));
  }, [open, active, enabledIds, value]);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
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
      choose(active);
    }
  }

  const activeId = open && active ? `${inputId}-opt-${active}` : undefined;
  const shown = open ? query : (selected?.label ?? '');

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={inputId} className={className}>
      {(describedBy) => (
        <div
          ref={wrapRef}
          className={styles.wrap}
          onKeyDownCapture={(event) => {
            if (event.key === 'Escape' && open) {
              event.preventDefault();
              event.stopPropagation();
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
              className={cx(styles.input, value && styles.hasClear)}
              value={shown}
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
              onFocus={() => {
                setQuery('');
                setOpen(true);
              }}
              onKeyDown={onKeyDown}
            />
            {value ? (
              <IconButton
                className={styles.clear}
                label={clearLabel}
                size="sm"
                intent="ghost"
                disabled={disabled}
                onClick={() => {
                  onChange('');
                  setQuery('');
                  setOpen(true);
                  inner.current?.focus();
                }}
              >
                <Icon name="close" size={12} />
              </IconButton>
            ) : (
              <span className={styles.chevron} aria-hidden="true">
                <Icon name="chevron-down" />
              </span>
            )}
          </div>
          {open ? (
            <ComboboxList
              listId={listId}
              inputId={inputId}
              wrapRef={wrapRef}
              groups={groups}
              active={active}
              value={value}
              empty={empty}
              onActive={setActive}
              onChoose={choose}
            />
          ) : null}
        </div>
      )}
    </FieldShell>
  );
});

function ComboboxList({
  listId,
  inputId,
  wrapRef,
  groups,
  active,
  value,
  empty,
  onActive,
  onChoose,
}: {
  listId: string;
  inputId: string;
  wrapRef: RefObject<HTMLDivElement | null>;
  groups: readonly { key: string; items: ComboboxOption[] }[];
  active: string | null;
  value: string;
  empty: ReactNode;
  onActive: (id: string) => void;
  onChoose: (id: string) => void;
}) {
  const panelRef = useRef<HTMLUListElement>(null);
  const { style } = useOverlayPosition(wrapRef, panelRef, true);
  const trigger = wrapRef.current?.getBoundingClientRect();
  const count = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Portal>
      <ul
        ref={panelRef}
        id={listId}
        data-devex-list={listId}
        className={styles.list}
        style={{ ...style, minWidth: trigger?.width }}
        role="listbox"
      >
        {count === 0 ? (
          <li className={styles.empty}>{empty}</li>
        ) : (
          groups.flatMap((group) => [
            group.key ? (
              <li key={`g-${group.key}`} className={styles.group} role="presentation">
                {group.key}
              </li>
            ) : null,
            ...group.items.map((option) => {
              const selected = option.value === value;
              return (
                <li key={option.value} className={styles.item} role="presentation">
                  <button
                    type="button"
                    id={`${inputId}-opt-${option.value}`}
                    role="option"
                    className={cx(
                      styles.option,
                      option.value === active && styles.active,
                      option.disabled && styles.blocked,
                    )}
                    aria-selected={selected}
                    aria-disabled={option.disabled || undefined}
                    disabled={option.disabled}
                    onMouseEnter={() => {
                      if (!option.disabled) {
                        onActive(option.value);
                      }
                    }}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onChoose(option.value)}
                  >
                    <span className={cx(styles.mark, selected && styles.markOn)} aria-hidden="true">
                      <Icon name="check" size={12} />
                    </span>
                    <span className={styles.copy}>
                      {option.label}
                      {option.detail ? (
                        <span className={styles.detail}>{option.detail}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            }),
          ])
        )}
      </ul>
    </Portal>
  );
}
