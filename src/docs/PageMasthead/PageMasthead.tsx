import type { Lifecycle } from '../../types';
import { Tag } from '../../primitives/Tag/Tag';
import { cx } from '../../utils/cx';
import styles from './PageMasthead.module.css';

export interface PageMastheadProps {
  crumb: string;
  title: string;
  purpose: string;
  owner: string;
  verifiedAt: string;
  commit: string;
  words: number;
  tokens: number;
  lifecycle?: Lifecycle;
  expectedGa?: string;
  replaces?: string;
  className?: string;
}

export function PageMasthead({
  crumb,
  title,
  purpose,
  owner,
  verifiedAt,
  commit,
  words,
  tokens,
  lifecycle = 'stable',
  expectedGa,
  replaces,
  className,
}: PageMastheadProps) {
  const lifecycleLabel =
    lifecycle === 'beta' && expectedGa
      ? `beta · GA ${expectedGa}`
      : lifecycle === 'deprecated' && replaces
        ? `deprecated · ${replaces}`
        : lifecycle;

  return (
    <header className={cx(styles.masthead, className)}>
      <p className={styles.crumb}>{crumb}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.purpose}>{purpose}</p>
      <div className={styles.strip}>
        <span>owner {owner}</span>
        <span>
          verified {verifiedAt} · {commit}
        </span>
        <span className={styles.nums}>
          {words.toLocaleString()} words · {tokens.toLocaleString()} tokens
        </span>
        <Tag kind={lifecycle}>{lifecycleLabel}</Tag>
      </div>
    </header>
  );
}
