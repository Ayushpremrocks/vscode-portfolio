import React from 'react'
import type { PanelName } from '../../types'

interface MinimapProps {
  panel:     PanelName
  lineCount: number
}

// Decorative minimap that renders scaled-down fake code lines matching the active panel
export const Minimap: React.FC<MinimapProps> = ({ lineCount }) => {
  // Generate random-width fake code lines for visual effect
  const lines = React.useMemo(() => {
    const seed = lineCount
    return Array.from({ length: Math.min(lineCount, 120) }, (_, i) => {
      // Pseudo-random widths based on index
      const w = 20 + ((i * 37 + seed * 13) % 70)
      const indent = ((i * 17 + seed * 7) % 4) * 8
      // Color variation to mimic syntax highlighting
      const colorIdx = (i * 11 + seed) % 5
      const colors = ['#569cd6', '#ce9178', '#6a9955', '#dcdcaa', '#9cdcfe']
      return { width: w, indent, color: colors[colorIdx], opacity: 0.3 + ((i % 3) * 0.15) }
    })
  }, [lineCount])

  return (
    <div
      className="w-[68px] shrink-0 overflow-hidden select-none hidden lg:block"
      style={{
        background:  'var(--bg-editor)',
        borderLeft:  '1px solid var(--border)',
        paddingTop:  '16px',
        paddingLeft: '8px',
        paddingRight:'8px',
      }}
      aria-hidden="true"
    >
      {/* Viewport indicator */}
      <div
        className="absolute w-[60px] h-[80px] rounded-sm pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      />

      {/* Fake code lines */}
      <div className="flex flex-col gap-[2px]">
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              height:        '2px',
              width:         `${line.width}%`,
              marginLeft:    `${line.indent / 4}px`,
              background:    line.color,
              opacity:       line.opacity,
              borderRadius:  '1px',
            }}
          />
        ))}
      </div>
    </div>
  )
}
