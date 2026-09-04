import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the control', () => {
    render(<Input label="Keyword" helperText="Search by title" />);
    const input = screen.getByLabelText('Keyword');
    expect(input).toHaveAccessibleDescription('Search by title');
  });

  it('surfaces an error state to assistive tech', async () => {
    const user = userEvent.setup();
    render(<Input label="Keyword" error="Enter at least 2 characters" />);
    const input = screen.getByLabelText('Keyword');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter at least 2 characters');
    await user.type(input, 'Ha');
    expect(input).toHaveValue('Ha');
  });
});
