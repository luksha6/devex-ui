import type { ReactNode } from 'react';
import type { RunPhase, StreamUncertainty, ToolCallStatus } from '../../types';
import { cx } from '../../utils/cx';
import { Text } from '../../primitives/Text/Text';
import { RunStatus } from '../RunStatus/RunStatus';
import { Stream } from '../Stream/Stream';
import { ToolCall } from '../ToolCall/ToolCall';
import styles from './Run.module.css';

export interface RunTool {
  name: string;
  status: ToolCallStatus;
  args?: string;
  result?: string;
  latencyMs?: number;
}

export interface RunProps {
  phase: RunPhase;
  label: string;
  elapsedMs?: number;
  detail?: string;
  tools?: readonly RunTool[];
  text?: string;
  complete?: boolean;
  uncertainty?: StreamUncertainty;
  actions?: ReactNode;
  phaseLabels?: Partial<Record<RunPhase, string>>;
  highUncertaintyLabel?: string;
  lowUncertaintyLabel?: string;
  statusLabels?: Partial<Record<ToolCallStatus, string>>;
  className?: string;
}

export function Run({
  phase,
  label,
  elapsedMs,
  detail,
  tools = [],
  text,
  complete,
  uncertainty,
  actions,
  phaseLabels,
  highUncertaintyLabel = 'Uncertain',
  lowUncertaintyLabel = 'Low confidence',
  statusLabels,
  className,
}: RunProps) {
  const done = complete ?? (phase === 'ok' || phase === 'fail');
  return (
    <div className={cx(styles.run, className)} data-phase={phase}>
      <RunStatus
        phase={phase}
        label={label}
        elapsedMs={elapsedMs}
        detail={detail}
        phaseLabels={phaseLabels}
      />
      {tools.length > 0 ? (
        <div className={styles.tools}>
          {tools.map((tool, index) => (
            <ToolCall key={`${tool.name}-${index}`} {...tool} statusLabels={statusLabels} />
          ))}
        </div>
      ) : null}
      {text !== undefined ? (
        <Stream text={text} complete={done} uncertainty={uncertainty} />
      ) : uncertainty && uncertainty !== 'none' ? (
        <Text variant="kicker">
          {uncertainty === 'high' ? highUncertaintyLabel : lowUncertaintyLabel}
        </Text>
      ) : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
