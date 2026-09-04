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
  className?: string;
}

export function AudienceSwitch({
  value,
  onChange,
  blocks,
  path,
  commit,
  className,
}: AudienceSwitchProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      <SegmentedControl
        label="Audience"
        value={value}
        onChange={onChange}
        options={[
          { value: 'human', label: 'Human' },
          { value: 'agent', label: 'Agent' },
        ]}
      />
      <p className={styles.hint}>Agent view is markdown from the same blocks.</p>
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
