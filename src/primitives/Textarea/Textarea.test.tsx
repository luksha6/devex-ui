import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('associates the label with the area', () => {
    render(<Textarea label="Runbook note" />);
    expect(screen.getByLabelText('Runbook note').tagName).toBe('TEXTAREA');
  });
});
