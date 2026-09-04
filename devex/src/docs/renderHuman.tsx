import { Fragment, type ReactNode } from 'react';
import { Text } from '../primitives/Text/Text';
import { Callout } from './Callout/Callout';
import { CodeBlock } from './CodeBlock/CodeBlock';
import type { DocBlock } from './document';
import { ParameterTable } from './ParameterTable/ParameterTable';
import { SectionAnchor } from './SectionAnchor/SectionAnchor';

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
        </Text>
      );
    }
    if (block.type === 'paragraph') {
      return (
        <Text key={index} variant="body">
          {block.text}
        </Text>
      );
    }
    if (block.type === 'callout') {
      return (
        <Callout key={index} kind={block.kind}>
          {block.text}
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
    return (
      <Fragment key={index}>
        <ParameterTable rows={block.rows} />
      </Fragment>
    );
  });
}
