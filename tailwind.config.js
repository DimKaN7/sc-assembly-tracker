import plugin from 'tailwindcss/plugin'
import { buttons } from './app/assets/tailwind/buttons'
import { tables } from './app/assets/tailwind/tables'
import { inputs } from './app/assets/tailwind/inputs'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.vue',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ...buttons,
        ...tables,
        ...inputs,
      })
    }),
  ],
}
