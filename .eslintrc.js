module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
  },
};
