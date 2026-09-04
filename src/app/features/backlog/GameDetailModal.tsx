import {
  AchievementCard,
  Button,
  Modal,
  PlatformTag,
  ProgressBar,
  RatingStars,
} from '../../../design-system';
import type { Achievement, Game } from './types';
import styles from './GameDetailModal.module.css';

export interface GameDetailModalProps {
  game: Game | null;
  achievements: readonly Achievement[];
  onClose: () => void;
  onComplete: (id: string) => void;
  onRate: (id: string, rating: number) => void;
}

export function GameDetailModal({
  game,
  achievements,
  onClose,
  onComplete,
  onRate,
}: GameDetailModalProps) {
  if (!game) {
    return null;
  }

  const canComplete = game.status !== 'completed';

  return (
    <Modal open onClose={onClose} title={game.title}>
      <div className={styles.body}>
        <div className={styles.meta}>
          <PlatformTag platform={game.platform} />
          <span className={styles.hours}>{game.hoursPlayed.toFixed(0)}h played</span>
        </div>
        <ProgressBar value={game.completion} label="Completion" />
        <div className={styles.actions}>
          {canComplete ? (
            <Button onClick={() => onComplete(game.id)}>Mark as completed</Button>
          ) : (
            <RatingStars
              value={game.rating ?? 0}
              onChange={(value) => onRate(game.id, value)}
              label={`Rate ${game.title}`}
            />
          )}
        </div>
        <section className={styles.section} aria-labelledby="achievements-heading">
          <h3 id="achievements-heading" className={styles.heading}>
            Achievements
          </h3>
          <div className={styles.list}>
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                rarity={achievement.rarity}
                unlocked={achievement.unlocked}
                progress={achievement.progress}
              />
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}
