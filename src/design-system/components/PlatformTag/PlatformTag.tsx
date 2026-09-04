import type { ReactNode } from 'react';
import type { Platform } from '../../types';
import { PLATFORM_LABELS } from '../../types';
import { cx } from '../../utils/cx';
import styles from './PlatformTag.module.css';

export interface PlatformTagProps {
  platform: Platform;
  className?: string;
}

function PlatformIcon({ platform }: { platform: Platform }): ReactNode {
  if (platform === 'pc') {
    return (
      <svg className={styles.icon} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <rect x="1" y="1" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="3" y="8" width="4" height="1" fill="currentColor" />
      </svg>
    );
  }
  if (platform === 'playstation') {
    return (
      <svg className={styles.icon} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (platform === 'xbox') {
    return (
      <svg className={styles.icon} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className={styles.icon} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <rect x="1" y="3" width="3" height="4" rx="0.6" fill="currentColor" />
      <rect x="6" y="3" width="3" height="4" rx="0.6" fill="currentColor" />
    </svg>
  );
}

export function PlatformTag({ platform, className }: PlatformTagProps) {
  return (
    <span className={cx(styles.tag, className)} data-platform={platform}>
      <PlatformIcon platform={platform} />
      {PLATFORM_LABELS[platform]}
    </span>
  );
}
