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

export function SpaceTokens() {
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
                className={`${specimen.bar} ${
                  {
                    4: specimen.w1,
                    8: specimen.w2,
                    12: specimen.w3,
                    16: specimen.w4,
                    24: specimen.w6,
                    32: specimen.w8,
                  }[step.px]
                }`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta: Meta<typeof SpaceTokens> = {
  title: 'Tokens/Space',
  component: SpaceTokens,
};

export default meta;
type Story = StoryObj<typeof SpaceTokens>;

export const ScaleTable: Story = {};
