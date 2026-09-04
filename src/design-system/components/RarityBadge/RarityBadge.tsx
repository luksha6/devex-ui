import type { Rarity } from '../../types';
import { RARITY_LABELS } from '../../types';
import { cx } from '../../utils/cx';
import styles from './RarityBadge.module.css';

export interface RarityBadgeProps {
  rarity: Rarity;
  className?: string;
}

export function RarityBadge({ rarity, className }: RarityBadgeProps) {
  return (
    <span className={cx(styles.badge, className)} data-rarity={rarity}>
      {RARITY_LABELS[rarity]}
    </span>
  );
}
