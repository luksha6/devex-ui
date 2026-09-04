import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders a real button and fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Verify</Button>);
    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button.tagName).toBe('BUTTON');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire when loading and exposes aria-busy', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Verify
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not fire when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Verify
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: 'Verify' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
