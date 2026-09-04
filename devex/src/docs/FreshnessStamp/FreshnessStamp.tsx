import { Button } from '../../primitives/Button/Button';
import { cx } from '../../utils/cx';
import styles from './FreshnessStamp.module.css';

export interface FreshnessStampProps {
  status: 'verified' | 'stale';
  verifier: string;
  commit: string;
  verifiedAt?: string;
  daysUnverified?: number;
  commitsBehind?: number;
  indexWeight: number;
  onClaim?: () => void;
  onOpenDiff?: () => void;
  className?: string;
}

export function FreshnessStamp({
  status,
  verifier,
  commit,
  verifiedAt,
  daysUnverified,
  commitsBehind,
  indexWeight,
  onClaim,
  onOpenDiff,
  className,
}: FreshnessStampProps) {
  const stale = status === 'stale';

  return (
    <aside className={cx(styles.stamp, className)} data-status={status}>
      <p className={cx(styles.status, stale ? styles.stale : styles.verified)}>
        {stale ? 'Unverified' : 'Verified'}
      </p>
      <p className={styles.body}>
        {stale
          ? `${daysUnverified ?? 0}d since last claim. ${commitsBehind ?? 0} commits to the service since ${commit}.`
          : `${verifier} claimed ${commit}${verifiedAt ? ` · ${verifiedAt}` : ''}.`}
      </p>
      <p className={styles.consequence}>
        idx weight {indexWeight.toFixed(1)}
        {stale ? ' · demoted stale' : ''}
      </p>
      <div className={styles.actions}>
        {onClaim ? (
          <Button intent="primary" onClick={onClaim}>
            Claim & verify
          </Button>
        ) : null}
        {onOpenDiff ? (
          <Button intent="secondary" onClick={onOpenDiff}>
            Open the diff
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
