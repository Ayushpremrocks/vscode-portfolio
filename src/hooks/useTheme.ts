import { useState, useEffect, useCallback } from 'react'
import type { ThemeName } from '../types'
import { themes } from '../styles/themes'

const STORAGE_KEY = 'vscode-portfolio-theme'

function applyTheme(name: ThemeName) {
  const t = themes[name]
  const root = document.documentElement
  root.setAttribute('data-theme', name)
  root.style.setProperty('--bg',               t.bg)
  root.style.setProperty('--bg-editor',        t.bgEditor)
  root.style.setProperty('--bg-sidebar',       t.bgSidebar)
  root.style.setProperty('--bg-actbar',        t.bgActbar)
  root.style.setProperty('--bg-titlebar',      t.bgTitlebar)
  root.style.setProperty('--bg-tab-active',    t.bgTabActive)
  root.style.setProperty('--bg-tab-inactive',  t.bgTabInactive)
  root.style.setProperty('--bg-terminal',      t.bgTerminal)
  root.style.setProperty('--bg-statusbar',     t.bgStatusbar)
  root.style.setProperty('--bg-hover',         t.bgHover)
  root.style.setProperty('--bg-selected',      t.bgSelected)
  root.style.setProperty('--border',           t.border)
  root.style.setProperty('--text',             t.text)
  root.style.setProperty('--text-muted',       t.textMuted)
  root.style.setProperty('--text-dim',         t.textDim)
  root.style.setProperty('--text-line',        t.textLine)
  root.style.setProperty('--keyword',          t.keyword)
  root.style.setProperty('--string',           t.string)
  root.style.setProperty('--comment',          t.comment)
  root.style.setProperty('--number',           t.number)
  root.style.setProperty('--type',             t.type)
  root.style.setProperty('--variable',         t.variable)
  root.style.setProperty('--func',             t.func)
  root.style.setProperty('--operator',         t.operator)
  root.style.setProperty('--property',         t.property)
  root.style.setProperty('--blue',             t.blue)
  root.style.setProperty('--green',            t.green)
  root.style.setProperty('--orange',           t.orange)
  root.style.setProperty('--purple',           t.purple)
  root.style.setProperty('--yellow',           t.yellow)
  root.style.setProperty('--red',              t.red)
  root.style.setProperty('--cyan',             t.cyan)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    return saved && themes[saved] ? saved : 'one-dark-pro'
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name)
    localStorage.setItem(STORAGE_KEY, name)
  }, [])

  return { theme, setTheme, themeTokens: themes[theme] }
}
