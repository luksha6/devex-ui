import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.vitest },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/docs/**', '../docs/**', '../../docs/**'],
              message: 'Primitives must not import @luksha6/devex-ui/docs.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'src/docs/**/*.{ts,tsx}',
      'src/foundations/**/*.{ts,tsx}',
      'src/index.ts',
      'src/**/*.stories.tsx',
      '.storybook/**',
    ],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    files: ['src/primitives/Dialog/Dialog.tsx', 'src/primitives/Drawer/Drawer.tsx'],
    rules: { 'jsx-a11y/no-static-element-interactions': 'off' },
  },
  eslintConfigPrettier,
);
