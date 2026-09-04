import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'us-east', label: 'us-east' },
  { value: 'eu-west', label: 'eu-west' },
  { value: 'ap-south', label: 'ap-south', disabled: true },
];

function Example() {
  const [value, setValue] = useState<string[]>([]);
  return <MultiSelect label="Regions" options={options} value={value} onChange={setValue} />;
}

describe('MultiSelect', () => {
  it('selects values as chips and restores after Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('combobox', { name: 'Regions' });
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('option', { name: 'us-east' }));
    await user.click(screen.getByRole('option', { name: 'eu-west' }));
    expect(screen.getByRole('list', { name: 'Regions selected' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove us-east' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'us-east' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{Escape}');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove eu-west' })).toBeInTheDocument();
  });

  it('filters options and removes a chip', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('combobox', { name: 'Regions' });
    await user.click(input);
    await user.type(input, 'eu');
    expect(screen.getByRole('option', { name: 'eu-west' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'us-east' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'eu-west' }));
    await user.click(screen.getByRole('button', { name: 'Remove eu-west' }));
    expect(screen.queryByRole('button', { name: 'Remove eu-west' })).not.toBeInTheDocument();
  });
});
