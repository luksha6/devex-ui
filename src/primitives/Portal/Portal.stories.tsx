import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text/Text';
import { Portal } from './Portal';

function IntoBox() {
  const [box, setBox] = useState<HTMLDivElement | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Text variant="body">The React tree stays here. The node lands in the marked box.</Text>
      <div
        ref={setBox}
        style={{
          minHeight: 'var(--space-8)',
          padding: 'var(--space-3)',
          border: 'var(--border-width) solid var(--color-divider)',
          borderRadius: 'var(--radius-panel)',
          background: 'var(--color-surface)',
        }}
      />
      {box ? (
        <Portal container={box}>
          <Text variant="body">Rendered through Portal.</Text>
        </Portal>
      ) : null}
    </div>
  );
}

const meta: Meta<typeof Portal> = {
  title: 'Primitives/Portal',
  component: Portal,
  parameters: {
    docs: {
      description: {
        component:
          'Moves children onto `document.body` or a `container`. The host stays empty. Dialog, Drawer, Toast, and Tooltip use this.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = { render: () => <IntoBox /> };
export const Body: Story = {
  render: () => (
    <>
      <Text variant="body">Host is empty. The next line is a sibling of the story root.</Text>
      <Portal>
        <Text variant="body">Rendered on document.body.</Text>
      </Portal>
    </>
  ),
};
