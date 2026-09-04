import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  args: { label: 'Runbook note', placeholder: 'What the agent should not retry.' },
  parameters: {
    docs: {
      description: {
        component: 'Multiline with a required label. Hint and error sit under the field.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Error: Story = { args: { error: 'Note is required.' } };
export const Disabled: Story = { args: { disabled: true, value: 'locked' } };
