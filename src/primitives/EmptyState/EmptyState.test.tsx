import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('names the empty and keeps the action', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No corpora"
        body="Create one before you reindex."
        action={<Button onClick={onClick}>Create</Button>}
      />,
    );
    expect(screen.getByText('No corpora')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
