import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { sportsWatch } from '../../data/hobbies'

export const SportsWatchPanel: React.FC = () => {
  return (
    <div
      className="min-h-full px-8 py-10"
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
          style={{ color: '#e8e8e8', letterSpacing: '-0.02em' }}
        >
          Sports I Follow
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Teams and athletes I root for.
        </p>
      </motion.div>

      <div className="space-y-8">
        {sportsWatch.map((group, gi) => (
          <motion.section
            key={group.sport}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: gi * 0.06 }}
          >
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              <span>{group.emoji}</span>
              <span>{group.sport}</span>
            </h2>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
            >
              {group.teams.map((team, ti) => (
                <TeamCard key={team.id} team={team} index={ti} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

const TeamCard: React.FC<{
  team: typeof sportsWatch[0]['teams'][0]
  index: number
}> = ({ team, index }) => {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.a
      href={team.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 16px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(0,127,212,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Team logo / image */}
      <div
        style={{
          width: '72px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.05)',
          flexShrink: 0,
        }}
      >
        {!imgError ? (
          <img
            src={team.imageUrl}
            alt={team.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
          />
        ) : (
          <span style={{ fontSize: '36px' }}>🏆</span>
        )}
      </div>

      {/* Info */}
      <div style={{ textAlign: 'center' }}>
        <div
          className="font-semibold text-sm mb-0.5"
          style={{ color: hovered ? '#e8e8e8' : 'var(--text)' }}
        >
          {team.name}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {team.description}
        </div>
      </div>
    </motion.a>
  )
}
