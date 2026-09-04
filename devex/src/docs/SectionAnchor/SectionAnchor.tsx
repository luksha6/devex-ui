'use client';

import { useState } from 'react';
import { Button } from '../../primitives/Button/Button';
import { cx } from '../../utils/cx';
import styles from './SectionAnchor.module.css';

export interface SectionAnchorProps {
  as?: 'h2' | 'h3';
  id: string;
  title: string;
  since?: string;
  commit: string;
  path: string;
  className?: string;
}

export function citationUri(path: string, id: string, commit: string): string {
  return `codex://${path}#${id}@${commit}`;
}

export function SectionAnchor({
  as = 'h2',
  id,
  title,
  since,
  commit,
  path,
  className,
}: SectionAnchorProps) {
  const [copied, setCopied] = useState(false);
  const Heading = as;

  async function cite() {
    await navigator.clipboard.writeText(citationUri(path, id, commit));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={cx(styles.wrap, className)}>
      <Heading id={id} className={cx(styles.heading, as === 'h3' && styles.h3)}>
        {title}
      </Heading>
      <div className={styles.meta}>
        {since ? <span className={styles.since}>since {since}</span> : null}
        <Button intent="ghost" onClick={() => void cite()} aria-describedby={id}>
          {copied ? 'Reference copied' : 'Cite'}
        </Button>
      </div>
    </div>
  );
}
