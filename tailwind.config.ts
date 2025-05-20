import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: 'var(--purple-primary)',
          secondary: 'var(--purple-secondary)',
          light: 'var(--purple-light)',
          dark: 'var(--purple-dark)',
        },
        black: '#000000',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config 