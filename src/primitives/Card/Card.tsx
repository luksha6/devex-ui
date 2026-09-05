import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Text } from '../Text/Text';
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Card({
  title,
  children,
  actions,
  selected = false,
  onSelect,
  disabled = false,
  className,
}: CardProps) {
  const selectable = Boolean(onSelect);
  const heading = title ? (
    <Text variant="title" as={selectable ? 'span' : 'h3'}>
      {title}
    </Text>
  ) : null;
  const body = children ? <div className={styles.body}>{children}</div> : null;
  const state = selectable ? (
    <Text variant="kicker" className={styles.state} aria-hidden="true">
      {selected ? 'Selected' : 'Select'}
    </Text>
  ) : null;

  return (
    <article
      className={cx(
        styles.card,
        selectable && styles.selectable,
        selected && styles.selected,
        disabled && styles.blocked,
        className,
      )}
    >
      {selectable ? (
        <button
          type="button"
          className={styles.hit}
          aria-label={title}
          aria-pressed={selected}
          disabled={disabled}
          onClick={onSelect}
        >
          {heading || state ? (
            <span className={styles.head}>
              {heading}
              {state}
            </span>
          ) : null}
          {body}
        </button>
      ) : (
        <>
          {heading || state ? (
            <header className={styles.head}>
              {heading}
              {state}
            </header>
          ) : null}
          {body}
        </>
      )}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </article>
  );
}
