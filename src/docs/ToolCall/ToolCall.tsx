import type { ToolCallStatus } from '../../types';
import { cx } from '../../utils/cx';
import { Spinner } from '../../primitives/Spinner/Spinner';
import styles from './ToolCall.module.css';

const STATUS: Record<ToolCallStatus, string> = {
  queued: 'Queued',
  running: 'Running',
  ok: 'Ok',
  fail: 'Fail',
};

export interface ToolCallProps {
  name: string;
  status: ToolCallStatus;
  args?: string;
  result?: string;
  latencyMs?: number;
  statusLabels?: Partial<Record<ToolCallStatus, string>>;
  className?: string;
}

export function ToolCall({
  name,
  status,
  args,
  result,
  latencyMs,
  statusLabels,
  className,
}: ToolCallProps) {
  const named = { ...STATUS, ...statusLabels };
  return (
    <div className={cx(styles.call, className)} data-status={status}>
      <div className={styles.head}>
        {status === 'running' ? <Spinner size={12} label="" /> : null}
        <p className={styles.name}>{name}</p>
        <p className={styles.status}>{named[status]}</p>
        {latencyMs !== undefined ? <p className={styles.latency}>{latencyMs}ms</p> : null}
      </div>
      {args ? <p className={styles.meta}>{args}</p> : null}
      {result ? <p className={styles.result}>{result}</p> : null}
    </div>
  );
}
