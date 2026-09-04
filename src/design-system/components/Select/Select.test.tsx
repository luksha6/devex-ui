import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'all', label: 'All platforms' },
  { value: 'pc', label: 'PC' },
  { value: 'switch', label: 'Switch' },
];

function ControlledSelect() {
  const [value, setValue] = useState('all');
  return <Select label="Platform" options={options} value={value} onChange={setValue} />;
}

describe('Select', () => {
  it('renders a labelled combobox trigger', () => {
    render(<ControlledSelect />);
    expect(screen.getByRole('button', { name: /platform/i })).toHaveTextContent('All platforms');
  });

  it('opens with the keyboard and selects an option', async () => {
    const user = userEvent.setup();
    render(<ControlledSelect />);
    const trigger = screen.getByRole('button', { name: /platform/i });
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(trigger).toHaveTextContent('PC');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
