import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanelName } from '../../types'
import { WelcomePanel } from '../panels/WelcomePanel'
import { AboutPanel } from '../panels/AboutPanel'
import { ProjectsPanel } from '../panels/ProjectsPanel'
import { SkillsPanel } from '../panels/SkillsPanel'
import { AchievementsPanel } from '../panels/AchievementsPanel'
import { ExperiencePanel } from '../panels/ExperiencePanel'
import { EducationPanel } from '../panels/EducationPanel'
import { ContactPanel } from '../panels/ContactPanel'
import { ResumePanel } from '../panels/ResumePanel'
import { SportsWatchPanel } from '../panels/SportsWatchPanel'
import { SportsPlayPanel } from '../panels/SportsPlayPanel'
import { InstrumentsPanel } from '../panels/InstrumentsPanel'
import { GamesPanel } from '../panels/GamesPanel'
import { MoviesTVPanel } from '../panels/MoviesTVPanel'
import { AnimePanel } from '../panels/AnimePanel'

interface EditorAreaProps {
  panel: PanelName | null
  onLineCount: (n: number) => void
  onOpenFile: (panel: PanelName) => void
}

const LINE_HEIGHT = 19 // px — must match the gutter's line-height
const MIN_LINES = 40

export const EditorArea: React.FC<EditorAreaProps> = ({ panel, onLineCount, onOpenFile }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [lineCount, setLineCount] = useState(MIN_LINES)

  const renderPanel = (p: PanelName): React.ReactNode => {
    switch (p) {
      case 'welcome':      return <WelcomePanel onOpenFile={onOpenFile} />
      case 'about':        return <AboutPanel onOpenFile={onOpenFile} />
      case 'projects':     return <ProjectsPanel />
      case 'skills':       return <SkillsPanel />
      case 'achievements': return <AchievementsPanel />
      case 'experience':   return <ExperiencePanel />
      case 'education':    return <EducationPanel />
      case 'contact':      return <ContactPanel />
      case 'resume':       return <ResumePanel />
      case 'sports-watch': return <SportsWatchPanel />
      case 'sports-play':  return <SportsPlayPanel />
      case 'instruments':  return <InstrumentsPanel />
      case 'games':        return <GamesPanel />
      case 'movies-tv':    return <MoviesTVPanel />
      case 'anime':        return <AnimePanel />
    }
  }

  // Start each file at the top
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [panel])

  // Track the rendered content height (it changes after the enter animation,
  // when images load, or when sections expand/collapse).
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      setLineCount(Math.max(MIN_LINES, Math.ceil(el.offsetHeight / LINE_HEIGHT)))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    onLineCount(lineCount)
  }, [lineCount, onLineCount])

  return (
    <main
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden"
      style={{ background: 'var(--bg-editor)' }}
    >
      <div className="flex min-h-full">
        {panel && panel !== 'welcome' && <LineGutter count={lineCount} />}

        {/* self-start: measure the content's own height, not the stretched row */}
        <div ref={contentRef} className="flex-1 min-w-0 self-start px-3 sm:px-4 py-4">
          <AnimatePresence mode="wait">
            {panel ? (
              <motion.div
                key={panel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {renderPanel(panel)}
              </motion.div>
            ) : (
              <EmptyEditor key="empty" onOpenFile={onOpenFile} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

// ── Line gutter ───────────────────────────────────────────────────────────────

const LineGutter: React.FC<{ count: number }> = ({ count }) => (
  <div
    aria-hidden="true"
    className="shrink-0 px-3 py-4 text-right font-mono text-xs select-none hidden sm:block"
    style={{
      color: 'var(--text-line)',
      background: 'var(--bg-editor)',
      borderRight: '1px solid var(--border)',
      minWidth: '48px',
      lineHeight: `${LINE_HEIGHT}px`,
    }}
  >
    {Array.from({ length: count }, (_, i) => (
      <div key={i}>{i + 1}</div>
    ))}
  </div>
)

// ── Shown when every tab has been closed ──────────────────────────────────────

const EmptyEditor: React.FC<{ onOpenFile: (panel: PanelName) => void }> = ({ onOpenFile }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center gap-3 pt-32 text-xs font-sans"
    style={{ color: 'var(--text-muted)' }}
  >
    <p>No file is open.</p>
    <p>
      Pick a file from the Explorer, press{' '}
      <kbd className="font-mono px-1 rounded" style={{ background: 'var(--bg-input)' }}>Ctrl+Shift+P</kbd>, or{' '}
      <button type="button" className="underline" style={{ color: 'var(--blue)' }} onClick={() => onOpenFile('welcome')}>
        open the Welcome page
      </button>
      .
    </p>
  </motion.div>
)
