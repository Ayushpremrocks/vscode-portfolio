import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanelName } from '../../types'
import { WelcomePanel }    from '../panels/WelcomePanel'
import { AboutPanel }      from '../panels/AboutPanel'
import { ProjectsPanel }   from '../panels/ProjectsPanel'
import { SkillsPanel }     from '../panels/SkillsPanel'
import { ExperiencePanel } from '../panels/ExperiencePanel'
import { EducationPanel }  from '../panels/EducationPanel'
import { ContactPanel }    from '../panels/ContactPanel'
import { ResumePanel }     from '../panels/ResumePanel'
import { Minimap }         from '../ui/Minimap'

interface EditorAreaProps {
  panel:         PanelName | null
  onLineCount:   (n: number) => void
  onOpenFile:    (panel: PanelName) => void
}

export const EditorArea: React.FC<EditorAreaProps> = ({ panel, onLineCount, onOpenFile }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [lineCount, setLineCount] = useState(40)

  const PANEL_MAP: Record<PanelName, React.ReactNode> = {
    welcome:    <WelcomePanel onOpenFile={onOpenFile} />,
    about:      <AboutPanel />,
    projects:   <ProjectsPanel />,
    skills:     <SkillsPanel />,
    experience: <ExperiencePanel />,
    education:  <EducationPanel />,
    contact:    <ContactPanel />,
    resume:     <ResumePanel />,
  }

  // Count approximate lines for status bar
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const lines = Math.max(40, Math.ceil(el.scrollHeight / 20))
    setLineCount(lines)
    onLineCount(lines)
  }, [panel, onLineCount])

  return (
    <div className="flex flex-1 overflow-hidden" style={{ background: 'var(--bg-editor)' }}>
      {/* Line numbers gutter */}
      {panel !== 'welcome' && <LineGutter count={lineCount} />}

      {/* Panel content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4"
        style={{ minWidth: 0 }}
      >
        <AnimatePresence mode="wait">
          {panel && (
            <motion.div
              key={panel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {PANEL_MAP[panel]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimap */}
      {panel && panel !== 'welcome' && <Minimap panel={panel} lineCount={lineCount} />}
    </div>
  )
}

// ── Line gutter ───────────────────────────────────────────────────────────────

const LineGutter: React.FC<{ count: number }> = ({ count }) => {
  const lines = Array.from({ length: count }, (_, i) => i + 1)
  return (
    <div
      className="shrink-0 px-3 py-4 text-right font-mono text-xs select-none overflow-hidden"
      style={{
        color:       'var(--text-line)',
        background:  'var(--bg-editor)',
        borderRight: '1px solid var(--border)',
        minWidth:    '48px',
        lineHeight:  '1.6',
      }}
    >
      {lines.map(n => (
        <div key={n}>{n}</div>
      ))}
    </div>
  )
}
