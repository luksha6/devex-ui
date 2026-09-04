import { render, screen } from '@testing-library/react';
import { Input } from '../Input/Input';
import { PropertyField } from './PropertyField';

describe('PropertyField', () => {
  it('keeps the label next to the control', () => {
    render(
      <PropertyField label="Corpus id">
        <Input aria-label="Corpus id" />
      </PropertyField>,
    );
    expect(screen.getByRole('group', { name: 'Corpus id' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Corpus id' })).toBeInTheDocument();
  });
});
