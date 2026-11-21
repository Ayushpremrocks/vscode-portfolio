import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Code2 } from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiC, SiCplusplus, SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss,
  SiReact, SiSpringboot, SiTailwindcss, SiNodedotjs, SiFastapi,
  SiPytorch, SiTensorflow, SiScikitlearn, SiNumpy, SiPandas, SiOpencv, SiStreamlit,
  SiMongodb, SiMysql, SiApachecassandra, SiRedis, SiNeon, SiPostgresql,
  SiDocker, SiRender, SiVercel,
  SiGithub, SiPostman, SiIntellijidea, SiAnaconda, SiJupyter,
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'
import { TbSql } from 'react-icons/tb'
import { VscVscode } from 'react-icons/vsc'
import { portfolio, type Skill } from '../../data/portfolio'

// ── Icon lookup — skill data lives in data/portfolio.ts ───────────────────────
// Skills without an entry here fall back to a generic code icon.

const ICON_SIZE = 20

const SKILL_ICONS: Record<string, IconType> = {
  'C': SiC,
  'C++': SiCplusplus,
  'Java': FaJava,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'SQL': TbSql,
  'HTML': SiHtml5,
  'CSS': SiCss,
  'React.js': SiReact,
  'Spring Boot': SiSpringboot,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'FastAPI': SiFastapi,
  'PyTorch': SiPytorch,
  'TensorFlow': SiTensorflow,
  'Scikit-learn': SiScikitlearn,
  'NumPy': SiNumpy,
  'Pandas': SiPandas,
  'OpenCV': SiOpencv,
  'Streamlit': SiStreamlit,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'Cassandra': SiApachecassandra,
  'Redis': SiRedis,
  'Neon': SiNeon,
  'PostgreSQL': SiPostgresql,
  'AWS': FaAws,
  'Docker': SiDocker,
  'Render': SiRender,
  'Vercel': SiVercel,
  'Git/GitHub': SiGithub,
  'Postman': SiPostman,
  'IntelliJ': SiIntellijidea,
  'VS Code': VscVscode,
  'Anaconda': SiAnaconda,
  'Jupyter': SiJupyter,
}

const SkillIcon: React.FC<{ name: string }> = ({ name }) => {
  const Icon = SKILL_ICONS[name]
  return Icon ? <Icon size={ICON_SIZE} /> : <Code2 size={ICON_SIZE} />
}

// ── Component ─────────────────────────────────────────────────────────────────

export const SkillsPanel: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(portfolio.skills.map(c => [c.label, true]))
  )

  const toggle = (label: string) =>
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }))

  return (
    <div
      className="min-h-full px-1 sm:px-4 lg:px-8 py-6 sm:py-10"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: 'var(--text)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-10"
      >
        <h1
          className="text-3xl font-bold mb-2 tracking-tight"
          style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em' }}
        >
          Skills
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Technologies and tools I work with
        </p>
      </motion.div>

      {/* Skill categories */}
      <div className="space-y-6">
        {portfolio.skills.map((cat, ci) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: ci * 0.04 }}
          >
            {/* Section header — collapsible */}
            <button
              onClick={() => toggle(cat.label)}
              className="w-full flex items-center justify-between mb-3 group"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: openSections[cat.label] ? 0 : -90 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex', color: 'var(--text-muted)' }}
                >
                  <ChevronDown size={14} />
                </motion.span>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: cat.color, letterSpacing: '0.08em' }}
                >
                  {cat.label}
                </span>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {cat.skills.length} skills
              </span>
            </button>

            {/* Skill grid */}
            <AnimatePresence initial={false}>
              {openSections[cat.label] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                    }}
                  >
                    {cat.skills.map(skill => (
                      <SkillCard key={skill.name} skill={skill} accentColor={cat.color} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Skill Card ────────────────────────────────────────────────────────────────

const SkillCard: React.FC<{ skill: Skill; accentColor: string }> = ({ skill, accentColor }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={skill.docsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        borderRadius: '8px',
        border: `1px solid ${hovered ? accentColor + '55' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        color: hovered ? 'var(--text-strong)' : 'var(--text-muted)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? `0 4px 12px rgba(0,0,0,0.3)` : 'none',
      }}
    >
      <span style={{ color: hovered ? accentColor : 'var(--text-dim)', flexShrink: 0, transition: 'color 0.15s ease' }}>
        <SkillIcon name={skill.name} />
      </span>
      <span style={{ fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {skill.name}
      </span>
    </a>
  )
}
