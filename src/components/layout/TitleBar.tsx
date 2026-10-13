import React from 'react'
import { Minus, Square, X } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

interface TitleBarProps {
  activeFileName: string
  onCommandPalette: () => void
}

export const TitleBar: React.FC<TitleBarProps> = ({ activeFileName, onCommandPalette }) => {
  return (
    <div
      className="flex items-center justify-between h-8 px-3 select-none shrink-0"
      style={{ background: 'var(--bg-titlebar)', borderBottom: '1px solid var(--border)' }}
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-2">
        <button
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all flex items-center justify-center group"
          title="Close"
          aria-label="Close"
        >
          <X size={7} className="opacity-0 group-hover:opacity-100 text-[#820005]" />
        </button>
        <button
          className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 transition-all flex items-center justify-center group"
          title="Minimize"
          aria-label="Minimize"
        >
          <Minus size={7} className="opacity-0 group-hover:opacity-100 text-[#7d4a00]" />
        </button>
        <button
          className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 transition-all flex items-center justify-center group"
          title="Maximize"
          aria-label="Maximize"
        >
          <Square size={6} className="opacity-0 group-hover:opacity-100 text-[#0a5f18]" />
        </button>
      </div>

      {/* Center: command-palette-style clickable title */}
      <button
        onClick={onCommandPalette}
        className="flex items-center gap-2 px-3 py-0.5 rounded text-xs transition-all hover:opacity-80"
        style={{
          background: 'var(--bg-input)',
          color: 'var(--text-muted)',
          minWidth: '220px',
        }}
        title="Open Command Palette (Ctrl+Shift+P)"
      >
        <span style={{ color: 'var(--text-dim)' }}>{'>'}</span>
        <span className="truncate" style={{ color: 'var(--text-muted)' }}>
          {activeFileName} — {portfolio.name}
        </span>
      </button>

      {/* Window controls (Windows style) */}
      <div className="flex items-center gap-1">
        <button
          className="px-3 py-1 text-xs hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-muted)' }}
          title="Minimize window"
          aria-label="Minimize"
        >
          <Minus size={12} />
        </button>
        <button
          className="px-3 py-1 text-xs hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-muted)' }}
          title="Maximize window"
          aria-label="Maximize"
        >
          <Square size={11} />
        </button>
        <button
          className="px-3 py-1 text-xs hover:bg-[#e81123] hover:text-white transition-colors rounded-sm"
          style={{ color: 'var(--text-muted)' }}
          title="Close window"
          aria-label="Close"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  )
}
