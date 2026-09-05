import { Fragment, type ReactNode } from 'react';
import { Table } from '../primitives/Table/Table';
import { Text } from '../primitives/Text/Text';
import { TextLink } from '../primitives/TextLink/TextLink';
import { isSafeHref, isSafeImageSrc } from '../utils/safeHref';
import { Callout } from './Callout/Callout';
import { CodeBlock } from './CodeBlock/CodeBlock';
import type { DocBlock, DocText } from './document';
import { ParameterTable } from './ParameterTable/ParameterTable';
import { Run } from './Run/Run';
import { SectionAnchor } from './SectionAnchor/SectionAnchor';
import styles from './renderHuman.module.css';

function renderInlines(text: DocText): ReactNode {
  const parts = typeof text === 'string' ? [text] : text;
  return parts.map((part, index) => {
    if (typeof part === 'string') {
      return <Fragment key={index}>{part}</Fragment>;
    }
    let node: ReactNode = part.text;
    if (part.code) {
      node = <code className={styles.code}>{node}</code>;
    }
    if (part.strong) {
      node = <strong>{node}</strong>;
    }
    if (part.href && isSafeHref(part.href)) {
      node = <TextLink href={part.href}>{node}</TextLink>;
    }
    return <Fragment key={index}>{node}</Fragment>;
  });
}

export function renderHuman(
  blocks: readonly DocBlock[],
  context: { path?: string; commit?: string } = {},
): ReactNode {
  return blocks.map((block, index) => {
    if (block.type === 'heading') {
      if (context.path && context.commit) {
        return (
          <SectionAnchor
            key={block.id}
            id={block.id}
            title={block.text}
            since={block.since}
            as={block.level === 3 ? 'h3' : 'h2'}
            path={context.path}
            commit={context.commit}
          />
        );
      }
      return (
        <Text
          key={block.id}
          id={block.id}
          as={block.level === 3 ? 'h3' : 'h2'}
          variant={block.level === 3 ? 'title' : 'section'}
        >
          {block.text}
          {block.since ? ` (${block.since})` : null}
        </Text>
      );
    }
    if (block.type === 'paragraph') {
      return (
        <Text key={index} variant="body">
          {renderInlines(block.text)}
        </Text>
      );
    }
    if (block.type === 'callout') {
      return (
        <Callout key={index} kind={block.kind}>
          {renderInlines(block.text)}
        </Callout>
      );
    }
    if (block.type === 'code') {
      return (
        <CodeBlock
          key={index}
          languages={block.languages}
          testedAgainst={block.testedAgainst}
          testedAt={block.testedAt}
        />
      );
    }
    if (block.type === 'list') {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={index} className={styles.list}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInlines(item)}</li>
          ))}
        </Tag>
      );
    }
    if (block.type === 'table') {
      return <Table key={index} headers={block.headers} rows={block.rows} />;
    }
    if (block.type === 'image') {
      if (!isSafeImageSrc(block.src)) {
        return (
          <Text key={index} variant="body">
            {block.alt}
            {block.caption ? ` — ${block.caption}` : null}
          </Text>
        );
      }
      return (
        <figure key={index} className={styles.figure}>
          <img
            className={styles.image}
            src={block.src}
            alt={block.alt}
            referrerPolicy="no-referrer"
          />
          {block.caption ? (
            <Text variant="label" className={styles.caption} as="figcaption">
              {block.caption}
            </Text>
          ) : null}
        </figure>
      );
    }
    if (block.type === 'run') {
      return (
        <Run
          key={index}
          phase={block.phase}
          label={block.label}
          elapsedMs={block.elapsedMs}
          detail={block.detail}
          tools={block.tools}
          text={block.text}
          uncertainty={block.uncertainty}
        />
      );
    }
    return (
      <Fragment key={index}>
        <ParameterTable rows={block.rows} />
      </Fragment>
    );
  });
}
