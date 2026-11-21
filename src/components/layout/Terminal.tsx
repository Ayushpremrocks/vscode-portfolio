import React, { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { Plus, Terminal as TermIcon, ChevronDown } from 'lucide-react'
import type { TerminalEntry } from '../../types'
import { COMMAND_NAMES } from '../../hooks/useTerminal'
import { useDragResize } from '../../hooks/useDragResize'
import { MIN_TERMINAL_HEIGHT, maxTerminalHeight } from '../../config/layout'

interface TerminalProps {
  entries: TerminalEntry[]
  onCommand: (cmd: string) => void
  onClear: () => void
  history: string[]
  isOpen: boolean
  onToggle: () => void
  height: number
  onHeightChange: (height: number) => void
}

export const Terminal: React.FC<TerminalProps> = ({
  entries,
  onCommand,
  onClear,
  history,
  isOpen,
  onToggle,
  height,
  onHeightChange,
}) => {
  const [input, setInput] = useState('')
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isFirstRender = useRef(true)

  const { isDragging, isHovered, handleProps } = useDragResize({
    axis: 'y',
    value: height,
    min: MIN_TERMINAL_HEIGHT,
    max: maxTerminalHeight,
    onChange: onHeightChange,
    cursor: 'row-resize',
  })

  // Keep the terminal scrolled to the newest output (without scrolling ancestors)
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries, isOpen])

  // Focus input when the user opens the terminal (but not on initial page load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
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
      if (history.length === 0) return
      const newIdx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(newIdx)
      setInput(history[newIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(histIdx - 1, -1)
      setHistIdx(newIdx)
      setInput(newIdx === -1 ? '' : history[newIdx])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const prefix = input.trim().toLowerCase()
      if (!prefix) return
      const match = COMMAND_NAMES.find(c => c.startsWith(prefix))
      if (match) setInput(match)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      onClear()
    }
  }

  const entryColor = (type: TerminalEntry['type']) => {
    switch (type) {
      case 'error': return 'var(--red)'
      case 'success': return 'var(--green)'
      case 'info': return 'var(--text-muted)'
      default: return 'var(--text)'
    }
  }

  return (
    <div
      className="relative flex flex-col shrink-0"
      style={{
        background: 'var(--bg-terminal)',
        borderTop: '1px solid var(--border)',
        height: isOpen ? `${height}px` : '28px',
        transition: isDragging ? 'none' : 'height 0.2s ease',
      }}
    >
      {/* Horizontal drag handle */}
      {isOpen && (
        <div
          {...handleProps}
          className="absolute left-0 right-0 z-30 transition-colors"
          style={{
            top: '-2px',
            height: '4px',
            cursor: 'row-resize',
            touchAction: 'none',
            background: isDragging || isHovered ? 'var(--blue)' : 'transparent',
          }}
          title="Drag to resize terminal"
        />
      )}

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
          <span className="hidden sm:inline text-xs" style={{ color: 'var(--text-muted)' }}>PROBLEMS</span>
          <span className="hidden sm:inline text-xs" style={{ color: 'var(--text-muted)' }}>OUTPUT</span>
          <span className="hidden md:inline text-xs" style={{ color: 'var(--text-muted)' }}>DEBUG CONSOLE</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              onClear()
              if (!isOpen) onToggle()
              inputRef.current?.focus()
            }}
            className="p-1 rounded hover:opacity-80 transition-opacity"
            title="New Terminal"
            aria-label="New Terminal"
          >
            <Plus size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onToggle() }}
            className="p-1 rounded hover:opacity-80 transition-opacity"
            title="Toggle Terminal (Ctrl+`)"
            aria-label="Toggle Terminal"
            aria-expanded={isOpen}
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
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-3 py-1 font-mono text-xs"
          style={{ color: 'var(--text)' }}
          onClick={() => inputRef.current?.focus()}
        >
          {entries.map(entry => (
            <div key={entry.id} className="leading-relaxed">
              {entry.type === 'input' ? (
                <div className="flex gap-2">
                  <Prompt />
                  {/* Rendered as text (escaped by React) — never as HTML */}
                  <span style={{ color: 'var(--func)' }}>{entry.content}</span>
                </div>
              ) : (
                <div
                  className="whitespace-pre-wrap"
                  style={{ color: entryColor(entry.type) }}
                  // Output is built by useTerminal, which escapes all dynamic text
                  dangerouslySetInnerHTML={{ __html: entry.content || '&nbsp;' }}
                />
              )}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-1">
            <Prompt />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 min-w-0 bg-transparent outline-none border-none font-mono text-xs"
              style={{ color: 'var(--text)', caretColor: 'var(--text)' }}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
              id="terminal-input"
            />
          </div>
        </div>
      )}
    </div>
  )
}

const Prompt: React.FC = () => (
  <span className="shrink-0">
    <span style={{ color: 'var(--green)' }}>visitor</span>
    <span style={{ color: 'var(--text-muted)' }}>@</span>
    <span style={{ color: 'var(--blue)' }}>portfolio</span>
    <span style={{ color: 'var(--text-muted)' }}>:~$</span>
  </span>
)
