import type { Rarity } from '../../types';
import { cx } from '../../utils/cx';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { RarityBadge } from '../RarityBadge/RarityBadge';
import styles from './AchievementCard.module.css';

export interface AchievementCardProps {
  title: string;
  description: string;
  rarity: Rarity;
  unlocked: boolean;
  progress?: number;
  className?: string;
}

export function AchievementCard({
  title,
  description,
  rarity,
  unlocked,
  progress,
  className,
}: AchievementCardProps) {
  return (
    <article className={cx(styles.card, className)} data-rarity={rarity} data-unlocked={unlocked}>
      <div className={styles.icon} data-rarity={rarity} aria-hidden="true">
        {title.slice(0, 1)}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {!unlocked && progress != null ? (
          <ProgressBar value={progress} aria-label={`${title} progress`} />
        ) : null}
      </div>
      <div className={styles.side}>
        <RarityBadge rarity={rarity} />
        <span className={styles.state}>{unlocked ? 'Unlocked' : 'Locked'}</span>
      </div>
    </article>
  );
}
