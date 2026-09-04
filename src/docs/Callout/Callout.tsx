'use client';

import { useState, type ReactNode } from 'react';
import type { CalloutKind } from '../../types';
import { cx } from '../../utils/cx';
import { Button } from '../../primitives/Button/Button';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Callout.module.css';

export interface CalloutProps {
  kind: CalloutKind;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const KIND_LABEL: Record<CalloutKind, string> = {
  note: 'Note',
  caution: 'Caution',
  'agent-only': 'Agent-only',
};

export function Callout({ kind, children, defaultOpen = false, className }: CalloutProps) {
  const [open, setOpen] = useState(kind !== 'agent-only' || defaultOpen);
  const showBody = kind !== 'agent-only' || open;

  return (
    <aside
      className={cx(
        styles.callout,
        kind === 'note' && styles.note,
        kind === 'caution' && styles.caution,
        kind === 'agent-only' && styles.agent,
        className,
      )}
      data-kind={kind}
    >
      <div className={styles.head}>
        {kind === 'note' ? <Icon name="info" size={16} className={styles.icon} /> : null}
        {kind === 'caution' ? <Icon name="caution" size={16} className={styles.icon} /> : null}
        <p className={styles.kind}>{KIND_LABEL[kind]}</p>
        {kind === 'agent-only' ? (
          <Button
            intent="ghost"
            className={styles.toggle}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Hide from this reading' : 'Show agent-only note'}
          </Button>
        ) : null}
      </div>
      {showBody ? <div className={styles.body}>{children}</div> : null}
    </aside>
  );
}
