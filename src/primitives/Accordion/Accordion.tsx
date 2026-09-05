'use client';

import { useId, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: string;
  panel: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  label: string;
  items: readonly AccordionItem[];
  value: readonly string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  className?: string;
}

export function Accordion({
  label,
  items,
  value,
  onChange,
  multiple = false,
  className,
}: AccordionProps) {
  const uid = useId();
  const open = new Set(value);

  function toggle(id: string, disabled?: boolean) {
    if (disabled) {
      return;
    }
    if (open.has(id)) {
      onChange(value.filter((item) => item !== id));
      return;
    }
    onChange(multiple ? [...value, id] : [id]);
  }

  return (
    <div className={cx(styles.list, className)} role="region" aria-label={label}>
      {items.map((item) => {
        const expanded = open.has(item.id);
        const triggerId = `${uid}-t-${item.id}`;
        const panelId = `${uid}-p-${item.id}`;
        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id, item.disabled)}
              >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.mark} aria-hidden="true">
                  <Icon name={expanded ? 'chevron-up' : 'chevron-down'} />
                </span>
              </button>
            </h3>
            {expanded ? (
              <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
                {item.panel}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
