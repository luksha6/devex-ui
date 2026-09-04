import type { Preview } from '@storybook/react';
import '../src/styles/package.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
    options: {
      storySort: {
        order: ['Foundations', 'Guides', 'Tokens', 'Primitives', 'Docs'],
      },
    },
    a11y: { disable: false },
  },
};

export default preview;
