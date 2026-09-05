import type { Preview } from '@storybook/react';
import { Theme } from '../src/primitives/Theme/Theme';
import '../src/styles/package.css';
import './preview.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme value="light">
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#fdfdfd' }],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
    options: {
      showPanel: false,
      storySort: {
        order: ['Foundations', 'Guides', 'Tokens', 'Primitives', 'Docs'],
      },
    },
    a11y: { disable: false },
  },
};

export default preview;
