import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { Card } from './Card';

function Selectable() {
  const [selected, setSelected] = useState(false);
  return (
    <Card
      title="us-east"
      selected={selected}
      onSelect={() => setSelected((value) => !value)}
      actions={<Button intent="secondary">Open</Button>}
    >
      Virginia
    </Card>
  );
}

describe('Card', () => {
  it('names a selected card in type and press', async () => {
    const user = userEvent.setup();
    render(<Selectable />);
    const card = screen.getByRole('button', { name: 'us-east' });
    expect(card).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Select')).toBeInTheDocument();
    await user.click(card);
    expect(card).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  it('keeps actions out of the select press', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <Card
        title="us-east"
        selected={false}
        onSelect={() => undefined}
        actions={<Button onClick={onOpen}>Open</Button>}
      >
        Virginia
      </Card>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
