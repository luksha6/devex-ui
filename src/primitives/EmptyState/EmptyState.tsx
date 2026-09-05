import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Text } from '../Text/Text';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  title: string;
  body?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <Text variant="title" as="p">
        {title}
      </Text>
      {body ? (
        <Text variant="body" className={styles.body}>
          {body}
        </Text>
      ) : null}
      {action}
    </div>
  );
}
