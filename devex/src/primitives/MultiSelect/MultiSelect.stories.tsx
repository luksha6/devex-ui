import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'us-east', label: 'us-east' },
  { value: 'us-west', label: 'us-west' },
  { value: 'eu-west', label: 'eu-west' },
  { value: 'eu-central', label: 'eu-central' },
  { value: 'ap-south', label: 'ap-south', disabled: true },
  { value: 'ap-east', label: 'ap-east' },
];

function Example({ max, disabled }: { max?: number; disabled?: boolean }) {
  const [value, setValue] = useState<string[]>(['eu-west']);
  return (
    <MultiSelect
      label="Regions"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Search regions"
      max={max}
      disabled={disabled}
      hint={max ? `Up to ${max}` : undefined}
    />
  );
}

const meta: Meta<typeof MultiSelect> = {
  title: 'Primitives/MultiSelect',
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component:
          'Several values from one list. Search filters. Selected values are chips under the field. Use Select when only one value is allowed.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = { render: () => <Example /> };
export const Max: Story = { render: () => <Example max={2} /> };
export const Disabled: Story = { render: () => <Example disabled /> };
