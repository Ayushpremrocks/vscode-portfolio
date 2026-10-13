import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ThemeName } from '../../types'
import { themes } from '../../styles/themes'

interface ThemeSwitcherProps {
  current: ThemeName
  isOpen: boolean
  onSelect: (theme: ThemeName) => void
  onClose: () => void
}

const THEME_PREVIEWS: Record<ThemeName, { bg: string; sidebar: string; accent: string }> = {
  'one-dark-pro': { bg: '#1e1e2e', sidebar: '#252526', accent: '#569cd6' },
  'github-dark': { bg: '#0d1117', sidebar: '#161b22', accent: '#58a6ff' },
  'dracula': { bg: '#282a36', sidebar: '#21222c', accent: '#bd93f9' },
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ current, isOpen, onSelect, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[150]" onClick={onClose} />

          {/* Switcher popup */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[200] bottom-8 right-4 rounded-md overflow-hidden shadow-2xl"
            style={{
              minWidth: '240px',
              background: 'var(--bg-sidebar)',
              border: '1px solid var(--border)',
            }}
            id="theme-switcher"
            role="listbox"
            aria-label="Choose a theme"
          >
            {/* Header */}
            <div
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
              style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              Color Theme
            </div>

            {/* Theme options */}
            <div className="py-1">
              {(Object.keys(themes) as ThemeName[]).map(name => {
                const t = themes[name]
                const preview = THEME_PREVIEWS[name]
                const isActive = current === name

                return (
                  <button
                    key={name}
                    role="option"
                    aria-selected={isActive}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{
                      background: isActive ? 'var(--bg-selected)' : 'transparent',
                      color: 'var(--text)',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.background = 'transparent'
                    }}
                    onClick={() => { onSelect(name); onClose() }}
                    id={`theme-${name}`}
                  >
                    {/* Mini preview swatch */}
                    <div className="flex rounded overflow-hidden shrink-0" style={{ width: 32, height: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ width: '35%', background: preview.sidebar }} />
                      <div style={{ flex: 1, background: preview.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '60%', height: 2, background: preview.accent, borderRadius: 1 }} />
                      </div>
                    </div>

                    <span className="flex-1 text-xs">{t.label}</span>
                    {isActive && <Check size={12} style={{ color: 'var(--blue)' }} />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
