import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, FileCode2, ArrowRight, Palette } from 'lucide-react'
import type { PanelName } from '../../types'
import { FILE_META } from '../../hooks/useFileSystem'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpen: (panel: PanelName) => void
  onColorTheme: () => void
}

interface CommandItem {
  id: string
  label: string
  description: string
  run: () => void
  icon: React.ReactNode
}

const DESCRIPTIONS: Record<PanelName, string> = {
  'welcome':      'Start page',
  'about':        'View bio and personal info',
  'projects':     'Browse featured projects',
  'skills':       'Technical skills and tools',
  'achievements': 'Hackathon wins + live LeetCode, Codeforces, CodeChef & GitHub stats',
  'experience':   'Work experience timeline',
  'education':    'Education history',
  'contact':      'Get in touch',
  'resume':       'View and download resume',
  'sports-watch': 'Sports teams I follow',
  'sports-play':  'Sports I play',
  'instruments':  'Instruments I play',
  'games':        'Games I play (mobile & PC)',
  'movies-tv':    'Movies & TV shows I love',
  'anime':        'Anime series and films',
}

export const CommandPalette: React.FC<CommandPaletteProps> = props => (
  <AnimatePresence>{props.isOpen && <PaletteBody {...props} />}</AnimatePresence>
)

// Mounted only while open, so its state starts fresh every time it opens.
const PaletteBody: React.FC<CommandPaletteProps> = ({ onClose, onOpen, onColorTheme }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const commands: CommandItem[] = [
    ...(Object.keys(FILE_META) as PanelName[]).map(panel => ({
      id: panel,
      label: panel === 'welcome' ? 'Open Welcome' : `Open ${FILE_META[panel].name}`,
      description: DESCRIPTIONS[panel],
      run: () => onOpen(panel),
      icon: <FileCode2 size={14} />,
    })),
    {
      id: 'color-theme',
      label: 'Preferences: Color Theme',
      description: 'Switch between Dark Modern, GitHub Dark and Dracula',
      run: onColorTheme,
      icon: <Palette size={14} />,
    },
  ]

  const q = query.trim().toLowerCase()
  const filtered = q
    ? commands.filter(c => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    : commands

  const run = (item: CommandItem) => {
    onClose()
    item.run()
  }

  // Keep the highlighted item visible while navigating with the keyboard
  useEffect(() => {
    listRef.current?.children[selected]?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault()
      run(filtered[selected])
    }
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12 }}
        className="fixed inset-0 z-[200]"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Panel — the outer div centers; motion only animates the inner one,
          so framer-motion's transform doesn't override the centering. */}
      <div className="fixed z-[300] inset-x-0 top-[80px] flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="w-full max-w-[560px] rounded-md overflow-hidden shadow-2xl pointer-events-auto"
          style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
          onKeyDown={onKeyDown}
        >
          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(0) }}
              placeholder="Type a command or file name..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--text)', caretColor: 'var(--text)' }}
              id="command-palette-input"
              aria-label="Command palette search"
              aria-controls="command-palette-list"
              aria-activedescendant={filtered[selected] ? `cmd-${filtered[selected].id}` : undefined}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => { setQuery(''); setSelected(0) }}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Results */}
          <div ref={listRef} id="command-palette-list" role="listbox" className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                No commands found
              </div>
            ) : (
              filtered.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={i === selected}
                  id={`cmd-${item.id}`}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    background: i === selected ? 'var(--bg-selected)' : 'transparent',
                    color: 'var(--text)',
                  }}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => run(item)}
                >
                  <span style={{ color: i === selected ? 'var(--blue)' : 'var(--text-muted)' }}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">{item.label}</div>
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.description}</div>
                  </div>
                  {i === selected && <ArrowRight size={12} style={{ color: 'var(--blue)', flexShrink: 0 }} />}
                </button>
              ))
            )}
          </div>

          {/* Footer hint */}
          <div
            className="hidden sm:flex items-center gap-4 px-4 py-2 text-[10px]"
            style={{ borderTop: '1px solid var(--border)', color: 'var(--text-dim)' }}
          >
            <span><kbd className="font-mono">↑↓</kbd> to navigate</span>
            <span><kbd className="font-mono">↵</kbd> to select</span>
            <span><kbd className="font-mono">Esc</kbd> to close</span>
          </div>
        </motion.div>
      </div>
    </>
  )
}
