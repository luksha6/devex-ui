import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Composer } from './Composer';

function Example({ error }: { error?: string }) {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState('');
  return (
    <>
      <Composer label="Prompt" value={value} onChange={setValue} onSubmit={setSent} error={error} />
      <p>{sent ? `Sent ${sent}` : 'Idle'}</p>
    </>
  );
}

describe('Composer', () => {
  it('sends a named prompt and keeps Send disabled while empty', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const field = screen.getByRole('textbox', { name: 'Prompt' });
    const send = screen.getByRole('button', { name: 'Send' });
    expect(send).toBeDisabled();
    await user.type(field, 'Reindex knowledge-prod');
    await user.click(send);
    expect(screen.getByText('Sent Reindex knowledge-prod')).toBeInTheDocument();
  });

  it('sends with Control plus Enter and names an error', async () => {
    const user = userEvent.setup();
    render(<Example error="Prompt cannot be empty." />);
    const field = screen.getByRole('textbox', { name: 'Prompt' });
    expect(field).toHaveAttribute('aria-invalid', 'true');
    await user.type(field, 'Cutover{Control>}{Enter}{/Control}');
    expect(screen.getByText('Sent Cutover')).toBeInTheDocument();
  });
});
