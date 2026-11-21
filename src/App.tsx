import { useState, useEffect, useCallback } from 'react'
import { TitleBar } from './components/layout/TitleBar'
import { MenuBar, type MenuAction } from './components/layout/MenuBar'
import { ActivityBar } from './components/layout/ActivityBar'
import { Sidebar } from './components/layout/Sidebar'
import { TabBar } from './components/layout/TabBar'
import { EditorArea } from './components/editor/EditorArea'
import { Terminal } from './components/layout/Terminal'
import { StatusBar } from './components/layout/StatusBar'
import { CommandPalette } from './components/ui/CommandPalette'
import { ThemeSwitcher } from './components/ui/ThemeSwitcher'
import { useFileSystem } from './hooks/useFileSystem'
import { useTerminal } from './hooks/useTerminal'
import { useTheme } from './hooks/useTheme'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useUrlSync, panelFromPath } from './hooks/useUrlSync'
import type { PanelName } from './types'
import {
  MIN_SIDEBAR_WIDTH, DEFAULT_SIDEBAR_WIDTH, maxSidebarWidth,
  MIN_TERMINAL_HEIGHT, DEFAULT_TERMINAL_HEIGHT, maxTerminalHeight,
} from './config/layout'

const SIDEBAR_WIDTH_KEY = 'vscode-portfolio-sidebar-width'
const TERMINAL_HEIGHT_KEY = 'vscode-portfolio-terminal-height'

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const PHONE_QUERY = '(max-width: 767px)'
const isPhone = () => window.matchMedia(PHONE_QUERY).matches
// Explorer starts open on laptops/desktops; on tablets and phones it would crowd the editor
const sidebarOpenByDefault = () => window.innerWidth >= 1024
// Terminal starts open only when there's room for it (not on phones or short landscape screens)
const terminalOpenByDefault = () => window.innerWidth >= 768 && window.innerHeight >= 700

/** Reads a saved pixel size from localStorage, clamped to [min, max]. */
function loadSize(key: string, fallback: number, min: number, max: number): number {
  try {
    const saved = parseInt(localStorage.getItem(key) ?? '', 10)
    if (!isNaN(saved)) return clamp(saved, min, max)
  } catch { /* storage unavailable */ }
  return clamp(fallback, min, max)
}

function saveSize(key: string, value: number) {
  try {
    localStorage.setItem(key, String(value))
  } catch { /* storage unavailable */ }
}

