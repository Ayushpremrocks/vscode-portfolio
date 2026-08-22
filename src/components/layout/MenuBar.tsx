import React, { useState } from 'react'

const MENUS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']

const MENU_ITEMS: Record<string, string[]> = {
  File:      ['New File', 'New Window', '─', 'Open...', 'Close Editor', '─', 'Save', 'Save As…'],
  Edit:      ['Undo', 'Redo', '─', 'Cut', 'Copy', 'Paste', '─', 'Find', 'Replace'],
  Selection: ['Select All', 'Expand Selection', '─', 'Add Cursor Above', 'Add Cursor Below'],
  View:      ['Explorer', 'Search', 'Source Control', '─', 'Terminal', 'Problems', 'Output'],
  Go:        ['Back', 'Forward', '─', 'Go to File…', 'Go to Line/Column…', '─', 'Go to Definition'],
  Run:       ['Start Debugging', 'Run Without Debugging', '─', 'Toggle Breakpoint'],
  Terminal:  ['New Terminal', 'Split Terminal', '─', 'Run Task…', 'Run Build Task…'],
  Help:      ['Welcome', 'Documentation', '─', 'Keyboard Shortcuts', '─', 'About'],
}

export const MenuBar: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div
      className="flex items-center h-7 px-1 text-xs select-none relative z-50 shrink-0"
      style={{ background: 'var(--bg-titlebar)', borderBottom: '1px solid var(--border)' }}
      onMouseLeave={() => setOpen(null)}
    >
      {MENUS.map(menu => (
        <div key={menu} className="relative">
          <button
            className="px-2.5 py-0.5 rounded-sm transition-colors relative"
            style={{
              color:      open === menu ? 'var(--text)' : 'var(--text-muted)',
              background: open === menu ? 'var(--bg-hover)' : 'transparent',
            }}
            onMouseEnter={() => open && setOpen(menu)}
            onClick={() => setOpen(open === menu ? null : menu)}
          >
            {menu}
          </button>
          {open === menu && (
            <div
              className="absolute top-full left-0 min-w-[200px] py-1 rounded shadow-lg z-[100]"
              style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
            >
              {MENU_ITEMS[menu].map((item, i) =>
                item === '─' ? (
                  <div key={i} className="my-1" style={{ borderTop: '1px solid var(--border)' }} />
                ) : (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-1 text-xs transition-colors"
                    style={{ color: 'var(--text)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-selected)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => setOpen(null)}
                  >
                    {item}
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
