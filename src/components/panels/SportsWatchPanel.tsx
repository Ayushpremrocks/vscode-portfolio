import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { sportsWatch } from '../../data/hobbies'
import type { WatchItem } from '../../data/hobbies'
import { HobbyMediaBackground } from '../ui/HobbyMediaBackground'

export const SportsWatchPanel: React.FC = () => {
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
          Sports I am deeply into
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          I am a major sports watcher. Nothing teaches resilience, teamwork and never giving up like watching a comeback unfold live.
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

// ── Dispatcher — branches on whether the item has a `media` field ─────────────

type CardProps = { team: WatchItem; index: number }

const TeamCard: React.FC<CardProps> = ({ team, index }) =>
  team.media ? (
    <MediaTileCard team={team} index={index} />
  ) : (
    <ClassicCard team={team} index={index} />
  )

// ── Full-bleed media tile ─────────────────────────────────────────────────────

const MediaTileCard: React.FC<CardProps> = ({ team, index }) => {
  const [hovered, setHovered] = useState(false)

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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '152px',
        borderRadius: '10px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--blue) 65%, transparent)' : 'rgba(255,255,255,0.12)'}`,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? '0 8px 28px rgba(0,0,0,0.55)'
          : '0 2px 8px rgba(0,0,0,0.25)',
      }}
    >
      <HobbyMediaBackground media={team.media} alt={team.name} hovered={hovered} />

      {/* Layer 3 – text, pinned to the bottom */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: 'auto',
          padding: '12px 14px',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#ffffff',
            textShadow: '0 1px 5px rgba(0,0,0,0.8)',
            marginBottom: '2px',
            letterSpacing: '-0.01em',
          }}
        >
          {team.name}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'rgba(210,210,210,0.9)',
            textShadow: '0 1px 3px rgba(0,0,0,0.65)',
          }}
        >
          {team.description}
        </div>
      </div>
    </motion.a>
  )
}

// ── Classic icon + text card (for items without media) ────────────────────────

const ClassicCard: React.FC<CardProps> = ({ team, index }) => {
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
        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--blue) 50%, transparent)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Team logo icon box */}
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
        {!imgError && team.imageUrl ? (
          <img
            src={team.imageUrl}
            alt={team.name}
            loading="lazy"
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
          style={{ color: hovered ? 'var(--text-strong)' : 'var(--text)' }}
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
