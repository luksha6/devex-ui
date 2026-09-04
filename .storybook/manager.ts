import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import './manager.css';

addons.setConfig({
  showPanel: false,
  theme: create({
    base: 'light',
    brandTitle: '@luksha6/devex-ui',
    brandUrl: 'https://luksha6.github.io/devex-ui/',
    colorPrimary: '#22463d',
    colorSecondary: '#22463d',
    appBg: '#fdfdfd',
    appContentBg: '#fdfdfd',
    appBorderColor: '#e3e4e6',
    appBorderRadius: 12,
    textColor: '#1f2937',
    textMutedColor: '#46474d',
    barTextColor: '#1f2937',
    barSelectedColor: '#22463d',
    barBg: '#fdfdfd',
    inputBg: '#fdfdfd',
    inputBorder: '#8a8b93',
    inputTextColor: '#1f2937',
    fontBase: '"Onest", sans-serif',
    fontCode: '"Onest", sans-serif',
  }),
});
