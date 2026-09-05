import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateField } from './DateField';

describe('DateField', () => {
  it('associates the label and names an error', async () => {
    const user = userEvent.setup();
    render(
      <DateField label="Cutover" defaultValue="2026-09-05" error="Cutover cannot be empty." />,
    );
    const field = screen.getByLabelText('Cutover');
    expect(field).toHaveAttribute('type', 'date');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Cutover cannot be empty.');
    await user.clear(field);
    expect(field).toHaveValue('');
  });
});
