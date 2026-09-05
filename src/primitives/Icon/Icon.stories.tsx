import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '../../types';
import { Icon } from './Icon';

const names: IconName[] = [
  'check',
  'close',
  'search',
  'chevron-down',
  'chevron-up',
  'chevron-right',
  'caution',
  'info',
  'plus',
  'minus',
  'copy',
  'external',
  'menu',
  'calendar',
  'upload',
];

const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  args: { name: 'search' },
  parameters: {
    docs: {
      description: {
        component:
          'Glyph. Pass label for a standalone icon. Omit label when it is decorative inside a Button or IconButton. Sizes 12, 16, 20.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Set: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
      {names.map((name) => (
        <Icon key={name} name={name} label={name} />
      ))}
    </div>
  ),
};
