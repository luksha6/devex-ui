import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Primitives/Field',
  component: Field,
  args: { label: 'Query', placeholder: 'Search sections' },
  parameters: {
    docs: {
      description: {
        component:
          'Labeled text. Hint is supporting. Error is red. Do not use a Field when the control is a Select, Textarea, or SearchField.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {};
export const Hint: Story = { args: { hint: 'Matches the section title.' } };
export const Error: Story = { args: { error: 'Query cannot be empty.', value: '' } };
export const Disabled: Story = { args: { disabled: true, value: 'locked' } };
export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
      <Field label="Corpus id" defaultValue="knowledge-prod" />
      <Button>Verify</Button>
    </div>
  ),
};
