import React from 'react'
import { X, Circle } from 'lucide-react'
import type { Tab } from '../../types'

interface TabBarProps {
  tabs: Tab[]
  onSwitch: (tabId: string) => void
  onClose: (tabId: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, onSwitch, onClose }) => {
  return (
    <div
      className="flex items-end overflow-x-auto shrink-0 h-9 relative z-10"
      style={{
        background: 'var(--bg-tab-inactive)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 6px -4px rgba(0, 0, 0, 0.3)'
      }}
    >
      {tabs.map(tab => (
        <TabItem key={tab.id} tab={tab} onSwitch={onSwitch} onClose={onClose} />
      ))}
      {/* Right padding filler */}
      <div className="flex-1 h-full" style={{ borderBottom: '1px solid var(--border)' }} />
    </div>
  )
}

const TabItem: React.FC<{
  tab: Tab
  onSwitch: (id: string) => void
  onClose: (id: string) => void
}> = ({ tab, onSwitch, onClose }) => {
  return (
    <button
      id={`tab-${tab.fileId}`}
      onClick={() => onSwitch(tab.id)}
      className="group flex items-center gap-1.5 px-3 h-full text-xs shrink-0 transition-all relative border-r"
      style={{
        background: tab.isActive ? 'var(--bg-tab-active)' : 'var(--bg-tab-inactive)',
        color: tab.isActive ? 'var(--text)' : 'var(--text-muted)',
        borderColor: 'var(--border)',
        borderTop: tab.isActive ? '1px solid var(--blue)' : '1px solid transparent',
        minWidth: '100px',
        maxWidth: '200px',
      }}
      title={tab.name}
      aria-label={`Open ${tab.name}`}
      aria-selected={tab.isActive}
    >
      {/* Dirty indicator */}
      {tab.isDirty && (
        <Circle size={8} fill="var(--text-muted)" style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
      )}
      <span className="truncate">{tab.name}</span>
      <span
        role="button"
        aria-label={`Close ${tab.name}`}
        onClick={e => { e.stopPropagation(); onClose(tab.id) }}
        className="ml-auto opacity-0 group-hover:opacity-100 hover:!opacity-100 rounded p-0.5 transition-all flex items-center"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <X size={12} />
      </span>
    </button>
  )
}
