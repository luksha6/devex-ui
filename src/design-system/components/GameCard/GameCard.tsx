import type { KeyboardEvent } from 'react';
import type { Platform } from '../../types';
import { hashToIndex } from '../../utils/hash';
import { cx } from '../../utils/cx';
import { PlatformTag } from '../PlatformTag/PlatformTag';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { RatingStars } from '../RatingStars/RatingStars';
import styles from './GameCard.module.css';

export interface GameCardProps {
  title: string;
  platform: Platform;
  hoursPlayed: number;
  completion: number;
  rating?: number | null;
  onClick?: () => void;
  className?: string;
}

export function GameCard({
  title,
  platform,
  hoursPlayed,
  completion,
  rating = null,
  onClick,
  className,
}: GameCardProps) {
  const cover = hashToIndex(title, 8);
  const mark = title.slice(0, 2).toUpperCase();

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!onClick) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <article
      className={cx(styles.card, className)}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `Open ${title}` : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className={styles.cover} data-cover={cover} aria-hidden="true">
        <span className={styles.coverMark}>{mark}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <PlatformTag platform={platform} />
          <span className={styles.hours}>{hoursPlayed.toFixed(0)}h</span>
        </div>
        <ProgressBar value={completion} label="Completion" />
        {rating != null ? <RatingStars value={rating} size="sm" /> : null}
      </div>
    </article>
  );
}
