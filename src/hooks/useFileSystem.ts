import { useState, useCallback } from 'react'
import type { Tab, PanelName } from '../types'

export const FILE_META: Record<PanelName, { name: string; language: string }> = {
  'welcome':      { name: 'Welcome',          language: '' },
  'about':        { name: 'about.ts',         language: 'TypeScript' },
  'projects':     { name: 'projects.ts',      language: 'TypeScript' },
  'skills':       { name: 'skills.ts',        language: 'TypeScript' },
  'achievements': { name: 'achievements.ts',  language: 'TypeScript' },
  'experience':   { name: 'experience.ts',    language: 'TypeScript' },
  'education':    { name: 'education.ts',     language: 'TypeScript' },
  'contact':      { name: 'contact.ts',       language: 'TypeScript' },
  'resume':       { name: 'resume.ts',        language: 'TypeScript' },
  'sports-watch': { name: 'sports-watch.ts',  language: 'TypeScript' },
  'sports-play':  { name: 'sports-play.ts',   language: 'TypeScript' },
  'instruments':  { name: 'instruments.ts',   language: 'TypeScript' },
  'games':        { name: 'games.ts',         language: 'TypeScript' },
  'movies-tv':    { name: 'movies-tv.ts',     language: 'TypeScript' },
  'anime':        { name: 'anime.ts',         language: 'TypeScript' },
}

const makeTab = (panel: PanelName, isActive: boolean): Tab => ({
  id: `${panel}-tab`,
  name: FILE_META[panel].name,
  panel,
  language: FILE_META[panel].language,
  isActive,
})

// Removes the tab at `idx`; if it was active, activates its left neighbour.
function removeTab(tabs: Tab[], idx: number): Tab[] {
  if (idx === -1) return tabs
  const wasActive = tabs[idx].isActive
  const next = tabs.filter((_, i) => i !== idx)
  if (wasActive && next.length > 0) {
    const newActiveIdx = Math.max(0, idx - 1)
    next[newActiveIdx] = { ...next[newActiveIdx], isActive: true }
  }
  return next
}

/** @param initialPanel - file to open on load (e.g. from a deep link), next to the Welcome tab */
export function useFileSystem(initialPanel: PanelName | null = null) {
  const [tabs, setTabs] = useState<Tab[]>(() =>
    initialPanel && initialPanel !== 'welcome'
      ? [makeTab('welcome', false), makeTab(initialPanel, true)]
      : [makeTab('welcome', true)]
  )

  // Derived — the active tab is the single source of truth.
  const activePanel: PanelName | null = tabs.find(t => t.isActive)?.panel ?? null

  const openFile = useCallback((panel: PanelName) => {
    setTabs(prev =>
      prev.some(t => t.panel === panel)
        ? prev.map(t => ({ ...t, isActive: t.panel === panel }))
        : [...prev.map(t => ({ ...t, isActive: false })), makeTab(panel, true)]
    )
  }, [])

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => removeTab(prev, prev.findIndex(t => t.id === tabId)))
  }, [])

  const closeActiveTab = useCallback(() => {
    setTabs(prev => removeTab(prev, prev.findIndex(t => t.isActive)))
  }, [])

  const switchTab = useCallback((tabId: string) => {
    setTabs(prev => prev.map(t => ({ ...t, isActive: t.id === tabId })))
  }, [])

  return { tabs, activePanel, openFile, closeTab, closeActiveTab, switchTab }
}
