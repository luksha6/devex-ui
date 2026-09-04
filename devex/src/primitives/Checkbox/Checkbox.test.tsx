import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles from the label', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Write to the audit log" />);
    const box = screen.getByRole('checkbox', { name: 'Write to the audit log' });
    expect(box).not.toBeChecked();
    await user.click(box);
    expect(box).toBeChecked();
  });
});
