import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

function Example() {
  const [value, setValue] = useState('human');
  return (
    <Tabs
      label="Audience"
      value={value}
      onChange={setValue}
      items={[
        { id: 'human', label: 'Human', panel: 'Readable prose.' },
        { id: 'agent', label: 'Agent', panel: 'Markdown.' },
      ]}
    />
  );
}

describe('Tabs', () => {
  it('shows the selected panel and moves with arrows', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByRole('tab', { name: 'Human' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Readable prose.');
    await user.click(screen.getByRole('tab', { name: 'Human' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Agent' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Markdown.');
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Human' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Agent' })).toHaveAttribute('aria-selected', 'true');
  });
});
