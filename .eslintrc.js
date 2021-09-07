module.exports = {
  plugins: ['eslint-comments'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'no-shadow': 0,
  },
}
