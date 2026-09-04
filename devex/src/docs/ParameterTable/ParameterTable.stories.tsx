import type { Meta, StoryObj } from '@storybook/react';
import { ParameterTable } from './ParameterTable';

const meta: Meta<typeof ParameterTable> = {
  title: 'Docs/ParameterTable',
  component: ParameterTable,
  parameters: {
    docs: {
      description: {
        component:
          'Parameter rows. Required is RequiredTag. lifecycle is a Tag: stable, beta, deprecated, or internal.',
      },
    },
  },
  args: {
    rows: [
      {
        name: 'strategy',
        type: 'enum',
        defaultValue: 'exponential',
        notes: 'Backoff curve every client must implement.',
        required: true,
        lifecycle: 'stable',
      },
      {
        name: 'preview_mode',
        type: 'boolean',
        defaultValue: 'false',
        notes: 'Ships behind a flag.',
        lifecycle: 'beta',
        expectedGa: '2026-Q4',
      },
      {
        name: 'legacy_jitter',
        type: 'boolean',
        defaultValue: 'false',
        notes: 'Removed in v3.',
        lifecycle: 'deprecated',
        replaces: 'strategy',
      },
      {
        name: 'owner_token',
        type: 'string',
        defaultValue: '—',
        notes: 'Not in the public contract.',
        lifecycle: 'internal',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ParameterTable>;

export const Default: Story = {};
