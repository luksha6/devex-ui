import type { Meta, StoryObj } from '@storybook/react';
import { ResultRow } from './ResultRow';

const meta: Meta<typeof ResultRow> = {
  title: 'Docs/ResultRow',
  component: ResultRow,
  parameters: {
    docs: {
      description: {
        component: 'A search hit or a withheld row. Withheld names the reason in type.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResultRow>;

export const Hit: Story = {
  args: {
    score: 0.91,
    title: 'Rate limits & retries',
    section: 'Backoff policy',
    snippet: (
      <>
        Do not retry <mark>409</mark>. It means the write already landed.
      </>
    ),
    tokens: 180,
    path: '#backoff-policy',
    selected: true,
  },
};

export const Withheld: Story = {
  args: { kind: 'withheld', count: 3, reason: 'internal · out of scope' },
};
