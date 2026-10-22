import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { games } from '../../data/hobbies'
import { HobbyMediaDisplay } from '../ui/HobbyMediaDisplay'

export const GamesPanel: React.FC = () => {
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
          Games I Play
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          My go-to titles on mobile and PC.
        </p>
      </motion.div>

      <div className="space-y-8">
        {games.map((group, gi) => (
          <motion.section
            key={group.platform}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: gi * 0.06 }}
          >
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              <span>{group.emoji}</span>
              <span>{group.platform}</span>
            </h2>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
            >
              {group.games.map((game, gi2) => (
                <GameCard key={game.id} game={game} index={gi2} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

import { HobbyMediaBackground } from '../ui/HobbyMediaBackground'

const GameCard: React.FC<{
  game: typeof games[0]['games'][0]
  index: number
}> = ({ game, index }) => {
  const [hovered, setHovered] = useState(false)

  if (game.media) {
    return (
      <motion.a
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.04 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '135px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: `1px solid ${hovered ? 'rgba(220,220,170,0.65)' : 'rgba(255,255,255,0.12)'}`,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          transform: hovered ? 'translateY(-2px)' : 'none',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.25)',
        }}
      >
        <HobbyMediaBackground media={game.media} alt={game.name} hovered={hovered} />
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
              fontSize: '0.85rem',
              color: '#ffffff',
              textShadow: '0 1px 5px rgba(0,0,0,0.8)',
              letterSpacing: '-0.01em',
            }}
          >
            {game.name}
          </div>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(220,220,170,0.45)' : 'rgba(255,255,255,0.08)'}`,
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.4)' : 'none',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Cover image */}
      <div
        style={{
          width: '100%',
          height: '96px',
          background: 'rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <HobbyMediaDisplay
          media={game.media}
          fallbackImageUrl={!game.isPlaceholder ? game.imageUrl : undefined}
          fallbackEmoji={<span style={{ fontSize: '40px' }}>🎮</span>}
          alt={game.name}
          objectFit="cover"
        />
      </div>

      {/* Name */}
      <div
        className="px-3 py-2 text-xs font-medium text-center"
        style={{ color: hovered ? '#e8e8e8' : 'var(--text-muted)' }}
      >
        {game.name}
      </div>
    </motion.a>
  )
}
