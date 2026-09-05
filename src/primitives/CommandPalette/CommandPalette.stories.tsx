import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { CommandPalette } from './CommandPalette';

function Example() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Button intent="secondary" onClick={() => setOpen(true)}>
        Open palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={[
          {
            id: 'cutover',
            label: 'Cutover',
            group: 'Corpus',
            shortcut: '⌘⇧C',
            onSelect: () => undefined,
          },
          {
            id: 'reindex',
            label: 'Reindex',
            group: 'Corpus',
            detail: 'knowledge-prod',
            onSelect: () => undefined,
          },
          { id: 'docs', label: 'Open docs', group: 'Go to', onSelect: () => undefined },
        ]}
      />
    </>
  );
}

const meta: Meta<typeof CommandPalette> = {
  title: 'Primitives/CommandPalette',
  component: CommandPalette,
  parameters: {
    docs: {
      description: {
        component:
          'Search and run a command. The kit paints the dialog. The app binds ⌘K. Not a page, not a Menu.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = { render: () => <Example /> };
