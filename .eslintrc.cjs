/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    '@sientech/frontend/lib/vue3-essential',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
