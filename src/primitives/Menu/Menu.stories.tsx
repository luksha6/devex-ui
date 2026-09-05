import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { Menu, type MenuItem } from './Menu';

function Demo({
  disabled = false,
  disabledItem = false,
}: {
  disabled?: boolean;
  disabledItem?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState('None');
  const items: MenuItem[] = [
    { id: 'copy', label: 'Copy id', onSelect: () => setPicked('Copy id') },
    {
      id: 'archive',
      label: 'Archive',
      disabled: disabledItem,
      onSelect: () => setPicked('Archive'),
    },
    { id: 'revoke', label: 'Revoke', danger: true, onSelect: () => setPicked('Revoke') },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Menu
        label="Row actions"
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        items={items}
      >
        <Button intent="secondary" trailing={<Icon name="chevron-down" />}>
          Actions
        </Button>
      </Menu>
      <p>{picked}</p>
    </div>
  );
}

const meta: Meta<typeof Menu> = {
  title: 'Primitives/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'Actions on a control. Flat: items array, not Menu.Item. Escape and click outside close. Arrows, Home, and End move. Danger is red and named. Does not lock the page.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => <Demo />,
};

export const DisabledItem: Story = {
  render: () => <Demo disabledItem />,
};

export const Disabled: Story = {
  render: () => <Demo disabled />,
};
