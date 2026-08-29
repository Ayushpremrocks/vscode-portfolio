import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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

// ── Skill definition ──────────────────────────────────────────────────────────

interface SkillItem {
  name: string
  icon: React.ReactNode
  docsUrl: string
}

// ── All skill categories ──────────────────────────────────────────────────────

const ICON_SIZE = 20

const CATEGORIES: { label: string; color: string; skills: SkillItem[] }[] = [
  {
    label: 'Programming Languages',
    color: '#569cd6',
    skills: [
      { name: 'C', icon: <SiC size={ICON_SIZE} />, docsUrl: 'https://en.cppreference.com/w/c' },
      { name: 'C++', icon: <SiCplusplus size={ICON_SIZE} />, docsUrl: 'https://en.cppreference.com/w/cpp' },
      { name: 'Java', icon: <FaJava size={ICON_SIZE} />, docsUrl: 'https://docs.oracle.com/en/java/' },
      { name: 'JavaScript', icon: <SiJavascript size={ICON_SIZE} />, docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', icon: <SiTypescript size={ICON_SIZE} />, docsUrl: 'https://www.typescriptlang.org/docs/' },
      { name: 'Python', icon: <SiPython size={ICON_SIZE} />, docsUrl: 'https://docs.python.org/3/' },
      { name: 'SQL', icon: <TbSql size={ICON_SIZE} />, docsUrl: 'https://www.w3schools.com/sql/' },
      { name: 'HTML', icon: <SiHtml5 size={ICON_SIZE} />, docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS', icon: <SiCss size={ICON_SIZE} />, docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    ],
  },
  {
    label: 'Web',
    color: '#4ec9b0',
    skills: [
      { name: 'React.js', icon: <SiReact size={ICON_SIZE} />, docsUrl: 'https://react.dev' },
      { name: 'Spring Boot', icon: <SiSpringboot size={ICON_SIZE} />, docsUrl: 'https://spring.io/projects/spring-boot' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={ICON_SIZE} />, docsUrl: 'https://tailwindcss.com/docs' },
      { name: 'Node.js', icon: <SiNodedotjs size={ICON_SIZE} />, docsUrl: 'https://nodejs.org/en/docs' },
      { name: 'FastAPI', icon: <SiFastapi size={ICON_SIZE} />, docsUrl: 'https://fastapi.tiangolo.com/' },
    ],
  },
  {
    label: 'ML',
    color: '#c586c0',
    skills: [
      { name: 'PyTorch', icon: <SiPytorch size={ICON_SIZE} />, docsUrl: 'https://pytorch.org/docs/stable/index.html' },
      { name: 'TensorFlow', icon: <SiTensorflow size={ICON_SIZE} />, docsUrl: 'https://www.tensorflow.org/api_docs' },
      { name: 'Scikit-learn', icon: <SiScikitlearn size={ICON_SIZE} />, docsUrl: 'https://scikit-learn.org/stable/documentation.html' },
      { name: 'NumPy', icon: <SiNumpy size={ICON_SIZE} />, docsUrl: 'https://numpy.org/doc/' },
      { name: 'Pandas', icon: <SiPandas size={ICON_SIZE} />, docsUrl: 'https://pandas.pydata.org/docs/' },
      { name: 'OpenCV', icon: <SiOpencv size={ICON_SIZE} />, docsUrl: 'https://docs.opencv.org/' },
      { name: 'Streamlit', icon: <SiStreamlit size={ICON_SIZE} />, docsUrl: 'https://docs.streamlit.io/' },
    ],
  },
  {
    label: 'Database',
    color: '#ce9178',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb size={ICON_SIZE} />, docsUrl: 'https://www.mongodb.com/docs/' },
      { name: 'MySQL', icon: <SiMysql size={ICON_SIZE} />, docsUrl: 'https://dev.mysql.com/doc/' },
      { name: 'Cassandra', icon: <SiApachecassandra size={ICON_SIZE} />, docsUrl: 'https://cassandra.apache.org/doc/' },
      { name: 'Redis', icon: <SiRedis size={ICON_SIZE} />, docsUrl: 'https://redis.io/docs/' },
      { name: 'Neon', icon: <SiNeon size={ICON_SIZE} />, docsUrl: 'https://neon.tech/docs' },
      { name: 'PostgreSQL', icon: <SiPostgresql size={ICON_SIZE} />, docsUrl: 'https://www.postgresql.org/docs/' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    color: '#dcdcaa',
    skills: [
      { name: 'AWS', icon: <FaAws size={ICON_SIZE} />, docsUrl: 'https://docs.aws.amazon.com/' },
      { name: 'Docker', icon: <SiDocker size={ICON_SIZE} />, docsUrl: 'https://docs.docker.com/' },
      { name: 'Render', icon: <SiRender size={ICON_SIZE} />, docsUrl: 'https://render.com/docs' },
      { name: 'Vercel', icon: <SiVercel size={ICON_SIZE} />, docsUrl: 'https://vercel.com/docs' },
    ],
  },
  {
    label: 'Tools',
    color: '#9cdcfe',
    skills: [
      { name: 'Git/GitHub', icon: <SiGithub size={ICON_SIZE} />, docsUrl: 'https://docs.github.com/' },
      { name: 'Postman', icon: <SiPostman size={ICON_SIZE} />, docsUrl: 'https://learning.postman.com/docs/getting-started/introduction/' },
      { name: 'IntelliJ', icon: <SiIntellijidea size={ICON_SIZE} />, docsUrl: 'https://www.jetbrains.com/idea/documentation/' },
      { name: 'VS Code', icon: <VscVscode size={ICON_SIZE} />, docsUrl: 'https://code.visualstudio.com/docs' },
      { name: 'Anaconda', icon: <SiAnaconda size={ICON_SIZE} />, docsUrl: 'https://docs.anaconda.com/' },
      { name: 'Jupyter', icon: <SiJupyter size={ICON_SIZE} />, docsUrl: 'https://docs.jupyter.org/' },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export const SkillsPanel: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(CATEGORIES.map(c => [c.label, true]))
  )

  const toggle = (label: string) =>
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }))

  return (
    <div
      className="min-h-full px-8 py-10"
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
          style={{ color: '#e8e8e8', letterSpacing: '-0.02em' }}
        >
          Skills
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Technologies and tools I work with
        </p>
      </motion.div>

      {/* Skill categories */}
      <div className="space-y-6">
        {CATEGORIES.map((cat, ci) => (
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

const SkillCard: React.FC<{ skill: SkillItem; accentColor: string }> = ({ skill, accentColor }) => {
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
        color: hovered ? '#e8e8e8' : 'var(--text-muted)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? `0 4px 12px rgba(0,0,0,0.3)` : 'none',
      }}
    >
      <span style={{ color: hovered ? accentColor : 'var(--text-dim)', flexShrink: 0, transition: 'color 0.15s ease' }}>
        {skill.icon}
      </span>
      <span style={{ fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {skill.name}
      </span>
    </a>
  )
}
