import type { Meta, StoryObj } from '@storybook/react';
import { RunStatus } from './RunStatus';

const meta: Meta<typeof RunStatus> = {
  title: 'Docs/RunStatus',
  component: RunStatus,
  parameters: {
    docs: {
      description: {
        component:
          'A long-running job. Elapsed stays on the run, not a toast. Fail names the reason.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RunStatus>;

export const Running: Story = {
  args: { phase: 'running', label: 'Reindex knowledge-prod', elapsedMs: 12000 },
};

export const Failed: Story = {
  args: {
    phase: 'fail',
    label: 'Reindex knowledge-prod',
    detail: 'Replica lag is over 30s. Cutover did not run.',
    elapsedMs: 880,
  },
};
