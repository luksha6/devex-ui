import { hashToIndex, initialsFromName } from '../../utils/hash';
import { cx } from '../../utils/cx';
import styles from './FriendActivityRow.module.css';

export interface FriendActivityRowProps {
  name: string;
  gameTitle: string;
  online: boolean;
  action?: 'playing' | 'completed';
  className?: string;
}

export function FriendActivityRow({
  name,
  gameTitle,
  online,
  action = 'playing',
  className,
}: FriendActivityRowProps) {
  const initials = initialsFromName(name);
  const tone = hashToIndex(name, 6);
  const message = action === 'completed' ? 'completed' : 'is playing';
  const statusLabel = online ? 'Online' : 'Offline';

  return (
    <div className={cx(styles.row, className)}>
      <div className={styles.avatarWrap}>
        <span className={styles.avatar} data-tone={tone} aria-hidden="true">
          {initials}
        </span>
        <span className={styles.dot} data-online={online} role="img" aria-label={statusLabel} />
      </div>
      <div>
        <p className={styles.name}>{name}</p>
        <p className={styles.message}>
          {message} <span className={styles.game}>{gameTitle}</span>
        </p>
      </div>
    </div>
  );
}
