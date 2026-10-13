import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  FileCode2,
  Globe,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import type { PanelName, Tab } from '../../types'
import { portfolio } from '../../data/portfolio'

interface SidebarProps {
  activePanel: PanelName | null
  tabs: Tab[]
  onFileClick: (panel: PanelName) => void
}

const FILE_ENTRIES: { id: PanelName; name: string; icon?: React.ReactNode }[] = [
  { id: 'about', name: 'about.ts' },
  { id: 'projects', name: 'projects.ts' },
  { id: 'skills', name: 'skills.ts' },
  { id: 'experience', name: 'experience.ts' },
  { id: 'education', name: 'education.ts' },
  { id: 'contact', name: 'contact.ts' },
  { id: 'resume', name: 'resume.ts' },
]

const HOBBY_ENTRIES: { id: PanelName; name: string }[] = [
  { id: 'sports-watch', name: 'sports-watch.ts' },
  { id: 'sports-play', name: 'sports-play.ts' },
  { id: 'instruments', name: 'instruments.ts' },
  { id: 'games', name: 'games.ts' },
  { id: 'movies-tv', name: 'movies-tv.ts' },
  { id: 'anime', name: 'anime.ts' },
]

const SOCIAL_ENTRIES = [
  { id: 'github', label: 'github.ts', icon: <FaGithub size={14} style={{ color: 'var(--text-muted)' }} />, url: portfolio.social.github },
  { id: 'linkedin', label: 'linkedin.ts', icon: <FaLinkedin size={14} style={{ color: 'var(--text-muted)' }} />, url: portfolio.social.linkedin },
  { id: 'twitter', label: 'twitter.ts', icon: <FaTwitter size={14} style={{ color: 'var(--text-muted)' }} />, url: portfolio.social.twitter },
  { id: 'website', label: 'website.ts', icon: <Globe size={14} />, url: portfolio.social.website },
]

export const Sidebar: React.FC<SidebarProps> = ({ activePanel, tabs, onFileClick }) => {
  const [openFiles, setOpenFiles] = useState(true)
  const [openPortfolio, setOpenPortfolio] = useState(true)
  const [openHobbies, setOpenHobbies] = useState(true)
  const [openSocial, setSocial] = useState(true)

  return (
    <div
      className="flex flex-col w-60 shrink-0 overflow-y-auto text-xs select-none"
      style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        minHeight: 0,
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        Explorer
      </div>

      {/* OPEN FILES */}
      {tabs.length > 0 && (
        <SidebarSection
          label="Open Files"
          open={openFiles}
          onToggle={() => setOpenFiles(v => !v)}
        >
          {tabs.map(t => (
            <FileItem
              key={t.id}
              name={t.name}
              isActive={activePanel === t.fileId}
              onClick={() => onFileClick(t.fileId as PanelName)}
            />
          ))}
        </SidebarSection>
      )}

      {/* PORTFOLIO */}
      <SidebarSection
        label={portfolio.name}
        open={openPortfolio}
        onToggle={() => setOpenPortfolio(v => !v)}
      >
        {FILE_ENTRIES.map(f => (
          <FileItem
            key={f.id}
            name={f.name}
            isActive={activePanel === f.id}
            onClick={() => onFileClick(f.id)}
          />
        ))}
      </SidebarSection>

      {/* HOBBIES */}
      <SidebarSection
        label="Hobbies"
        open={openHobbies}
        onToggle={() => setOpenHobbies(v => !v)}
      >
        {HOBBY_ENTRIES.map(f => (
          <FileItem
            key={f.id}
            name={f.name}
            isActive={activePanel === f.id}
            onClick={() => onFileClick(f.id)}
          />
        ))}
      </SidebarSection>

      {/* SOCIAL */}
      <SidebarSection
        label="Social"
        open={openSocial}
        onToggle={() => setSocial(v => !v)}
      >
        {SOCIAL_ENTRIES.map(s => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1 cursor-pointer transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-hover)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <span style={{ color: 'var(--text-dim)' }}>{s.icon}</span>
            <span>{s.label}</span>
          </a>
        ))}
      </SidebarSection>
    </div>
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
      onClick={onToggle}
      className="w-full flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
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
    onClick={onClick}
    className="w-full flex items-center gap-2 pl-6 pr-3 py-1 transition-colors text-left"
    style={{
      background: isActive ? 'var(--bg-selected)' : 'transparent',
      color: isActive ? '#ffffff' : 'var(--text-muted)',
      boxShadow: isActive ? 'inset 2px 0 0 0 var(--blue)' : 'none',
    }}
    onMouseEnter={e => {
      if (!isActive) {
        e.currentTarget.style.background = 'var(--bg-hover)'
        e.currentTarget.style.color = 'var(--text)'
      }
    }}
    onMouseLeave={e => {
      if (!isActive) {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--text-muted)'
      }
    }}
  >
    <FileCode2 size={14} style={{ color: 'var(--blue)', flexShrink: 0 }} />
    <span className="truncate">{name}</span>
  </button>
)
