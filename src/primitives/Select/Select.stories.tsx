import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  args: {
    label: 'Region',
    placeholder: 'Choose a region',
    defaultValue: '',
    options: [
      { value: 'us-east', label: 'us-east' },
      { value: 'eu-west', label: 'eu-west' },
      { value: 'ap-south', label: 'ap-south', disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: 'One value from a native select. Use MultiSelect when the user picks many.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const Error: Story = { args: { error: 'Region is required.' } };
export const Disabled: Story = { args: { disabled: true } };
