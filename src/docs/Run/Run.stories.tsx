import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../primitives/Button/Button';
import { Run } from './Run';

const meta: Meta<typeof Run> = {
  title: 'Docs/Run',
  component: Run,
  parameters: {
    docs: {
      description: {
        component:
          'One surface for a job. Latency, tools, stream, fail. Not a toast. Not a spinner that never ends.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Run>;

export const Running: Story = {
  args: {
    phase: 'running',
    label: 'Reindex knowledge-prod',
    elapsedMs: 12000,
    tools: [
      { name: 'corpus.status', status: 'ok', result: 'blocked', latencyMs: 41 },
      { name: 'corpus.write', status: 'running', args: 'chunks=12' },
    ],
    text: 'writing 12 chunks\n',
    uncertainty: 'low',
  },
};

export const Fail: Story = {
  args: {
    phase: 'fail',
    label: 'Reindex knowledge-prod',
    detail: 'Replica lag is over 30s. Cutover did not run.',
    elapsedMs: 880,
    tools: [{ name: 'corpus.cutover', status: 'fail', result: 'replica lag 32s', latencyMs: 880 }],
    text: 'replica lag 32s\n',
    uncertainty: 'high',
    actions: <Button intent="danger">Retry</Button>,
  },
};
