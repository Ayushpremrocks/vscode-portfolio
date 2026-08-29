import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { portfolio } from '../../data/portfolio'

export const ProjectsPanel: React.FC = () => {
  const featured = portfolio.projects.filter(p => p.featured)
  const others   = portfolio.projects.filter(p => !p.featured)

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
          Projects
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Things I've built — production apps, side projects, and experiments.
        </p>
      </motion.div>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
          >
            Featured
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Other projects */}
      {others.length > 0 && (
        <section>
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
          >
            Other Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{
  project: typeof portfolio.projects[0]
  index: number
  compact?: boolean
}> = ({ project, index, compact = false }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(0,127,212,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        padding: compact ? '16px' : '20px',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {/* Top row: title + links */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {project.featured && (
            <Star
              size={12}
              style={{ color: '#dcdcaa', flexShrink: 0 }}
              fill="#dcdcaa"
            />
          )}
          <h3
            className="font-semibold truncate"
            style={{ color: '#e8e8e8', fontSize: compact ? '13px' : '15px' }}
          >
            {project.name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub repo"
              className="p-1.5 rounded transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}
            >
              <FaGithub size={14} />
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Live demo"
              className="p-1.5 rounded transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)' }}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed mb-3"
        style={{ color: 'var(--text-muted)' }}
      >
        {compact ? project.description : project.longDescription}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full font-mono"
            style={{
              background: 'rgba(78,201,176,0.12)',
              color: 'var(--green)',
              border: '1px solid rgba(78,201,176,0.2)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
