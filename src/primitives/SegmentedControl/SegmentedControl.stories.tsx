import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

function Audience() {
  const [value, setValue] = useState('human');
  return (
    <SegmentedControl
      label="Audience"
      value={value}
      onChange={setValue}
      options={[
        { value: 'human', label: 'Human' },
        { value: 'agent', label: 'Agent' },
      ]}
    />
  );
}

const meta: Meta<typeof SegmentedControl> = {
  title: 'Primitives/SegmentedControl',
  component: SegmentedControl,
  render: () => <Audience />,
  parameters: {
    docs: {
      description: {
        component:
          'Exclusive modes in one pill. Use for Human/Agent and similar. Not tabs. Home/End move selection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};
