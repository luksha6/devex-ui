import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './Radio';

function Group() {
  const [value, setValue] = useState('human');
  return (
    <RadioGroup label="Audience" value={value} onChange={setValue}>
      <Radio value="human" label="Human" />
      <Radio value="agent">Agent</Radio>
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('moves selection between radios', async () => {
    const user = userEvent.setup();
    render(<Group />);
    expect(screen.getByRole('radiogroup', { name: 'Audience' })).toBeInTheDocument();
    expect(screen.getByText('Audience')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Human' })).toBeChecked();
    await user.click(screen.getByRole('radio', { name: 'Agent' }));
    expect(screen.getByRole('radio', { name: 'Agent' })).toBeChecked();
  });
});
