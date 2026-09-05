import type { RunPhase } from '../../types';
import { cx } from '../../utils/cx';
import { Spinner } from '../../primitives/Spinner/Spinner';
import styles from './RunStatus.module.css';

const LABEL: Record<RunPhase, string> = {
  pending: 'Pending approval',
  running: 'Running',
  ok: 'Complete',
  fail: 'Failed',
};

export interface RunStatusProps {
  phase: RunPhase;
  label: string;
  elapsedMs?: number;
  detail?: string;
  phaseLabels?: Partial<Record<RunPhase, string>>;
  className?: string;
}

export function RunStatus({
  phase,
  label,
  elapsedMs,
  detail,
  phaseLabels,
  className,
}: RunStatusProps) {
  const named = { ...LABEL, ...phaseLabels };
  return (
    <div
      className={cx(styles.run, className)}
      data-phase={phase}
      role={phase === 'running' ? 'status' : undefined}
      aria-busy={phase === 'running' || undefined}
    >
      <div className={styles.head}>
        {phase === 'running' ? <Spinner size={12} label="" /> : null}
        <p className={styles.phase}>{named[phase]}</p>
        {elapsedMs !== undefined ? (
          <p className={styles.elapsed}>{Math.round(elapsedMs / 1000)}s</p>
        ) : null}
      </div>
      <p className={styles.label}>{label}</p>
      {detail ? <p className={styles.detail}>{detail}</p> : null}
    </div>
  );
}
