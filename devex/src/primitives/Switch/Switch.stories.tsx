import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

function Example({
  initial = true,
  offLabel,
  onLabel,
}: {
  initial?: boolean;
  offLabel?: string;
  onLabel?: string;
}) {
  const [checked, setChecked] = useState(initial);
  return (
    <Switch
      label="Machine rail"
      offLabel={offLabel}
      onLabel={onLabel}
      checked={checked}
      onChange={setChecked}
    />
  );
}

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  render: () => <Example />,
  parameters: {
    docs: {
      description: {
        component:
          'Boolean pill. Off/On are the sides. Optional offLabel/onLabel. The label is a sibling, not a wrapping label. Disabled drops the brand fill.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
export const Off: Story = { render: () => <Example initial={false} /> };
export const Sides: Story = { render: () => <Example offLabel="Idle" onLabel="Live" /> };
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Switch label="Machine rail" checked={false} onChange={() => undefined} disabled />
      <Switch label="Machine rail" checked onChange={() => undefined} disabled />
    </div>
  ),
};
