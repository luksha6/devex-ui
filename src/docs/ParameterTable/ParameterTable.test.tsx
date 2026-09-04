import { render, screen } from '@testing-library/react';
import { ParameterTable } from './ParameterTable';

describe('ParameterTable', () => {
  it('puts lifecycle and required in the name cell as text', () => {
    render(
      <ParameterTable
        rows={[
          {
            name: 'strategy',
            type: 'enum',
            defaultValue: 'exponential',
            notes: 'Backoff curve.',
            required: true,
            lifecycle: 'stable',
          },
          {
            name: 'legacy_jitter',
            type: 'boolean',
            defaultValue: 'false',
            notes: 'Removed in v3.',
            lifecycle: 'deprecated',
            replaces: 'strategy',
          },
        ]}
      />,
    );
    expect(screen.getByText('req')).toBeInTheDocument();
    expect(screen.getByText(/deprecated · use strategy/)).toBeInTheDocument();
    expect(screen.getByText('stable')).toBeInTheDocument();
  });

  it('leaves unlabeled rows without a lifecycle chip', () => {
    render(
      <ParameterTable
        rows={[
          {
            name: 'max_retries',
            type: 'integer',
            defaultValue: '5',
            notes: 'Hard cap.',
          },
        ]}
      />,
    );
    expect(screen.queryByText('stable')).not.toBeInTheDocument();
    expect(screen.queryByText('beta')).not.toBeInTheDocument();
  });
});
