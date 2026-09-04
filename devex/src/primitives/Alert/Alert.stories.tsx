import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  args: { children: 'Do not retry 409. The write already landed.' },
  argTypes: {
    kind: { control: false },
    children: { control: false },
    title: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'In-page status. Note is default. Ok is green. Caution is amber. Critical is red. Callout is the docs composite. Do not use Alert for Copied.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Alert kind="note">Keep the corpus id in the request.</Alert>
      <Alert kind="ok" title="Indexed">
        12 chunks written.
      </Alert>
      <Alert kind="caution">Do not retry 409.</Alert>
      <Alert kind="critical" title="Cutover blocked">
        Replica lag is over 30s.
      </Alert>
    </div>
  ),
};

export const Note: Story = { args: { kind: 'note' } };
export const Dismissible: Story = { args: { onDismiss: () => undefined } };
