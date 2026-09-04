import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

describe('Select', () => {
  it('associates the label and changes value', async () => {
    const user = userEvent.setup();
    render(
      <Select
        label="Region"
        defaultValue="us-east"
        options={[
          { value: 'us-east', label: 'us-east' },
          { value: 'eu-west', label: 'eu-west' },
        ]}
      />,
    );
    await user.selectOptions(screen.getByLabelText('Region'), 'eu-west');
    expect(screen.getByLabelText('Region')).toHaveValue('eu-west');
  });
});
