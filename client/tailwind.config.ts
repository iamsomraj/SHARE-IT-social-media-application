import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      })
    }),
  ],
} satisfies Partial<Config>
