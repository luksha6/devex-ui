import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('lays children out as a labelled region when asked', () => {
    render(
      <Stack as="section" gap={4} aria-label="Corpus">
        <p>One</p>
        <p>Two</p>
      </Stack>,
    );
    expect(screen.getByRole('region', { name: 'Corpus' })).toBeInTheDocument();
  });
});
