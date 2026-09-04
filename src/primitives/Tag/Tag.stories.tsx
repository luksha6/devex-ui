import type { Meta, StoryObj } from '@storybook/react';
import { RequiredTag, Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  argTypes: {
    kind: { control: false },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Lifecycle. stable, beta, deprecated, and internal stay visible. Required fields use RequiredTag, not a required kind. Color is never the only channel.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: () => (
    <p style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Tag kind="stable">stable</Tag>
      <Tag kind="beta">beta · GA 2026-Q4</Tag>
      <Tag kind="deprecated">deprecated · use strategy</Tag>
      <Tag kind="internal">internal</Tag>
      <RequiredTag />
    </p>
  ),
};
export const Stable: Story = { args: { kind: 'stable', children: 'stable' } };
export const Beta: Story = { args: { kind: 'beta', children: 'beta · GA 2026-Q4' } };
export const Deprecated: Story = {
  args: { kind: 'deprecated', children: 'deprecated · use strategy' },
};
export const Internal: Story = { args: { kind: 'internal', children: 'internal' } };
export const Required: Story = {
  render: () => <RequiredTag />,
};
