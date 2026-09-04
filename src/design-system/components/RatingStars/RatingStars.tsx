import { cx } from '../../utils/cx';
import styles from './RatingStars.module.css';

export interface RatingStarsProps {
  value: number;
  onChange?: (value: number) => void;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const STARS = [1, 2, 3, 4, 5] as const;

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 1.8 12.4 7l5.6.8-4 3.9.9 5.6L10 14.6 4.1 17.3l.9-5.6-4-3.9L6.6 7 10 1.8z"
      />
    </svg>
  );
}

export function RatingStars({
  value,
  onChange,
  label = 'Rating',
  size = 'md',
  className,
}: RatingStarsProps) {
  const interactive = typeof onChange === 'function';

  if (!interactive) {
    return (
      <div
        className={cx(styles.group, styles[size], className)}
        role="img"
        aria-label={`${value} out of 5 stars`}
      >
        {STARS.map((star) => (
          <span key={star} className={cx(styles.star, styles.readonly)} data-filled={star <= value}>
            <StarIcon />
          </span>
        ))}
      </div>
    );
  }

  return (
    <fieldset className={cx(styles.group, styles[size], className)}>
      <legend className={styles.srOnly}>{label}</legend>
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          className={cx(styles.star, styles.interactive)}
          data-filled={star <= value}
          aria-label={`${star} star${star === 1 ? '' : 's'}`}
          aria-pressed={star === value}
          onClick={() => onChange(star)}
        >
          <StarIcon />
        </button>
      ))}
    </fieldset>
  );
}
