import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import './manager.css';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: '@devex/ui',
    colorPrimary: '#22463d',
    colorSecondary: '#22463d',
    appBg: '#fdfdfd',
    appContentBg: '#fdfdfd',
    textColor: '#1f2937',
    barSelectedColor: '#22463d',
  }),
});
