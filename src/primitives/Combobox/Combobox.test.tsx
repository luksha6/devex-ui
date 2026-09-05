import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './Combobox';

const options = [
  { value: 'us-east', label: 'us-east', group: 'Americas', detail: 'Virginia' },
  { value: 'eu-west', label: 'eu-west', group: 'Europe' },
  { value: 'ap-south', label: 'ap-south', group: 'Asia', disabled: true },
];

function Example() {
  const [value, setValue] = useState('');
  return <Combobox label="Region" options={options} value={value} onChange={setValue} />;
}

describe('Combobox', () => {
  it('filters, selects one value, and names the listbox', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('combobox', { name: 'Region' });
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    await user.type(input, 'eu');
    expect(screen.getByRole('option', { name: 'eu-west' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /us-east/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'eu-west' }));
    expect(input).toHaveValue('eu-west');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('clears and restores after Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('combobox', { name: 'Region' });
    await user.click(input);
    await user.click(screen.getByRole('option', { name: /us-east/ }));
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    await user.click(input);
    await user.keyboard('{Escape}');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveValue('us-east');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
  });

  it('keeps a disabled option named', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('combobox', { name: 'Region' }));
    expect(screen.getByRole('option', { name: 'ap-south' })).toBeDisabled();
  });
});
