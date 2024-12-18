module.exports = {
  root: true,
  extends: ['standard', '@nuxt/eslint-config'],
  globals: {
    AFRAME: 'readonly',
    THREE: 'readonly',
    XR8: 'readonly'
  },
  parserOptions: {
    requireConfigFile: false
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
    'vue/html-indent': ['error', 2, { baseIndent: 1, attribute: 1, closeBracket: 0, alignAttributesVertically: true, ignores: ['HTMLIFrameElement'] }],
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'ignore',
        asyncArrow: 'always'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
};
