import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('requires an accessible name and fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton label="Search" onClick={onClick}>
        <Icon name="search" />
      </IconButton>,
    );
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire when loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton label="Search" loading onClick={onClick}>
        <Icon name="search" />
      </IconButton>,
    );
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
