import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { Drawer } from './Drawer';

function Example({ side }: { side?: 'bottom' | 'end' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Filters"
        side={side}
        actions={
          <>
            <Button intent="secondary" onClick={() => setOpen(false)}>
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </>
        }
      >
        <Field label="Corpus" placeholder="knowledge-prod" />
      </Drawer>
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          'Sheet for filters and mobile chrome. Bottom is the default. End is the side panel and becomes a bottom sheet under 640px.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = { render: () => <Example /> };
export const Bottom: Story = { render: () => <Example /> };
export const End: Story = { render: () => <Example side="end" /> };
