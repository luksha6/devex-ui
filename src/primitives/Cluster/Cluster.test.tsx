import { render, screen } from '@testing-library/react';
import { Cluster } from './Cluster';

describe('Cluster', () => {
  it('keeps a group name', () => {
    render(
      <Cluster as="div" role="group" aria-label="Actions" gap={2}>
        <span>Copy</span>
        <span>Revoke</span>
      </Cluster>,
    );
    expect(screen.getByRole('group', { name: 'Actions' })).toBeInTheDocument();
  });
});
