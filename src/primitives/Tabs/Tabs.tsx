'use client';

import { useId, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useRovingTabIndex } from '../../utils/useRovingTabIndex';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Accessible name for the tablist. Not a visible Field label. */
  label: string;
  items: readonly TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ label, items, value, onChange, className }: TabsProps) {
  const uid = useId();
  const enabled = items.filter((item) => !item.disabled).map((item) => item.id);
  const selected = items.find((item) => item.id === value);
  const { select, onKeyDown, setRef } = useRovingTabIndex(enabled, value, onChange);

  return (
    <div className={cx(styles.tabs, className)}>
      <div className={styles.list} role="tablist" aria-label={label}>
        {items.map((item) => {
          const checked = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              className={cx(styles.tab, checked && styles.current)}
              aria-selected={checked}
              aria-controls={`${uid}-panel-${item.id}`}
              tabIndex={checked ? 0 : -1}
              disabled={item.disabled}
              ref={setRef(item.id)}
              onClick={() => select(item.id)}
              onKeyDown={onKeyDown}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selected ? (
        <div
          role="tabpanel"
          id={`${uid}-panel-${selected.id}`}
          aria-labelledby={`${uid}-tab-${selected.id}`}
          className={styles.panel}
        >
          {selected.panel}
        </div>
      ) : null}
    </div>
  );
}
