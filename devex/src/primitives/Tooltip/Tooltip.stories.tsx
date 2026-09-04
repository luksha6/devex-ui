import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Name a control that has no visible label. Do not put instructions in a tooltip.',
      },
    },
  },
  render: () => (
    <Tooltip content="Corpus id">
      <Button intent="secondary">Hover</Button>
    </Tooltip>
  ),
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};
