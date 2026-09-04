import type { ReactNode } from 'react';
import { Tag } from '../../primitives/Tag/Tag';
import { cx } from '../../utils/cx';
import styles from './ResultRow.module.css';

export type ResultRowProps =
  | {
      kind?: 'hit';
      score: number;
      title: string;
      section: string;
      snippet: ReactNode;
      tokens: number;
      path: string;
      selected?: boolean;
      deprecated?: boolean;
      onSelect?: () => void;
      className?: string;
    }
  | {
      kind: 'withheld';
      count: number;
      reason: string;
      className?: string;
    };

export function ResultRow(props: ResultRowProps) {
  if (props.kind === 'withheld') {
    return (
      <div className={cx(styles.row, styles.withheld, props.className)} data-kind="withheld">
        <p className={styles.reason}>
          {props.count} sections withheld · {props.reason}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cx(styles.row, props.selected && styles.selected, props.className)}
      onClick={props.onSelect}
    >
      <span className={styles.score}>{props.score.toFixed(2)}</span>
      <span>
        <span className={styles.title}>
          {props.title} › {props.section} {props.deprecated ? <Tag kind="deprecated" /> : null}
        </span>
        <span className={styles.snippet}>{props.snippet}</span>
      </span>
      <span className={styles.meta}>
        {props.tokens} tok
        <br />
        {props.path}
      </span>
    </button>
  );
}
