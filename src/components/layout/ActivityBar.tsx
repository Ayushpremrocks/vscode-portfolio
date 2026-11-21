import React from 'react'
import { Files, Settings, User } from 'lucide-react'
import { SiGithub, SiX, SiLeetcode } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { SOCIAL_LINKS } from '../../config/socialLinks'

interface ActivityBarProps {
  explorerOpen: boolean
  onToggleExplorer: () => void
  onAccount: () => void
  onSettings: () => void
}

const CodeforcesIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3z" fill="#ffd43b" />
    <path d="M13.5 3c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3z" fill="#1f8acb" />
    <path d="M22.5 10.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" fill="#d62929" />
  </svg>
)

const SOCIAL_ITEMS = [
  { id: 'github', label: 'GitHub', url: SOCIAL_LINKS.GITHUB, icon: <SiGithub size={22} style={{ color: '#e6edf3' }} /> },
  { id: 'linkedin', label: 'LinkedIn', url: SOCIAL_LINKS.LINKEDIN, icon: <FaLinkedin size={22} style={{ color: '#0a66c2' }} /> },
  { id: 'twitter', label: 'Twitter (X)', url: SOCIAL_LINKS.TWITTER, icon: <SiX size={20} style={{ color: '#ffffff' }} /> },
  { id: 'leetcode', label: 'LeetCode', url: SOCIAL_LINKS.LEETCODE, icon: <SiLeetcode size={22} style={{ color: '#ffa116' }} /> },
  { id: 'codeforces', label: 'Codeforces', url: SOCIAL_LINKS.CODEFORCES, icon: <CodeforcesIcon size={22} /> },
]

const ITEM_CLASS =
  'relative w-10 h-10 sm:w-12 sm:h-12 short:h-9 shrink-0 flex items-center justify-center transition-all group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--blue)] hover:bg-white/5'

const Tooltip: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="hidden sm:block absolute left-14 px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none transition-opacity z-50 shadow-md"
    style={{
      background: 'var(--bg-sidebar)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
      fontFamily: "'Segoe UI', sans-serif",
    }}
  >
    {label}
  </span>
)

export const ActivityBar: React.FC<ActivityBarProps> = ({ explorerOpen, onToggleExplorer, onAccount, onSettings }) => {
  const bottomItems = [
    { id: 'account', icon: <User size={22} />, label: 'Account', onClick: onAccount },
    { id: 'settings', icon: <Settings size={22} />, label: 'Color Theme', onClick: onSettings },
  ]

  return (
    <div
      className="flex flex-col items-center w-10 sm:w-12 shrink-0 py-1 select-none short:overflow-y-auto short:overflow-x-hidden"
      style={{ background: 'var(--bg-actbar)', borderRight: '1px solid var(--border)' }}
    >
      <div className="flex flex-col items-center gap-1 flex-1 w-full">
        {/* Explorer toggle */}
        <button
          type="button"
          aria-label="Explorer (Ctrl+B)"
          aria-pressed={explorerOpen}
          onClick={onToggleExplorer}
          className={ITEM_CLASS}
          style={{
            color: explorerOpen ? 'var(--text)' : 'var(--text-muted)',
            borderLeft: explorerOpen ? '2px solid var(--blue)' : '2px solid transparent',
          }}
        >
          <span className={`transition-opacity ${explorerOpen ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
            <Files size={22} />
          </span>
          <Tooltip label="Explorer (Ctrl+B)" />
        </button>

        {/* Social & coding profiles */}
        {SOCIAL_ITEMS.map(item => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={ITEM_CLASS}
            style={{ borderLeft: '2px solid transparent' }}
          >
            <span className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center justify-center">
              {item.icon}
            </span>
            <Tooltip label={item.label} />
          </a>
        ))}
      </div>

      {/* Bottom utility icons */}
      <div className="flex flex-col items-center gap-1 w-full">
        {bottomItems.map(item => (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            onClick={item.onClick}
            className={ITEM_CLASS}
            style={{ color: 'var(--text-muted)', borderLeft: '2px solid transparent' }}
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</span>
            <Tooltip label={item.label} />
          </button>
        ))}
      </div>
    </div>
  )
}
