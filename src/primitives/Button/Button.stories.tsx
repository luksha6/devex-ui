import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { Button } from './Button';

const INTENTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const FILLS = ['filled', 'outline'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

function sentence(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: { children: 'Search' },
  parameters: {
    docs: {
      description: {
        component:
          'Sentence case: first letter uppercase. Filled primary is the one action. Outline is the other option. Danger is red. `leading` and `trailing` take an Icon. Icon-only is IconButton.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-2)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button>Search</Button>
      <Button leading={<Icon name="search" />}>Search</Button>
      <Button trailing={<Icon name="chevron-right" />}>Continue</Button>
      <Button intent="secondary" leading={<Icon name="plus" />}>
        Create
      </Button>
    </div>
  ),
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {INTENTS.map((intent) => (
        <div
          key={intent}
          style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {intent === 'ghost' ? (
            <Button intent={intent}>{sentence(intent)}</Button>
          ) : (
            FILLS.map((fill) => (
              <Button key={fill} intent={intent} fill={fill}>
                {sentence(`${intent} ${fill}`)}
              </Button>
            ))
          )}
        </div>
      ))}
      <div
        style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}
      >
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            {sentence(size)}
          </Button>
        ))}
        <Button loading>Search</Button>
        <Button disabled>Search</Button>
      </div>
    </div>
  ),
};

export const Primary: Story = { args: { intent: 'primary' } };
export const PrimaryOutline: Story = { args: { intent: 'primary', fill: 'outline' } };
export const Secondary: Story = { args: { intent: 'secondary' } };
export const Danger: Story = { args: { intent: 'danger', children: 'Revoke' } };
export const Loading: Story = { args: { loading: true } };
export const WithIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-2)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button leading={<Icon name="search" />}>Search</Button>
      <Button leading={<Icon name="plus" />}>Create</Button>
      <Button intent="secondary" trailing={<Icon name="chevron-down" />}>
        Open
      </Button>
      <Button trailing={<Icon name="chevron-right" />}>Continue</Button>
      <Button intent="danger" leading={<Icon name="caution" />}>
        Revoke
      </Button>
    </div>
  ),
};
