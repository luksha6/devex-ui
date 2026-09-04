import type { StreamUncertainty } from '../../types';
import { cx } from '../../utils/cx';
import styles from './Stream.module.css';

export interface StreamProps {
  text: string;
  complete?: boolean;
  uncertainty?: StreamUncertainty;
  className?: string;
}

export function Stream({ text, complete = false, uncertainty = 'none', className }: StreamProps) {
  return (
    <div className={cx(styles.stream, complete && styles.done, className)}>
      {uncertainty !== 'none' ? (
        <p className={styles.uncertainty}>
          {uncertainty === 'high' ? 'Uncertain' : 'Low confidence'}
        </p>
      ) : null}
      <pre className={styles.body} aria-live={complete ? undefined : 'polite'}>
        {text}
        {complete ? null : <span className={styles.caret} aria-hidden="true" />}
      </pre>
    </div>
  );
}
