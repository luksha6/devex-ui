import type { KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  'aria-label': string;
  className?: string;
}

export function Tabs({ tabs, value, onChange, 'aria-label': ariaLabel, className }: TabsProps) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === value);
    if (index < 0) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + delta + tabs.length) % tabs.length;
      const next = tabs[nextIndex];
      if (next) {
        onChange(next.id);
        const nextTab = event.currentTarget.querySelector<HTMLButtonElement>(
          `[data-tab-id="${next.id}"]`,
        );
        nextTab?.focus();
      }
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const first = tabs[0];
      if (first) {
        onChange(first.id);
      }
    }

    if (event.key === 'End') {
      event.preventDefault();
      const last = tabs[tabs.length - 1];
      if (last) {
        onChange(last.id);
      }
    }
  }

  return (
    <div
      className={cx(styles.tablist, className)}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            data-tab-id={tab.id}
            className={styles.tab}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
