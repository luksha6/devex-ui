import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { specimen } from '../foundations/Foundation';

const STEPS = [
  {
    token: '--text-label',
    sample: 'KICKER / LABEL',
    size: '11',
    family: 'var(--font-sans)',
  },
  {
    token: '--text-mono',
    sample: 'read:knowledge',
    size: '13',
    family: 'var(--font-sans)',
  },
  {
    token: '--text-body',
    sample: 'Body copy sits at 15 / 1.73, flush left, 68ch.',
    size: '15',
    family: 'var(--font-sans)',
  },
  {
    token: '--text-title',
    sample: 'Rate limits & retries',
    size: '20',
    family: 'var(--font-sans)',
  },
  {
    token: '--text-section',
    sample: 'Section heading',
    size: '28',
    family: 'var(--font-sans)',
  },
  {
    token: '--text-display',
    sample: 'Page title',
    size: '36',
    family: 'var(--font-sans)',
  },
];

function TypeScale() {
  return (
    <table className={specimen.table}>
      <thead>
        <tr>
          <th>Token</th>
          <th>px</th>
          <th>Specimen</th>
        </tr>
      </thead>
      <tbody>
        {STEPS.map((step) => (
          <tr key={step.token}>
            <td className={specimen.mono}>{step.token}</td>
            <td className={specimen.mono}>{step.size}</td>
            <td
              style={
                {
                  fontFamily: step.family,
                  fontSize: `var(${step.token})`,
                  fontWeight: 400,
                  textAlign: 'left',
                } as CSSProperties
              }
            >
              {step.sample}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta: Meta = {
  title: 'Tokens/Typography',
  render: () => <TypeScale />,
};

export default meta;
type Story = StoryObj;

export const ScaleTable: Story = {};
