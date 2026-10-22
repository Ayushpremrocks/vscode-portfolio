import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { anime as animeList } from '../../data/hobbies'
import { HobbyMediaDisplay } from '../ui/HobbyMediaDisplay'

export const AnimePanel: React.FC = () => {
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
          Anime
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Series and films that I've watched and loved.
        </p>
      </motion.div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))' }}
      >
        {animeList.map((item, i) => (
          <AnimeCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

import { HobbyMediaBackground } from '../ui/HobbyMediaBackground'

const AnimeCard: React.FC<{
  item: typeof animeList[0]
  index: number
}> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false)

  if (item.media) {
    return (
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.06 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          aspectRatio: '2/3',
          borderRadius: '10px',
          overflow: 'hidden',
          border: `1px solid ${hovered ? 'rgba(86,182,194,0.65)' : 'rgba(255,255,255,0.12)'}`,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          transform: hovered ? 'translateY(-2px) scale(1.01)' : 'none',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.25)',
        }}
      >
        <HobbyMediaBackground media={item.media} alt={item.name} hovered={hovered} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 'auto',
            padding: '12px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#ffffff',
              textShadow: '0 1px 5px rgba(0,0,0,0.8)',
              marginBottom: '2px',
              letterSpacing: '-0.01em',
            }}
          >
            {item.name}
          </div>
          {item.year && (
            <div
              style={{
                fontSize: '0.7rem',
                color: 'rgba(210,210,210,0.9)',
                textShadow: '0 1px 3px rgba(0,0,0,0.65)',
              }}
            >
              {item.year}
            </div>
          )}
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(86,182,194,0.5)' : 'rgba(255,255,255,0.08)'}`,
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px) scale(1.01)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : 'none',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Poster */}
      <div
        style={{
          width: '100%',
          aspectRatio: '2/3',
          background: 'rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <HobbyMediaDisplay
          media={item.media}
          fallbackImageUrl={!item.isPlaceholder ? item.imageUrl : undefined}
          fallbackEmoji={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '12px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '36px' }}>🎌</span>
              {item.isPlaceholder && (
                <span style={{ fontSize: '9px', color: 'var(--text-dim)', opacity: 0.7 }}>
                  image placeholder
                </span>
              )}
            </div>
          }
          alt={item.name}
          objectFit="cover"
        />
      </div>

      {/* Title + year */}
      <div className="px-2 py-2.5">
        <div
          className="text-xs font-medium leading-tight mb-0.5"
          style={{ color: hovered ? '#e8e8e8' : 'var(--text)' }}
        >
          {item.name}
        </div>
        {item.year && (
          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {item.year}
          </div>
        )}
      </div>
    </motion.a>
  )
}
