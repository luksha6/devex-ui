import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Docs/CodeBlock',
  component: CodeBlock,
  parameters: {
    docs: {
      description: {
        component: 'One or more languages. Copy stays on the control. testedAgainst is optional.',
      },
    },
  },
  args: {
    languages: [
      {
        id: 'ts',
        label: 'TypeScript',
        source: `const res = await knowledge.read({ path });\nif (res.status === 429) {\n  await sleep(res.retryAfterMs);\n}\n`,
      },
      {
        id: 'curl',
        label: 'cURL',
        source: `curl -H "Authorization: Bearer $TOKEN" \\\n  https://api.internal/v1/knowledge/read\n`,
      },
    ],
    testedAgainst: 'knowledge@4a91c02',
    testedAt: '6d ago',
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Tested: Story = {};
export const Untested: Story = { args: { testedAgainst: undefined, testedAt: undefined } };
