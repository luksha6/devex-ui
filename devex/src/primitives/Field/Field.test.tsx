import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from './Field';

describe('Field', () => {
  it('associates the label with the input', async () => {
    const user = userEvent.setup();
    render(<Field label="Query" placeholder="Search sections" />);
    const input = screen.getByLabelText('Query');
    await user.type(input, 'retry');
    expect(input).toHaveValue('retry');
  });

  it('exposes error text to the input', () => {
    render(<Field label="Query" error="Query cannot be empty." />);
    const input = screen.getByLabelText('Query');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Query cannot be empty.');
  });
});
