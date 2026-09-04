import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Toaster, useToast } from './Toast';

function Example() {
  const { show } = useToast();
  return (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Button
        intent="secondary"
        onClick={() =>
          show({
            kind: 'ok',
            title: 'Reindex queued',
            detail: 'Run 4a91c02 is waiting for approval.',
          })
        }
      >
        Queue the run
      </Button>
      <Button
        intent="danger"
        onClick={() =>
          show({
            kind: 'caution',
            title: 'Denied',
            detail: 'Cutover was not approved.',
          })
        }
      >
        Deny
      </Button>
    </div>
  );
}

const meta: Meta<typeof Toaster> = {
  title: 'Primitives/Toast',
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component:
          'Out-of-band status. Mount ToastProvider around the click target and call useToast(). Use after a job leaves the page. Do not use toast for Copied, Cite, or Approve — those stay on the control.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <Toaster>
      <Example />
    </Toaster>
  ),
};
