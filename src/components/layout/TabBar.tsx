import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Tab } from '../../types'

interface TabBarProps {
  tabs: Tab[]
  onSwitch: (tabId: string) => void
  onClose: (tabId: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, onSwitch, onClose }) => (
  <div
    role="tablist"
    aria-label="Open editors"
    className="tab-scroll flex items-end shrink-0 h-9 relative z-10"
    style={{
      background: 'var(--bg-tab-inactive)',
      borderBottom: '1px solid var(--border)',
      boxShadow: '0 4px 6px -4px rgba(0, 0, 0, 0.3)',
    }}
  >
    {tabs.map(tab => (
      <TabItem key={tab.id} tab={tab} onSwitch={onSwitch} onClose={onClose} />
    ))}
  </div>
)

const TabItem: React.FC<{
  tab: Tab
  onSwitch: (id: string) => void
  onClose: (id: string) => void
}> = ({ tab, onSwitch, onClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  // Keep the active tab visible when the tab strip overflows (phones, many open tabs)
  useEffect(() => {
    if (tab.isActive) ref.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [tab.isActive])

  return (
  <div
    ref={ref}
    className="group flex items-center h-full shrink-0 border-r text-xs"
    style={{
      background: tab.isActive ? 'var(--bg-tab-active)' : 'var(--bg-tab-inactive)',
      color: tab.isActive ? 'var(--text)' : 'var(--text-muted)',
      borderColor: 'var(--border)',
      borderTop: tab.isActive ? '1px solid var(--blue)' : '1px solid transparent',
      minWidth: '100px',
      maxWidth: '200px',
    }}
    // Middle-click closes the tab, like VS Code
    onAuxClick={e => { if (e.button === 1) onClose(tab.id) }}
  >
    <button
      type="button"
      role="tab"
      id={`tab-${tab.panel}`}
      aria-selected={tab.isActive}
      onClick={() => onSwitch(tab.id)}
      className="flex-1 min-w-0 h-full pl-3 pr-1 text-left truncate"
      title={tab.name}
    >
      {tab.name}
    </button>
    <button
      type="button"
      aria-label={`Close ${tab.name}`}
      title="Close"
      onClick={() => onClose(tab.id)}
      className={`mr-2 rounded p-0.5 flex items-center transition-opacity hover:bg-[var(--bg-hover)] focus-visible:opacity-100 ${
        tab.isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-60'
      }`}
      style={{ color: 'var(--text-muted)' }}
    >
      <X size={12} />
    </button>
  </div>
  )
}
