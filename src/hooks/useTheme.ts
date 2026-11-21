import { useState, useEffect, useCallback } from 'react'
import type { ThemeName, ThemeTokens } from '../types'
import { themes, DEFAULT_THEME } from '../styles/themes'

const STORAGE_KEY = 'vscode-portfolio-theme'

// Maps each theme token to the CSS custom property it drives.
const CSS_VARS: Record<Exclude<keyof ThemeTokens, 'name' | 'label'>, string> = {
  bg:            '--bg',
  bgEditor:      '--bg-editor',
  bgSidebar:     '--bg-sidebar',
  bgActbar:      '--bg-actbar',
  bgTitlebar:    '--bg-titlebar',
  bgTabActive:   '--bg-tab-active',
  bgTabInactive: '--bg-tab-inactive',
  bgTerminal:    '--bg-terminal',
  bgStatusbar:   '--bg-statusbar',
  bgHover:       '--bg-hover',
  bgSelected:    '--bg-selected',
  bgInput:       '--bg-input',
  border:        '--border',
  text:          '--text',
  textStrong:    '--text-strong',
  textMuted:     '--text-muted',
  textDim:       '--text-dim',
  textLine:      '--text-line',
  keyword:       '--keyword',
  string:        '--string',
  comment:       '--comment',
  number:        '--number',
  type:          '--type',
  variable:      '--variable',
  func:          '--func',
  operator:      '--operator',
  property:      '--property',
  blue:          '--blue',
  green:         '--green',
  orange:        '--orange',
  purple:        '--purple',
  yellow:        '--yellow',
  red:           '--red',
  cyan:          '--cyan',
}

function applyTheme(name: ThemeName) {
  const t = themes[name]
  const root = document.documentElement
  root.setAttribute('data-theme', name)
  for (const [token, cssVar] of Object.entries(CSS_VARS)) {
    root.style.setProperty(cssVar, t[token as keyof typeof CSS_VARS])
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bgTitlebar)
}

function readSavedTheme(): ThemeName {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in themes) return saved as ThemeName
  } catch { /* storage unavailable */ }
  return DEFAULT_THEME
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(readSavedTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name)
    try {
      localStorage.setItem(STORAGE_KEY, name)
    } catch { /* storage unavailable */ }
  }, [])

  return { theme, setTheme }
}
