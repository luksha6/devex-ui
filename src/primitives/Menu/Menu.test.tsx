import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { Menu } from './Menu';

function Example({
  disabledItem = false,
  menuDisabled = false,
}: {
  disabledItem?: boolean;
  menuDisabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState('');
  return (
    <div>
      <Menu
        label="Row actions"
        open={open}
        onOpenChange={setOpen}
        disabled={menuDisabled}
        items={[
          { id: 'copy', label: 'Copy id', onSelect: () => setPicked('copy') },
          {
            id: 'archive',
            label: 'Archive',
            disabled: disabledItem,
            onSelect: () => setPicked('archive'),
          },
          { id: 'revoke', label: 'Revoke', danger: true, onSelect: () => setPicked('revoke') },
        ]}
      >
        <Button intent="secondary">Actions</Button>
      </Menu>
      <p>{picked ? `Picked ${picked}` : 'None'}</p>
    </div>
  );
}

describe('Menu', () => {
  it('opens a labelled menu and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await user.click(trigger);
    expect(screen.getByRole('menu', { name: 'Row actions' })).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.documentElement).not.toHaveAttribute('data-devex-dialog-open');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('moves with arrows and Home End, then selects', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menuitem', { name: 'Copy id' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('menuitem', { name: 'Revoke' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('menuitem', { name: 'Copy id' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Picked copy')).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('skips a disabled item and keeps the name in the menu', async () => {
    const user = userEvent.setup();
    render(<Example disabledItem />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    const archive = screen.getByRole('menuitem', { name: 'Archive' });
    expect(archive).toBeDisabled();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Revoke' })).toHaveFocus();
    await user.click(archive);
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('does not open when the menu is disabled', async () => {
    const user = userEvent.setup();
    render(<Example menuDisabled />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
