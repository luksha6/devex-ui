import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

function Example() {
  const [checked, setChecked] = useState(false);
  return <Switch label="Machine rail" checked={checked} onChange={setChecked} />;
}

describe('Switch', () => {
  it('exposes aria-checked and toggles', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const control = screen.getByRole('switch', { name: 'Machine rail' });
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(control).toHaveTextContent('Off');
    expect(control).toHaveTextContent('On');
    await user.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Machine rail" checked={false} onChange={onChange} disabled />);
    await user.click(screen.getByRole('switch', { name: 'Machine rail' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
