import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

function Controlled() {
  const [value, setValue] = useState('retry');
  return (
    <SearchField
      label="Sections"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue('')}
    />
  );
}

const meta: Meta<typeof SearchField> = {
  title: 'Primitives/SearchField',
  component: SearchField,
  parameters: {
    docs: {
      description: {
        component:
          'Search plus clear. Clear is part of the control and shows when the value is not empty. Prefer this over a bare Input type="search".',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = { render: () => <Controlled /> };
export const Empty: Story = {
  args: { label: 'Sections', placeholder: 'Search sections' },
};
export const Error: Story = {
  args: { label: 'Sections', error: 'Query cannot be empty.', value: '' },
};
