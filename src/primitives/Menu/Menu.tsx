'use client';

import {
  Children,
  cloneElement,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type RefObject,
} from 'react';
import { cx } from '../../utils/cx';
import { useOverlayLock } from '../../utils/useOverlayLock';
import styles from './Menu.module.css';

export interface MenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  danger?: boolean;
}

type TriggerProps = {
  id?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  'aria-haspopup'?: 'menu';
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
};

export interface MenuProps {
  label: string;
  items: readonly MenuItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactElement<TriggerProps>;
  align?: 'start' | 'end';
  disabled?: boolean;
  className?: string;
}

export function Menu({
  label,
  items,
  open,
  onOpenChange,
  children,
  align = 'start',
  disabled = false,
  className,
}: MenuProps) {
  const triggerId = useId();
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trigger = Children.only(children);
  const child = cloneElement(trigger, {
    id: trigger.props.id ?? triggerId,
    disabled: disabled || trigger.props.disabled,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event);
      if (event.defaultPrevented || disabled || trigger.props.disabled) {
        return;
      }
      onOpenChange(!open);
    },
  });

  return (
    <div ref={wrapRef} className={cx(styles.wrap, className)}>
      {child}
      {open ? (
        <MenuPanel
          label={label}
          menuId={menuId}
          items={items}
          align={align}
          wrapRef={wrapRef}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </div>
  );
}

function MenuPanel({
  label,
  menuId,
  items,
  align,
  wrapRef,
  onOpenChange,
}: {
  label: string;
  menuId: string;
  items: readonly MenuItem[];
  align: 'start' | 'end';
  wrapRef: RefObject<HTMLDivElement | null>;
  onOpenChange: (open: boolean) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const enabled = items.filter((item) => !item.disabled);
  const [activeId, setActiveId] = useState(enabled[0]?.id ?? '');

  useOverlayLock(panelRef, () => onOpenChange(false), {
    trap: false,
    lock: false,
    rootRef: wrapRef,
  });

  function choose(item: MenuItem) {
    if (item.disabled) {
      return;
    }
    item.onSelect();
    onOpenChange(false);
  }

  function focusItem(id: string) {
    setActiveId(id);
    document.getElementById(itemDomId(menuId, id))?.focus();
  }

  function move(delta: number) {
    if (enabled.length === 0) {
      return;
    }
    const index = enabled.findIndex((item) => item.id === activeId);
    const next = enabled[(Math.max(index, 0) + delta + enabled.length) % enabled.length];
    if (next) {
      focusItem(next.id);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      const first = enabled[0];
      if (first) {
        focusItem(first.id);
      }
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      const last = enabled[enabled.length - 1];
      if (last) {
        focusItem(last.id);
      }
    }
  }

  return (
    <div
      ref={panelRef}
      id={menuId}
      className={cx(styles.panel, align === 'end' && styles.end)}
      role="menu"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => (
        <button
          key={item.id}
          id={itemDomId(menuId, item.id)}
          type="button"
          role="menuitem"
          className={cx(styles.item, item.danger && styles.danger, item.disabled && styles.blocked)}
          disabled={item.disabled}
          tabIndex={item.id === activeId && !item.disabled ? 0 : -1}
          onMouseEnter={() => {
            if (!item.disabled) {
              setActiveId(item.id);
            }
          }}
          onClick={() => choose(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function itemDomId(menuId: string, id: string) {
  return `${menuId}-${id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
}
