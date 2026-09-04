'use client';

import { useState } from 'react';
import { Button } from '../../primitives/Button/Button';
import { cx } from '../../utils/cx';
import styles from './CodeBlock.module.css';

export interface CodeSample {
  id: string;
  label: string;
  source: string;
}

export interface CodeBlockProps {
  languages: readonly CodeSample[];
  testedAgainst?: string;
  testedAt?: string;
  className?: string;
}

export function CodeBlock({ languages, testedAgainst, testedAt, className }: CodeBlockProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const tested = Boolean(testedAgainst && testedAt);

  async function copy(id: string, source: string) {
    await navigator.clipboard.writeText(source);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <div className={cx(styles.block, className)}>
      {languages.map((sample) => {
        const lines = sample.source.replace(/\n$/, '').split('\n');
        return (
          <section key={sample.id}>
            <div className={styles.toolbar}>
              <span>{sample.label}</span>
              <Button intent="ghost" onClick={() => void copy(sample.id, sample.source)}>
                {copied === sample.id ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className={styles.frame}>
              <ol className={styles.gutter} aria-hidden="true">
                {lines.map((_, index) => (
                  <li key={index}>{index + 1}</li>
                ))}
              </ol>
              <pre className={styles.pre}>
                <code>{sample.source}</code>
              </pre>
            </div>
          </section>
        );
      })}
      <footer className={cx(styles.footer, !tested && styles.untested)}>
        {tested ? `tested against ${testedAgainst} · ${testedAt}` : 'untested'}
      </footer>
    </div>
  );
}
