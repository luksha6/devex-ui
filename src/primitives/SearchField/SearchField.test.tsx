import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchField } from './SearchField';

function Example() {
  const [value, setValue] = useState('retry');
  return (
    <SearchField
      label="Sections"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue('')}
    />
  );
}

describe('SearchField', () => {
  it('clears from the control', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.getByLabelText('Sections')).toHaveValue('retry');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByLabelText('Sections')).toHaveValue('');
  });

  it('shows clear after typing in an uncontrolled field', async () => {
    const user = userEvent.setup();
    render(<SearchField label="Sections" />);
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('Sections'), 'retry');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByLabelText('Sections')).toHaveValue('');
  });
});
