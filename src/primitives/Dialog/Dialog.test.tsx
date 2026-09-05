import { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Search docs
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Search sections">
        <p>Section results.</p>
      </Dialog>
    </div>
  );
}

describe('Dialog', () => {
  it('opens a labelled dialog and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Search docs' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Search sections' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-devex-dialog-open', 'true');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.documentElement).not.toHaveAttribute('data-devex-dialog-open');
    expect(trigger).toHaveFocus();
  });

  it('cycles Tab inside the dialog', async () => {
    const user = userEvent.setup();
    function Trap() {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button type="button" onClick={() => setOpen(true)}>
            Search docs
          </button>
          <Dialog open={open} onClose={() => setOpen(false)} title="Query">
            <input aria-label="Corpus" />
          </Dialog>
        </div>
      );
    }
    render(<Trap />);
    await user.click(screen.getByRole('button', { name: 'Search docs' }));
    const close = screen.getByRole('button', { name: 'Close' });
    const corpus = screen.getByLabelText('Corpus');
    expect(corpus).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(corpus).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
  });

  it('does not steal focus when onClose identity changes while open', () => {
    let bump = () => undefined as void;
    function UnstableClose() {
      const [, setTick] = useState(0);
      bump = () => setTick((value) => value + 1);
      return (
        <Dialog open onClose={() => setTick((value) => value)} title="Query">
          <input aria-label="Corpus" />
        </Dialog>
      );
    }
    render(<UnstableClose />);
    const query = screen.getByLabelText('Corpus');
    query.focus();
    act(() => bump());
    expect(query).toHaveFocus();
  });
});
