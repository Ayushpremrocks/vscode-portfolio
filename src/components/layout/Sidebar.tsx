import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, FileCode2 } from 'lucide-react'
import type { PanelName } from '../../types'
import { portfolio } from '../../data/portfolio'
import { FILE_META } from '../../hooks/useFileSystem'
import { useDragResize } from '../../hooks/useDragResize'
import { MIN_SIDEBAR_WIDTH, maxSidebarWidth } from '../../config/layout'

interface SidebarProps {
  activePanel: PanelName | null
  onFileClick: (panel: PanelName) => void
  width: number
  onWidthChange?: (width: number) => void
  /** Show the drag handle (off for the phone drawer). */
  resizable?: boolean
}

const PORTFOLIO_FILES: PanelName[] = ['about', 'projects', 'skills', 'achievements', 'experience', 'education', 'contact', 'resume']
const HOBBY_FILES: PanelName[] = ['sports-watch', 'sports-play', 'instruments', 'games', 'movies-tv', 'anime']

export const Sidebar: React.FC<SidebarProps> = ({ activePanel, onFileClick, width, onWidthChange, resizable = true }) => {
  const [openPortfolio, setOpenPortfolio] = useState(true)
  const [openHobbies, setOpenHobbies] = useState(true)

  const { isDragging, isHovered, handleProps } = useDragResize({
    axis: 'x',
    value: width,
    min: MIN_SIDEBAR_WIDTH,
    max: maxSidebarWidth,
    onChange: w => onWidthChange?.(w),
    cursor: 'col-resize',
  })

  const renderFiles = (files: PanelName[]) =>
    files.map(panel => (
      <FileItem
        key={panel}
        name={FILE_META[panel].name}
        isActive={activePanel === panel}
        onClick={() => onFileClick(panel)}
      />
    ))

  return (
    <nav
      aria-label="Explorer"
      className="relative flex flex-col shrink-0 text-xs select-none h-full min-h-0"
      style={{
        width: `${width}px`,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
      }}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        <div
          className="px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Explorer
        </div>

        <SidebarSection label={portfolio.name} open={openPortfolio} onToggle={() => setOpenPortfolio(v => !v)}>
          {renderFiles(PORTFOLIO_FILES)}
        </SidebarSection>

        <SidebarSection label="Hobbies" open={openHobbies} onToggle={() => setOpenHobbies(v => !v)}>
          {renderFiles(HOBBY_FILES)}
        </SidebarSection>
      </div>

      {/* Resize handle */}
      {resizable && <div
        {...handleProps}
        className="absolute top-0 right-0 bottom-0 z-30 transition-colors"
        style={{
          width: '4px',
          marginRight: '-2px',
          cursor: 'col-resize',
          touchAction: 'none',
          background: isDragging || isHovered ? 'var(--blue)' : 'transparent',
        }}
        title="Drag to resize sidebar"
      />}
    </nav>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

const SidebarSection: React.FC<{
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}> = ({ label, open, onToggle, children }) => (
  <div>
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="w-full flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
    >
      <span className="transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
        <ChevronRight size={12} />
      </span>
      <span className="truncate">{label}</span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const FileItem: React.FC<{
  name: string
  isActive: boolean
  onClick: () => void
}> = ({ name, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className={`w-full flex items-center gap-2 pl-6 pr-3 py-1 transition-colors text-left ${
      isActive
        ? 'bg-[var(--bg-selected)] text-[color:var(--text-strong)]'
        : 'text-[color:var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[color:var(--text)]'
    }`}
    style={{ boxShadow: isActive ? 'inset 2px 0 0 0 var(--blue)' : 'none' }}
  >
    <FileCode2 size={14} style={{ color: 'var(--blue)', flexShrink: 0 }} />
    <span className="truncate">{name}</span>
  </button>
)
