import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Filters
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filters">
        <p>Scope the corpus.</p>
      </Drawer>
    </div>
  );
}

describe('Drawer', () => {
  it('opens a labelled sheet and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Filters' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-devex-dialog-open', 'true');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.documentElement).not.toHaveAttribute('data-devex-dialog-open');
    expect(trigger).toHaveFocus();
  });
});
