import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { specimen } from '../foundations/Foundation';

const ACTION = [
  { name: 'bg', token: 'var(--color-bg)' },
  { name: 'text', token: 'var(--color-text)' },
  { name: 'muted', token: 'var(--color-text-muted)' },
  { name: 'primary', token: 'var(--color-interactive)' },
  { name: 'danger', token: 'var(--color-danger)' },
  { name: 'success', token: 'var(--color-success)' },
  { name: 'warning', token: 'var(--color-warning)' },
  { name: 'border', token: 'var(--color-border)' },
  { name: 'divider', token: 'var(--color-divider)' },
];

const LIFECYCLE = [
  { name: 'stable', token: 'var(--st-stable)' },
  { name: 'beta', token: 'var(--st-beta)' },
  { name: 'deprecated', token: 'var(--st-dep)' },
  { name: 'internal', token: 'var(--st-int)' },
];

function Swatches(items: { name: string; token: string }[]) {
  return (
    <div className={specimen.strip}>
      {items.map((item) => (
        <div className={specimen.swatch} key={item.name}>
          <div
            className={specimen.chip}
            style={{ width: 32, height: 32, background: item.token } as CSSProperties}
          />
          <span className={specimen.label}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function Ramp() {
  return (
    <>
      <p className={specimen.kicker}>Action</p>
      {Swatches(ACTION)}
      <p className={specimen.kicker}>Lifecycle</p>
      {Swatches(LIFECYCLE)}
    </>
  );
}

const meta: Meta = {
  title: 'Tokens/Color',
  render: () => <Ramp />,
};

export default meta;
type Story = StoryObj;

export const RampTable: Story = {};
