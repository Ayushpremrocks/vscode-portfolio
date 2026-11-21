import React from 'react'
import { Award, Medal, Trophy } from 'lucide-react'
import type { Achievement } from '../../data/portfolio'

const PLACE_COLORS: Record<number, string> = { 1: '#f5c542', 2: '#c0c7d0', 3: '#cd8a4b' }

export const AwardIcon: React.FC<{ place?: number; size?: number }> = ({ place, size = 16 }) => {
  const color = place ? PLACE_COLORS[place] : 'var(--blue)'
  const Icon = place === 1 ? Trophy : place ? Medal : Award
  return <Icon size={size} style={{ color, flexShrink: 0 }} aria-hidden="true" />
}

/** Card grid used on the Achievements page. */
export const AwardCards: React.FC<{ items: Achievement[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
    {items.map(a => {
      const color = a.place ? PLACE_COLORS[a.place] : 'var(--blue)'
      return (
        <div
          key={a.event}
          className="flex items-start gap-3 rounded-md p-4"
          style={{
            background: 'var(--bg-sidebar)',
            border: '1px solid var(--border)',
            boxShadow: `inset 3px 0 0 0 ${color}`,
          }}
        >
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
            style={{ background: `color-mix(in srgb, ${color} 14%, transparent)` }}
          >
            <AwardIcon place={a.place} size={17} />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>{a.result}</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>{a.event}</div>
            {a.note && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.note}</div>}
            <div className="text-[11px] mt-1" style={{ color: 'var(--text-dim)' }}>{a.organizer}</div>
          </div>
        </div>
      )
    })}
  </div>
)

/** Compact one-line-per-award list used on the About and Resume pages. */
export const AwardRows: React.FC<{ items: Achievement[] }> = ({ items }) => (
  <ul className="flex flex-col gap-2">
    {items.map(a => (
      <li key={a.event} className="flex items-start gap-2 text-xs">
        <AwardIcon place={a.place} size={14} />
        <span style={{ color: 'var(--text-muted)' }}>
          <b style={{ color: a.place ? PLACE_COLORS[a.place] : 'var(--blue)' }}>{a.result}</b>
          {' — '}
          <span style={{ color: 'var(--text)' }}>{a.event}</span>
          {a.note && ` (${a.note})`}, {a.organizer}
        </span>
      </li>
    ))}
  </ul>
)
