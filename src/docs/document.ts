import type { CalloutKind, Lifecycle, RunPhase, StreamUncertainty, ToolCallStatus } from '../types';
import { isSafeHref, isSafeImageSrc } from '../utils/safeHref';

export type DocInline =
  | string
  | {
      text: string;
      href?: string;
      strong?: boolean;
      code?: boolean;
    };

export type DocText = string | readonly DocInline[];

export function isCodeTested(testedAgainst?: string, testedAt?: string): boolean {
  return Boolean(testedAgainst && testedAt);
}

export function toInlineMarkdown(text: DocText): string {
  if (typeof text === 'string') {
    return text;
  }
  return text
    .map((part) => {
      if (typeof part === 'string') {
        return part;
      }
      let out = part.text;
      if (part.code) {
        out = `\`${out}\``;
      }
      if (part.strong) {
        out = `**${out}**`;
      }
      if (part.href && isSafeHref(part.href)) {
        out = `[${out}](${part.href})`;
      }
      return out;
    })
    .join('');
}

export type DocBlock =
  | { type: 'heading'; level: 2 | 3; id: string; text: string; since?: string }
  | { type: 'paragraph'; text: DocText }
  | { type: 'callout'; kind: CalloutKind; text: DocText }
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
    }
  | { type: 'list'; ordered?: boolean; items: readonly DocText[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | {
      type: 'run';
      phase: RunPhase;
      label: string;
      elapsedMs?: number;
      detail?: string;
      tools?: {
        name: string;
        status: ToolCallStatus;
        args?: string;
        result?: string;
        latencyMs?: number;
      }[];
      text?: string;
      uncertainty?: StreamUncertainty;
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
        return toInlineMarkdown(block.text);
      }
      if (block.type === 'callout') {
        return `:::${block.kind}\n${toInlineMarkdown(block.text)}\n:::`;
      }
      if (block.type === 'code') {
        const tested = isCodeTested(block.testedAgainst, block.testedAt)
          ? `<!-- tested ${block.testedAgainst} · ${block.testedAt} -->`
          : '<!-- untested -->';
        return block.languages
          .map((sample) => {
            const fence = `\`\`\`${sample.id}\n${sample.source}\n\`\`\``;
            return `${fence}\n${tested}`;
          })
          .join('\n\n');
      }
      if (block.type === 'list') {
        return block.items
          .map((item, index) => {
            const line = toInlineMarkdown(item);
            return block.ordered ? `${index + 1}. ${line}` : `- ${line}`;
          })
          .join('\n');
      }
      if (block.type === 'table') {
        const header = `| ${block.headers.join(' | ')} |`;
        const rule = `| ${block.headers.map(() => '---').join(' | ')} |`;
        const rows = block.rows.map((row) => `| ${row.join(' | ')} |`);
        return [header, rule, ...rows].join('\n');
      }
      if (block.type === 'image') {
        if (!isSafeImageSrc(block.src)) {
          return block.caption ? `${block.alt} — ${block.caption}` : block.alt;
        }
        const image = `![${block.alt}](${block.src})`;
        return block.caption ? `${image}\n\n_${block.caption}_` : image;
      }
      if (block.type === 'run') {
        const tools = (block.tools ?? [])
          .map((tool) => {
            const bits = [
              `status=${tool.status}`,
              tool.args ? `args=${tool.args}` : null,
              tool.result ? `result=${tool.result}` : null,
              tool.latencyMs != null ? `latency=${tool.latencyMs}ms` : null,
            ]
              .filter(Boolean)
              .join(' · ');
            return `- ${tool.name}: ${bits}`;
          })
          .join('\n');
        const elapsed = block.elapsedMs != null ? `${Math.round(block.elapsedMs / 1000)}s` : null;
        return [
          `### Run: ${block.label}`,
          `Phase: ${block.phase}${elapsed ? ` · ${elapsed}` : ''}`,
          block.detail ? `Detail: ${block.detail}` : null,
          tools || null,
          block.text ? `\`\`\`\n${block.text}\n\`\`\`` : null,
          block.uncertainty && block.uncertainty !== 'none'
            ? `Uncertainty: ${block.uncertainty}`
            : null,
        ]
          .filter(Boolean)
          .join('\n');
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
