import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

function Group() {
  const [value, setValue] = useState('human');
  return (
    <RadioGroup label="Audience" value={value} onChange={setValue}>
      <Radio value="human" label="Human" />
      <Radio value="agent" label="Agent" />
      <Radio value="both" label="Both" disabled />
    </RadioGroup>
  );
}

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/Radio',
  component: RadioGroup,
  render: () => <Group />,
  parameters: {
    docs: {
      description: {
        component:
          'Exclusive choice. Brand ring; selected is a brand fill with a 4px light pin. Nest Radio inside RadioGroup. Do not pass onChange to Radio.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
