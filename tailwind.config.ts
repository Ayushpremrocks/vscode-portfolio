import type { Config } from 'tailwindcss'

// Colors are driven by CSS custom properties (see src/index.css and
// src/styles/themes.ts) so they switch with the active theme.
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Short viewports — phones in landscape. Used to hide non-essential chrome.
        short: { raw: '(max-height: 500px)' },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
