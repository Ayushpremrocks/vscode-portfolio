import { useState, useCallback } from 'react'
import type { Tab, PanelName } from '../types'

const FILE_META: Record<string, { name: string; language: string }> = {
  'welcome':    { name: 'Welcome',       language: '' },
  'about':      { name: 'about.ts',      language: 'TypeScript' },
  'projects':   { name: 'projects.ts',   language: 'TypeScript' },
  'skills':     { name: 'skills.ts',     language: 'TypeScript' },
  'experience': { name: 'experience.ts', language: 'TypeScript' },
  'education':  { name: 'education.ts',  language: 'TypeScript' },
  'contact':    { name: 'contact.ts',    language: 'TypeScript' },
  'resume':     { name: 'resume.ts',     language: 'TypeScript' },
}

export function useFileSystem() {
  const [tabs, setTabs] = useState<Tab[]>([{
    id: 'welcome-tab',
    fileId: 'welcome',
    name: 'Welcome',
    panel: 'welcome',
    language: '',
    isDirty: false,
    isActive: true,
  }])
  const [activePanel, setActivePanel] = useState<PanelName | null>('welcome')

  const openFile = useCallback((panel: PanelName) => {
    const meta = FILE_META[panel]
    if (!meta) return
    const tabId = `${panel}-tab`

    setTabs(prev => {
      const existing = prev.find(t => t.fileId === panel)
      if (existing) {
        return prev.map(t => ({ ...t, isActive: t.fileId === panel }))
      }
      return [
        ...prev.map(t => ({ ...t, isActive: false })),
        {
          id:       tabId,
          fileId:   panel,
          name:     meta.name,
          panel,
          language: meta.language,
          isDirty:  false,
          isActive: true,
        },
      ]
    })
    setActivePanel(panel)
  }, [])

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const idx = prev.findIndex(t => t.id === tabId)
      if (idx === -1) return prev
      const wasActive = prev[idx].isActive
      const next = prev.filter(t => t.id !== tabId)
      if (wasActive && next.length > 0) {
        const newActiveIdx = Math.max(0, idx - 1)
        next[newActiveIdx] = { ...next[newActiveIdx], isActive: true }
        setActivePanel(next[newActiveIdx].panel)
      } else if (next.length === 0) {
        setActivePanel(null)
      }
      return next
    })
  }, [])

  const switchTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const tab = prev.find(t => t.id === tabId)
      if (!tab) return prev
      setActivePanel(tab.panel)
      return prev.map(t => ({ ...t, isActive: t.id === tabId }))
    })
  }, [])

  return { tabs, activePanel, openFile, closeTab, switchTab }
}
