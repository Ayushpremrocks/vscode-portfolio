import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import type { KeyboardEvent } from 'react'
import { Plus, Terminal as TermIcon, ChevronDown } from 'lucide-react'
import type { TerminalEntry } from '../../types'

interface TerminalProps {
  entries: TerminalEntry[]
  onCommand: (cmd: string) => void
  history: string[]
  isOpen: boolean
  onToggle: () => void
}

export const Terminal: React.FC<TerminalProps> = ({
  entries,
  onCommand,
  history,
  isOpen,
  onToggle,
}) => {
  const [input, setInput] = useState('')
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        onCommand(input)
        setInput('')
        setHistIdx(-1)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(newIdx)
      setInput(history[newIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(histIdx - 1, -1)
      setHistIdx(newIdx)
      setInput(newIdx === -1 ? '' : (history[newIdx] ?? ''))
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Tab completion: find command starting with input
      const CMDS = ['help', 'whoami', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'resume', 'ls', 'pwd', 'date', 'clear', 'sudo']
      const match = CMDS.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  const entryColor = (type: TerminalEntry['type']) => {
    switch (type) {
      case 'input': return 'var(--func)'
      case 'error': return 'var(--red)'
      case 'success': return 'var(--green)'
      case 'info': return 'var(--text-muted)'
      default: return 'var(--text)'
    }
  }

  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        background: 'var(--bg-terminal)',
        borderTop: '1px solid var(--border)',
        height: isOpen ? '220px' : '28px',
        transition: 'height 0.2s ease',
      }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 px-3 h-7 shrink-0 cursor-pointer select-none"
        style={{ borderBottom: isOpen ? '1px solid var(--border)' : 'none' }}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--blue)' }}>
            <TermIcon size={12} />
            TERMINAL
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>PROBLEMS</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>OUTPUT</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>DEBUG CONSOLE</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={e => { e.stopPropagation(); /* new terminal */ }}
            className="p-1 rounded hover:opacity-80 transition-opacity"
            title="New Terminal"
          >
            <Plus size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onToggle() }}
            className="p-1 rounded hover:opacity-80 transition-opacity"
            title="Toggle Terminal"
          >
            <ChevronDown
              size={13}
              style={{
                color: 'var(--text-muted)',
                transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>
        </div>
      </div>

      {/* Terminal body */}
      {isOpen && (
        <div
          className="flex-1 overflow-y-auto px-3 py-1 font-mono text-xs"
          style={{ color: 'var(--text)' }}
          onClick={() => inputRef.current?.focus()}
        >
          {entries.map(entry => (
            <div key={entry.id} className="leading-relaxed">
              {entry.type === 'input' ? (
                <div className="flex gap-2">
                  <span style={{ color: 'var(--green)' }}>visitor</span>
                  <span style={{ color: 'var(--text-muted)' }}>@</span>
                  <span style={{ color: 'var(--blue)' }}>portfolio</span>
                  <span style={{ color: 'var(--text-muted)' }}>:~$</span>
                  <span style={{ color: 'var(--func)' }}>{entry.content}</span>
                </div>
              ) : (
                <div
                  className="pl-0"
                  style={{ color: entryColor(entry.type) }}
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              )}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: 'var(--green)' }}>visitor</span>
            <span style={{ color: 'var(--text-muted)' }}>@</span>
            <span style={{ color: 'var(--blue)' }}>portfolio</span>
            <span style={{ color: 'var(--text-muted)' }}>:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent outline-none border-none font-mono text-xs caret-current"
              style={{ color: 'var(--text)', caretColor: 'var(--text)' }}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
              id="terminal-input"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
