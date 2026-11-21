import React from 'react'
import { motion } from 'framer-motion'
import { sportsPlay } from '../../data/hobbies'
import { HobbyMediaDisplay } from '../ui/HobbyMediaDisplay'
import { HobbyMediaBackground } from '../ui/HobbyMediaBackground'

export const SportsPlayPanel: React.FC = () => {
  return (
    <div
      className="min-h-full px-1 sm:px-4 lg:px-8 py-6 sm:py-10"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: 'var(--text)' }}
    >
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
          Sports I am playing
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          I enjoy playing indoors and outdoors. It teaches me teamwork, discipline and how to handle both wins and losses.
        </p>
      </motion.div>

      <div className="space-y-8">
        {sportsPlay.map((group, gi) => (
          <motion.section
            key={group.group}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: gi * 0.07 }}
          >
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              <span>{group.emoji}</span>
              <span>{group.group}</span>
            </h2>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(140px, calc(50% - 8px)), 1fr))' }}
            >
              {group.sports.map((sport, si) => (
                <SportCard key={sport.id} sport={sport} index={si} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

const SportCard: React.FC<{
  sport: typeof sportsPlay[0]['sports'][0]
  index: number
}> = ({ sport, index }) => {
  const [hovered, setHovered] = React.useState(false)

  if (sport.media) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '120px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: `1px solid ${hovered ? 'rgba(78,201,176,0.65)' : 'rgba(255,255,255,0.12)'}`,
          transition: 'all 0.18s ease',
          transform: hovered ? 'translateY(-2px)' : 'none',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.25)',
          cursor: 'default',
        }}
      >
        <HobbyMediaBackground media={sport.media} alt={sport.name} hovered={hovered} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 'auto',
            padding: '12px 14px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#ffffff',
              textShadow: '0 1px 5px rgba(0,0,0,0.8)',
              letterSpacing: '-0.01em',
            }}
          >
            {sport.name}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '20px 12px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(78,201,176,0.45)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HobbyMediaDisplay
          media={sport.media}
          fallbackEmoji={<span style={{ fontSize: '40px', lineHeight: 1 }}>{sport.emoji}</span>}
          alt={sport.name}
          objectFit="contain"
        />
      </div>
      <span
        className="text-sm font-medium text-center"
        style={{ color: hovered ? 'var(--text-strong)' : 'var(--text-muted)' }}
      >
        {sport.name}
      </span>
    </motion.div>
  )
}
