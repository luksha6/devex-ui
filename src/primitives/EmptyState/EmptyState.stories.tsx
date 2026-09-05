import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: 'Named empty. One action. Not a spinner that never ends.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No corpora',
    body: 'Create one before you reindex.',
    action: <Button>Create</Button>,
  },
};
