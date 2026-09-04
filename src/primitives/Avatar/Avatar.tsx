import { cx } from '../../utils/cx';
import type { ControlSize } from '../../types';
import styles from './Avatar.module.css';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: ControlSize;
  className?: string;
}

const TONE = ['tone0', 'tone1', 'tone2', 'tone3', 'tone4'] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  if (!first) {
    return '?';
  }
  const last = parts[parts.length - 1];
  if (parts.length === 1 || !last) {
    return first.slice(0, 2).toUpperCase();
  }
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
}

function toneIndex(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % TONE.length;
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const tone = TONE[toneIndex(name)] ?? 'tone0';
  return (
    <span
      className={cx(styles.avatar, styles[size], !src && styles[tone], className)}
      role="img"
      aria-label={name}
      title={name}
    >
      {src ? (
        <img src={src} alt="" className={styles.image} />
      ) : (
        <span className={styles.initials}>{initials(name)}</span>
      )}
    </span>
  );
}
