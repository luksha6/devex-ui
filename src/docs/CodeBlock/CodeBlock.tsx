'use client';

import { useState } from 'react';
import { Button } from '../../primitives/Button/Button';
import { cx } from '../../utils/cx';
import { isCodeTested } from '../document';
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
  copyLabel?: string;
  copiedLabel?: string;
  copyFailedLabel?: string;
  untestedLabel?: string;
  className?: string;
}

export function CodeBlock({
  languages,
  testedAgainst,
  testedAt,
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  copyFailedLabel = 'Copy failed',
  untestedLabel = 'untested',
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const tested = isCodeTested(testedAgainst, testedAt);

  async function copy(id: string, source: string) {
    try {
      await navigator.clipboard.writeText(source);
      setFailed(null);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
      setFailed(id);
    }
  }

  return (
    <div className={cx(styles.block, className)}>
      {languages.map((sample) => {
        const source = sample.source.replace(/\n$/, '');
        const lines = source.split('\n');
        return (
          <section key={sample.id}>
            <div className={styles.toolbar}>
              <span>{sample.label}</span>
              <Button
                intent={failed === sample.id ? 'danger' : 'ghost'}
                onClick={() => void copy(sample.id, sample.source)}
              >
                {failed === sample.id
                  ? copyFailedLabel
                  : copied === sample.id
                    ? copiedLabel
                    : copyLabel}
              </Button>
            </div>
            <div className={styles.frame}>
              <ol className={styles.gutter} aria-hidden="true">
                {lines.map((_, index) => (
                  <li key={index}>{index + 1}</li>
                ))}
              </ol>
              <pre className={styles.pre}>
                <code>{source}</code>
              </pre>
            </div>
          </section>
        );
      })}
      <footer className={cx(styles.footer, !tested && styles.untested)}>
        {tested ? `tested against ${testedAgainst} · ${testedAt}` : untestedLabel}
      </footer>
    </div>
  );
}
