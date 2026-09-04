import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  id,
  disabled,
  placeholder = 'Select',
  className,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const listboxId = `${selectId}-listbox`;
  const labelId = `${selectId}-label`;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value],
  );
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!open) {
      return;
    }
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open, selectedIndex]);

  function selectIndex(index: number) {
    const option = options[index];
    if (!option) {
      return;
    }
    onChange(option.value);
    setOpen(false);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }

    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        selectIndex(activeIndex);
      }
      if (event.key === 'ArrowDown') {
        setActiveIndex((index) => Math.min(index + 1, options.length - 1));
      }
      if (event.key === 'ArrowUp') {
        setActiveIndex((index) => Math.max(index - 1, 0));
      }
    }

    if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(Math.max(options.length - 1, 0));
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  const activeOption = options[activeIndex];
  const activeId = activeOption ? `${selectId}-option-${activeOption.value}` : undefined;

  return (
    <div className={cx(styles.field, className)} ref={rootRef}>
      <span className={styles.label} id={labelId}>
        {label}
      </span>
      <button
        type="button"
        id={selectId}
        className={styles.trigger}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${selectId}`}
        aria-controls={listboxId}
        aria-activedescendant={open ? activeId : undefined}
        onClick={() => {
          if (!disabled) {
            setOpen((current) => !current);
          }
        }}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={cx(styles.value, !selected && styles.placeholder)}>
          {selected?.label ?? placeholder}
        </span>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>
      {open ? (
        <ul className={styles.listbox} id={listboxId} role="listbox" tabIndex={-1}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${selectId}-option-${option.value}`}
              role="option"
              className={styles.option}
              aria-selected={option.value === value}
              data-active={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
