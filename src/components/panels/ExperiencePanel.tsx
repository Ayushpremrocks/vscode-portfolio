import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

export const ExperiencePanel: React.FC = () => {
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
          Experience
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          My professional journey so far.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[19px] top-2 bottom-2 w-px"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        <div className="space-y-6 pl-12">
          {portfolio.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: i * 0.07 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[33px] w-[10px] h-[10px] rounded-full border-2 top-[18px]"
                style={{
                  background: i === 0 ? 'var(--blue)' : 'var(--bg-sidebar)',
                  borderColor: i === 0 ? 'var(--blue)' : 'rgba(255,255,255,0.2)',
                  transition: 'border-color 0.2s',
                }}
              />

              <ExperienceCard experience={exp} isFirst={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────

const ExperienceCard: React.FC<{
  experience: typeof portfolio.experience[0]
  isFirst: boolean
}> = ({ experience }) => {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(0,127,212,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        padding: '18px 20px',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {/* Top section */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3
            className="font-semibold text-sm mb-1"
            style={{ color: '#e8e8e8' }}
          >
            {experience.role}
          </h3>
          <div className="flex items-center gap-1.5">
            <Briefcase size={11} style={{ color: 'var(--blue)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--blue)' }}>
              {experience.company}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={10} />
            <span className="text-[11px]">{experience.period}</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <MapPin size={10} />
            <span className="text-[11px]">{experience.location}</span>
          </div>
        </div>
      </div>

      {/* Bullet points */}
      {experience.bullets.length > 0 && (
        <ul className="space-y-1.5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {experience.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <span
                className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                style={{ background: 'var(--green)' }}
              />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
