import React from 'react'
import { motion } from 'framer-motion'
import { instruments } from '../../data/hobbies'
import { HobbyMediaDisplay } from '../ui/HobbyMediaDisplay'

export const InstrumentsPanel: React.FC = () => {
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
          Instruments I Play
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Music is how I unwind.
        </p>
      </motion.div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
      >
        {instruments.map((item, i) => (
          <InstrumentCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

import { HobbyMediaBackground } from '../ui/HobbyMediaBackground'

const InstrumentCard: React.FC<{
  item: typeof instruments[0]
  index: number
}> = ({ item, index }) => {
  const [hovered, setHovered] = React.useState(false)

  if (item.media) {
    return (
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22, delay: index * 0.07 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '145px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1px solid ${hovered ? 'rgba(197,134,192,0.65)' : 'rgba(255,255,255,0.12)'}`,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          transform: hovered ? 'translateY(-2px)' : 'none',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.25)',
        }}
      >
        <HobbyMediaBackground media={item.media} alt={item.name} hovered={hovered} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: 'auto',
            padding: '14px 16px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#ffffff',
              textShadow: '0 1px 5px rgba(0,0,0,0.8)',
              letterSpacing: '-0.01em',
            }}
          >
            {item.name}
          </div>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        padding: '28px 16px',
        borderRadius: '12px',
        border: `1px solid ${hovered ? 'rgba(197,134,192,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(197,134,192,0.06)' : 'rgba(255,255,255,0.02)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 6px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HobbyMediaDisplay
          media={item.media}
          fallbackEmoji={<span style={{ fontSize: '52px', lineHeight: 1 }}>{item.emoji}</span>}
          alt={item.name}
          objectFit="contain"
        />
      </div>
      <span
        className="text-sm font-semibold text-center"
        style={{ color: hovered ? '#e8e8e8' : 'var(--text-muted)' }}
      >
        {item.name}
      </span>
    </motion.a>
  )
}
