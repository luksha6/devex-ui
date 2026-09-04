import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

function Example() {
  const [value, setValue] = useState('human');
  return (
    <Tabs
      label="Audience"
      value={value}
      onChange={setValue}
      items={[
        { id: 'human', label: 'Human', panel: 'Readable prose. 68ch.' },
        { id: 'agent', label: 'Agent', panel: <pre>{'## Rate limits\n'}</pre> },
        { id: 'diff', label: 'Diff', panel: 'Not shipped.', disabled: true },
      ]}
    />
  );
}

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  render: () => <Example />,
  parameters: {
    docs: {
      description: {
        component: 'Underline only. One selected tab is in the tab order. Do not use pills.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};
