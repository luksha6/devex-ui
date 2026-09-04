import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('is labeled by the caller', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Corpus id" />);
    await user.type(screen.getByLabelText('Corpus id'), 'prod');
    expect(screen.getByLabelText('Corpus id')).toHaveValue('prod');
  });
});
