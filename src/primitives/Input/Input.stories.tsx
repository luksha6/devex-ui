import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  args: { placeholder: 'knowledge-prod', 'aria-label': 'Corpus id' },
  parameters: {
    docs: {
      description: {
        component:
          'Bare text field. Prefer Field when the label is visible. size is the control token, not HTML size.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: ' ' } };
export const Disabled: Story = { args: { disabled: true, value: 'locked' } };
