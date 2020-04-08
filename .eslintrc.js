//0-off
//1-warn
//2-error

module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
    'react-hooks'
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'env': {
    'browser': true,
    'node': true,
  },
  'extends': [
    'airbnb-typescript',
  ],
  'rules': {
    'semi': [2, 'never'],
    'no-confusing-arrow': 0,
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/no-unused-vars': 1,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'no-debugger': 1,
    'no-unused-vars': 1,
    'prefer-const': 1,
    'arrow-body-style': 0,
    'spaced-comment': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-dangle': 1,
    'react/no-unescaped-entities': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'global-require': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1
  }
}