export default function App() {
  const { tabs, activePanel, openFile, closeTab, closeActiveTab, switchTab } = useFileSystem(panelFromPath())
  useUrlSync(activePanel, openFile)
  const { theme, setTheme } = useTheme()
  const { entries, runCommand, history, clear: clearTerminal } = useTerminal(openFile)

  const phone = useMediaQuery(PHONE_QUERY)
  const [sidebarOpen, setSidebarOpen] = useState(sidebarOpenByDefault)
  const [terminalOpen, setTerminalOpen] = useState(terminalOpenByDefault)
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false)
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false)
  const [lineCount, setLineCount] = useState(40)

  const [sidebarWidth, setSidebarWidth] = useState(() =>
    loadSize(SIDEBAR_WIDTH_KEY, DEFAULT_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, maxSidebarWidth())
  )
  const [terminalHeight, setTerminalHeight] = useState(() =>
    loadSize(TERMINAL_HEIGHT_KEY, DEFAULT_TERMINAL_HEIGHT, MIN_TERMINAL_HEIGHT, maxTerminalHeight())
  )

  useEffect(() => saveSize(SIDEBAR_WIDTH_KEY, sidebarWidth), [sidebarWidth])
  useEffect(() => saveSize(TERMINAL_HEIGHT_KEY, terminalHeight), [terminalHeight])

  // Keep panel sizes within bounds when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setSidebarWidth(w => clamp(w, MIN_SIDEBAR_WIDTH, maxSidebarWidth()))
      setTerminalHeight(h => clamp(h, MIN_TERMINAL_HEIGHT, maxTerminalHeight()))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), [])
  const toggleTerminal = useCallback(() => setTerminalOpen(v => !v), [])
  const closeCmdPalette = useCallback(() => setCmdPaletteOpen(false), [])
  const closeThemeSwitcher = useCallback(() => setThemeSwitcherOpen(false), [])

  // Global keyboard shortcuts (matched case-insensitively so Caps Lock doesn't break them)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (!mod) return
      const key = e.key.toLowerCase()
      if (e.shiftKey && key === 'p') {
        e.preventDefault()
        setCmdPaletteOpen(v => !v)
      } else if (!e.shiftKey && key === 'b') {
        e.preventDefault()
        toggleSidebar()
      } else if (e.code === 'Backquote') {
        e.preventDefault()
        toggleTerminal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleSidebar, toggleTerminal])

  const handleMenuAction = (action: MenuAction) => {
    switch (action) {
      case 'closeEditor':    closeActiveTab(); break
      case 'toggleExplorer': toggleSidebar(); break
      case 'toggleTerminal': toggleTerminal(); break
      case 'newTerminal':    clearTerminal(); setTerminalOpen(true); break
      case 'commandPalette': setCmdPaletteOpen(true); break
      case 'colorTheme':     setThemeSwitcherOpen(true); break
      case 'openWelcome':    openFile('welcome'); break
      case 'openAbout':      openFile('about'); break
    }
  }

  // On phones the sidebar is a drawer over the editor, so close it after picking a file
  const handleSidebarFileClick = (panel: PanelName) => {
    openFile(panel)
    if (isPhone()) setSidebarOpen(false)
  }

  const activeTab = tabs.find(t => t.isActive)

  return (
    <div
      id="vscode-portfolio"
      className="flex flex-col h-screen h-[100dvh] w-screen overflow-hidden font-mono text-xs"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <TitleBar
        activeFileName={activeTab?.name ?? 'Welcome'}
        onCommandPalette={() => setCmdPaletteOpen(true)}
      />

      <MenuBar onAction={handleMenuAction} />

      {/* Main body: Activity Bar + Sidebar + Editor column */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        <ActivityBar
          explorerOpen={sidebarOpen}
          onToggleExplorer={toggleSidebar}
          onAccount={() => openFile('about')}
          onSettings={() => setThemeSwitcherOpen(v => !v)}
        />

        {sidebarOpen && phone && (
          // Phones: the Explorer slides over the editor; tap outside to close
          <>
            <div
              className="absolute inset-0 z-30"
              style={{ background: 'rgba(0, 0, 0, 0.45)' }}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute top-0 bottom-0 left-10 z-40 shadow-2xl">
              <Sidebar
                activePanel={activePanel}
                onFileClick={handleSidebarFileClick}
                width={Math.min(260, Math.floor(window.innerWidth * 0.8))}
                resizable={false}
              />
            </div>
          </>
        )}

        {sidebarOpen && !phone && (
          <Sidebar
            activePanel={activePanel}
            onFileClick={handleSidebarFileClick}
            width={sidebarWidth}
            onWidthChange={setSidebarWidth}
          />
        )}

        {/* Right column: tabs + editor + terminal */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TabBar tabs={tabs} onSwitch={switchTab} onClose={closeTab} />

          <EditorArea panel={activePanel} onLineCount={setLineCount} onOpenFile={openFile} />

          <Terminal
            entries={entries}
            onCommand={runCommand}
            onClear={clearTerminal}
            history={history}
            isOpen={terminalOpen}
            onToggle={toggleTerminal}
            height={terminalHeight}
            onHeightChange={setTerminalHeight}
          />
        </div>
      </div>

      <StatusBar
        language={activeTab?.language ?? ''}
        lineCount={lineCount}
        theme={theme}
        onThemeClick={() => setThemeSwitcherOpen(v => !v)}
        onStatsClick={() => openFile('achievements')}
      />

      {/* Overlays */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={closeCmdPalette}
        onOpen={openFile}
        onColorTheme={() => setThemeSwitcherOpen(true)}
      />

      <ThemeSwitcher
        current={theme}
        isOpen={themeSwitcherOpen}
        onSelect={setTheme}
        onClose={closeThemeSwitcher}
      />
    </div>
  )
}
