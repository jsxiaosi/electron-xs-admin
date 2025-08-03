import jsxiaosiConfig from '@jsxiaosi/eslint-config';

export default jsxiaosiConfig(
  {
    vue: true,
    prettier: {
      usePrettierrc: true,
    },
    ignores: ['src/**/china.json', 'dist_electron/**'],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['electron-builder.ts'],
    rules: {
      'no-template-curly-in-string': 'off',
    },
  },
);
