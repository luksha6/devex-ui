import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input/Input';
import { Switch } from '../Switch/Switch';
import { PropertyField } from './PropertyField';

const meta: Meta<typeof PropertyField> = {
  title: 'Primitives/PropertyField',
  component: PropertyField,
  parameters: {
    docs: {
      description: {
        component: 'Label beside a control. Not a Field. Use for settings rows.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PropertyField>;

export const Default: Story = {
  render: () => (
    <div>
      <PropertyField label="Corpus id" hint="Stable across reindexes.">
        <Input aria-label="Corpus id" defaultValue="knowledge-prod" />
      </PropertyField>
      <PropertyField label="Machine rail">
        <Switch label="Show" checked onChange={() => undefined} />
      </PropertyField>
    </div>
  ),
};
