import React, { useState, useEffect } from 'react'
import { GitBranch, AlertCircle, AlertTriangle, Bell } from 'lucide-react'
import type { ThemeName } from '../../types'
import { themes } from '../../styles/themes'

interface StatusBarProps {
  language:  string
  lineCount: number
  theme:     ThemeName
  onThemeClick: () => void
}

export const StatusBar: React.FC<StatusBarProps> = ({ language, lineCount, theme, onThemeClick }) => {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div
      className="flex items-center justify-between px-3 h-6 text-[11px] shrink-0 select-none"
      style={{
        background: 'var(--bg-statusbar)',
        color:      '#fff',
      }}
    >
      {/* Left group */}
      <div className="flex items-center gap-0">
        <StatusItem icon={<GitBranch size={12} />} label="main"     />
        <StatusItem icon={<AlertCircle  size={12} />} label="0"     />
        <StatusItem icon={<AlertTriangle size={12} />} label="0"    />
      </div>

      {/* Right group */}
      <div className="flex items-center gap-0">
        <StatusItem label={`Ln ${lineCount}, Col 1`} />
        <StatusItem label="Spaces: 2" />
        <StatusItem label="UTF-8" />
        <StatusItem label="LF" />
        <button
          onClick={onThemeClick}
          className="flex items-center gap-1 px-2 h-6 hover:bg-white/10 transition-colors"
          title={`Theme: ${themes[theme].label}`}
        >
          {language}
        </button>
        <button
          onClick={onThemeClick}
          className="flex items-center gap-1 px-2 h-6 hover:bg-white/10 transition-colors"
          title="Switch theme"
        >
          🎨 {themes[theme].label}
        </button>
        <StatusItem label={fmt(time)} />
        <button className="px-2 h-6 hover:bg-white/10 transition-colors" title="Notifications">
          <Bell size={12} />
        </button>
      </div>
    </div>
  )
}

const StatusItem: React.FC<{ icon?: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-1 px-2 h-6 hover:bg-white/10 transition-colors cursor-default">
    {icon}
    <span>{label}</span>
  </div>
)
