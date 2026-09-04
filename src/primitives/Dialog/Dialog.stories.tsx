import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { Dialog } from './Dialog';

function Confirm({ width }: { width?: 'sm' | 'md' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm cutover"
        width={width}
        actions={
          <>
            <Button intent="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Cut over</Button>
          </>
        }
      >
        <Field label="Corpus id" placeholder="knowledge-prod" />
      </Dialog>
    </>
  );
}

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Blocking work. Put the consequence in the title and the confirm in actions. Do not use a dialog to show Copied.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = { render: () => <Confirm /> };
export const WithActions: Story = { render: () => <Confirm /> };
export const Small: Story = { render: () => <Confirm width="sm" /> };
