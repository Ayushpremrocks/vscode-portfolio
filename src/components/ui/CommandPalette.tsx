import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, FileCode2, ArrowRight } from 'lucide-react'
import type { PanelName } from '../../types'

interface CommandPaletteProps {
  isOpen:   boolean
  onClose:  () => void
  onOpen:   (panel: PanelName) => void
}

interface CommandItem {
  id:       string
  label:    string
  description: string
  panel?:   PanelName
  action?:  () => void
  icon:     React.ReactNode
}

const COMMANDS: CommandItem[] = [
  { id: 'about',        label: 'Open about.ts',        description: 'View bio and personal info',     panel: 'about',        icon: <FileCode2 size={14} /> },
  { id: 'projects',     label: 'Open projects.ts',     description: 'Browse featured projects',        panel: 'projects',     icon: <FileCode2 size={14} /> },
  { id: 'skills',       label: 'Open skills.ts',       description: 'Technical skills and tools',      panel: 'skills',       icon: <FileCode2 size={14} /> },
  { id: 'experience',   label: 'Open experience.ts',   description: 'Work experience timeline',        panel: 'experience',   icon: <FileCode2 size={14} /> },
  { id: 'education',    label: 'Open education.ts',    description: 'Education history',               panel: 'education',    icon: <FileCode2 size={14} /> },
  { id: 'contact',      label: 'Open contact.ts',      description: 'Get in touch',                    panel: 'contact',      icon: <FileCode2 size={14} /> },
  { id: 'resume',       label: 'Open resume.ts',       description: 'View and download resume',        panel: 'resume',       icon: <FileCode2 size={14} /> },
  { id: 'sports-watch', label: 'Open sports-watch.ts', description: 'Sports teams I follow',          panel: 'sports-watch', icon: <FileCode2 size={14} /> },
  { id: 'sports-play',  label: 'Open sports-play.ts',  description: 'Sports I play',                   panel: 'sports-play',  icon: <FileCode2 size={14} /> },
  { id: 'instruments',  label: 'Open instruments.ts',  description: 'Instruments I play',              panel: 'instruments',  icon: <FileCode2 size={14} /> },
  { id: 'games',        label: 'Open games.ts',        description: 'Games I play (mobile & PC)',      panel: 'games',        icon: <FileCode2 size={14} /> },
  { id: 'movies-tv',    label: 'Open movies-tv.ts',    description: 'Movies & TV shows I love',        panel: 'movies-tv',    icon: <FileCode2 size={14} /> },
  { id: 'anime',        label: 'Open anime.ts',        description: 'Anime series and films',          panel: 'anime',        icon: <FileCode2 size={14} /> },
]

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpen }) => {
  const [query, setQuery]       = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef                = useRef<HTMLInputElement>(null)

  const filtered = COMMANDS.filter(c =>
    !query || c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  )

  const run = useCallback((item: CommandItem) => {
    if (item.panel) onOpen(item.panel)
    if (item.action) item.action()
    onClose()
  }, [onClose, onOpen])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => { setSelected(0) }, [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) run(filtered[selected])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, filtered, selected, run, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
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

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed z-[300] left-1/2 -translate-x-1/2 w-full rounded-md overflow-hidden shadow-2xl"
            style={{
              top:       '80px',
              maxWidth:  '560px',
              background:'var(--bg-sidebar)',
              border:    '1px solid var(--border)',
            }}
          >
            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or file name..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text)', caretColor: 'var(--text)' }}
                id="command-palette-input"
                aria-label="Command palette search"
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                  No commands found
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{
                      background: i === selected ? 'var(--bg-selected)' : 'transparent',
                      color:      'var(--text)',
                    }}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => run(item)}
                    id={`cmd-${item.id}`}
                    aria-label={item.label}
                  >
                    <span style={{ color: i === selected ? 'var(--blue)' : 'var(--text-muted)' }}>{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium">{item.label}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.description}</div>
                    </div>
                    {i === selected && (
                      <ArrowRight size={12} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div
              className="flex items-center gap-4 px-4 py-2 text-[10px]"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-dim)' }}
            >
              <span><kbd className="font-mono">↑↓</kbd> to navigate</span>
              <span><kbd className="font-mono">↵</kbd> to select</span>
              <span><kbd className="font-mono">Esc</kbd> to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
