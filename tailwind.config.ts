import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // VS Code One Dark Pro palette
        vscode: {
          bg:           '#1e1e2e',
          'bg-editor':  '#1e1e2e',
          'bg-sidebar': '#252526',
          'bg-actbar':  '#333333',
          'bg-titlebar':'#1e1e1e',
          'bg-tab-active':   '#1e1e2e',
          'bg-tab-inactive': '#2d2d2d',
          'bg-terminal':     '#1e1e2e',
          'bg-statusbar':    '#007acc',
          'bg-hover':        '#2a2d2e',
          'bg-selected':     '#094771',
          'bg-input':        '#3c3c3c',
          border:       '#454545',
          'border-tab': '#252526',
          text:         '#d4d4d4',
          'text-muted': '#858585',
          'text-dim':   '#6e7681',
          'text-line':  '#495162',
          keyword:      '#569cd6',
          string:       '#ce9178',
          comment:      '#6a9955',
          number:       '#b5cea8',
          type:         '#4ec9b0',
          variable:     '#9cdcfe',
          function:     '#dcdcaa',
          operator:     '#d4d4d4',
          property:     '#9cdcfe',
          blue:         '#4fc1ff',
          green:        '#4ec9b0',
          orange:       '#ce9178',
          purple:       '#c586c0',
          yellow:       '#dcdcaa',
          red:          '#f44747',
          pink:         '#e06c75',
          cyan:         '#56b6c2',
        },
      },
      fontSize: {
        'code': ['13px', '1.6'],
        'code-sm': ['11px', '1.5'],
        'code-xs': ['10px', '1.4'],
      },
      boxShadow: {
        'vscode': '0 2px 8px rgba(0,0,0,0.5)',
        'tab': 'inset 0 -1px 0 #007acc',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'slide-in-right': 'slideInRight 0.2s ease-out',
        'fade-in': 'fadeIn 0.15s ease-out',
        'terminal-type': 'fadeIn 0.05s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideInRight: {
          from: { transform: 'translateX(8px)', opacity: '0' },
          to:   { transform: 'translateX(0)',   opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
