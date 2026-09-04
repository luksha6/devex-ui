import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders an icon, message, and action', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(
      <EmptyState
        title="Nothing in the backlog"
        message="Everything you own is either in progress or finished."
        action={
          <Button intent="secondary" onClick={onClear}>
            Clear filters
          </Button>
        }
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Nothing in the backlog');
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
