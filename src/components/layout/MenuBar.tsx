import React, { useState, useEffect, useRef } from 'react'

export type MenuAction =
  | 'closeEditor'
  | 'toggleExplorer'
  | 'toggleTerminal'
  | 'newTerminal'
  | 'commandPalette'
  | 'colorTheme'
  | 'openWelcome'
  | 'openAbout'

interface MenuItem {
  label: string
  shortcut?: string
  action?: MenuAction // items without an action are shown disabled
}

const SEP = null
type MenuEntry = MenuItem | typeof SEP

const MENUS: Record<string, MenuEntry[]> = {
  File: [
    { label: 'New File' }, { label: 'Open...' }, SEP,
    { label: 'Close Editor', action: 'closeEditor' }, SEP,
    { label: 'Save' }, { label: 'Save As…' },
  ],
  Edit: [{ label: 'Undo' }, { label: 'Redo' }, SEP, { label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }],
  Selection: [{ label: 'Select All' }, { label: 'Expand Selection' }],
  View: [
    { label: 'Command Palette…', shortcut: 'Ctrl+Shift+P', action: 'commandPalette' }, SEP,
    { label: 'Explorer', shortcut: 'Ctrl+B', action: 'toggleExplorer' },
    { label: 'Terminal', shortcut: 'Ctrl+`', action: 'toggleTerminal' }, SEP,
    { label: 'Color Theme', action: 'colorTheme' },
  ],
  Go: [
    { label: 'Go to File…', action: 'commandPalette' }, SEP,
    { label: 'Back' }, { label: 'Forward' },
  ],
  Run: [{ label: 'Start Debugging' }, { label: 'Run Without Debugging' }],
  Terminal: [{ label: 'New Terminal', action: 'newTerminal' }, { label: 'Split Terminal' }],
  Help: [
    { label: 'Welcome', action: 'openWelcome' }, SEP,
    { label: 'About', action: 'openAbout' },
  ],
}

export const MenuBar: React.FC<{ onAction: (action: MenuAction) => void }> = ({ onAction }) => {
  const [open, setOpen] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Close on Escape or click outside
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    const onClick = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div
      ref={barRef}
      role="menubar"
      className="hidden sm:flex short:hidden items-center h-7 px-1 text-xs select-none relative z-50 shrink-0"
      style={{ background: 'var(--bg-titlebar)', borderBottom: '1px solid var(--border)' }}
    >
      {Object.entries(MENUS).map(([menu, items]) => (
        <div key={menu} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open === menu}
            className="px-2.5 py-0.5 rounded-sm transition-colors"
            style={{
              color: open === menu ? 'var(--text)' : 'var(--text-muted)',
              background: open === menu ? 'var(--bg-hover)' : 'transparent',
            }}
            onMouseEnter={() => open && setOpen(menu)}
            onClick={() => setOpen(open === menu ? null : menu)}
          >
            {menu}
          </button>
          {open === menu && (
            <div
              role="menu"
              className="absolute top-full left-0 min-w-[220px] py-1 rounded shadow-lg z-[100]"
              style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
            >
              {items.map((item, i) =>
                item === SEP ? (
                  <div key={i} className="my-1" style={{ borderTop: '1px solid var(--border)' }} />
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    disabled={!item.action}
                    className="w-full flex items-center justify-between gap-6 px-4 py-1 text-xs text-left enabled:hover:bg-[var(--bg-selected)] disabled:opacity-40 disabled:cursor-default"
                    style={{ color: 'var(--text)' }}
                    onClick={() => {
                      setOpen(null)
                      if (item.action) onAction(item.action)
                    }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && <span style={{ color: 'var(--text-muted)' }}>{item.shortcut}</span>}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
