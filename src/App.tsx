import { useState, useEffect } from 'react'
import { TitleBar } from './components/layout/TitleBar'
import { MenuBar } from './components/layout/MenuBar'
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
import type { PanelName } from './types'

export default function App() {
  const { tabs, activePanel, openFile, closeTab, switchTab } = useFileSystem()
  const { theme, setTheme } = useTheme()
  const { entries, runCommand, history } = useTerminal(openFile)

  const [activityActive, setActivityActive] = useState('explorer')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false)
  const [themeSwitcherOpen, setThemeSwitcher] = useState(false)
  const [lineCount, setLineCount] = useState(40)

  // Active tab name for title bar
  const activeTab = tabs.find(t => t.isActive)

  // Keyboard shortcut: Ctrl+Shift+P → command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setCmdPaletteOpen(v => !v)
      }
      // Ctrl+B → toggle sidebar
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'b') {
        e.preventDefault()
        setSidebarOpen(v => !v)
      }
      // Ctrl+` → toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setTerminalOpen(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleActivitySelect = (id: string) => {
    if (id === 'explorer') {
      if (activityActive === 'explorer') {
        setSidebarOpen(v => !v)
      } else {
        setSidebarOpen(true)
        setActivityActive(id)
      }
    } else {
      setActivityActive(id)
    }
  }

  const handleOpenFromPalette = (panel: PanelName) => {
    openFile(panel)
    setCmdPaletteOpen(false)
  }

  return (
    <div
      id="vscode-portfolio"
      className="flex flex-col h-screen w-screen overflow-hidden font-mono text-xs"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* ── Title Bar ───────────────────────────────────────────────────── */}
      <TitleBar
        activeFileName={activeTab?.name ?? 'welcome.ts'}
        onCommandPalette={() => setCmdPaletteOpen(true)}
      />

      {/* ── Menu Bar ────────────────────────────────────────────────────── */}
      <MenuBar />

      {/* ── Main body: Activity + Sidebar + Editor ──────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Activity Bar */}
        <ActivityBar
          active={activityActive}
          onSelect={handleActivitySelect}
        />

        {/* Sidebar (Explorer) — collapsible */}
        {sidebarOpen && (
          <Sidebar
            activePanel={activePanel}
            tabs={tabs}
            onFileClick={openFile}
          />
        )}

        {/* Right column: tabs + editor + terminal */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Tab Bar */}
          <TabBar
            tabs={tabs}
            onSwitch={switchTab}
            onClose={closeTab}
          />

          {/* Editor + Terminal */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <EditorArea
              panel={activePanel}
              onLineCount={setLineCount}
              onOpenFile={openFile}
            />

            {/* Terminal */}
            <Terminal
              entries={entries}
              onCommand={runCommand}
              history={history}
              isOpen={terminalOpen}
              onToggle={() => setTerminalOpen(v => !v)}
            />
          </div>
        </div>
      </div>

      {/* ── Status Bar ──────────────────────────────────────────────────── */}
      <StatusBar
        language={activeTab?.language ?? 'TypeScript'}
        lineCount={lineCount}
        theme={theme}
        onThemeClick={() => setThemeSwitcher(v => !v)}
      />

      {/* ── Overlays ────────────────────────────────────────────────────── */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onOpen={handleOpenFromPalette}
      />

      <ThemeSwitcher
        current={theme}
        isOpen={themeSwitcherOpen}
        onSelect={setTheme}
        onClose={() => setThemeSwitcher(false)}
      />
    </div>
  )
}
