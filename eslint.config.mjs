import jsxiaosiConfig from '@jsxiaosi/eslint-config-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  ...jsxiaosiConfig,
  {
    languageOptions: {
      globals: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          usePrettierrc: true,
        },
      ],
    },
    ignores: [
      '.vscode/',
      '.idea/',
      '.husky/',
      '*.html',
      '*.md',
      '*.woff',
      '*.ttf',
      '*.sh',
      'bin/',
      'dist/',
      'docs/',
      'public/',
      'discard/',
      'Dockerfile',
      'node_modules/',
    ],
  },
];

// import antfu from '@antfu/eslint-config'

// export default antfu({
//   vue:true
// })
