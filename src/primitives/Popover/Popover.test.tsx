import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { Field } from '../Field/Field';
import { Popover } from './Popover';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      label="Filters"
      open={open}
      onOpenChange={setOpen}
      content={<Field label="Owner" defaultValue="platform-core" />}
    >
      <Button intent="secondary">Filters</Button>
    </Popover>
  );
}

describe('Popover', () => {
  it('opens a named dialog and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Filters' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(document.documentElement).not.toHaveAttribute('data-devex-dialog-open');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('does not close a parent Dialog on Escape', async () => {
    const user = userEvent.setup();
    function Nested() {
      const [dialog, setDialog] = useState(true);
      const [open, setOpen] = useState(true);
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} title="Row">
          <Popover
            label="Filters"
            open={open}
            onOpenChange={setOpen}
            content={<Field label="Owner" />}
          >
            <Button intent="secondary">Filters</Button>
          </Popover>
        </Dialog>
      );
    }
    render(<Nested />);
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Row' })).toBeInTheDocument();
  });
});
