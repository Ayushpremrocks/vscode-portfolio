import React from 'react'
import { SiCodechef, SiCodeforces, SiGithub, SiLeetcode } from 'react-icons/si'
import type { RatingPoint } from '../../data/stats'

// ── Platform icon ────────────────────────────────────────────────────────────

const ICONS = {
  github: { Icon: SiGithub, color: 'var(--text-strong)' },
  leetcode: { Icon: SiLeetcode, color: '#ffa116' },
  codeforces: { Icon: SiCodeforces, color: '#1f8acb' },
  codechef: { Icon: SiCodechef, color: '#b07a4e' },
} as const

export const PlatformIcon: React.FC<{ platform: keyof typeof ICONS; size?: number }> = ({ platform, size = 14 }) => {
  const { Icon, color } = ICONS[platform]
  return <Icon size={size} style={{ color, flexShrink: 0 }} aria-hidden="true" />
}

// ── Rank / title badge ───────────────────────────────────────────────────────

export const TitleBadge: React.FC<{ title: string; color: string }> = ({ title, color }) => (
  <span
    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
    style={{ color, background: `color-mix(in srgb, ${color} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 40%, transparent)` }}
  >
    {title}
  </span>
)

// ── Rating history line chart ────────────────────────────────────────────────

export const RatingChart: React.FC<{ history: RatingPoint[]; color: string; height?: number }> = ({
  history,
  color,
  height = 64,
}) => {
  if (history.length < 2) return null
  const W = 300
  const H = height
  const PAD = 4
  const ratings = history.map(h => h.rating)
  const min = Math.min(...ratings)
  const max = Math.max(...ratings)
  const span = max - min || 1
  const x = (i: number) => PAD + (i / (history.length - 1)) * (W - PAD * 2)
  const y = (r: number) => H - PAD - ((r - min) / span) * (H - PAD * 2)
  const points = history.map((h, i) => `${x(i).toFixed(1)},${y(h.rating).toFixed(1)}`).join(' ')
  const last = history[history.length - 1]

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: H }}
        role="img"
        aria-label={`Rating history: from ${history[0].rating} to ${last.rating}, peak ${max}`}
      >
        <polygon points={`${x(0)},${H} ${points} ${x(history.length - 1)},${H}`} fill={color} opacity={0.12} />
        <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex justify-between text-[10px] mt-1 font-mono" style={{ color: 'var(--text-dim)' }}>
        <span>{new Date(history[0].t * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        <span>low {min} · peak {max}</span>
      </div>
    </div>
  )
}

// ── GitHub contribution heatmap ──────────────────────────────────────────────

const LEVEL_MIX = [0, 30, 55, 80, 100]
const CELL = 10

export const ContributionGraph: React.FC<{ start: string; levels: string }> = ({ start, levels }) => {
  const offset = new Date(`${start}T00:00:00Z`).getUTCDay() // empty cells before the first day (Sunday-based)
  const cells = [...Array(offset).fill(-1), ...levels.split('').map(Number)]

  return (
    <div className="overflow-x-auto pb-1">
      <div
        className="grid gap-[2px] w-max"
        style={{ gridTemplateRows: `repeat(7, ${CELL}px)`, gridAutoFlow: 'column', gridAutoColumns: `${CELL}px` }}
        role="img"
        aria-label="GitHub contributions over the last year"
      >
        {cells.map((level, i) => (
          <div
            key={i}
            className="rounded-[2px]"
            style={{
              background:
                level < 0
                  ? 'transparent'
                  : level === 0
                    ? 'var(--bg-hover)'
                    : `color-mix(in srgb, var(--green) ${LEVEL_MIX[level]}%, var(--bg-hover))`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Small stat cell ──────────────────────────────────────────────────────────

export const Stat: React.FC<{ label: string; value: React.ReactNode; color?: string }> = ({ label, value, color }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-dim)' }}>{label}</div>
    <div className="text-sm font-semibold font-mono" style={{ color: color ?? 'var(--text-strong)' }}>{value ?? '—'}</div>
  </div>
)
