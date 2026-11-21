import { useEffect, useRef } from 'react'
import type { PanelName } from '../types'
import { FILE_META } from './useFileSystem'

const DEFAULT_TITLE = 'Ayush Prem | Software Engineer'

/** Maps the URL path to a file, e.g. "/projects" → 'projects'. Unknown paths → null. */
export function panelFromPath(pathname: string = window.location.pathname): PanelName | null {
  const slug = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '').replace(/\.ts$/, '').toLowerCase()
  if (!slug || slug === 'welcome') return null
  return slug in FILE_META ? (slug as PanelName) : null
}

const pathFor = (panel: PanelName | null) => (!panel || panel === 'welcome' ? '/' : `/${panel}`)

/**
 * Keeps the address bar in sync with the active tab so every file has its own
 * shareable URL (/projects, /achievements…), the browser Back button switches
 * tabs, and Vercel Analytics records each opened file as a page view.
 */
export function useUrlSync(activePanel: PanelName | null, openFile: (panel: PanelName) => void) {
  const first = useRef(true)

  // Active tab → URL + document title
  useEffect(() => {
    const path = pathFor(activePanel)
    if (window.location.pathname !== path) {
      // First sync replaces (e.g. an unknown path → "/"); later tab switches push history entries
      const method = first.current ? 'replaceState' : 'pushState'
      window.history[method](null, '', path + window.location.search)
    }
    first.current = false
    document.title = !activePanel || activePanel === 'welcome'
      ? DEFAULT_TITLE
      : `${FILE_META[activePanel].name} — Ayush Prem`
  }, [activePanel])

  // Back / Forward → open the matching tab
  useEffect(() => {
    const onPop = () => openFile(panelFromPath() ?? 'welcome')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [openFile])
}
