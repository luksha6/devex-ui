import { toAgentMarkdown, type DocBlock } from './document';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy', since: 'v2.09' },
  {
    type: 'callout',
    kind: 'caution',
    text: 'Do not retry 409. It means the write already landed.',
  },
  {
    type: 'callout',
    kind: 'agent-only',
    text: 'Prefer GET /v1/corpus/:id/status over polling list endpoints.',
  },
  {
    type: 'code',
    languages: [
      { id: 'ts', label: 'TypeScript', source: 'await client.retry();' },
      { id: 'curl', label: 'cURL', source: 'curl /retry' },
    ],
    testedAgainst: 'knowledge@4a91c02',
    testedAt: '6d ago',
  },
  {
    type: 'parameters',
    rows: [
      {
        name: 'legacy_jitter',
        type: 'boolean',
        defaultValue: 'false',
        notes: 'Removed in v3.',
        lifecycle: 'deprecated',
        replaces: 'strategy',
        expectedGa: '2026-Q4',
      },
      {
        name: 'strategy',
        type: 'enum',
        defaultValue: 'exponential',
        notes: 'Backoff curve.',
        required: true,
        lifecycle: 'stable',
      },
    ],
  },
];

describe('toAgentMarkdown', () => {
  it('emits directives the agent face can parse', () => {
    const md = toAgentMarkdown(blocks);
    expect(md).toContain(':::caution');
    expect(md).toContain('Do not retry 409');
    expect(md).toContain(':::agent-only');
    expect(md).toContain('```ts');
    expect(md).toContain('```curl');
    expect(md).toContain('<!-- tested knowledge@4a91c02 · 6d ago -->');
    expect(md).toContain('legacy_jitter (deprecated, use strategy, ga 2026-Q4)');
    expect(md).toContain('strategy (required, stable)');
    expect(md).toContain('codex:anchor #backoff-policy since=v2.09');
  });
});
