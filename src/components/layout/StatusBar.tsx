import React, { useState, useEffect } from 'react'
import { GitBranch, AlertCircle, AlertTriangle, Bell, Zap } from 'lucide-react'
import type { ThemeName } from '../../types'
import { themes } from '../../styles/themes'
import { useStats } from '../../data/stats'

interface StatusBarProps {
  language: string
  lineCount: number
  theme: ThemeName
  onThemeClick: () => void
  onStatsClick: () => void
}

const formatTime = (d: Date) =>
  d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export const StatusBar: React.FC<StatusBarProps> = ({ language, lineCount, theme, onThemeClick, onStatsClick }) => {
  const [time, setTime] = useState(() => new Date())
  const { stats } = useStats()
  const ratings = [
    stats?.leetcode?.rating != null && `LC ${stats.leetcode.rating}`,
    stats?.codeforces?.rating != null && `CF ${stats.codeforces.rating}`,
    stats?.codechef?.rating != null && `CC ${stats.codechef.rating}`,
  ].filter(Boolean)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer
      className="flex items-center justify-between px-3 h-6 text-[11px] shrink-0 select-none overflow-hidden"
      style={{ background: 'var(--bg-statusbar)', color: '#fff' }}
    >
      {/* Left group */}
      <div className="flex items-center">
        <StatusItem icon={<GitBranch size={12} />} label="main" />
        <StatusItem icon={<AlertCircle size={12} />} label="0" />
        <StatusItem icon={<AlertTriangle size={12} />} label="0" />
        {ratings.length > 0 && (
          <button
            type="button"
            onClick={onStatsClick}
            className="hidden md:flex items-center gap-1 px-2 h-6 hover:bg-white/10 transition-colors"
            title="Open achievements.ts (live coding stats)"
          >
            <Zap size={12} />
            {ratings.join(' · ')}
          </button>
        )}
      </div>

      {/* Right group */}
      <div className="flex items-center">
        <StatusItem label={`Ln ${lineCount}, Col 1`} className="hidden md:flex" />
        <StatusItem label="Spaces: 2" className="hidden lg:flex" />
        <StatusItem label="UTF-8" className="hidden lg:flex" />
        <StatusItem label="LF" className="hidden lg:flex" />
        {language && <StatusItem label={language} className="hidden sm:flex" />}
        <button
          type="button"
          onClick={onThemeClick}
          className="flex items-center gap-1 px-2 h-6 hover:bg-white/10 transition-colors"
          title="Switch color theme"
        >
          🎨 {themes[theme].label}
        </button>
        <StatusItem label={formatTime(time)} className="hidden sm:flex" />
        <div className="px-2 h-6 flex items-center" aria-hidden="true">
          <Bell size={12} />
        </div>
      </div>
    </footer>
  )
}

const StatusItem: React.FC<{ icon?: React.ReactNode; label: string; className?: string }> = ({
  icon,
  label,
  className = 'flex',
}) => (
  <div className={`${className} items-center gap-1 px-2 h-6 hover:bg-white/10 transition-colors cursor-default`}>
    {icon}
    <span>{label}</span>
  </div>
)
