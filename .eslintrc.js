module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
   ],
   globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
   },
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 11,
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint'],
   rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-types': [
         'error',
         {
            extendDefaults: true,
            types: {
               '{}': false,
               Object: false,
            },
         },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
   },
};
