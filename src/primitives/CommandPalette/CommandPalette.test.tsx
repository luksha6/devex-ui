import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { CommandPalette } from './CommandPalette';

function Example() {
  const [open, setOpen] = useState(true);
  const [picked, setPicked] = useState('');
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={[
          {
            id: 'cutover',
            label: 'Cutover',
            group: 'Corpus',
            onSelect: () => setPicked('cutover'),
          },
          {
            id: 'reindex',
            label: 'Reindex',
            group: 'Corpus',
            detail: 'knowledge-prod',
            onSelect: () => setPicked('reindex'),
          },
          { id: 'archive', label: 'Archive', disabled: true, onSelect: () => setPicked('archive') },
        ]}
      />
      <p>{picked ? `Picked ${picked}` : 'None'}</p>
    </>
  );
}

describe('CommandPalette', () => {
  it('filters, runs a command, and names the dialog', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    const search = screen.getByRole('combobox', { name: 'Search commands' });
    expect(search).toHaveAttribute('aria-expanded', 'true');
    await user.type(search, 're');
    expect(screen.getByRole('option', { name: /Reindex/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Cutover' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: /Reindex/ }));
    expect(screen.getByText('Picked reindex')).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument();
  });

  it('keeps a disabled command named and restores on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByRole('option', { name: 'Archive' })).toBeDisabled();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument();
  });
});
