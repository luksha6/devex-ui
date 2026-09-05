import { toAgentMarkdown, type DocBlock } from './document';

const blocks: DocBlock[] = [
  { type: 'heading', level: 2, id: 'backoff-policy', text: 'Backoff policy', since: 'v2.09' },
  {
    type: 'paragraph',
    text: ['See ', { text: 'the runbook', href: '/runbook' }, ' before you retry.'],
  },
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
  {
    type: 'list',
    items: ['Do not retry 409', 'Wait for replica lag under 30s'],
  },
  {
    type: 'table',
    headers: ['Code', 'Meaning'],
    rows: [
      ['409', 'Already landed'],
      ['429', 'Shed load'],
    ],
  },
  {
    type: 'image',
    src: '/backoff.svg',
    alt: 'Backoff curve',
    caption: 'Exponential, then give up',
  },
  {
    type: 'run',
    phase: 'fail',
    label: 'Reindex knowledge-prod',
    detail: 'Replica lag is over 30s.',
    elapsedMs: 880,
    tools: [{ name: 'corpus.cutover', status: 'fail', result: 'replica lag 32s', latencyMs: 880 }],
    text: 'replica lag 32s',
    uncertainty: 'high',
  },
];

describe('toAgentMarkdown', () => {
  it('emits directives the agent face can parse', () => {
    const md = toAgentMarkdown(blocks);
    expect(md).toContain('See [the runbook](/runbook) before you retry.');
    expect(md).toContain(':::caution');
    expect(md).toContain('Do not retry 409');
    expect(md).toContain(':::agent-only');
    expect(md).toContain('```ts');
    expect(
      toAgentMarkdown([
        { type: 'code', languages: [{ id: 'ts', label: 'TypeScript', source: 'ok' }] },
      ]),
    ).toContain('<!-- untested -->');
    expect(
      toAgentMarkdown([
        {
          type: 'code',
          languages: [{ id: 'ts', label: 'TypeScript', source: 'ok' }],
          testedAgainst: 'knowledge@4a91c02',
        },
      ]),
    ).toContain('<!-- untested -->');
    expect(md).toContain('```curl');
    expect(md).toContain('<!-- tested knowledge@4a91c02 · 6d ago -->');
    expect(md).toContain('legacy_jitter (deprecated, use strategy, ga 2026-Q4)');
    expect(md).toContain('strategy (required, stable)');
    expect(md).toContain('codex:anchor #backoff-policy since=v2.09');
    expect(md).toContain('- Do not retry 409');
    expect(md).toContain('| Code | Meaning |');
    expect(md).toContain('![Backoff curve](/backoff.svg)');
    expect(
      toAgentMarkdown([{ type: 'image', src: 'javascript:alert(1)', alt: 'Unsafe figure' }]),
    ).toBe('Unsafe figure');
    expect(md).toContain('### Run: Reindex knowledge-prod');
    expect(md).toContain('Phase: fail · 1s');
    expect(md).toContain('- corpus.cutover: status=fail · result=replica lag 32s · latency=880ms');
    expect(md).toContain('Uncertainty: high');
  });
});
