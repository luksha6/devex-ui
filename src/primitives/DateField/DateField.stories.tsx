import type { Meta, StoryObj } from '@storybook/react';
import { DateField } from './DateField';

const meta: Meta<typeof DateField> = {
  title: 'Primitives/DateField',
  component: DateField,
  args: {
    label: 'Cutover',
    defaultValue: '2026-09-05',
    hint: 'Native date. The platform picker stays.',
  },
  parameters: {
    docs: {
      description: {
        component: 'Labeled date. Native control. min and max are HTML attributes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const Default: Story = {};
export const Invalid: Story = {
  args: { error: 'Cutover cannot be empty.', defaultValue: '' },
};
