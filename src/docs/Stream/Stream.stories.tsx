import type { Meta, StoryObj } from '@storybook/react';
import { Stream } from './Stream';

const meta: Meta<typeof Stream> = {
  title: 'Docs/Stream',
  component: Stream,
  parameters: {
    docs: {
      description: {
        component:
          'Tokens as they arrive. Caret while incomplete. Uncertainty is a typed line. Fail is a reason on the run. Reduced motion still shows the caret static.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stream>;

export const Running: Story = {
  args: { text: 'checking corpus knowledge-prod\nstatus=blocked\n' },
};

export const Complete: Story = {
  args: {
    text: 'checking corpus knowledge-prod\nstatus=blocked\n12 chunks written\nok\n',
    complete: true,
  },
};

export const Uncertain: Story = {
  args: {
    text: 'replica lag 12s. cutover may still fail.\n',
    uncertainty: 'high',
  },
};
