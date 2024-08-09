module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/base',
    'plugin:vuetify/base'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/no-cycle': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    camelcase: 'off',
    '@typescript-eslint/ban-types': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
