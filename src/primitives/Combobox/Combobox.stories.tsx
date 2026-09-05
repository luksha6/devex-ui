import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';

const options = [
  { value: 'us-east', label: 'us-east', group: 'Americas', detail: 'Virginia' },
  { value: 'us-west', label: 'us-west', group: 'Americas', detail: 'Oregon' },
  { value: 'eu-west', label: 'eu-west', group: 'Europe' },
  { value: 'eu-central', label: 'eu-central', group: 'Europe' },
  { value: 'ap-south', label: 'ap-south', group: 'Asia', disabled: true },
  { value: 'ap-east', label: 'ap-east', group: 'Asia' },
];

function Example({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState('eu-west');
  return (
    <Combobox
      label="Region"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Search regions"
      disabled={disabled}
      hint="One value. Search filters. Select is the native control."
    />
  );
}

const meta: Meta<typeof Combobox> = {
  title: 'Primitives/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          'One searchable value. Groups and detail stay in the list. Native Select when the list is short and unfiltered.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = { render: () => <Example /> };
export const Disabled: Story = { render: () => <Example disabled /> };
