import type { CalloutKind, Lifecycle } from '../types';

export type DocBlock =
  | { type: 'heading'; level: 2 | 3; id: string; text: string; since?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'callout'; kind: CalloutKind; text: string }
  | {
      type: 'code';
      languages: { id: string; label: string; source: string }[];
      testedAgainst?: string;
      testedAt?: string;
    }
  | {
      type: 'parameters';
      rows: {
        name: string;
        type: string;
        defaultValue: string;
        notes: string;
        required?: boolean;
        lifecycle?: Lifecycle;
        replaces?: string;
        expectedGa?: string;
      }[];
    };

export function toAgentMarkdown(blocks: readonly DocBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'heading') {
        const hashes = '#'.repeat(block.level);
        const since = block.since ? ` <!-- codex:anchor #${block.id} since=${block.since} -->` : '';
        return `${hashes} ${block.text} {#${block.id}}${since}`;
      }
      if (block.type === 'paragraph') {
        return block.text;
      }
      if (block.type === 'callout') {
        return `:::${block.kind}\n${block.text}\n:::`;
      }
      if (block.type === 'code') {
        const tested = [block.testedAgainst, block.testedAt].filter(Boolean).join(' · ');
        return block.languages
          .map((sample) => {
            const fence = `\`\`\`${sample.id}\n${sample.source}\n\`\`\``;
            return tested ? `${fence}\n<!-- tested ${tested} -->` : fence;
          })
          .join('\n\n');
      }
      const header = '| Parameter | Type | Default | Notes |';
      const rule = '| --- | --- | --- | --- |';
      const rows = block.rows.map((row) => {
        const flags = [
          row.required ? 'required' : null,
          row.lifecycle ? row.lifecycle : null,
          row.replaces ? `use ${row.replaces}` : null,
          row.expectedGa ? `ga ${row.expectedGa}` : null,
        ]
          .filter(Boolean)
          .join(', ');
        const name = flags ? `${row.name} (${flags})` : row.name;
        return `| ${name} | ${row.type} | ${row.defaultValue} | ${row.notes} |`;
      });
      return [header, rule, ...rows].join('\n');
    })
    .join('\n\n');
}
