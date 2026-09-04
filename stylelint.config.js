export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'color-no-hex': true,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'import-notation': 'string',
    'declaration-empty-line-before': null,
    'comment-empty-line-before': null,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'media-feature-range-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'no-descending-specificity': null,
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
  },
  overrides: [
    {
      files: ['src/tokens/**/*.css'],
      rules: {
        'color-no-hex': null,
        'color-hex-length': null,
      },
    },
  ],
  ignoreFiles: ['dist/**', 'storybook-static/**', 'node_modules/**'],
};
