import React from 'react'
import {
  Files,
  Search,
  GitBranch,
  Package,
  Settings,
  User,
} from 'lucide-react'

type ActivityItem = {
  id: string
  icon: React.ReactNode
  label: string
}

const TOP_ITEMS: ActivityItem[] = [
  { id: 'explorer', icon: <Files size={22} />, label: 'Explorer' },
  { id: 'search', icon: <Search size={22} />, label: 'Search' },
  { id: 'git', icon: <GitBranch size={22} />, label: 'Source Control' },
  { id: 'extensions', icon: <Package size={22} />, label: 'Extensions' },
]

const BOTTOM_ITEMS: ActivityItem[] = [
  { id: 'account', icon: <User size={22} />, label: 'Account' },
  { id: 'settings', icon: <Settings size={22} />, label: 'Settings' },
]

interface ActivityBarProps {
  active: string
  onSelect: (id: string) => void
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ active, onSelect }) => {
  return (
    <div
      className="flex flex-col items-center w-12 shrink-0 py-1"
      style={{
        background: 'var(--bg-actbar)',
        borderRight: '1px solid var(--border)',
      }}
    >
      <div className="flex flex-col gap-1 flex-1">
        {TOP_ITEMS.map(item => (
          <ActivityButton
            key={item.id}
            item={item}
            isActive={active === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {BOTTOM_ITEMS.map(item => (
          <ActivityButton
            key={item.id}
            item={item}
            isActive={false}
            onClick={() => { }}
          />
        ))}
      </div>
    </div>
  )
}

const ActivityButton: React.FC<{
  item: ActivityItem
  isActive: boolean
  onClick: () => void
}> = ({ item, isActive, onClick }) => (
  <button
    title={item.label}
    aria-label={item.label}
    onClick={onClick}
    className="relative w-12 h-12 flex items-center justify-center transition-all group"
    style={{
      color: isActive ? 'var(--text)' : 'var(--text-muted)',
      borderLeft: isActive ? '2px solid var(--blue)' : '2px solid transparent',
    }}
  >
    <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
      {item.icon}
    </span>
    {/* Tooltip */}
    <span
      className="absolute left-14 px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
      style={{
        background: '#252526',
        color: 'var(--text)',
        border: '1px solid var(--border)',
      }}
    >
      {item.label}
    </span>
  </button>
)
