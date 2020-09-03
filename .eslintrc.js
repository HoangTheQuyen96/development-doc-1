module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    'no-async-promise-executor': 'off',
    'no-nested-ternary': [0, { allowParensWrapped: true }],
    'prettier/prettier': ['error'],
    semi: ['error', 'always'],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};
