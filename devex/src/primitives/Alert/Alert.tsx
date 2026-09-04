import type { ReactNode } from 'react';
import type { AlertKind } from '../../types';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import styles from './Alert.module.css';

const KIND_LABEL: Record<AlertKind, string> = {
  note: 'Note',
  ok: 'Ok',
  caution: 'Caution',
  critical: 'Critical',
};

const KIND_ICON: Record<AlertKind, 'info' | 'check' | 'caution'> = {
  note: 'info',
  ok: 'check',
  caution: 'caution',
  critical: 'caution',
};

export interface AlertProps {
  kind?: AlertKind;
  title?: string;
  children?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({ kind = 'note', title, children, onDismiss, className }: AlertProps) {
  const critical = kind === 'critical';
  return (
    <div className={cx(styles.alert, styles[kind], className)} role={critical ? 'alert' : 'status'}>
      <span className={styles.icon} aria-hidden="true">
        <Icon name={KIND_ICON[kind]} />
      </span>
      <div className={styles.body}>
        <p className={styles.kind}>{KIND_LABEL[kind]}</p>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.detail}>{children}</div> : null}
      </div>
      {onDismiss ? (
        <IconButton label="Dismiss" intent="ghost" size="sm" onClick={onDismiss}>
          <Icon name="close" />
        </IconButton>
      ) : null}
    </div>
  );
}
