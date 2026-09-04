import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from './SegmentedControl';

function Example() {
  const [value, setValue] = useState('human');
  return (
    <SegmentedControl
      label="Audience"
      value={value}
      onChange={setValue}
      options={[
        { value: 'human', label: 'Human' },
        { value: 'agent', label: 'Agent' },
      ]}
    />
  );
}

describe('SegmentedControl', () => {
  it('is a radiogroup, not a tablist', () => {
    render(<Example />);
    expect(screen.getByRole('radiogroup', { name: 'Audience' })).toBeInTheDocument();
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Human' })).toHaveAttribute('aria-checked', 'true');
  });

  it('moves selection with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Example />);
    screen.getByRole('radio', { name: 'Human' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'Agent' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Agent' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('radio', { name: 'Human' })).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{End}');
    expect(screen.getByRole('radio', { name: 'Agent' })).toHaveAttribute('aria-checked', 'true');
  });
});
