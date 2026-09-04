import type { Meta, StoryObj } from '@storybook/react';
import { specimen } from '../foundations/Foundation';

const STEPS = [
  { name: '--space-1', px: 4 },
  { name: '--space-2', px: 8 },
  { name: '--space-3', px: 12 },
  { name: '--space-4', px: 16 },
  { name: '--space-6', px: 24 },
  { name: '--space-8', px: 32 },
];

function Scale() {
  return (
    <table className={specimen.table}>
      <thead>
        <tr>
          <th>Token</th>
          <th>px</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {STEPS.map((step) => (
          <tr key={step.name}>
            <td className={specimen.mono}>{step.name}</td>
            <td className={specimen.mono}>{step.px}</td>
            <td>
              <div
                className={specimen.chip}
                style={{
                  width: `var(${step.name})`,
                  height: 16,
                  background: 'var(--color-text)',
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta: Meta = {
  title: 'Tokens/Space',
  render: () => <Scale />,
};

export default meta;
type Story = StoryObj;

export const ScaleTable: Story = {};
