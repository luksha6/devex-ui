import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'library', label: 'Library' },
  { id: 'backlog', label: 'Backlog' },
  { id: 'wishlist', label: 'Wishlist' },
];

function Example() {
  const [value, setValue] = useState('library');
  return <Tabs tabs={tabs} value={value} onChange={setValue} aria-label="Library views" />;
}

describe('Tabs', () => {
  it('renders a tablist with the selected tab', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Library views' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Library' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves selection with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const library = screen.getByRole('tab', { name: 'Library' });
    library.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Backlog' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Backlog' })).toHaveFocus();
  });
});
