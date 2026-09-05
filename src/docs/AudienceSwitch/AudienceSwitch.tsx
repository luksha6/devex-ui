import type { Audience } from '../../types';
import { SegmentedControl } from '../../primitives/SegmentedControl/SegmentedControl';
import { cx } from '../../utils/cx';
import { toAgentMarkdown, type DocBlock } from '../document';
import { renderHuman } from '../renderHuman';
import styles from './AudienceSwitch.module.css';

export interface AudienceSwitchProps {
  value: Audience;
  onChange: (value: Audience) => void;
  /** Same AST as `toAgentMarkdown`. Human view is `renderHuman(blocks)`. */
  blocks: readonly DocBlock[];
  path?: string;
  commit?: string;
  audienceLabel?: string;
  humanLabel?: string;
  agentLabel?: string;
  hint?: string;
  className?: string;
}

export function AudienceSwitch({
  value,
  onChange,
  blocks,
  path,
  commit,
  audienceLabel = 'Audience',
  humanLabel = 'Human',
  agentLabel = 'Agent',
  hint = 'Agent view is markdown from the same blocks.',
  className,
}: AudienceSwitchProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      <SegmentedControl
        label={audienceLabel}
        value={value}
        onChange={onChange}
        options={[
          { value: 'human', label: humanLabel },
          { value: 'agent', label: agentLabel },
        ]}
      />
      <p className={styles.hint}>{hint}</p>
      {value === 'agent' ? (
        <pre className={styles.agent} data-audience="agent">
          {toAgentMarkdown(blocks)}
        </pre>
      ) : (
        <div className={styles.human} data-audience="human">
          {renderHuman(blocks, { path, commit })}
        </div>
      )}
    </div>
  );
}
