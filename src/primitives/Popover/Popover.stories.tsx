import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { Stack } from '../Stack/Stack';
import { Popover } from './Popover';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      label="Filters"
      open={open}
      onOpenChange={setOpen}
      content={
        <Stack gap={3}>
          <Field label="Owner" defaultValue="platform-core" />
          <Button size="sm" onClick={() => setOpen(false)}>
            Apply
          </Button>
        </Stack>
      }
    >
      <Button intent="secondary">Filters</Button>
    </Popover>
  );
}

const meta: Meta<typeof Popover> = {
  title: 'Primitives/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'Interactive panel on a control. Portaled and flipped. Tooltip is description only. Menu is a list of actions.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = { render: () => <Example /> };
