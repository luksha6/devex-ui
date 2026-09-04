import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  args: { children: 'Rate limits' },
  parameters: {
    docs: {
      description: {
        component:
          'Type scale on Onest. variant is the role. Kickers are uppercase. Form labels stay sentence case.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = { args: { variant: 'body' } };
export const Display: Story = { args: { variant: 'display' } };
export const Section: Story = { args: { variant: 'section' } };
export const Title: Story = { args: { variant: 'title' } };
export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Human view is 68ch of Onest. Agent view is the same AST as markdown.',
  },
};
export const Mono: Story = { args: { variant: 'mono', children: '4a91c02' } };
export const Kicker: Story = { args: { variant: 'kicker', children: 'Since v2.09' } };
