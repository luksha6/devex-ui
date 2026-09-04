'use client';

import { cx } from '../../utils/cx';
import { useRovingTabIndex } from '../../utils/useRovingTabIndex';
import styles from './SegmentedControl.module.css';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string = string> {
  /** Accessible name for the radiogroup. Not a visible Field label. */
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  const ids = options.map((option) => option.value);
  const { select, onKeyDown, setRef } = useRovingTabIndex(ids, value, onChange);

  return (
    <div
      className={cx(styles.group, className)}
      role="radiogroup"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            ref={setRef(option.value)}
            className={styles.option}
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => select(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
