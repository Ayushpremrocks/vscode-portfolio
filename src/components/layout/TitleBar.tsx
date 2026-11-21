import React from 'react'
import { Minus, Square, X, Search } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

interface TitleBarProps {
  activeFileName: string
  onCommandPalette: () => void
}

// Window controls are purely decorative — this is a web page, not a real window.
export const TitleBar: React.FC<TitleBarProps> = ({ activeFileName, onCommandPalette }) => (
  <header
    className="flex items-center justify-between gap-3 h-8 px-3 select-none shrink-0"
    style={{ background: 'var(--bg-titlebar)', borderBottom: '1px solid var(--border)' }}
  >
    {/* Traffic lights (decorative) */}
    <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>

    {/* Center: opens the command palette, like VS Code's command center */}
    <button
      type="button"
      onClick={onCommandPalette}
      className="flex items-center justify-center gap-2 px-3 py-0.5 rounded text-xs transition-all hover:opacity-80 min-w-0 flex-1 sm:flex-none sm:w-[340px]"
      style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}
      title="Open Command Palette (Ctrl+Shift+P)"
    >
      <Search size={12} className="shrink-0" style={{ color: 'var(--text-dim)' }} />
      <span className="truncate">
        {activeFileName} — {portfolio.name}
      </span>
    </button>

    {/* Window controls (decorative) */}
    <div className="hidden sm:flex items-center gap-4 px-2" aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
      <Minus size={12} />
      <Square size={11} />
      <X size={12} />
    </div>
  </header>
)
