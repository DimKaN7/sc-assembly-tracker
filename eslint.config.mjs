// @ts-check
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt().append({
  rules: {
    camelcase: 'warn',
    'vue/require-default-prop': 0,
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': ['off'],
    'vue/no-v-html': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
})
