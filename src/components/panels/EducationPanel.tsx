import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award } from 'lucide-react'
import { portfolio, type Education } from '../../data/portfolio'

export const EducationPanel: React.FC = () => {
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
          Education
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Academic background and qualifications.
        </p>
      </motion.div>

      {/* Education cards */}
      <div className="space-y-4">
        {portfolio.education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.07 }}
          >
            <EducationCard education={edu} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────

const EducationCard: React.FC<{ education: Education }> = ({ education }) => {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(78,201,176,0.45)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        padding: '20px',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <GraduationCap size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text-strong)' }}>
              {education.degree}
            </h3>
            {education.field && (
              <p className="text-xs mb-0.5" style={{ color: 'var(--blue)' }}>
                {education.field}
              </p>
            )}
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {education.school}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={10} />
            <span className="text-[11px]">{education.period}</span>
          </div>
          {education.gpa && (
            <div className="flex items-center gap-1.5">
              <Award size={10} style={{ color: 'var(--yellow)' }} />
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-mono"
                style={{
                  background: 'color-mix(in srgb, var(--yellow) 10%, transparent)',
                  color: 'var(--yellow)',
                  border: '1px solid color-mix(in srgb, var(--yellow) 20%, transparent)',
                }}
              >
                GPA {education.gpa}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      {education.details.length > 0 && (
        <ul className="space-y-1.5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {education.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <span
                className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                style={{ background: 'var(--green)' }}
              />
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
