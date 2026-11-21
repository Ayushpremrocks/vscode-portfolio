import React, { useEffect } from 'react'
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

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ current, isOpen, onSelect, onClose }) => {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Click-away layer */}
          <div className="fixed inset-0 z-[150]" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[200] bottom-8 right-4 rounded-md overflow-hidden shadow-2xl"
            style={{ minWidth: '240px', background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
            id="theme-switcher"
            role="listbox"
            aria-label="Choose a theme"
          >
            <div
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
              style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              Color Theme
            </div>

            <div className="py-1">
              {(Object.keys(themes) as ThemeName[]).map(name => {
                const t = themes[name]
                const isActive = current === name

                return (
                  <button
                    key={name}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    autoFocus={isActive}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive ? 'bg-[var(--bg-selected)]' : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    style={{ color: 'var(--text)' }}
                    onClick={() => { onSelect(name); onClose() }}
                    id={`theme-${name}`}
                  >
                    {/* Mini preview swatch, taken from the theme itself */}
                    <div
                      className="flex rounded overflow-hidden shrink-0"
                      style={{ width: 32, height: 20, border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <div style={{ width: '35%', background: t.bgSidebar }} />
                      <div style={{ flex: 1, background: t.bgEditor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '60%', height: 2, background: t.keyword, borderRadius: 1 }} />
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
