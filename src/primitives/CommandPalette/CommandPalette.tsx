'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import { useOverlayLock } from '../../utils/useOverlayLock';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';
import { Portal } from '../Portal/Portal';
import { Text } from '../Text/Text';
import styles from './CommandPalette.module.css';

export interface CommandItem {
  id: string;
  label: string;
  onSelect: () => void;
  group?: string;
  detail?: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: readonly CommandItem[];
  label?: string;
  placeholder?: string;
  empty?: string;
  closeLabel?: string;
  className?: string;
}

export function CommandPalette({
  open,
  onClose,
  commands,
  label = 'Command palette',
  placeholder = 'Search commands',
  empty = 'No matches',
  closeLabel = 'Close',
  className,
}: CommandPaletteProps) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <CommandPaletteFrame
        onClose={onClose}
        commands={commands}
        label={label}
        placeholder={placeholder}
        empty={empty}
        closeLabel={closeLabel}
        className={className}
      />
    </Portal>
  );
}

function CommandPaletteFrame({
  onClose,
  commands,
  label,
  placeholder,
  empty,
  closeLabel = 'Close',
  className,
}: Omit<CommandPaletteProps, 'open'> & { label: string; placeholder: string; empty: string }) {
  const searchId = useId();
  const listId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);
  useOverlayLock(panelRef, onClose, { initialRef: searchRef });

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return commands;
    }
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(needle) ||
        command.detail?.toLowerCase().includes(needle) ||
        command.group?.toLowerCase().includes(needle),
    );
  }, [commands, query]);

  const enabledIds = useMemo(
    () => visible.filter((command) => !command.disabled).map((command) => command.id),
    [visible],
  );

  const groups = useMemo(() => {
    const seen: string[] = [];
    const buckets = new Map<string, CommandItem[]>();
    visible.forEach((command) => {
      const key = command.group ?? '';
      if (!buckets.has(key)) {
        seen.push(key);
        buckets.set(key, []);
      }
      buckets.get(key)?.push(command);
    });
    return seen.map((key) => ({ key, items: buckets.get(key) ?? [] }));
  }, [visible]);

  useEffect(() => {
    if (active && enabledIds.includes(active)) {
      return;
    }
    setActive(enabledIds[0] ?? null);
  }, [active, enabledIds]);

  function run(id: string) {
    const command = commands.find((item) => item.id === id);
    if (!command || command.disabled) {
      return;
    }
    command.onSelect();
    onClose();
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

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
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
      setActive(enabledIds[0] ?? null);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      setActive(enabledIds[enabledIds.length - 1] ?? null);
      return;
    }
    if (event.key === 'Enter' && active) {
      event.preventDefault();
      run(active);
    }
  }

  const activeId = active ? `${listId}-${active}` : undefined;

  return (
    <div className={styles.backdrop}>
      <button type="button" className={styles.dismiss} aria-label={closeLabel} onClick={onClose} />
      <div
        ref={panelRef}
        className={cx(styles.panel, className)}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <div className={styles.search}>
          <span className={styles.leading} aria-hidden="true">
            <Icon name="search" />
          </span>
          <Input
            ref={searchRef}
            id={searchId}
            role="combobox"
            className={styles.input}
            value={query}
            placeholder={placeholder}
            autoComplete="off"
            aria-label={placeholder}
            aria-expanded="true"
            aria-controls={listId}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <IconButton label={closeLabel} intent="ghost" data-devex-initial="skip" onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </div>
        <ul id={listId} className={styles.list} role="listbox" aria-label={label}>
          {visible.length === 0 ? (
            <li className={styles.empty}>
              <Text variant="body">{empty}</Text>
            </li>
          ) : (
            groups.flatMap((group) => [
              group.key ? (
                <li key={`g-${group.key}`} className={styles.group} role="presentation">
                  {group.key}
                </li>
              ) : null,
              ...group.items.map((command) => (
                <li key={command.id} className={styles.item} role="presentation">
                  <button
                    type="button"
                    id={`${listId}-${command.id}`}
                    role="option"
                    className={cx(
                      styles.option,
                      command.id === active && styles.active,
                      command.disabled && styles.blocked,
                    )}
                    aria-selected={command.id === active}
                    disabled={command.disabled}
                    onMouseEnter={() => {
                      if (!command.disabled) {
                        setActive(command.id);
                      }
                    }}
                    onClick={() => run(command.id)}
                  >
                    <span className={styles.copy}>
                      {command.label}
                      {command.detail ? (
                        <span className={styles.detail}>{command.detail}</span>
                      ) : null}
                    </span>
                    {command.shortcut ? (
                      <kbd className={styles.shortcut} aria-hidden="true">
                        {command.shortcut}
                      </kbd>
                    ) : null}
                  </button>
                </li>
              )),
            ])
          )}
        </ul>
      </div>
    </div>
  );
}
